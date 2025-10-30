import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../services/interfaces/contry.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html'
})
export class CountryPage {
  formBuilder = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = this.countryService.regions;
  countriesByRegion = signal<Country[]>([]);
  countriesByBorders = signal<Country[]>([]);

  myForm: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  onFormChanged = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanUp(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm
    .get('region')!
    .valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.countriesByRegion.set([]),
        this.countriesByBorders.set([])
      }),
      switchMap((region) => this.countryService.getCountriesByRegion(region!))
    )
    .subscribe((countries) => {
      this.countriesByRegion.set(countries.sort((a, b) => a.name.common.localeCompare(b.name.common)));
    });
  }

  onCountryChanged() {
    return this.myForm
    .get('country')!
    .valueChanges
    .pipe(
      tap(() => this.myForm.get('border')?.setValue('')),
      filter((value) => value!.length > 0),
      switchMap((alphaCode) => this.countryService.getCountryByAlphaCode(alphaCode)),
      switchMap((country) => this.countryService.getCountryNameByCodes(country.borders))
    )
    .subscribe((borders) => {
      this.countriesByBorders.set(borders);
    });
  }
}