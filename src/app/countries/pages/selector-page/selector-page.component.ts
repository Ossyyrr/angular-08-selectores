import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';
import { Region, smallCountry } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css',
})
export class SelectorPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService
  ) {}

  public countriesByRegion: smallCountry[] = [];
  public bordersByCountry: string[] = [];
  public countriesByBorders: smallCountry[] = [];

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  public myForm: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged(): void {
    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.myForm.get('country')?.setValue(''); // Reseteo el valor del país
        }),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe((countries) => {
        console.log('countries', countries);
        this.countriesByRegion = countries;
      });
  }

  onCountryChanged(): void {
    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('borders')?.setValue(''); // Reseteo el valor del país
        }),
        filter((country) => country !== ''),
        switchMap((cca3) => this.countriesService.getCountryByCode(cca3)),
        tap((country) => {
          console.log('country ****', country);
          this.countriesService
            .getCountryBordersByCode(country.borders)
            .subscribe((countriesBorder) => {
              console.log('countries ****', countriesBorder);
              this.countriesByBorders = countriesBorder;
            });
        })
      )
      .subscribe((country) => {
        console.log(country.borders);
        this.bordersByCountry = country.borders;
      });
  }

  // onCca3Changed(): void {
  //   this.myForm
  //     .get('borders')
  //     ?.valueChanges.pipe(
  //       filter((borders) => borders !== ''),
  //       switchMap((borders) =>
  //         this.countriesService.getCountryBordersByCode(borders.split(';'))
  //       )
  //     )
  //     .subscribe((countries) => {
  //       console.log('countries', countries);
  //       this.countriesByBorders = countries;
  //     });
  // }
}
