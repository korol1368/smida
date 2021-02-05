import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HistoryModel} from '../models/history.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FiltersModel} from "../models/filters.model";

@Injectable()
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getList(filters: FiltersModel): Observable<HistoryModel[]> {
    let params = new HttpParams();
    if (filters.publicationType && filters.publicationType.length > 0){
      params = params.append('publicationType', filters.publicationType.join(','));
    }
    if(filters.termType && filters.termType.length > 0){
      params = params.append('termType', filters.termType.join(','));
    }

    if(filters.reportGroup && filters.reportGroup.length > 0){
      params = params.append('reportGroup', filters.reportGroup.join(','));
    }

    if(filters.reportState && filters.reportState.length > 0){
      params = params.append('reportState', filters.reportState.join(','));
    }

    if(filters.reportFormat && filters.reportFormat.length > 0){
      params = params.append('reportFormat', filters.reportFormat.join(','));
    }

    if(filters.outputNumber){
      params = params.append('reportState', filters.outputNumber);
    }

    if(filters.outputDate?.start && filters.outputDate?.end){
      params = params.append('outputDateStart', filters.outputDate.start);
      params = params.append('outputDateEnd', filters.outputDate.end);
    }

    return this.http.get<HistoryModel[]>(environment.apiUrl, {params});
  }
}
