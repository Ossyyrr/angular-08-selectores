export enum Region {
  Europe = 'Europe',
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Oceania = 'Oceania',
}

export interface Country {
  altSpellings: string[];
  area: number;
  borders?: string[];
  capital: string[];
  capitalInfo: CapitalInfo;
  car: Car;
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc?: string;
  coatOfArms: CoatOfArms;
  continents: string[];
  demonyms: Demonyms;
  fifa?: string;
  flag: string;
  flags: Flags;
  gini?: { [key: string]: number };
  idd: Idd;
  independent: boolean;
  landlocked: boolean;
  languages: Languages;
  latlng: number[];
  maps: Maps;
  name: Name;
  population: number;
  postalCode?: PostalCode;
  region: Region;
  startOfWeek: StartOfWeek;
  status: Status;
  subregion: Subregion;
  timezones: string[];
  tld: string[];
  translations: { [key: string]: Translation };
  unMember: boolean;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  side: Side;
  signs: string[];
}

export enum Side {
  Left = 'left',
  Right = 'right',
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface Currency {
  name: string;
  symbol: Symbol;
}

export enum Symbol {
  Empty = '€',
  Kr = 'kr',
  Symbol = '£',
}

export interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  alt?: string;
  png: string;
  svg: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Languages {
  dan?: string;
  eng?: string;
  est?: string;
  fao?: string;
  fin?: string;
  fra?: string;
  gle?: string;
  glv?: string;
  isl?: string;
  lav?: string;
  lit?: string;
  nfr?: string;
  nno?: string;
  nob?: string;
  nor?: string;
  nrf?: string;
  smi?: string;
  swe?: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  nativeName: { [key: string]: Translation };
  official: string;
}

export interface Translation {
  common: string;
  official: string;
}

export interface PostalCode {
  format: string;
  regex: string;
}

export enum StartOfWeek {
  Monday = 'monday',
}

export enum Status {
  OfficiallyAssigned = 'officially-assigned',
}

export enum Subregion {
  NorthernEurope = 'Northern Europe',
}
