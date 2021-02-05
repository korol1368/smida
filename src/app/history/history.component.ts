import {HttpClient} from '@angular/common/http';
import {Component, AfterViewInit} from '@angular/core';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {HistoryModel} from '../models/history.model';
import {HistoryService} from '../services/history.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements AfterViewInit {
  form = new FormGroup({
    publicationType: new FormControl(''),
    termType: new FormControl(''),
    reportGroup: new FormControl(''),
    reportState: new FormControl(''),
    reportFormat: new FormControl(''),
    outputNumber: new FormControl(''),
    outputDate: new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    })
  });

  termTypes: string[] = [];
  publicationTypes: string[] = [];
  reportGroups: string[] = [];
  reportStates: string[] = [];
  reportFormats: string[] = [];
  displayedColumns: string[] = [
    'publicationType',
    'termType',
    'reportGroup',
    'reportState',
    'reportFormat',
    'outputDate',
    'outputNumber',
    'actions'
  ];
  data: HistoryModel[] = [];
  resultsLength = 0;
  isLoadingResults = true;

  constructor(private http: HttpClient, private historyService: HistoryService) {
  }

  ngAfterViewInit() {
    merge(this.form.valueChanges)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const filters = this.form.value;
          return this.historyService.getList(filters);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          this.publicationTypes = [...new Set(data.map(item => item.publicationType))];
          this.termTypes = [...new Set(data.map(item => item.termType))];
          this.reportGroups = [...new Set(data.map(item => item.reportGroup))];
          this.reportStates = [...new Set(data.map(item => item.reportState))];
          this.reportFormats = [...new Set(data.map(item => item.reportFormat))];

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe((data) => {
      this.data = data;
    })
  }

  onClickResetFilters(): void {
    this.form.reset();
  }
}
