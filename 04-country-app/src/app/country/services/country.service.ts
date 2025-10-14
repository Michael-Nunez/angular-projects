import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import type { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private httpClient = inject(HttpClient);
  private queryCacheByCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheByCapital.has(query)) {
      return of(this.queryCacheByCapital.get(query) ?? []);
    }

    return this.httpClient.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((restCiuntries) => CountryMapper.mapRestCountryArrayToCountryArray(restCiuntries)),
        tap((countries) => this.queryCacheByCapital.set(query, countries)),
        catchError((error) => {
          console.log({error});

          return throwError(() => new Error(`No se pudo encontrar un país con la capital: ${query}`));
        })
      );
  }

  searchByCountry(query: string) {
    query = query.toLocaleLowerCase();

    if (this.queryCacheByCountry.has(query)) {
      return of(this.queryCacheByCountry.get(query) ?? []);
    }

    return this.httpClient.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((restCiuntries) => CountryMapper.mapRestCountryArrayToCountryArray(restCiuntries)),
        tap((countries) => this.queryCacheByCountry.set(query, countries)),
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

  searchByRegion(region: Region) {
    if (this.queryCacheByCountry.has(region)) {
      return of(this.queryCacheByRegion.get(region) ?? []);
    }

    return this.httpClient.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map((restCiuntries) => CountryMapper.mapRestCountryArrayToCountryArray(restCiuntries)),
        tap((countries) => this.queryCacheByRegion.set(region, countries)),
        catchError((error) => {
          console.log({error});

          return throwError(() => new Error(`No se pudo encontrar un país con el nombre: ${region}`));
        })
      );
  }
}