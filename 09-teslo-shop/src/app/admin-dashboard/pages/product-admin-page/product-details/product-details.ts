import { ProductsCarousel } from '@/products/components/products-carousel/products-carousel';
import { Product } from '@/products/interfaces/product.interface';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";
import { ProductsService } from '@/products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductsCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<Product>();

  router = inject(Router);
  productsService = inject(ProductsService);
  productWasSaved = signal(false);

  imageFileList: FileList | undefined = undefined;
  tempImages = signal<string[]>([]);
  imagesToCarousel = computed(() => {
    const currentProductImages = [...this.product().images, ...this.tempImages()];

    return currentProductImages;
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  formBuilder = inject(FormBuilder);

  productForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    tags: [''],
    images: [[]],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]]
  });

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(', ') });
  }

  onSizeClick(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.productForm.value;
    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').map(tag => tag.trim()) ?? []
    }

    if (this.product().id === 'new') {
      const newProduct = await firstValueFrom(this.productsService.createProduct(productLike, this.imageFileList));

      console.log('Producto creado');
      this.router.navigate(['/admin/products', newProduct.id]);
    } else {
      await firstValueFrom(this.productsService.updateProduct(this.product().id, productLike, this.imageFileList));

      console.log('Producto actualizado');
    }

    this.productWasSaved.set(true);

    setTimeout(() => {
      this.productWasSaved.set(false);
    }, 2_000);
  }

  onFilesChange(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;

    this.imageFileList = fileList ?? undefined;

    const imagesURLs = Array.from(fileList ?? [])
      .map((file) => URL.createObjectURL(file));

    this.tempImages.set(imagesURLs);
  }
}