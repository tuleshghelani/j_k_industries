import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductsComponent } from './components/products/products.component';
import { StainlessSteelClampComponent } from './components/all-products/stainless-steel-clamp/stainless-steel-clamp.component';
import { NailClampComponent } from './components/all-products/nail-clamp/nail-clamp.component';
import { UPVCMetalClampComponent } from './components/all-products/upvc-metal-clamp/upvc-metal-clamp.component';
import { CPVCMetalClampComponent } from './components/all-products/cpvc-metal-clamp/cpvc-metal-clamp.component';
import { PtmtConnectionPipeComponent } from './components/all-products/ptmt-connection-pipe/ptmt-connection-pipe.component';
import { StepClampComponent } from './components/all-products/step-clamp/step-clamp.component';
import { CpvcConcealedValveComponent } from './components/all-products/cpvc-concealed-valve/cpvc-concealed-valve.component';
import { GoldenMetalClampComponent } from './components/all-products/golden-metal-clamp/golden-metal-clamp.component';
import { SprinklerClampComponent } from './components/all-products/sprinkler-clamp/sprinkler-clamp.component';
import { SilverMetalClampComponent } from './components/all-products/silver-metal-clamp/silver-metal-clamp.component';
import { UpvcDoubleNailClampComponent } from './components/all-products/upvc-double-nail-clamp/upvc-double-nail-clamp.component';
import { CpvcDoubleNailClampComponent } from './components/all-products/cpvc-double-nail-clamp/cpvc-double-nail-clamp.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
  { path: 'products/stainless-steel-clamp', component: StainlessSteelClampComponent, pathMatch: 'full' },
  { path: 'products/nico-clamp', component: NailClampComponent},
  { path: 'products/upvc-metal-clamp', component: UPVCMetalClampComponent},
  { path: 'products/cpvc-metal-clamp', component: CPVCMetalClampComponent},
  { path: 'products/ptmt-connection-pipe', component: PtmtConnectionPipeComponent},
  { path: 'products/step-clamp', component: StepClampComponent},
  { path: 'products/cpvc-concealed-valve', component: CpvcConcealedValveComponent},
  { path: 'products/golden-metal-clamp', component: GoldenMetalClampComponent},
  { path: 'products/sprinkler-clamp', component: SprinklerClampComponent},
  { path: 'products/silver-metal-clamp', component: SilverMetalClampComponent},
  { path: 'products/upvc-double-nail-clamp', component: UpvcDoubleNailClampComponent},
  { path: 'products/cpvc-double-nail-clamp', component: CpvcDoubleNailClampComponent},
];
