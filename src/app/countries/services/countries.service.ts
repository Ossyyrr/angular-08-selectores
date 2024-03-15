import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country, Region, smallCountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  // https://restcountries.com/v3.1/subregion/Northern Europe?fields=cca3,name,borders
  private baseUrl: string = 'https://restcountries.com/v3.1/region/';
  private urlFields: string = '?fields=cca3,name,borders';
  constructor(private http: HttpClient) {}

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  get regions(): Region[] {
    return [...this._regions]; // Para que sea un nuevo arregle y no se pueda modificar
  }

  getCountriesByRegion(region: Region): Observable<smallCountry[]> {
    if (!region) return of([]);
    return this.http
      .get<Country[]>(`${this.baseUrl}${region}${this.urlFields}`)
      .pipe(
        map((countries) => {
          // Lo paso a SmallCountry
          return countries.map((country) => {
            return {
              name: country.name.common,
              cca3: country.cca3,
              borders: country.borders ?? [],
            };
          });
        })
      );
  }

  getCountryByCode(cca3: string): Observable<smallCountry> {
    return this.http
      .get<Country>(
        `https://restcountries.com/v3.1/alpha/${cca3}${this.urlFields}`
      )
      .pipe(
        map((country) => {
          return {
            name: country.name.common,
            cca3: cca3,
            borders: country.borders ?? [],
          };
        })
      );
  }

  getCountryBordersByCode(borders: string[]): Observable<smallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    const url = `https://restcountries.com/v3.1/alpha?codes=${borders.join(
      ','
    )}${this.urlFields}`;

    console.log('url  *****', url);

    return this.http.get<Country[]>(url).pipe(
      map((countries) => {
        return countries.map((country) => {
          return {
            name: country.name.common,
            cca3: country.cca3,
            borders: country.borders ?? [],
          };
        });
      })
    );
  }
}
