import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from './interfaces/contry.interface';

@Injectable({providedIn: 'root'})
export class CountryService {
  private baseURL = 'https://restcountries.com/v3.1';
  private httpClient = inject(HttpClient);
  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].sort();

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    const url = `${this.baseURL}/region/${region}?fields=cca3,name,borders`;

    return this.httpClient.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseURL}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.httpClient.get<Country>(url);
  }

  getCountryNameByCodes(codes: string[]): Observable<Country[]>  {
    if (!codes || codes.length === 0) return of([]);

    const countriesRequests: Observable<Country>[] = [];

    codes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests);
  }
}