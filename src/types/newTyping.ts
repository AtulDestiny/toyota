export interface Country {
  id: number;
  name: string;
  cities: City[];
}

export interface City {
  id: number;
  name: string;
  country: Country;
  concessionaires: Concessionaire[];
}

export interface Concessionaire {
  id: number;
  name: string;
  city: City;
  vehicles: Vehicle[];
}

export interface Vehicle {
  id: number;
  name: string;
  models: Model[];
}

export interface Model {
  id: number;
  name: string;
  vehicle: Vehicle;
  modelByYears: ModelByYear[];
}

export interface ModelByYear {
  id: number;
  name: string;
  model: Model;
  colorByModels?: ColorByModel[];
  documents?: Documents[];
  warrantiesByModels?: WarrantiesByModel[];
  priceListByFeatures?: PriceListByFeature;
}

export interface ColorByModel {
  id: number;
  name: string;
  model: Model;
  color: Color;
  galleries: Gallery[];
}

export interface Color {
  id: number;
  name: string;
  colorIcon?: Image; // i dont know if we need to conect it to gallery
  colorByModels?: ColorByModel[];
}

export interface WarrantiesByModel {
  id: number;
  name: string;
  model: Model;
  warranties?: Warranty[];
}

export interface Warranty {
  id: number;
  name: string;
  description: string;
  image: Image;
  warrantyByModels?: WarrantiesByModel[];
}

export interface Documents {
  id: number;
  name: string;
  model?: Model;
  product?: Product;
  documents?: Document[];
}

export interface Document {
  id: number;
  key: string;
  value: string;
  description?: string;
  documentByModels?: Documents[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  articles?: Article[];
  galleries?: Gallery[];
  products?: Product[];
}

export interface Article {
  id: number;
  title: string;
  content: string;
  author?: string;
  category: Category;
  gallery: Gallery;
}

export interface Gallery {
  id: number;
  name: string;
  images: Image[];
  category?: Category;
  articles?: Article[];
  colorsByModel?: ColorByModel[];
  products?: Product[];
}

export interface Image {
  id: number;
  name: string;
  src: string;
}

export interface PriceListByFeature {
  id: number;
  name: string;
  priceList: PriceList;
  products?: Product[];
  modelByYears?: ModelByYear[];
}

export interface PriceList {
  id: number;
  name: string;
  price: number;
  vehicle: Vehicle;
}

export interface Product {
  id: number;
  name: string;
  category: Category;
  documents?: Documents[];
  priceListByFeatures?: PriceListByFeature[];
  galleries?: Gallery[];
}
