export interface Filters {
  publicationTypes?: string[];
  termTypes?: string[];
  reportGroups?: string[];
  reportStates?: string[];
  reportFormats?: string[];
  outputNumber?: string;
  outputDate?: {
    start: string;
    end: string;
  };
}
