import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  featuredProducts = [
    {
      name: 'Premium Pipe Clamps',
      description: 'High-quality stainless steel pipe clamps for industrial applications',
      image: 'assets/images/products/pipe-clamp.jpg'
    },
    {
      name: 'SS Hose Clamps',
      description: 'Durable stainless steel hose clamps with superior grip',
      image: 'assets/images/products/hose-clamp.jpg'
    },
    {
      name: 'Metal Fitting Clamps',
      description: 'Precision-engineered metal fitting clamps for secure connections',
      image: 'assets/images/products/fitting-clamp.jpg'
    }
  ];
}
