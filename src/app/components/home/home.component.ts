import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageSliderComponent } from "../../shared/components/image-slider/image-slider.component";
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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

  ngOnInit() {
    AOS.refresh();
  }
}
