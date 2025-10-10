import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'country-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );
    }
  });

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   this.countryService.searchByCapital(query)
  //     .subscribe({
  //       next: (response) => {
  //         this.isLoading.set(false);
  //         this.countries.set(response);
  //       },
  //       error: (error) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(error);
  //       },
  //     });
  // }
}