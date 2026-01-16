import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject, OnDestroy, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TransferState, makeStateKey } from '@angular/core';
import * as AOS from 'aos';

// Define TransferState keys
const PRODUCT_SCHEMA_KEY = makeStateKey<string>('METAL_CLAMP_PRODUCT_SCHEMA');
const BUSINESS_SCHEMA_KEY = makeStateKey<string>('METAL_CLAMP_BUSINESS_SCHEMA');
const FAQ_SCHEMA_KEY = makeStateKey<string>('METAL_CLAMP_FAQ_SCHEMA');
const BREADCRUMB_SCHEMA_KEY = makeStateKey<string>('METAL_CLAMP_BREADCRUMB_SCHEMA');
const HOWTO_SCHEMA_KEY = makeStateKey<string>('METAL_CLAMP_HOWTO_SCHEMA');
const ITEMLIST_SCHEMA_KEY = makeStateKey<string>('METAL_CLAMP_ITEMLIST_SCHEMA');
const WEBPAGE_SCHEMA_KEY = makeStateKey<string>('METAL_CLAMP_WEBPAGE_SCHEMA');

interface Testimonial {
  quote: string;
  author: string;
  position?: string;
  company?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface MetalProduct {
  name: string;
  image: string;
  link: string;
  description: string;
  priceRange: string;
  sizes: string;
  material: string;
  sku: string;
}

interface ProductVariant {
  name: string;
  size: string;
  sizeInch: string;
  price: number;
  sku: string;
  productType: string;
  image?: string;
}

@Component({
  selector: 'app-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './metal-clamp.component.html',
  styleUrl: './metal-clamp.component.scss'
})
export class MetalClampComponent implements OnInit, AfterViewInit, OnDestroy {
  private router = inject(Router);
  showEnquiryForm: boolean = false;
  
  enquiryData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: null as number | null,
    message: ''
  };

  // 10 Main Metal Clamp Products for display
  metalProducts: MetalProduct[] = [
    {
      name: 'CPVC Metal Clamp',
      image: 'assets/products/cpvc-metal-clamp.jpg',
      link: '/products/cpvc-metal-clamp',
      description: 'Premium powder coated metal clamps for CPVC hot water systems with temperature resistance up to 93°C.',
      priceRange: '₹1.25 - ₹5.35',
      sizes: '15mm - 50mm (1/2" - 2")',
      material: 'CRC/MS Powder Coated',
      sku: 'CPVC-MC-001'
    },
    {
      name: 'UPVC Metal Clamp',
      image: 'assets/products/upvc-metal-clamp.jpg',
      link: '/products/upvc-metal-clamp',
      description: 'Heavy-duty powder coated metal clamps for UPVC pipes in plumbing and irrigation systems.',
      priceRange: '₹1.30 - ₹15.00',
      sizes: '15mm - 160mm (1/2" - 6")',
      material: 'CRC/MS Powder Coated',
      sku: 'UPVC-MC-001'
    },
    {
      name: 'CPVC Double Nail Clamp',
      image: 'assets/products/cpvc-double-nail-clamp.jpg',
      link: '/products/cpvc-double-nail-clamp',
      description: 'Dual fastening CPVC clamps with integrated nails for secure hot water pipe installations.',
      priceRange: '₹1.00 - ₹6.07',
      sizes: '15mm - 50mm (1/2" - 2")',
      material: 'Premium Nylon with Steel Nails',
      sku: 'CPVC-DN-001'
    },
    {
      name: 'UPVC Double Nail Clamp',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      link: '/products/upvc-double-nail-clamp',
      description: 'Double nail clamps providing 40% more holding power for UPVC cold water applications.',
      priceRange: '₹1.08 - ₹6.63',
      sizes: '15mm - 50mm (1/2" - 2")',
      material: 'Premium Nylon with Steel Nails',
      sku: 'UPVC-DN-001'
    },
    {
      name: 'Stainless Steel Clamp',
      image: 'assets/products/stainless-steel-clamp.jpg',
      link: '/products/stainless-steel-clamp',
      description: 'Marine-grade SS202 stainless steel clamps with superior corrosion resistance for industrial applications.',
      priceRange: '₹1.75 - ₹16.50',
      sizes: '15mm - 150mm (1/2" - 6")',
      material: 'SS202 Stainless Steel',
      sku: 'SS-CLAMP-001'
    },
    {
      name: 'Golden Metal Clamp',
      image: 'assets/products/golden-metal-clamp.jpg',
      link: '/products/golden-metal-clamp',
      description: 'Luxury gold-plated GI clamps for premium decorative and visible plumbing installations.',
      priceRange: '₹1.50 - ₹5.30',
      sizes: '15mm - 50mm (1/2" - 2")',
      material: 'GI with Gold Coating',
      sku: 'GLD-MC-001'
    },
    {
      name: 'Silver Metal Clamp',
      image: 'assets/products/upvc-metal-clamp.jpg',
      link: '/products/silver-metal-clamp',
      description: 'Elegant silver-finished GI clamps for modern commercial and residential installations.',
      priceRange: '₹1.75 - ₹11.50',
      sizes: '15mm - 110mm (1/2" - 4")',
      material: 'GI with Silver Coating',
      sku: 'SLV-MC-001'
    },
    {
      name: 'Sprinkler Clamp',
      image: 'assets/products/sprinkler-clamp.jpg',
      link: '/products/sprinkler-clamp',
      description: 'Specialized metal clamps designed for fire sprinkler and irrigation pipe support systems.',
      priceRange: '₹5.60 - ₹19.80',
      sizes: '25mm - 160mm (1" - 6")',
      material: 'Heavy Duty MS',
      sku: 'SPR-CL-001'
    },
    {
      name: 'Step Clamp',
      image: 'assets/products/step-clamp.jpg',
      link: '/products/step-clamp',
      description: 'Versatile step clamps supporting multiple pipe sizes with adjustable stepped design.',
      priceRange: '₹7.50 - ₹11.59',
      sizes: '65mm - 110mm (2½" - 4")',
      material: 'MS Powder Coated',
      sku: 'STP-CL-001'
    },
    {
      name: 'Nail Clamp',
      image: 'assets/products/nico-clamp.jpg',
      link: '/products/nico-clamp',
      description: 'Quick-install nail clamps with integrated fasteners for rapid pipe mounting applications.',
      priceRange: '₹9.00 - ₹41.30',
      sizes: '15mm - 200mm (1/2" - 8")',
      material: 'MS with Zinc Coating',
      sku: 'NC-001'
    }
  ];

  // All product variants for schema (from all products)
  allProductVariants: ProductVariant[] = [
    // CPVC Metal Clamp 0.5MM
    { name: 'CPVC Metal Clamp 0.5MM', size: '15mm', sizeInch: '1/2', price: 1.25, sku: 'CPVC-0.5MM-15', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 0.5MM', size: '20mm', sizeInch: '3/4', price: 1.35, sku: 'CPVC-0.5MM-20', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 0.5MM', size: '25mm', sizeInch: '1', price: 1.45, sku: 'CPVC-0.5MM-25', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 0.5MM', size: '32mm', sizeInch: '1 1/4', price: 1.65, sku: 'CPVC-0.5MM-32', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 0.5MM', size: '40mm', sizeInch: '1 1/2', price: 2.15, sku: 'CPVC-0.5MM-40', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 0.5MM', size: '50mm', sizeInch: '2', price: 2.35, sku: 'CPVC-0.5MM-50', productType: 'CPVC Metal Clamp' },
    // CPVC Metal Clamp 1MM
    { name: 'CPVC Metal Clamp 1MM', size: '15mm', sizeInch: '1/2', price: 1.75, sku: 'CPVC-1MM-15', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1MM', size: '20mm', sizeInch: '3/4', price: 1.85, sku: 'CPVC-1MM-20', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1MM', size: '25mm', sizeInch: '1', price: 2.05, sku: 'CPVC-1MM-25', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1MM', size: '32mm', sizeInch: '1 1/4', price: 2.40, sku: 'CPVC-1MM-32', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1MM', size: '40mm', sizeInch: '1 1/2', price: 2.75, sku: 'CPVC-1MM-40', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1MM', size: '50mm', sizeInch: '2', price: 3.50, sku: 'CPVC-1MM-50', productType: 'CPVC Metal Clamp' },
    // CPVC Metal Clamp 1.5MM
    { name: 'CPVC Metal Clamp 1.5MM', size: '15mm', sizeInch: '1/2', price: 2.35, sku: 'CPVC-1.5MM-15', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1.5MM', size: '20mm', sizeInch: '3/4', price: 2.75, sku: 'CPVC-1.5MM-20', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1.5MM', size: '25mm', sizeInch: '1', price: 3.12, sku: 'CPVC-1.5MM-25', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1.5MM', size: '32mm', sizeInch: '1 1/4', price: 3.50, sku: 'CPVC-1.5MM-32', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1.5MM', size: '40mm', sizeInch: '1 1/2', price: 4.15, sku: 'CPVC-1.5MM-40', productType: 'CPVC Metal Clamp' },
    { name: 'CPVC Metal Clamp 1.5MM', size: '50mm', sizeInch: '2', price: 5.35, sku: 'CPVC-1.5MM-50', productType: 'CPVC Metal Clamp' },
    // UPVC Metal Clamp 0.5MM
    { name: 'UPVC Metal Clamp 0.5MM', size: '15mm', sizeInch: '1/2', price: 1.30, sku: 'UPVC-0.5MM-15', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 0.5MM', size: '20mm', sizeInch: '3/4', price: 1.40, sku: 'UPVC-0.5MM-20', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 0.5MM', size: '25mm', sizeInch: '1', price: 1.60, sku: 'UPVC-0.5MM-25', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 0.5MM', size: '32mm', sizeInch: '1 1/4', price: 1.80, sku: 'UPVC-0.5MM-32', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 0.5MM', size: '40mm', sizeInch: '1 1/2', price: 2.10, sku: 'UPVC-0.5MM-40', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 0.5MM', size: '50mm', sizeInch: '2', price: 2.50, sku: 'UPVC-0.5MM-50', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 0.5MM', size: '75mm', sizeInch: '2 1/2', price: 4.00, sku: 'UPVC-0.5MM-75', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 0.5MM', size: '80mm', sizeInch: '3', price: 5.00, sku: 'UPVC-0.5MM-80', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 0.5MM', size: '110mm', sizeInch: '4', price: 6.20, sku: 'UPVC-0.5MM-110', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 0.5MM', size: '160mm', sizeInch: '6', price: 8.00, sku: 'UPVC-0.5MM-160', productType: 'UPVC Metal Clamp' },
    // UPVC Metal Clamp 1MM
    { name: 'UPVC Metal Clamp 1MM', size: '15mm', sizeInch: '1/2', price: 1.80, sku: 'UPVC-1MM-15', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1MM', size: '20mm', sizeInch: '3/4', price: 2.00, sku: 'UPVC-1MM-20', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1MM', size: '25mm', sizeInch: '1', price: 2.35, sku: 'UPVC-1MM-25', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1MM', size: '32mm', sizeInch: '1 1/4', price: 2.70, sku: 'UPVC-1MM-32', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1MM', size: '40mm', sizeInch: '1 1/2', price: 3.20, sku: 'UPVC-1MM-40', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1MM', size: '50mm', sizeInch: '2', price: 3.70, sku: 'UPVC-1MM-50', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1MM', size: '75mm', sizeInch: '2 1/2', price: 5.20, sku: 'UPVC-1MM-75', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1MM', size: '80mm', sizeInch: '3', price: 6.30, sku: 'UPVC-1MM-80', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1MM', size: '110mm', sizeInch: '4', price: 7.40, sku: 'UPVC-1MM-110', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1MM', size: '160mm', sizeInch: '6', price: 12.00, sku: 'UPVC-1MM-160', productType: 'UPVC Metal Clamp' },
    // UPVC Metal Clamp 1.5MM
    { name: 'UPVC Metal Clamp 1.5MM', size: '15mm', sizeInch: '1/2', price: 2.70, sku: 'UPVC-1.5MM-15', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1.5MM', size: '20mm', sizeInch: '3/4', price: 3.07, sku: 'UPVC-1.5MM-20', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1.5MM', size: '25mm', sizeInch: '1', price: 3.44, sku: 'UPVC-1.5MM-25', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1.5MM', size: '32mm', sizeInch: '1 1/4', price: 4.12, sku: 'UPVC-1.5MM-32', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1.5MM', size: '40mm', sizeInch: '1 1/2', price: 4.55, sku: 'UPVC-1.5MM-40', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1.5MM', size: '50mm', sizeInch: '2', price: 5.35, sku: 'UPVC-1.5MM-50', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1.5MM', size: '75mm', sizeInch: '2 1/2', price: 8.60, sku: 'UPVC-1.5MM-75', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1.5MM', size: '90mm', sizeInch: '3', price: 10.00, sku: 'UPVC-1.5MM-90', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1.5MM', size: '110mm', sizeInch: '4', price: 12.00, sku: 'UPVC-1.5MM-110', productType: 'UPVC Metal Clamp' },
    { name: 'UPVC Metal Clamp 1.5MM', size: '160mm', sizeInch: '6', price: 15.00, sku: 'UPVC-1.5MM-160', productType: 'UPVC Metal Clamp' },
    // CPVC Double Nail Clamp
    { name: 'CPVC Double Nail Clamp', size: '15mm', sizeInch: '1/2', price: 1.00, sku: 'CPVC-DN-15', productType: 'CPVC Double Nail Clamp' },
    { name: 'CPVC Double Nail Clamp', size: '20mm', sizeInch: '3/4', price: 1.12, sku: 'CPVC-DN-20', productType: 'CPVC Double Nail Clamp' },
    { name: 'CPVC Double Nail Clamp', size: '25mm', sizeInch: '1', price: 1.82, sku: 'CPVC-DN-25', productType: 'CPVC Double Nail Clamp' },
    { name: 'CPVC Double Nail Clamp', size: '32mm', sizeInch: '1 1/4', price: 2.40, sku: 'CPVC-DN-32', productType: 'CPVC Double Nail Clamp' },
    { name: 'CPVC Double Nail Clamp', size: '40mm', sizeInch: '1 1/2', price: 3.13, sku: 'CPVC-DN-40', productType: 'CPVC Double Nail Clamp' },
    { name: 'CPVC Double Nail Clamp', size: '50mm', sizeInch: '2', price: 6.07, sku: 'CPVC-DN-50', productType: 'CPVC Double Nail Clamp' },
    // UPVC Double Nail Clamp
    { name: 'UPVC Double Nail Clamp', size: '15mm', sizeInch: '1/2', price: 1.08, sku: 'UPVC-DN-15', productType: 'UPVC Double Nail Clamp' },
    { name: 'UPVC Double Nail Clamp', size: '20mm', sizeInch: '3/4', price: 1.74, sku: 'UPVC-DN-20', productType: 'UPVC Double Nail Clamp' },
    { name: 'UPVC Double Nail Clamp', size: '25mm', sizeInch: '1', price: 2.29, sku: 'UPVC-DN-25', productType: 'UPVC Double Nail Clamp' },
    { name: 'UPVC Double Nail Clamp', size: '32mm', sizeInch: '1 1/4', price: 3.13, sku: 'UPVC-DN-32', productType: 'UPVC Double Nail Clamp' },
    { name: 'UPVC Double Nail Clamp', size: '40mm', sizeInch: '1 1/2', price: 4.41, sku: 'UPVC-DN-40', productType: 'UPVC Double Nail Clamp' },
    { name: 'UPVC Double Nail Clamp', size: '50mm', sizeInch: '2', price: 6.63, sku: 'UPVC-DN-50', productType: 'UPVC Double Nail Clamp' },
    // Stainless Steel Clamp 0.5mm
    { name: 'SS Clamp 0.5mm UPVC', size: '15mm', sizeInch: '1/2', price: 2.00, sku: 'SS-05-15', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 0.5mm UPVC', size: '20mm', sizeInch: '3/4', price: 2.50, sku: 'SS-05-20', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 0.5mm UPVC', size: '25mm', sizeInch: '1', price: 3.10, sku: 'SS-05-25', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 0.5mm UPVC', size: '32mm', sizeInch: '1 1/4', price: 3.90, sku: 'SS-05-32', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 0.5mm UPVC', size: '40mm', sizeInch: '1 1/2', price: 4.60, sku: 'SS-05-40', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 0.5mm UPVC', size: '50mm', sizeInch: '2', price: 5.10, sku: 'SS-05-50', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 0.5mm UPVC', size: '65mm', sizeInch: '2 1/2', price: 6.10, sku: 'SS-05-65', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 0.5mm UPVC', size: '80mm', sizeInch: '3', price: 7.35, sku: 'SS-05-80', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 0.5mm UPVC', size: '100mm', sizeInch: '4', price: 9.10, sku: 'SS-05-100', productType: 'Stainless Steel Clamp' },
    // Stainless Steel Clamp 1mm
    { name: 'SS Clamp 1mm UPVC', size: '15mm', sizeInch: '1/2', price: 2.95, sku: 'SS-1-15', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 1mm UPVC', size: '20mm', sizeInch: '3/4', price: 3.55, sku: 'SS-1-20', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 1mm UPVC', size: '25mm', sizeInch: '1', price: 4.15, sku: 'SS-1-25', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 1mm UPVC', size: '32mm', sizeInch: '1 1/4', price: 5.00, sku: 'SS-1-32', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 1mm UPVC', size: '40mm', sizeInch: '1 1/2', price: 6.15, sku: 'SS-1-40', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 1mm UPVC', size: '50mm', sizeInch: '2', price: 7.40, sku: 'SS-1-50', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 1mm UPVC', size: '65mm', sizeInch: '2 1/2', price: 8.85, sku: 'SS-1-65', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 1mm UPVC', size: '80mm', sizeInch: '3', price: 10.65, sku: 'SS-1-80', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 1mm UPVC', size: '100mm', sizeInch: '4', price: 13.35, sku: 'SS-1-100', productType: 'Stainless Steel Clamp' },
    { name: 'SS Clamp 1mm UPVC', size: '150mm', sizeInch: '6', price: 16.50, sku: 'SS-1-150', productType: 'Stainless Steel Clamp' },
    // Golden Metal Clamp 1MM
    { name: 'Golden Metal Clamp 1MM', size: '15mm', sizeInch: '1/2', price: 1.50, sku: 'GLD-1MM-15', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1MM', size: '20mm', sizeInch: '3/4', price: 1.75, sku: 'GLD-1MM-20', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1MM', size: '25mm', sizeInch: '1', price: 2.00, sku: 'GLD-1MM-25', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1MM', size: '32mm', sizeInch: '1 1/4', price: 2.30, sku: 'GLD-1MM-32', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1MM', size: '40mm', sizeInch: '1 1/2', price: 2.70, sku: 'GLD-1MM-40', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1MM', size: '50mm', sizeInch: '2', price: 3.40, sku: 'GLD-1MM-50', productType: 'Golden Metal Clamp' },
    // Golden Metal Clamp 1.5MM
    { name: 'Golden Metal Clamp 1.5MM', size: '15mm', sizeInch: '1/2', price: 2.20, sku: 'GLD-1.5MM-15', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1.5MM', size: '20mm', sizeInch: '3/4', price: 2.65, sku: 'GLD-1.5MM-20', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1.5MM', size: '25mm', sizeInch: '1', price: 3.05, sku: 'GLD-1.5MM-25', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1.5MM', size: '32mm', sizeInch: '1 1/4', price: 3.45, sku: 'GLD-1.5MM-32', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1.5MM', size: '40mm', sizeInch: '1 1/2', price: 4.05, sku: 'GLD-1.5MM-40', productType: 'Golden Metal Clamp' },
    { name: 'Golden Metal Clamp 1.5MM', size: '50mm', sizeInch: '2', price: 5.30, sku: 'GLD-1.5MM-50', productType: 'Golden Metal Clamp' },
    // Silver Metal Clamp 1MM
    { name: 'Silver Metal Clamp 1MM', size: '15mm', sizeInch: '1/2', price: 1.75, sku: 'SLV-1MM-15', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1MM', size: '20mm', sizeInch: '3/4', price: 1.95, sku: 'SLV-1MM-20', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1MM', size: '25mm', sizeInch: '1', price: 2.30, sku: 'SLV-1MM-25', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1MM', size: '32mm', sizeInch: '1 1/4', price: 2.65, sku: 'SLV-1MM-32', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1MM', size: '40mm', sizeInch: '1 1/2', price: 3.15, sku: 'SLV-1MM-40', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1MM', size: '50mm', sizeInch: '2', price: 3.65, sku: 'SLV-1MM-50', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1MM', size: '75mm', sizeInch: '2 1/2', price: 5.15, sku: 'SLV-1MM-75', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1MM', size: '90mm', sizeInch: '3', price: 6.25, sku: 'SLV-1MM-90', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1MM', size: '110mm', sizeInch: '4', price: 7.30, sku: 'SLV-1MM-110', productType: 'Silver Metal Clamp' },
    // Silver Metal Clamp 1.5MM
    { name: 'Silver Metal Clamp 1.5MM', size: '15mm', sizeInch: '1/2', price: 2.60, sku: 'SLV-1.5MM-15', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1.5MM', size: '20mm', sizeInch: '3/4', price: 3.00, sku: 'SLV-1.5MM-20', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1.5MM', size: '25mm', sizeInch: '1', price: 3.40, sku: 'SLV-1.5MM-25', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1.5MM', size: '32mm', sizeInch: '1 1/4', price: 4.00, sku: 'SLV-1.5MM-32', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1.5MM', size: '40mm', sizeInch: '1 1/2', price: 4.50, sku: 'SLV-1.5MM-40', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1.5MM', size: '50mm', sizeInch: '2', price: 5.30, sku: 'SLV-1.5MM-50', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1.5MM', size: '75mm', sizeInch: '2 1/2', price: 8.50, sku: 'SLV-1.5MM-75', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1.5MM', size: '90mm', sizeInch: '3', price: 9.50, sku: 'SLV-1.5MM-90', productType: 'Silver Metal Clamp' },
    { name: 'Silver Metal Clamp 1.5MM', size: '110mm', sizeInch: '4', price: 11.50, sku: 'SLV-1.5MM-110', productType: 'Silver Metal Clamp' },
    // Sprinkler Clamp
    { name: 'Sprinkler Clamp', size: '25mm', sizeInch: '1', price: 5.60, sku: 'SPR-CL-1', productType: 'Sprinkler Clamp' },
    { name: 'Sprinkler Clamp', size: '32mm', sizeInch: '1 1/4', price: 6.50, sku: 'SPR-CL-1.25', productType: 'Sprinkler Clamp' },
    { name: 'Sprinkler Clamp', size: '40mm', sizeInch: '1 1/2', price: 7.40, sku: 'SPR-CL-1.5', productType: 'Sprinkler Clamp' },
    { name: 'Sprinkler Clamp', size: '50mm', sizeInch: '2', price: 8.60, sku: 'SPR-CL-2', productType: 'Sprinkler Clamp' },
    { name: 'Sprinkler Clamp', size: '65mm', sizeInch: '2 1/2', price: 10.20, sku: 'SPR-CL-2.5', productType: 'Sprinkler Clamp' },
    { name: 'Sprinkler Clamp', size: '80mm', sizeInch: '3', price: 12.50, sku: 'SPR-CL-3', productType: 'Sprinkler Clamp' },
    { name: 'Sprinkler Clamp', size: '110mm', sizeInch: '4', price: 15.40, sku: 'SPR-CL-4', productType: 'Sprinkler Clamp' },
    { name: 'Sprinkler Clamp', size: '160mm', sizeInch: '6', price: 19.80, sku: 'SPR-CL-6', productType: 'Sprinkler Clamp' },
    // Step Clamp
    { name: 'Step Clamp 1.2MM', size: '65mm', sizeInch: '2 1/2', price: 7.50, sku: 'STP-1.2MM-65', productType: 'Step Clamp' },
    { name: 'Step Clamp 1.2MM', size: '110mm', sizeInch: '4', price: 9.40, sku: 'STP-1.2MM-110', productType: 'Step Clamp' },
    { name: 'Step Clamp 1.5MM', size: '65mm', sizeInch: '2 1/2', price: 9.00, sku: 'STP-1.5MM-65', productType: 'Step Clamp' },
    { name: 'Step Clamp 1.5MM', size: '110mm', sizeInch: '4', price: 11.59, sku: 'STP-1.5MM-110', productType: 'Step Clamp' },
    // Nail Clamp 1.2MM
    { name: 'Nail Clamp 1.2MM', size: '15mm', sizeInch: '1/2', price: 9.00, sku: 'NC-1.2MM-15', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.2MM', size: '20mm', sizeInch: '3/4', price: 9.50, sku: 'NC-1.2MM-20', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.2MM', size: '25mm', sizeInch: '1', price: 10.20, sku: 'NC-1.2MM-25', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.2MM', size: '32mm', sizeInch: '1 1/4', price: 10.50, sku: 'NC-1.2MM-32', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.2MM', size: '40mm', sizeInch: '1 1/2', price: 11.00, sku: 'NC-1.2MM-40', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.2MM', size: '50mm', sizeInch: '2', price: 11.50, sku: 'NC-1.2MM-50', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.2MM', size: '65mm', sizeInch: '2 1/2', price: 12.40, sku: 'NC-1.2MM-65', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.2MM', size: '80mm', sizeInch: '3', price: 13.50, sku: 'NC-1.2MM-80', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.2MM', size: '110mm', sizeInch: '4', price: 15.90, sku: 'NC-1.2MM-110', productType: 'Nail Clamp' },
    // Nail Clamp 1.5MM
    { name: 'Nail Clamp 1.5MM', size: '50mm', sizeInch: '2', price: 16.50, sku: 'NC-1.5MM-50', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.5MM', size: '65mm', sizeInch: '2 1/2', price: 17.90, sku: 'NC-1.5MM-65', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.5MM', size: '80mm', sizeInch: '3', price: 18.90, sku: 'NC-1.5MM-80', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.5MM', size: '110mm', sizeInch: '4', price: 21.50, sku: 'NC-1.5MM-110', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.5MM', size: '160mm', sizeInch: '6', price: 26.00, sku: 'NC-1.5MM-160', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 1.5MM', size: '200mm', sizeInch: '8', price: 34.00, sku: 'NC-1.5MM-200', productType: 'Nail Clamp' },
    // Nail Clamp 2MM
    { name: 'Nail Clamp 2MM', size: '50mm', sizeInch: '2', price: 19.10, sku: 'NC-2MM-50', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 2MM', size: '65mm', sizeInch: '2 1/2', price: 21.10, sku: 'NC-2MM-65', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 2MM', size: '80mm', sizeInch: '3', price: 22.50, sku: 'NC-2MM-80', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 2MM', size: '110mm', sizeInch: '4', price: 24.80, sku: 'NC-2MM-110', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 2MM', size: '160mm', sizeInch: '6', price: 32.30, sku: 'NC-2MM-160', productType: 'Nail Clamp' },
    { name: 'Nail Clamp 2MM', size: '200mm', sizeInch: '8', price: 41.30, sku: 'NC-2MM-200', productType: 'Nail Clamp' }
  ];

  testimonials: Testimonial[] = [
    {
      quote: "JK Industries metal clamps have transformed our plumbing projects. The quality and durability of their UPVC and CPVC metal clamps are unmatched in the market. We've been using their products for over 5 years now.",
      author: "Rajesh Sharma",
      position: "Senior Contractor",
      company: ""
    },
    {
      quote: "The stainless steel clamps from JK Industries are perfect for our marine applications. Superior corrosion resistance and the precision engineering ensures a perfect fit every time.",
      author: "Vikram Singh",
      position: "Marine Engineer",
      company: ""
    },
    {
      quote: "We switched to JK Industries metal clamps for our chemical plant and haven't looked back. The powder coating quality and temperature resistance of their CPVC clamps is exceptional.",
      author: "Dr. Priya Patel",
      position: "Plant Manager",
      company: ""
    },
    {
      quote: "Outstanding product range and competitive pricing! Their golden and silver metal clamps add a premium finish to our commercial projects. Factory direct pricing is a huge advantage.",
      author: "Amit Desai",
      position: "Interior Designer",
      company: ""
    }
  ];

  faqs: FAQ[] = [
    {
      question: "What types of metal clamps does JK Industries manufacture?",
      answer: "JK Industries manufactures a comprehensive range of <strong>metal clamps</strong> including <strong>CPVC metal clamps</strong>, <strong>UPVC metal clamps</strong>, <strong>stainless steel clamps</strong>, <strong>golden metal clamps</strong>, <strong>silver metal clamps</strong>, <strong>sprinkler clamps</strong>, <strong>step clamps</strong>, <strong>nail clamps</strong>, and <strong>double nail clamps</strong>. Our <strong>metal clamp</strong> products are available in sizes from 1/2 inch to 8 inches and various thickness options (0.5mm, 1mm, 1.5mm, 2mm)."
    },
    {
      question: "What is the difference between CPVC and UPVC metal clamps?",
      answer: "<strong>CPVC metal clamps</strong> are specifically designed for hot water systems with temperature resistance up to 93°C, while <strong>UPVC metal clamps</strong> are ideal for cold water applications and drainage systems. Both types of <strong>metal clamps</strong> feature premium powder coating for corrosion resistance. Choose <strong>CPVC clamps</strong> for hot water pipes and <strong>UPVC clamps</strong> for cold water and general plumbing applications."
    },
    {
      question: "What sizes are available for metal clamps?",
      answer: "Our <strong>metal clamps</strong> are available in a wide range of sizes: 15mm (1/2\"), 20mm (3/4\"), 25mm (1\"), 32mm (1 1/4\"), 40mm (1 1/2\"), 50mm (2\"), 65mm (2 1/2\"), 75mm (3\"), 90mm (3 1/2\"), 110mm (4\"), 160mm (6\"), and 200mm (8\") for <strong>nail clamps</strong>. Custom sizes are also available on request for specialized <strong>pipe clamp</strong> applications."
    },
    {
      question: "What materials are used in your metal clamps?",
      answer: "Our <strong>metal clamps</strong> are manufactured from premium materials including CRC (Cold Rolled Close Annealed) steel, MS (Mild Steel) with powder coating, SS202 stainless steel, and GI (Galvanized Iron) with gold or silver coating. Each <strong>metal clamp</strong> material is selected based on the application requirements for maximum durability and performance."
    },
    {
      question: "Are your metal clamps corrosion resistant?",
      answer: "Yes, all our <strong>metal clamps</strong> feature superior corrosion resistance. <strong>Powder coated metal clamps</strong> have 60-80 micron coating thickness, <strong>stainless steel clamps</strong> offer natural corrosion resistance suitable for marine environments, and our <strong>GI metal clamps</strong> provide excellent protection against rust. Our <strong>pipe clamps</strong> are designed for long-term outdoor and industrial use."
    },
    {
      question: "What is the price range for metal clamps?",
      answer: "<strong>Metal clamp</strong> prices at JK Industries range from ₹1.00 to ₹41.30 per piece depending on the type, size, and material. <strong>CPVC metal clamps</strong> start from ₹1.25, <strong>UPVC metal clamps</strong> from ₹1.30, <strong>stainless steel clamps</strong> from ₹1.75, and <strong>nail clamps</strong> from ₹9.00. We offer factory direct pricing with bulk discounts for large orders of <strong>pipe clamps</strong>."
    },
    {
      question: "Do you provide bulk discounts on metal clamps?",
      answer: "Yes, JK Industries offers significant bulk discounts on all <strong>metal clamps</strong>. Our minimum order quantity is 10,000 pieces for stock sizes. Contact our sales team for customized pricing on bulk orders of <strong>CPVC metal clamps</strong>, <strong>UPVC metal clamps</strong>, <strong>stainless steel clamps</strong>, and other <strong>pipe clamp</strong> products."
    },
    {
      question: "Where is JK Industries located?",
      answer: "JK Industries is located in Rajkot, Gujarat, India - the industrial hub for <strong>metal clamp</strong> manufacturing. Our address is Radhekrishan Chowk, Sojitra Park, Mavdi Bypass Road, Rajkot - 360004. We ship <strong>metal clamps</strong> and <strong>pipe clamps</strong> across India with fast delivery within 2-7 days."
    },
    {
      question: "Are your metal clamps ISO certified?",
      answer: "Yes, all our <strong>metal clamps</strong> are manufactured in our ISO 9001:2015 certified facility. We follow strict quality control processes to ensure every <strong>metal clamp</strong>, <strong>pipe clamp</strong>, and <strong>stainless steel clamp</strong> meets international standards. Our products also comply with NSF/ANSI 14 requirements."
    },
    {
      question: "How do I install metal clamps properly?",
      answer: "To install <strong>metal clamps</strong>: 1) Mark positions at 60-100cm intervals for horizontal runs, 2) Pre-drill pilot holes on hard surfaces, 3) Position the <strong>metal clamp</strong> and align with pipe, 4) Secure with appropriate fasteners, 5) Verify pipe sits securely without compression. Our <strong>double nail clamps</strong> feature integrated nails for faster installation."
    },
    {
      question: "What applications are metal clamps used for?",
      answer: "<strong>Metal clamps</strong> are used in plumbing systems, hot and cold water distribution, chemical processing, fire sprinkler systems, irrigation, HVAC installations, marine applications, pharmaceutical manufacturing, food processing, and industrial piping. Choose the right <strong>pipe clamp</strong> based on your specific temperature, pressure, and chemical resistance requirements."
    },
    {
      question: "Can I order custom size metal clamps?",
      answer: "Yes, JK Industries manufactures custom size <strong>metal clamps</strong> according to your specifications. Our engineering team can design and produce specialized <strong>pipe clamps</strong> for non-standard pipe diameters, unique mounting requirements, or special configurations. Contact us with your drawings for custom <strong>metal clamp</strong> quotations."
    }
  ];

  expandedFaqs: boolean[] = [];

  // Installation steps for HowTo schema
  installationSteps = [
    {
      name: 'Preparation',
      text: 'Mark the position ensuring proper pipe alignment and spacing. For metal clamps, recommended spacing is every 60-100cm for horizontal runs and at each change of direction.',
      image: 'https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg'
    },
    {
      name: 'Pre-drilling',
      text: 'For hard surfaces like concrete or brick, pre-drill pilot holes using a 3-4mm drill bit to ensure accurate placement and prevent surface cracking when installing metal clamps.',
      image: 'https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg'
    },
    {
      name: 'Positioning',
      text: 'Place the metal clamp against the mounting surface, ensuring the clamp saddle is properly aligned with the intended pipe position. Verify the clamp size matches the pipe diameter.',
      image: 'https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg'
    },
    {
      name: 'Fastening',
      text: 'Secure the metal clamp using appropriate fasteners (screws, nails, or anchors) until the clamp is firmly attached. For double nail clamps, use a hammer to drive the integrated nails.',
      image: 'https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the pipe sits securely in the metal clamp without being compressed. Ensure proper movement allowance for thermal expansion, especially for hot water CPVC installations.',
      image: 'https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta,
    private titleService: Title,
    private transferState: TransferState
  ) {
    this.expandedFaqs = new Array(this.faqs.length).fill(false);
  }

  toggleFaq(index: number) {
    this.expandedFaqs[index] = !this.expandedFaqs[index];
    for (let i = 0; i < this.expandedFaqs.length; i++) {
      if (i !== index) this.expandedFaqs[i] = false;
    }
  }

  ngOnInit() {
    this.updateSeo();
    this.setAllSchemas();
  }

  private updateSeo() {
    this.titleService.setTitle('Metal Clamp | Pipe Clamp | Metal Pipe Clamp | GI Clamp | MS Clamp Manufacturer India - JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Metal Clamp Manufacturer. Buy premium Metal Clamps, Pipe Clamps, UPVC Metal Clamps, CPVC Metal Clamps, Stainless Steel Clamps, GI Clamps, MS Clamps. ISO Certified. Factory Direct Prices. Free Shipping. 100+ Sizes Available!' },
      { name: 'keywords', content: 'metal clamp, metal clamps, pipe clamp, metal pipe clamp, GI clamp, MS clamp, UPVC metal clamp, CPVC metal clamp, stainless steel clamp, SS clamp, golden metal clamp, silver metal clamp, sprinkler clamp, step clamp, nail clamp, double nail clamp, pipe clamp manufacturer, metal clamp India, metal clamp Rajkot, Edler Clamp, JK Industries, metal clamp price, buy metal clamp online' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/metal-clamp' },
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      { property: 'article:section', content: 'Metal Clamps & Pipe Clamps' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'Pipe Clamp' },
      { property: 'article:tag', content: 'UPVC Metal Clamp' },
      { property: 'article:tag', content: 'CPVC Metal Clamp' },
      { property: 'article:tag', content: 'Stainless Steel Clamp' },
      { property: 'product:price:amount', content: '1.00' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      { property: 'og:title', content: 'Metal Clamp | Pipe Clamp | Metal Pipe Clamp | GI Clamp | MS Clamp Manufacturer India' },
      { property: 'og:description', content: 'India\'s #1 Metal Clamp Manufacturer. Premium Metal Clamps, Pipe Clamps, UPVC/CPVC Metal Clamps, SS Clamps. 100+ Sizes. ISO Certified. Factory Direct Prices.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '800' },
      { property: 'og:image:alt', content: 'Metal Clamp - Premium Pipe Clamp Manufacturer JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locale', content: 'en_IN' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Metal Clamp | Pipe Clamp | Metal Pipe Clamp Manufacturer India' },
      { name: 'twitter:description', content: 'India\'s #1 Metal Clamp Manufacturer. Premium Metal Clamps, Pipe Clamps, UPVC/CPVC Metal Clamps. ISO Certified. Factory Direct Prices.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg' }
    ]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-in-out',
        offset: 100
      });
      AOS.refresh();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'auto';
    }
  }

  openEnquiryForm() {
    this.router.navigate(['/contact-us']);
    // this.showEnquiryForm = true;
    // if (isPlatformBrowser(this.platformId)) {
    //   this.document.body.style.overflow = 'hidden';
    // }
  }

  closeEnquiryForm(event: any) {
    if (event.target.classList.contains('enquiry-modal') || event.target.classList.contains('close-modal')) {
      this.showEnquiryForm = false;
      if (isPlatformBrowser(this.platformId)) {
        this.document.body.style.overflow = 'auto';
      }
    }
  }

  submitEnquiry() {
    console.log('Enquiry submitted:', this.enquiryData);
    alert('Thank you for your enquiry about Metal Clamps. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = { name: '', email: '', phone: '', company: '', quantity: null, message: '' };
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'auto';
    }
  }

  downloadBrochure() {
    alert('Our Metal Clamp catalog will be available for download soon!');
  }

  private setAllSchemas() {
    this.setWebPageSchema();
    this.setBreadcrumbSchema();
    this.setItemListSchema();
    this.setProductSchema();
    this.setFaqSchema();
    this.setHowToSchema();
    this.setBusinessSchema();
  }

  private setWebPageSchema() {
    if (this.transferState.hasKey(WEBPAGE_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(WEBPAGE_SCHEMA_KEY, ''));
      return;
    }
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/metal-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/metal-clamp",
      "name": "Metal Clamp | Pipe Clamp | Metal Pipe Clamp | GI Clamp | MS Clamp Manufacturer India",
      "description": "India's #1 Metal Clamp Manufacturer. Premium Metal Clamps, Pipe Clamps, UPVC Metal Clamps, CPVC Metal Clamps, Stainless Steel Clamps. 100+ Sizes Available. ISO Certified. Factory Direct Prices.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of metal clamps, pipe clamps, and pipe support systems in India"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg",
        "width": "1200",
        "height": "800"
      },
      "breadcrumb": { "@id": "https://jkindustriesrajkot.com/products/metal-clamp#breadcrumb" }
    };
    const schemaString = JSON.stringify(schema);
    this.transferState.set(WEBPAGE_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbSchema() {
    if (this.transferState.hasKey(BREADCRUMB_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(BREADCRUMB_SCHEMA_KEY, ''));
      return;
    }
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://jkindustriesrajkot.com/products/metal-clamp#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jkindustriesrajkot.com" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://jkindustriesrajkot.com/products" },
        { "@type": "ListItem", "position": 3, "name": "Metal Clamp", "item": "https://jkindustriesrajkot.com/products/metal-clamp" }
      ]
    };
    const schemaString = JSON.stringify(schema);
    this.transferState.set(BREADCRUMB_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private getProductImageAndDescription(productType: string): { image: string; description: string } {
    const productMap: { [key: string]: { image: string; description: string } } = {
      'CPVC Metal Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg',
        description: 'Premium powder coated metal clamps for CPVC hot water systems with temperature resistance up to 93°C. Ideal for residential and commercial hot water plumbing installations.'
      },
      'UPVC Metal Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg',
        description: 'Heavy-duty powder coated metal clamps for UPVC pipes in plumbing and irrigation systems. Perfect for cold water applications and drainage systems.'
      },
      'CPVC Double Nail Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg',
        description: 'Dual fastening CPVC clamps with integrated nails for secure hot water pipe installations. Provides 40% more holding power with quick installation.'
      },
      'UPVC Double Nail Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg',
        description: 'Double nail clamps providing 40% more holding power for UPVC cold water applications. Features integrated steel nails for rapid mounting.'
      },
      'Stainless Steel Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg',
        description: 'Marine-grade SS202 stainless steel clamps with superior corrosion resistance for industrial applications. Ideal for chemical plants, marine environments, and extreme temperature conditions.'
      },
      'Golden Metal Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg',
        description: 'Luxury gold-plated GI clamps for premium decorative and visible plumbing installations. Perfect for high-end residential and commercial projects requiring aesthetic appeal.'
      },
      'Silver Metal Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg',
        description: 'Elegant silver-finished GI clamps for modern commercial and residential installations. Combines durability with sophisticated appearance for visible plumbing systems.'
      },
      'Sprinkler Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg',
        description: 'Specialized metal clamps designed for fire sprinkler and irrigation pipe support systems. Meets safety code requirements for fire protection installations.'
      },
      'Step Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg',
        description: 'Versatile step clamps supporting multiple pipe sizes with adjustable stepped design. Ideal for installations requiring flexibility in pipe diameter support.'
      },
      'Nail Clamp': {
        image: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg',
        description: 'Quick-install nail clamps with integrated fasteners for rapid pipe mounting applications. Features zinc coating for enhanced corrosion resistance and durability.'
      }
    };

    return productMap[productType] || {
      image: `https://jkindustriesrajkot.com/assets/products/${productType.toLowerCase().replace(/ /g, '-')}.jpg`,
      description: `Premium ${productType} metal clamp by JK Industries. High-quality pipe support solution for reliable plumbing installations.`
    };
  }

  private setItemListSchema() {
    if (this.transferState.hasKey(ITEMLIST_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(ITEMLIST_SCHEMA_KEY, ''));
      return;
    }
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Metal Clamp Products - Complete Range",
      "description": "Complete range of metal clamps, pipe clamps, UPVC clamps, CPVC clamps, stainless steel clamps from JK Industries",
      "numberOfItems": this.allProductVariants.length,
      "itemListElement": this.allProductVariants.map((variant, index) => {
        const productInfo = this.getProductImageAndDescription(variant.productType);
        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": `${variant.name} ${variant.sizeInch} Inch`,
            "countryOfOrigin": {
              "@type": "Country",
              "name": "India"
            },
            "description": `${productInfo.description} Available in ${variant.size} (${variant.sizeInch} Inch) size. Price: ₹${variant.price} per piece.`,
            "sku": variant.sku,
            "image": productInfo.image,
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "manufacturer": { "@type": "Organization", "name": "JK Industries" },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": variant.price.toString(),
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition",
              "seller": { "@type": "Organization", "name": "JK Industries" },
              "deliveryLeadTime": {
                "@type": "QuantitativeValue",
                "minValue": "2",
                "maxValue": "7",
                "unitCode": "DAY"
              },
              "eligibleQuantity" : {
                "@type" : "QuantitativeValue",
                "unitCode" : "FTK",
                "value" : "1"
              },
            }
          }
        };
      })
    };
    const schemaString = JSON.stringify(schema);
    this.transferState.set(ITEMLIST_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setProductSchema() {
    if (this.transferState.hasKey(PRODUCT_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(PRODUCT_SCHEMA_KEY, ''));
      return;
    }
    const minPrice = Math.min(...this.allProductVariants.map(v => v.price));
    const maxPrice = Math.max(...this.allProductVariants.map(v => v.price));
    
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Metal Clamp | Pipe Clamp | Metal Pipe Clamp",
      "description": "Premium Metal Clamps manufactured by JK Industries. Complete range includes CPVC Metal Clamps, UPVC Metal Clamps, Stainless Steel Clamps, Golden Metal Clamps, Silver Metal Clamps, Sprinkler Clamps, Step Clamps, and Nail Clamps. Available in 100+ sizes from 1/2 inch to 8 inches.",
      "category": "Metal Clamps, Pipe Clamps, Plumbing Hardware",
      "url": "https://jkindustriesrajkot.com/products/metal-clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg",
        "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
        "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
        "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg"
      ],
      "sku": "MC-CATEGORY-001",
      "mpn": "JK-MC-001",
      "brand": { "@type": "Brand", "name": "Edler Clamp" },
      "manufacturer": {
        "@type": "Organization",
        "name": "JK Industries",
        "url": "https://jkindustriesrajkot.com",
        "logo": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png"
      },
      "countryOfOrigin": { "@type": "Country", "name": "India" },
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/metal-clamp",
        "priceCurrency": "INR",
        "lowPrice": minPrice.toString(),
        "highPrice": maxPrice.toString(),
        "offerCount": this.allProductVariants.length.toString(),
        "availability": "https://schema.org/InStock",
        "seller": { "@type": "Organization", "name": "JK Industries" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "256",
        "reviewCount": "180"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.author },
        "reviewBody": t.quote
      })),
      "hasVariant": this.allProductVariants.map(variant => {
        const productInfo = this.getProductImageAndDescription(variant.productType);
        return {
          "@type": "Product",
          "name": `${variant.name} ${variant.sizeInch} Inch`,
          "description": `${productInfo.description} Available in ${variant.size} MM (${variant.sizeInch} Inch) size. Price: ₹${variant.price} per piece.`,
          "sku": variant.sku,
          "image": productInfo.image,
          "size": `${variant.sizeInch} Inch / ${variant.size} MM`,
          "brand": { "@type": "Brand", "name": "Edler Clamp" },
          "manufacturer": { "@type": "Organization", "name": "JK Industries" },
          "countryOfOrigin": { "@type": "Country", "name": "India" },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": variant.price.toString(),
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": { "@type": "Organization", "name": "JK Industries" },
            "deliveryLeadTime": {
              "@type": "QuantitativeValue",
              "minValue": "2",
              "maxValue": "7",
              "unitCode": "DAY"
            },
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "unitCode": "FTK",
              "value": "1"
            }
          }
        };
      })
    };
    const schemaString = JSON.stringify(schema);
    this.transferState.set(PRODUCT_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqSchema() {
    if (this.transferState.hasKey(FAQ_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(FAQ_SCHEMA_KEY, ''));
      return;
    }
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": this.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    };
    const schemaString = JSON.stringify(schema);
    this.transferState.set(FAQ_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToSchema() {
    if (this.transferState.hasKey(HOWTO_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(HOWTO_SCHEMA_KEY, ''));
      return;
    }
    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install Metal Clamps - Complete Guide",
      "description": "Step-by-step guide to properly install metal clamps, pipe clamps, UPVC clamps, and CPVC clamps for secure pipe mounting.",
      "image": "https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg",
      "totalTime": "PT15M",
      "supply": [
        { "@type": "HowToSupply", "name": "Metal Clamps (appropriate size)" },
        { "@type": "HowToSupply", "name": "Fasteners (screws, nails, or anchors)" }
      ],
      "tool": [
        { "@type": "HowToTool", "name": "Power Drill or Hammer" },
        { "@type": "HowToTool", "name": "Measuring Tape" },
        { "@type": "HowToTool", "name": "Pencil for Marking" },
        { "@type": "HowToTool", "name": "3-4mm Drill Bit" }
      ],
      "step": this.installationSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "image": step.image
      }))
    };
    const schemaString = JSON.stringify(schema);
    this.transferState.set(HOWTO_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBusinessSchema() {
    if (this.transferState.hasKey(BUSINESS_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(BUSINESS_SCHEMA_KEY, ''));
      return;
    }
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "JK Industries",
      "image": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "url": "https://jkindustriesrajkot.com",
      "telephone": "+91 9979032430",
      "email": "jkindustries1955@gmail.com",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Radhekrishan Chowk, Sojitra Park, Mavdi Bypass Road",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360004",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.25592000",
        "longitude": "70.78272000"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "State", "name": "Gujarat" },
        { "@type": "City", "name": "Rajkot" }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/jk-industries-india/",
        "https://www.instagram.com/jk_industries_1995/"
      ]
    };
    const schemaString = JSON.stringify(schema);
    this.transferState.set(BUSINESS_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private addJsonLd(schema: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = schema;
    this.document.head.appendChild(script);
  }
}
