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
  url?: string;
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
        description: 'Premium grade stainless steel pipe clamp offering superior corrosion resistance and outstanding durability for demanding industrial environments and critical applications.',
        image: 'assets/products/stainless-steel-clamp.jpg',
        features: [
          'Marine-grade stainless steel construction',
          'Vibration dampening rubber lining',
          'High pressure and temperature resistance',
          'Self-locking ratchet mechanism',
          'UV and chemical resistant seal'
        ],
        specifications: {
          'Material': 'Stainless Steel 316',
          'Diameter Range': '15mm - 100mm',
          'Temperature Range': '-40°C to 180°C',
          'Pressure Rating': 'Up to 25 bar',
          'Finish': 'Mirror polished'
        },
        url: '/products/stainless-steel-clamp'
      },
      {
        id: 'NC-002',
        name: 'Nail Clamp System',
        category: 'Nail Clamps',
        categorySlug: 'nail',
        description: 'Advanced nail clamping system designed for construction and woodworking applications, providing exceptional holding power with quick and easy installation.',
        image: 'assets/products/nail-clamp.jpg',
        features: [
          'Patented quick-release mechanism',
          'Hardened steel construction for durability',
          'Anti-slide gripping surface',
          'Compatible with standard nail sizes',
          'Ergonomic design for reduced fatigue'
        ],
        specifications: {
          'Material': 'Heat-treated carbon steel',
          'Compatibility': 'Nail sizes 8-16d',
          'Holding Strength': 'Up to 500kg',
          'Weight': '175g per unit',
          'Surface Treatment': 'Anti-corrosive coating'
        },
        url: '/products/nail-clamp'
      },
      {
        id: 'PVC-003',
        name: 'UPVC Metal Clamp Assembly',
        category: 'PVC Clamps',
        categorySlug: 'pvc',
        description: 'Specialized UPVC metal clamp assembly engineered for securing UPVC pipes in plumbing and irrigation systems with enhanced stability and leak prevention.',
        image: 'assets/products/upvc-metal-clamp.jpg',
        features: [
          'Zinc-plated metal bracket for superior strength',
          'EPDM rubber lining prevents pipe damage',
          'Quick-connect mounting system',
          'Compatible with all standard UPVC pipe sizes',
          'Designed for long-term weather exposure'
        ],
        specifications: {
          'Material': 'Zinc-plated steel with EPDM lining',
          'Size Range': '20mm - 110mm',
          'Application': 'UPVC pipe systems',
          'Temperature Rating': '-5°C to 70°C',
          'UV Resistance': 'High (10+ years outdoor use)'
        },
        url: '/products/upvc-metal-clamp'
      },
      {
        id: 'PC-004',
        name: 'CPVC Metal Clamp',
        category: 'Pipe Clamps',
        categorySlug: 'pipe',
        description: 'Heavy-duty CPVC metal clamp designed specifically for hot water systems and chemical applications where standard clamps would degrade under high temperatures.',
        image: 'assets/products/cpvc-metal-clamp.jpg',
        features: [
          'High-temperature resistant design',
          'Chemical corrosion protection',
          'Adjustable tension control',
          'Fire-retardant properties',
          'Reinforced mounting points'
        ],
        specifications: {
          'Material': 'Galvanized steel with heat-resistant coating',
          'Size Range': '15mm - 75mm',
          'Temperature Rating': 'Up to 105°C',
          'Chemical Resistance': 'Excellent against acids and chlorinated water',
          'Pressure Rating': 'Up to 16 bar'
        },
        url: '/products/cpvc-metal-clamp'
      },
      {
        id: 'PC-005',
        name: 'PTMT Connection Pipe',
        category: 'Connection Systems',
        categorySlug: 'pipe',
        description: 'Advanced PTMT (Polyoxymethylene Thermoplastic) connection pipe system offering superior flexibility and strength for complex plumbing installations.',
        image: 'assets/products/ptmt-connection-pipe.jpg',
        features: [
          'Lightweight yet extremely durable material',
          'Excellent thermal stability',
          'Resistant to chemicals and scaling',
          'Easy push-fit connection system',
          'Minimal thermal expansion'
        ],
        specifications: {
          'Material': 'Engineering-grade POM thermoplastic',
          'Working Temperature': '0°C to 95°C',
          'Pressure Rating': 'Up to 10 bar',
          'Connection Type': 'Push-fit with O-ring seal',
          'Expected Lifespan': '50+ years'
        },
        url: '/products/ptmt-connection-pipe'
      },
      {
        id: 'CU-006',
        name: 'Step Clamp',
        category: 'Specialty Clamps',
        categorySlug: 'custom',
        description: 'Innovative step clamp design allowing for multiple pipe diameters to be secured with a single clamp, ideal for tiered installations and space-constrained applications.',
        image: 'assets/products/step-clamp.jpg',
        features: [
          'Multi-tier design accommodates various pipe sizes',
          'Single mounting point reduces installation time',
          'Adjustable clamping pressure',
          'Space-saving configuration',
          'UV and weather resistant'
        ],
        specifications: {
          'Material': 'Glass-reinforced nylon',
          'Size Compatibility': '15mm, 22mm, 28mm in single clamp',
          'Load Capacity': 'Up to 45kg per tier',
          'Temperature Range': '-15°C to 85°C',
          'Mounting': 'Single point wall or ceiling mount'
        },
        url: '/products/step-clamp'
      },
      {
        id: 'PVC-007',
        name: 'UPVC Metal Clamp System',
        category: 'PVC Clamps',
        categorySlug: 'pvc',
        description: 'Comprehensive UPVC metal clamping system featuring integrated brackets and fasteners for professional installations in commercial and residential applications.',
        image: 'assets/products/upvc-metal-clamp.jpg',
        features: [
          'Pre-assembled components for faster installation',
          'Integrated sound dampening technology',
          'Multiple mounting options included',
          'Color-coded sizing system',
          'Double-lock security mechanism'
        ],
        specifications: {
          'Material': 'Galvanized steel with rubber insulation',
          'Size Range': '20mm - 160mm',
          'Applications': 'Commercial plumbing, drainage systems',
          'Load Capacity': 'Up to 120kg per clamp',
          'Compliance': 'Meets ISO 9001 standards'
        }
      },
      {
        id: 'CV-008',
        name: 'CPVC Concealed Valve',
        category: 'Valve Systems',
        categorySlug: 'custom',
        description: 'Premium concealed CPVC valve designed for hidden installations behind walls or panels, combining aesthetic appeal with professional functionality.',
        image: 'assets/products/cpvc-concealed-valve.png',
        features: [
          'Fully concealable design with decorative cover plate',
          'Ceramic disc technology for smooth operation',
          'Quarter-turn mechanism',
          'Built-in service access points',
          'Leak-proof double seal system'
        ],
        specifications: {
          'Material': 'CPVC body with brass core',
          'Temperature Range': '5°C to 95°C',
          'Flow Rate': 'Up to 38 liters/minute',
          'Working Pressure': 'Up to 10 bar',
          'Warranty': '10 years against manufacturing defects'
        },
        url: '/products/cpvc-concealed-valve'
      },
      {
        id: 'MC-009',
        name: 'Golden Metal Clamp',
        category: 'Premium Clamps',
        categorySlug: 'custom',
        description: 'Luxury-grade gold-plated metal clamp combining superior aesthetics with exceptional performance for high-end visible installations.',
        image: 'assets/products/golden-metal-clamp.jpg',
        features: [
          'Premium gold-plated finish',
          'Anti-tarnish protective coating',
          'Silent operation rubber lining',
          'Designer profile with hidden fasteners',
          'Precision machined components'
        ],
        specifications: {
          'Material': 'Brass with gold plating',
          'Sizes': '15mm to 32mm',
          'Applications': 'Luxury bathrooms, display installations',
          'Finish': 'Mirror polished',
          'Included': 'White gloves for installation'
        },
        url: '/products/golden-metal-clamp'
      },
      {
        id: 'SC-010',
        name: 'Sprinkler Clamp',
        category: 'Fire Safety Systems',
        categorySlug: 'custom',
        description: 'Specialized fire sprinkler pipe clamp engineered to meet rigorous fire safety standards while providing quick and secure installation for fire suppression systems.',
        image: 'assets/products/sprinkler-clamp.jpg',
        features: [
          'UL/FM approved for fire safety applications',
          'Quick-install design for emergency retrofits',
          'Heat-resistant materials',
          'Color-coded for easy inspection verification',
          'Tamper-resistant locking mechanism'
        ],
        specifications: {
          'Material': 'Fire-rated galvanized steel',
          'Size Range': '25mm - 150mm',
          'Fire Rating': 'Up to 4 hours',
          'Standards Compliance': 'NFPA 13, UL, FM Global',
          'Installation Type': 'Ceiling or wall mount'
        },
        url: '/products/sprinkler-clamp'
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
