import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { HomeComponent } from './modules/home/home.component';

import { CookieService } from 'ngx-cookie-service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CustomersComponent } from './shared/components/customers/customers.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { ProvidersComponent } from './shared/components/providers/providers.component';
import { BillComponent } from './shared/components/bill/bill.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ProductsService } from './core/services/products.service';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PopupModule } from '@progress/kendo-angular-popup';

import { EditService } from './core/services/edit.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    CustomersComponent,
    ProductsComponent,
    ProvidersComponent,
    BillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GridModule,
    HttpClientJsonpModule,
    DropDownListModule,
    PopupModule,
    InputsModule,
    ReactiveFormsModule
   
  ],
  providers: [
    CookieService,
    ProductsService,
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
    },
  ],
  bootstrap: [AppComponent]
})




export class AppModule { }
