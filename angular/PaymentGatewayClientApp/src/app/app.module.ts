import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { DataService } from './data.service';
import {HttpClientModule} from '@angular/common/http';
import { SuccessComponent } from './success/success.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
    {
      path:'success/:id',
      component:SuccessComponent
    }])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
