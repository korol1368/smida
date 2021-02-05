export interface FiltersModel {
  publicationType?: string[];
  termType?: string[];
  reportGroup?: string[];
  reportState?: string[];
  reportFormat?: string[];
  outputNumber?: string;
  outputDate?: {
    start: string;
    end: string;
  };
}
