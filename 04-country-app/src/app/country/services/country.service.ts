import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private httpClient = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.httpClient.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((restCiuntries) => CountryMapper.mapRestCountryArrayToCountryArray(restCiuntries)),
        catchError((error) => {
          console.log({error});

          return throwError(() => new Error(`No se pudo encontrar un país con la capital: ${query}`));
        })
      );
  }

  searchByCountry(query: string) {
    query = query.toLocaleLowerCase();

    return this.httpClient.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((restCiuntries) => CountryMapper.mapRestCountryArrayToCountryArray(restCiuntries)),
        delay(3000),
        catchError((error) => {
          console.log({error});

          return throwError(() => new Error(`No se pudo encontrar un país con el nombre: ${query}`));
        })
      );
  }

  searchByCountryByAlphaCode(code: string) {
    code = code.toLocaleLowerCase();

    return this.httpClient.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map((restCiuntries) => CountryMapper.mapRestCountryArrayToCountryArray(restCiuntries)),
        map((countries) => countries[0]),
        catchError((error) => {
          console.log({error});

          return throwError(() => new Error(`No se pudo encontrar un país por el código: ${code}`));
        })
      );
  }
}