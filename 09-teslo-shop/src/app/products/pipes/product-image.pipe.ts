import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseURL = environment.baseURL;

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {
    const noImageTemplateRoute = './assets/images/no-image.jpg';

    if (value === null) {
      return noImageTemplateRoute;
    }

    if (typeof value === 'string') {
      return `${baseURL}/files/product/${value}`;
    }

    const image = value.at(0);

    if (!image) {
      return noImageTemplateRoute;
    }

    return `${baseURL}/files/product/${image}`;
  }
}