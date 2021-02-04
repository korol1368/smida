import {HttpClient} from '@angular/common/http';
import {Component, AfterViewInit} from '@angular/core';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {HistoryModel} from "../models/history.model";
import {HistoryService} from "../services/history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'publicationType',
    'termType',
    'reportGroup',
    'reportState',
    'reportFormat',
    'outputDate',
    'outputNumber'
  ];
  data: HistoryModel[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  constructor(private http: HttpClient, private historyService: HistoryService) {}

  ngAfterViewInit() {
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.historyService.getList();
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}
