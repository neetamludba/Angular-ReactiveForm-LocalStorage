import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageTestCategoryModule } from './manage-test-category/manage-test-category.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ManageTestCategoryModule,
    BrowserAnimationsModule
  ]
})
export class AppModule { }
