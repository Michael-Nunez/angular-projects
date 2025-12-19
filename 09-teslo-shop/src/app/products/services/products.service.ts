import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gender, Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable, of, tap, map, forkJoin, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@/auth/interfaces/user.interface';

const baseURL = environment.baseURL;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
};

@Injectable({providedIn: 'root'})
export class ProductsService {
  private httpClient = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.httpClient.get<ProductsResponse>(`${baseURL}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    })
      .pipe(
        tap((response) => console.log(response)),
        tap((response) => this.productsCache.set(key, response))
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.httpClient.get<Product>(`${baseURL}/products/${idSlug}`)
      .pipe(
        tap((product) => this.productCache.set(idSlug, product))
      );
  }

  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.httpClient.get<Product>(`${baseURL}/products/${id}`)
      .pipe(
        tap((product) => this.productCache.set(id, product))
      );
  }

  createProduct(productLike: Partial<Product>, images?: FileList): Observable<Product> {
    const currentImages = productLike.images ?? [];

    //* Observables encadenados: map, switchMap y tap
    return this.uploadImages(images)
      .pipe(
        map((imagesNames) => ({
          ...productLike,
          images: [...currentImages, ...imagesNames]
        })),
        switchMap((updatedProduct) =>
          this.httpClient.post<Product>(`${baseURL}/products`, updatedProduct)
        ),
        tap((product) => this.updateProductCache(product))
      );
  }

  updateProduct(id: string, productLike: Partial<Product>, images?: FileList): Observable<Product> {
    const currentImages = productLike.images ?? [];

    //* Observables encadenados: map, switchMap y tap
    return this.uploadImages(images)
      .pipe(
        map((imagesNames) => ({
          ...productLike,
          images: [...currentImages, ...imagesNames]
        })),
        switchMap((updatedProduct) =>
          this.httpClient.patch<Product>(`${baseURL}/products/${id}`, updatedProduct)
        ),
        tap((product) => this.updateProductCache(product))
      );
  }

  updateProductCache(product: Product) {
    const productId = product.id;

    this.productCache.set(productId, product);

    this.productsCache.forEach(response => {
      response.products = response.products.map((currentProduct) => {
        return currentProduct.id === productId ? product : currentProduct;
      });
    });

    console.log('Cache actualizado');
  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.httpClient.post<{ fileName: string }>(`${baseURL}/files/product`, formData)
      .pipe(
        map((response) => response.fileName)
      );
  }

  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([]);

    const uploadObservables = Array.from(images)
      .map((imageFile) => this.uploadImage(imageFile));

    //? forkJoin -> Recibe un arreglo de observables y se ejecuta de manera exitosa si todos son procesados correctamente,
    //? de lo contrario lanza una excepción.
    //? Es un homólogo del await Promise.all();
    return forkJoin(uploadObservables);
  }
}