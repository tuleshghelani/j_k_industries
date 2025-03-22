import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductsComponent } from './components/products/products.component';
import { StainlessSteelClampComponent } from './components/all-products/stainless-steel-clamp/stainless-steel-clamp.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
  { path: 'product/stainless-steel-clamp', component: StainlessSteelClampComponent, pathMatch: 'full' },
];
