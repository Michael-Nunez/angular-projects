import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseURL = environment.baseURL;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductsService {
  private httpClient = inject(HttpClient);

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    return this.httpClient.get<ProductsResponse>(`${baseURL}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    })
      .pipe(
        tap((response) => console.log(response))
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    return this.httpClient.get<Product>(`${baseURL}/products/${idSlug}`);
  }
}