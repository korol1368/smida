export interface History {
  idReport: number;
  idSubject: number;
  reportState: string;
  termType: string;
  publicationType: string;
  reportGroup: string;
  outputNumber: string;
  outputDate: {
    date: string;
    timezone_type: number;
    timezone: string;
  },
  bSentToNSSMC: boolean;
  bDisclosure: boolean;
  dateFill: {
    date: string;
    timezone_type: number;
    timezone: string;
  },
  reportFormat: string;
}
