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
  price?: number;
  seoCategory?: string;
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
    // Set SEO metadata
    this.title.setTitle('Metal Clamp Manufacturer | Full Range of Industrial Pipe Clamps | Edler Clamp');
    this.meta.updateTag({ name: 'description', content: 'Explore India\'s widest range of premium metal clamps: UPVC metal clamps, CPVC metal clamps, stainless steel clamps, and double nail clamps. Manufactured by Edler Clamp (JK Industries) for superior durability.' });
    this.meta.updateTag({ name: 'keywords', content: 'metal clamp, UPVC metal clamp, CPVC metal clamp, stainless steel clamp, pipe fasteners, nail clamp, industrial clamps, Edler Clamp products, JK Industries Rajkot' });

    // Initialize product data
    this.initializeProducts();
    this.filteredProducts = [...this.allProducts];
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
      this.addItemListSchema();
      this.addBreadcrumbSchema();
    }
  }

  private addItemListSchema() {
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Metal Clamp & Industrial Pipe Fasteners Range",
      "description": "Comprehensive list of premium metal clamps and pipe fasteners manufactured by Edler Clamp",
      "numberOfItems": this.allProducts.length,
      "itemListElement": this.allProducts.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "description": product.description,     
          "category" : product.seoCategory,
          "image": `https://jkindustriesrajkot.com/${product.image}`,
          "url": `https://jkindustriesrajkot.com${product.url}`,
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "JK Industries"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "deliveryLeadTime" : "7 Days",
            "availability": "https://schema.org/InStock",
            "price": product.price
          }
        }
      }))
    };

    this.appendSchemaToHead(itemListSchema);
  }

  private addBreadcrumbSchema() {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://jkindustriesrajkot.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Metal Clamp Products",
          "item": "https://jkindustriesrajkot.com/products"
        }
      ]
    };

    this.appendSchemaToHead(breadcrumbSchema);
  }

  private appendSchemaToHead(schema: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  initializeProducts(): void {
    this.allProducts = [
      {
        id: 'PC-001',
        name: 'Premium Stainless Steel Pipe Clamp',
        seoCategory: 'Clips, Clamps',
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
        price: 2.05,
        url: '/products/stainless-steel-clamp'
      },
      {
        id: 'NC-002',
        name: 'Metal Nico Clamp System',
        seoCategory: 'Clips, Clamps',
        category: 'Nico Clamps',
        categorySlug: 'nico',
        description: 'Advanced nico clamping system designed for construction and woodworking applications, providing exceptional holding power with quick and easy installation.',
        image: 'assets/products/nico-clamp.jpg',
        features: [
          'Patented quick-release mechanism',
          'Hardened steel construction for durability',
          'Anti-slide gripping surface',
          'Compatible with standard nico sizes',
          'Ergonomic design for reduced fatigue'
        ],
        specifications: {
          'Material': 'Heat-treated carbon steel',
          'Compatibility': 'Nico sizes 8-16d',
          'Holding Strength': 'Up to 500kg',
          'Weight': '175g per unit',
          'Surface Treatment': 'Anti-corrosive coating'
        },
        price: 1,
        url: '/products/nico-clamp'
      },
      {
        id: 'PVC-003',
        name: 'UPVC Metal Clamp',
        seoCategory: 'Clips, Clamps',
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
        price: 1.5,
        url: '/products/upvc-metal-clamp'
      },
      {
        id: 'PC-004',
        name: 'CPVC Metal Clamp',
        seoCategory: 'Clips, Clamps', 
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
        price: 1.5,
        url: '/products/cpvc-metal-clamp'
      },
      {
        id: 'PC-005',
        name: 'PTMT Connection Pipe',
        seoCategory: 'Bathroom & Toilet Accessories/Fittings', 
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
        price: 21,
        url: '/products/ptmt-connection-pipe'
      },
      {
        id: 'CU-006',
        name: 'Step Clamp',
        seoCategory: 'Clips, Clamps',
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
        price: 1,
        url: '/products/step-clamp'
      },
      {
        id: 'PC-007',
        name: 'Silver Metal Clamp',
        seoCategory: 'Clips, Clamps',
        category: 'Pipe Clamps',
        categorySlug: 'pipe',
        description: 'Premium silver-plated metal clamps featuring elegant finish and superior corrosion resistance. Ideal for upscale commercial spaces, clean environments, and luxury installations where aesthetics and performance matter.',
        image: 'assets/products/upvc-metal-clamp.jpg',
        features: [
          'Pre-assembled components for faster installation',
          'Integrated sound dampening technology',
          'Multiple mounting options included',
          'Color-coded sizing system',
          'Double-lock security mechanism'
        ],
        specifications: {
          'Material': 'High-grade carbon steel with premium silver plating',
          'Plating Thickness': '15-20 microns (industrial grade)',
          'Size Range': '15mm to 150mm diameter',
          'Load Capacity': 'Up to 120kg (size dependent)',
          'Finish': 'Polished silver'
        },
        price: 4,
        url: '/products/silver-metal-clamp'
      },
      {
        id: 'CV-008',
        name: 'CPVC Concealed Valve',
        seoCategory: 'Valves',
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
        price: 230,
        url: '/products/cpvc-concealed-valve'
      },
      {
        id: 'MC-009',
        name: 'Golden Metal Clamp',
        seoCategory: 'Clips, Clamps',
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
        price: 7,
        url: '/products/golden-metal-clamp'
      },
      {
        id: 'SC-010',
        name: 'Sprinkler Clamp',
        seoCategory: 'Clips, Clamps',
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
        price: 4,
        url: '/products/sprinkler-clamp'
      },
      {
        id: 'PVC-008',
        name: 'UPVC Double Nail Clamp',
        seoCategory: 'Clips, Clamps',
        category: 'PVC Clamps',
        categorySlug: 'pvc',
        description: 'Advanced dual-fastening UPVC clamp system featuring innovative double nail design for superior pipe stability and enhanced load distribution in residential and commercial plumbing installations.',
        image: 'assets/products/upvc-double-nail-clamp.jpg',
        features: [
          'Patented double nail fastening system for maximum stability',
          'Premium-grade UPVC material with UV stabilizers',
          'Reinforced mounting points prevent wall damage',
          'Integrated pipe cushioning to minimize vibration noise',
          'Color-matched to standard UPVC pipe systems for aesthetic installation'
        ],
        specifications: {
          'Material': 'High-impact UPVC with fiberglass reinforcement',
          'Size Range': '15mm to 110mm diameter',
          'Nail Type': 'Hardened steel with anti-corrosion coating',
          'Temperature Rating': '-5°C to 60°C',
          'Load Capacity': 'Up to 85kg (size dependent)',
          'Installation Method': 'Hammer-driven or power tool compatible'
        },
        price: 1.5,
        url: '/products/upvc-double-nail-clamp'
      },
      {
        id: 'PC-009',
        name: 'CPVC Double Nail Clamp',
        seoCategory: 'Clips, Clamps',
        category: 'Pipe Clamps',
        categorySlug: 'pipe',
        description: 'Premium heat-resistant CPVC double nail clamp engineered specifically for hot water systems and high-temperature applications, featuring dual fastening points for enhanced stability and load distribution.',
        image: 'assets/products/cpvc-double-nail-clamp.jpg',
        features: [
          'High-temperature resistant CPVC material (withstands up to 93°C)',
          'Dual hardened steel nails with specialized heat-resistant coating',
          'Precision-engineered stress distribution design',
          'Silicone cushioning insert prevents pipe damage and reduces thermal transfer',
          'Color-coded by size for easy identification during installation'
        ],
        specifications: {
          'Material': 'Industrial-grade CPVC with thermal stabilizers',
          'Size Range': '15mm to 75mm diameter',
          'Nail Material': 'Heat-treated carbon steel with ceramic coating',
          'Temperature Rating': '0°C to 93°C',
          'Chemical Resistance': 'Excellent against chlorine and acidic water',
          'Pressure Rating': 'Supports pipes up to 25 bar',
          'Installation Spacing': 'Recommended every 80-100cm for optimal support'
        },
        price: 1.5,
        url: '/products/cpvc-double-nail-clamp'
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
