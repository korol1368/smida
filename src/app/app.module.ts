import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HistoryComponent} from './history/history.component';
import {HistoryService} from "./services/history.service";

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
