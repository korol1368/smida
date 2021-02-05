import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {History} from '../models/history.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Filters} from "../models/filters.model";

@Injectable()
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getList(filters: Filters): Observable<History[]> {
    let params = new HttpParams();
    if (filters.publicationTypes && filters.publicationTypes.length > 0){
      params = params.append('publicationType', filters.publicationTypes.join(','));
    }
    if(filters.termTypes && filters.termTypes.length > 0){
      params = params.append('termType', filters.termTypes.join(','));
    }

    if(filters.reportGroups && filters.reportGroups.length > 0){
      params = params.append('reportGroup', filters.reportGroups.join(','));
    }

    if(filters.reportStates && filters.reportStates.length > 0){
      params = params.append('reportStates', filters.reportStates.join(','));
    }

    if(filters.reportFormats && filters.reportFormats.length > 0){
      params = params.append('reportFormats', filters.reportFormats.join(','));
    }

    if(filters.outputNumber){
      params = params.append('outputNumber', filters.outputNumber);
    }

    if(filters.outputDate?.start && filters.outputDate?.end){
      params = params.append('outputDateStart', filters.outputDate.start);
      params = params.append('outputDateEnd', filters.outputDate.end);
    }

    return this.http.get<History[]>(environment.apiUrl, {params});
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + '/' + id);
  }
}
