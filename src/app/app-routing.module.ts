import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { BillDetailComponent } from './shared/components/bill-detail/bill-detail.component';
import { BillComponent } from './shared/components/bill/bill.component';
import { CustomersComponent } from './shared/components/customers/customers.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { ProvidersComponent } from './shared/components/providers/providers.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'change-password', component: RegisterComponent, pathMatch: 'full' },

  { path: 'customers', component: CustomersComponent, pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
  { path: 'providers', component: ProvidersComponent, pathMatch: 'full' },
  { path: 'bill', component: BillComponent, pathMatch: 'full' },
  { path: 'bill-detail/:id', component: BillDetailComponent, pathMatch: 'full' },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
