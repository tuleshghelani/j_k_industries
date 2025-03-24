import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductsComponent } from './components/products/products.component';
import { StainlessSteelClampComponent } from './components/all-products/stainless-steel-clamp/stainless-steel-clamp.component';
import { NailClampComponent } from './components/all-products/nail-clamp/nail-clamp.component';
import { UPVCMetalClampComponent } from './components/all-products/upvc-metal-clamp/upvc-metal-clamp.component';
import { CPVCMetalClampComponent } from './components/all-products/cpvc-metal-clamp/cpvc-metal-clamp.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
  { path: 'products/stainless-steel-clamp', component: StainlessSteelClampComponent, pathMatch: 'full' },
  { path: 'products/nail-clamp', component: NailClampComponent},
  { path: 'products/upvc-metal-clamp', component: UPVCMetalClampComponent},
  { path: 'products/cpvc-metal-clamp', component: CPVCMetalClampComponent},
];
