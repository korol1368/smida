import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HistoryModel} from "../models/history.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<HistoryModel[]> {
    return this.http.get<HistoryModel[]>(environment.apiUrl);
  }
}
