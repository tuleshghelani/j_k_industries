import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';
import { Meta, Title } from '@angular/platform-browser';

interface ProductSpecifications {
  [key: string]: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  features: string[];
  specifications?: ProductSpecifications;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  selectedCategory: string = 'all';
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;
  showEnquiryForm: boolean = false;
  enquiryProduct: Product | null = null;

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Set SEO metadata
    this.title.setTitle('Premium Industrial Clamps - JK Industries');
    this.meta.updateTag({ name: 'description', content: 'Explore JK Industries\' wide range of premium industrial clamps including pipe clamps, nail clamps, and UPVC CPVC metal clamps for industrial applications.' });
    this.meta.updateTag({ name: 'keywords', content: 'industrial clamps, pipe clamps, nail clamps, UPVC clamps, CPVC clamps, metal clamps, JK Industries' });

    // Initialize product data
    this.initializeProducts();
    this.filteredProducts = [...this.allProducts];
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }

  initializeProducts(): void {
    this.allProducts = [
      {
        id: 'PC-001',
        name: 'Premium Stainless Steel Pipe Clamp',
        category: 'Pipe Clamps',
        categorySlug: 'pipe',
        description: 'High-quality stainless steel pipe clamp designed for durability and secure pipe installation in industrial environments.',
        image: 'assets/products/Stainless Steel Clamp.jpg',
        features: [
          'Corrosion-resistant stainless steel construction',
          'Secure locking mechanism',
          'Vibration-resistant design',
          'Easy installation with standard tools'
        ],
        specifications: {
          'Material': 'Stainless Steel 304',
          'Diameter Range': '15mm - 50mm',
          'Temperature Range': '-20°C to 120°C',
          'Pressure Rating': 'Up to 16 bar',
          'Finish': 'Polished'
        }
      },
      {
        id: 'NC-002',
        name: 'Nail Clamp System',
        category: 'Nail Clamps',
        categorySlug: 'nail',
        image: 'assets/products/Nail Clamp.jpg',
        description: 'Innovative nail clamp featuring quick-release functionality for efficient installation and removal in production environments.',
        features: [
          'One-touch quick-release system',
          'Ergonomic handle design',
          'Self-aligning nail guide',
          'Wear-resistant components'
        ]
      },
      {
        id: 'PVC-003',
        name: 'UPVC Metal Clamp Assembly',
        category: 'PVC Clamps',
        categorySlug: 'pvc',
        description: 'Specialized clamp assembly designed for UPVC and CPVC pipe systems, ensuring leak-proof connections and long-term stability.',
        image: 'assets/products/UPVC METAL CLAMP.jpg',
        features: [
          'Chemical-resistant design',
          'Reinforced metal brackets',
          'Adjustable tension system',
          'Weather-resistant coating'
        ],
        specifications: {
          'Material': 'Steel with polymer coating',
          'Size Range': '20mm - 110mm',
          'Application': 'UPVC/CPVC pipe systems',
          'Temperature Rating': '0°C to 80°C',
          'Coating': 'Anti-corrosion'
        }
      },
      {
        id: 'PC-004',
        name: 'CPVC Metal Clamp',
        category: 'Pipe Clamps',
        categorySlug: 'pipe',
        description: 'Robust industrial pipe clamp engineered for heavy-duty applications requiring maximum holding capacity and durability.',
        image: 'assets/products/CPVC METAL CLAMP.jpg',
        features: [
          'Reinforced structure for heavy loads',
          'Double-locking mechanism',
          'Vibration dampening system',
          'Extended service life design'
        ]
      },
      {
        id: 'PC-005',
        name: 'PTMT Connection Pipe',
        category: 'Pipe Clamps',
        categorySlug: 'pipe',
        description: 'High-precision pipe clamp designed for applications requiring exact alignment and positioning of piping systems.',
        image: 'assets/products/PTMT CONNECTION PIPE.jpg',
        features: [
          'Micrometer adjustment capability',
          'Laser-marked positioning guides',
          'Multi-axis alignment system',
          'Vibration-isolated mounting'
        ]
      },
      {
        id: 'CU-006',
        name: 'Step Clamp',
        category: 'Custom Solutions',
        categorySlug: 'custom',
        description: 'Tailor-made clamping solution developed for specialized industrial applications with unique requirements.',
        image: 'assets/products/STEP CLAMP.jpg',
        features: [
          'Custom-engineered to specifications',
          'Application-specific materials',
          'Optimized performance design',
          'Quality tested to industry standards'
        ]
      },
      {
        id: 'PVC-008',
        name: 'UPVC Metal Clamp System',
        category: 'PVC Clamps',
        categorySlug: 'pvc',
        description: 'Space-saving UPVC clamp system designed for installations with limited clearance while maintaining superior holding capability.',
        image: 'assets/products/UPVC METAL CLAMP.jpg',
        features: [
          'Low-profile design',
          'High-strength polymer construction',
          'UV and chemical resistant',
          'Tool-free installation option'
        ]
      },
      {
        id: 'CU-009',
        name: 'CPVC Concealed Valve',
        category: 'Custom Solutions',
        categorySlug: 'custom',
        description: 'Versatile clamping solution adaptable to various applications across multiple industries with adjustable configuration options.',
        image: 'assets/products/CPVC CONCEALED VALVE.png',
        features: [
          'Modular component system',
          'Multiple mounting options',
          'Adjustable tension control',
          'Compatible with various materials'
        ]
      }
    ];
  }

  filterCategory(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(product => 
        product.categorySlug === category
      );
    }

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }

  showProductDetails(product: Product): void {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden';
  }

  closeModal(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('product-modal') || target.classList.contains('close-modal')) {
      this.selectedProduct = null;
      document.body.style.overflow = '';
    }
  }

  openEnquiryForm(product: Product): void {
    this.enquiryProduct = product;
    this.showEnquiryForm = true;
    document.body.style.overflow = 'hidden';
  }

  closeEnquiryForm(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('enquiry-modal') || target.classList.contains('close-modal')) {
      this.showEnquiryForm = false;
      document.body.style.overflow = '';
    }
  }
}
