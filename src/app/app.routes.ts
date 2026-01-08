import { RouterModule, Routes } from '@angular/router';
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
import { NgModule } from '@angular/core';
import { MetalClampComponent } from './components/all-products/metal-clamp/metal-clamp.component';
export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent, pathMatch: 'full' },
  { path: 'contact-us', component: ContactUsComponent, pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
  { path: 'products/metal-clamp', component: MetalClampComponent, pathMatch: 'full' },
  { path: 'products/stainless-steel-clamp', component: StainlessSteelClampComponent, pathMatch: 'full' },
  { path: 'products/nico-clamp', component: NailClampComponent, pathMatch: 'full' },
  { path: 'products/upvc-metal-clamp', component: UPVCMetalClampComponent, pathMatch: 'full' },
  { path: 'products/cpvc-metal-clamp', component: CPVCMetalClampComponent, pathMatch: 'full' },
  { path: 'products/ptmt-connection-pipe', component: PtmtConnectionPipeComponent, pathMatch: 'full' },
  { path: 'products/step-clamp', component: StepClampComponent, pathMatch: 'full' },
  { path: 'products/cpvc-concealed-valve', component: CpvcConcealedValveComponent, pathMatch: 'full' },
  { path: 'products/golden-metal-clamp', component: GoldenMetalClampComponent, pathMatch: 'full' },
  { path: 'products/sprinkler-clamp', component: SprinklerClampComponent, pathMatch: 'full' },
  { path: 'products/silver-metal-clamp', component: SilverMetalClampComponent, pathMatch: 'full' },
  { path: 'products/upvc-double-nail-clamp', component: UpvcDoubleNailClampComponent, pathMatch: 'full' },
  { path: 'products/cpvc-double-nail-clamp', component: CpvcDoubleNailClampComponent, pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    urlUpdateStrategy: 'eager', // Prevents URL changes during navigation
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }