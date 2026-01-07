import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as Aos from 'aos';

// Define TransferState keys for SSR
const PTMT_PRODUCT_SCHEMA = makeStateKey<string>('PTMT_CONNECTION_PIPE_PRODUCT_SCHEMA');
const PTMT_BUSINESS_SCHEMA = makeStateKey<string>('PTMT_CONNECTION_PIPE_BUSINESS_SCHEMA');
const PTMT_FAQ_SCHEMA = makeStateKey<string>('PTMT_CONNECTION_PIPE_FAQ_SCHEMA');
const PTMT_BREADCRUMB_SCHEMA = makeStateKey<string>('PTMT_CONNECTION_PIPE_BREADCRUMB_SCHEMA');
const PTMT_HOWTO_SCHEMA = makeStateKey<string>('PTMT_CONNECTION_PIPE_HOWTO_SCHEMA');
const PTMT_ITEMLIST_SCHEMA = makeStateKey<string>('PTMT_CONNECTION_PIPE_ITEMLIST_SCHEMA');
const PTMT_WEBPAGE_SCHEMA = makeStateKey<string>('PTMT_CONNECTION_PIPE_WEBPAGE_SCHEMA');

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Application {
  icon: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Spec {
  label: string;
  value: string;
}

interface ProductSize {
  sizeInch: string;
  price: number;
  qtyPcs: number;
  packingQty: number;
  sku: string;
}

interface RelatedProduct {
  name: string;
  image: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-ptmt-connection-pipe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ptmt-connection-pipe.component.html',
  styleUrl: './ptmt-connection-pipe.component.scss'
})
export class PtmtConnectionPipeComponent implements OnInit, AfterViewInit {
  private platformId = Inject(PLATFORM_ID);
  
  showEnquiryForm: boolean = false;
  expandedFaqs: boolean[] = [];

  enquiryData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: null,
    message: ''
  };

  // Product sizes from the provided image
  productSizes: ProductSize[] = [
    { sizeInch: '12', price: 22.45, qtyPcs: 2, packingQty: 650, sku: 'PTMT-CP-12' },
    { sizeInch: '18', price: 25.77, qtyPcs: 2, packingQty: 450, sku: 'PTMT-CP-18' },
    { sizeInch: '24', price: 28.91, qtyPcs: 2, packingQty: 400, sku: 'PTMT-CP-24' },
    { sizeInch: '30', price: 33.20, qtyPcs: 1, packingQty: 300, sku: 'PTMT-CP-30' },
    { sizeInch: '36', price: 35.05, qtyPcs: 1, packingQty: 250, sku: 'PTMT-CP-36' },
    { sizeInch: '40', price: 39.50, qtyPcs: 1, packingQty: 200, sku: 'PTMT-CP-40' },
    { sizeInch: '48', price: 45.50, qtyPcs: 1, packingQty: 150, sku: 'PTMT-CP-48' },
    { sizeInch: '60', price: 55.50, qtyPcs: 1, packingQty: 140, sku: 'PTMT-CP-60' }
  ];

  // Related products for internal linking
  relatedProducts: RelatedProduct[] = [
    {
      name: 'UPVC Double Nail Clamp',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      link: '/products/upvc-double-nail-clamp',
      description: 'Premium UPVC double nail clamps with dual fastening system for cold water applications'
    },
    {
      name: 'CPVC Double Nail Clamp',
      image: 'assets/products/cpvc-double-nail-clamp.jpg',
      link: '/products/cpvc-double-nail-clamp',
      description: 'Heat-resistant CPVC double nail clamps designed for hot water systems'
    },
    {
      name: 'UPVC Metal Clamp',
      image: 'assets/products/upvc-metal-clamp.jpg',
      link: '/products/upvc-metal-clamp',
      description: 'Premium powder coated metal clamps for UPVC pipes with superior corrosion resistance'
    },
    {
      name: 'CPVC Metal Clamp',
      image: 'assets/products/cpvc-metal-clamp.jpg',
      link: '/products/cpvc-metal-clamp',
      description: 'High-temperature resistant metal clamps designed for CPVC hot water systems'
    },
    {
      name: 'Step Clamp',
      image: 'assets/products/step-clamp.jpg',
      link: '/products/step-clamp',
      description: 'Versatile step clamps for multiple pipe sizes with adjustable design'
    },
    {
      name: 'Stainless Steel Clamp',
      image: 'assets/products/stainless-steel-clamp.jpg',
      link: '/products/stainless-steel-clamp',
      description: 'Premium SS clamps for industrial and marine applications'
    }
  ];

  // Installation steps for HowTo schema
  installationSteps = [
    {
      name: 'Preparation',
      text: 'Measure and mark the installation points ensuring proper alignment for PTMT connection pipes. Ensure the mounting surface is clean and free from debris.',
      image: 'https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg'
    },
    {
      name: 'Pipe Cutting',
      text: 'Cut the PTMT pipe to the required length using a pipe cutter, ensuring a clean, square cut for optimal connection performance.',
      image: 'https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg'
    },
    {
      name: 'Deburring',
      text: 'Remove any burrs or sharp edges from the cut end using a deburring tool to ensure smooth insertion into the connection fitting.',
      image: 'https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg'
    },
    {
      name: 'Connection',
      text: 'Insert the PTMT connection pipe into the fitting using the push-fit system. Ensure the pipe is fully inserted until it reaches the stop point for a secure connection.',
      image: 'https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the connection is secure and properly seated. Test the system under pressure to ensure leak-free operation of your PTMT plumbing system.',
      image: 'https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg'
    }
  ];

  features: Feature[] = [
    {
      icon: 'tint-slash',
      title: 'Scale Resistant',
      description: 'Smooth inner surface prevents mineral buildup and scaling for long-term optimal flow rates in both hot and cold water PTMT pipes, ensuring consistent performance throughout the PTMT plumbing system.'
    },
    {
      icon: 'temperature-high',
      title: 'Temperature Stable',
      description: 'Maintains integrity and performance in temperatures ranging from -85°C to 95°C, making PTMT connection pipes ideal for hot water PTMT pipes and hot & cold water pipe applications.'
    },
    {
      icon: 'hand-rock',
      title: 'Impact Resistant',
      description: 'Highly durable material withstands physical stress and impact without cracking, ensuring long-lasting performance of PTMT pipes in demanding plumbing installations.'
    },
    {
      icon: 'tools',
      title: 'Easy Installation',
      description: 'Push-fit connection system requires no special tools, reducing installation time by up to 40% for PTMT plumbing systems compared to traditional connection methods.'
    },
    {
      icon: 'shield-alt',
      title: 'Corrosion Free',
      description: 'PTMT connection pipes are completely corrosion-resistant, eliminating water contamination concerns and ensuring clean water delivery in residential and commercial applications.'
    },
    {
      icon: 'check-double',
      title: 'Quality Certified',
      description: 'ISO 9001:2015 certified manufacturing ensures consistent quality with exact dimensions for perfect fit every time across all PTMT pipe sizes.'
    }
  ];

  applications: Application[] = [
    {
      icon: 'home',
      title: 'Residential Plumbing',
      description: 'Perfect for bathrooms, kitchens, and whole-house water distribution systems using PTMT plumbing systems for reliable hot & cold water pipe installations.'
    },
    {
      icon: 'building',
      title: 'Commercial Buildings',
      description: 'Ideal for hotels, malls, offices, and multi-story building plumbing networks requiring durable PTMT pipes and connection systems.'
    },
    {
      icon: 'hot-tub',
      title: 'Hot Water Systems',
      description: 'Excellent for hot water PTMT pipes with temperature stability up to 95°C, perfect for geysers, water heaters, and solar heating systems.'
    },
    {
      icon: 'shower',
      title: 'Bathroom Fittings',
      description: 'Seamless connections for taps, mixers, showers, and sanitary fixtures using PTMT connection pipes for leak-free performance.'
    },
    {
      icon: 'industry',
      title: 'Industrial Applications',
      description: 'Suitable for industrial plumbing systems requiring reliable PTMT pipes that can handle both hot and cold water applications with superior durability.'
    },
    {
      icon: 'warehouse',
      title: 'HVAC Systems',
      description: 'Perfect for heating, ventilation, and air conditioning systems requiring reliable PTMT connection pipes for water distribution.'
    }
  ];

  specifications: Spec[] = [
    { label: 'Material', value: 'Engineering-grade Polyoxymethylene Thermoplastic (PTMT), Resin Powder' },
    { label: 'Sizes Available (Diameter)', value: '14mm Diameter' },
    { label: 'Sizes Available (Length)', value: '12 inch, 18 inch, 24 inch, 30 inch, 36 inch, 40 inch, 48 inch, 60 inch' },
    { label: 'Thread', value: '15mm' },
    { label: 'Color Options', value: 'White, Off-White, Custom Colors Available' },
    { label: 'Temperature Range', value: '-85°C to 95°C' },
    { label: 'Pressure Rating', value: 'Up to 10 bar at 23°C' },
    { label: 'Certification', value: 'ISO 9001:2015, WPC Approved' },
    { label: 'Expected Lifespan', value: '5+ years under normal operating conditions' },
    { label: 'Installation Method', value: 'Push-fit connection system, no special tools required' }
  ];

  whyChoose = [
    {
      title: 'Superior Durability',
      description: 'PTMT connection pipes offer exceptional durability with 5+ years expected service life, making them ideal for long-term plumbing installations.'
    },
    {
      title: 'Corrosion-Free Material',
      description: 'PTMT pipes eliminate water contamination concerns as they are completely corrosion-free, ensuring clean and safe water delivery.'
    },
    {
      title: 'Fast Installation',
      description: 'Up to 40% faster installation compared to traditional connection methods, reducing labor costs and project completion time.'
    },
    {
      title: 'Thermal Stability',
      description: 'Minimal thermal expansion ensures stable, leak-free connections even with temperature fluctuations in hot water PTMT pipes.'
    },
    {
      title: 'Hygienic Material',
      description: 'PTMT material prevents bacterial growth and biofilm formation, ensuring safe water for residential and commercial use.'
    }
  ];

  testimonials = [
    {
      quote: 'We\'ve switched all our plumbing projects to JK Industries PTMT connection pipes. The push-fit system has reduced our installation time by 30%, and we\'ve had zero callbacks for leaks. The PTMT plumbing system is truly superior.',
      author: 'Rajesh Sharma',
      role: ''
    },
    {
      quote: 'The quality of these PTMT connection pipes is outstanding. We\'ve installed them in over 200 apartment units, and their performance in both hot and cold water applications has been flawless. Hot water PTMT pipes work perfectly.',
      author: 'Vikram Patel',
      role: ''
    },
    {
      quote: 'JK Industries PTMT pipes have transformed our plumbing installations. The ease of installation and reliability of the hot & cold water pipe system is unmatched. Highly recommended for any plumbing project.',
      author: 'Priya Mehta',
      role: ''
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'What makes PTMT connection pipes better than traditional piping materials?',
      answer: 'PTMT (Polyoxymethylene Thermoplastic) connection pipes offer several advantages over traditional materials: superior durability with 5+ years lifespan, excellent thermal stability (-85°C - 95°C), scale and corrosion resistance, quick push-fit installation without special tools, and lower overall lifecycle costs. They\'re also hygienic and don\'t contaminate water with rust or chemicals like some metal pipes can. PTMT pipes are specifically designed for modern plumbing systems requiring reliability and performance.'
    },
    {
      question: 'Are PTMT connection pipes suitable for hot water systems?',
      answer: 'Yes, PTMT connection pipes are specifically engineered for both hot and cold water applications. They maintain structural integrity and performance at temperatures up to 95°C, making them ideal for hot water PTMT pipes and hot water distribution systems. Unlike some plastic pipes, PTMT doesn\'t soften at high temperatures and has minimal thermal expansion, ensuring stable connections even with temperature fluctuations. This makes them perfect for hot & cold water pipe applications.'
    },
    {
      question: 'Do you offer complete PTMT plumbing systems or just the connection pipes?',
      answer: 'We offer a comprehensive PTMT plumbing solution including connection pipes, fittings, valves, and accessories. Our complete PTMT plumbing system ensures compatibility and optimal performance across all components. For large projects, we can provide custom design support to create an integrated plumbing solution tailored to your specific requirements. Whether you need individual PTMT connection pipes or a complete PTMT plumbing system, we have the solution.'
    },
    {
      question: 'What sizes are available for PTMT connection pipes?',
      answer: 'Our PTMT connection pipes are available in multiple lengths: 12 inch, 18 inch, 24 inch, 30 inch, 36 inch, 40 inch, 48 inch, and 60 inch, all with 14mm diameter. These sizes cover most residential and commercial plumbing requirements. For specialized industrial applications or non-standard sizes, we can manufacture custom dimensions. Please contact our sales team with your specific requirements for custom sizing options for your PTMT pipes.'
    },
    {
      question: 'What is the warranty period for PTMT connection pipes?',
      answer: 'JK Industries provides a 15-year manufacturer\'s warranty on all PTMT connection pipes and fittings when installed according to our guidelines by qualified professionals. This warranty covers material defects and manufacturing issues. The expected service life of our PTMT products exceeds 50 years under normal operating conditions, making them a truly long-term investment for your plumbing infrastructure. Our PTMT pipes are built to last.'
    },
    {
      question: 'Can PTMT connection pipes be used for both hot and cold water applications?',
      answer: 'Absolutely! PTMT connection pipes are specifically designed for hot & cold water pipe applications. They maintain excellent performance across a wide temperature range from -85°C to 95°C, making them versatile for both hot water PTMT pipes and cold water systems. The material properties ensure consistent performance regardless of water temperature, making PTMT pipes ideal for comprehensive plumbing installations.'
    },
    {
      question: 'How do PTMT pipes compare to CPVC and UPVC pipes?',
      answer: 'PTMT connection pipes offer unique advantages: superior temperature range (-85°C to 95°C) compared to UPVC, excellent scale resistance, and push-fit installation without special tools. While CPVC is better for very high temperatures, PTMT pipes provide excellent balance for both hot and cold water applications. PTMT plumbing systems are ideal when you need versatility, ease of installation, and long-term reliability in moderate temperature ranges.'
    },
    {
      question: 'Where can I buy PTMT connection pipes and PTMT pipes online in India?',
      answer: 'JK Industries is a leading manufacturer of PTMT connection pipes, PTMT pipes, and complete PTMT plumbing systems in India. You can purchase our PTMT products directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India. Contact us for a quote on PTMT connection pipes, hot water PTMT pipes, and hot & cold water pipe systems.'
    },
    {
      question: 'What is the installation process for PTMT connection pipes?',
      answer: 'Installing PTMT connection pipes is straightforward: 1) Measure and mark installation points, 2) Cut pipe to required length with a pipe cutter, 3) Deburr the cut end, 4) Insert into fitting using push-fit system until it reaches the stop point, 5) Verify connection is secure. The push-fit system requires no special tools, making PTMT plumbing system installation up to 40% faster than traditional methods. No glue, welding, or threading required.'
    },
    {
      question: 'Why choose JK Industries for PTMT connection pipes and PTMT plumbing systems?',
      answer: 'JK Industries (Edler Clamp brand) is India\'s trusted manufacturer of PTMT connection pipes, PTMT pipes, and complete PTMT plumbing systems. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our PTMT connection pipes are manufactured using premium materials ensuring superior quality, durability, and performance for both hot water PTMT pipes and hot & cold water pipe applications.'
    }
  ];

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platform: Object,
    private transferState: TransferState
  ) { }

  ngOnInit() {
    this.updateSeo();
    this.setProductStructuredData();
    this.setFaqStructuredData();
    this.setBreadcrumbStructuredData();
    this.setBusinessStructuredData();
    this.setHowToStructuredData();
    this.setItemListStructuredData();
    this.setWebPageStructuredData();
    
    // Initialize expandedFaqs array
    this.expandedFaqs = new Array(this.faqs.length).fill(false);
    
    // Only init AOS in browser
    if (isPlatformBrowser(this.platform)) {
      Aos.init({
        duration: 800,
        once: true,
        offset: 100
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platform)) {
      Aos.refresh();
    }
  }

  private updateSeo() {
    this.titleService.setTitle('PTMT Connection Pipe | PTMT Pipes | PTMT Plumbing System | Hot Water PTMT Pipes | Hot & Cold Water Pipe Manufacturer | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of PTMT Connection Pipes, PTMT Pipes, PTMT Plumbing Systems, Hot Water PTMT Pipes & Hot & Cold Water Pipes. Premium Thermoplastic Plumbing Solutions with Push-Fit Technology. ISO Certified. Best Prices. Buy Direct from Factory in Rajkot, Gujarat.' },
      { name: 'keywords', content: 'PTMT connection pipe, PTMT pipes, PTMT plumbing system, hot water PTMT pipes, hot & cold water pipe, PTMT pipe, polyoxymethylene thermoplastic pipe, PTMT connection, thermoplastic plumbing pipes, push-fit PTMT pipes, PTMT pipe manufacturer India, PTMT plumbing system installation, hot water pipe system, cold water pipe system, PTMT pipe price, PTMT connection pipe Rajkot, thermoplastic pipe manufacturer, PTMT pipe supplier, modern plumbing system, scale resistant pipes' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/ptmt-connection-pipe' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Article meta tags
      { property: 'article:published_time', content: '2024-01-15T10:00:00+05:30' },
      { property: 'article:modified_time', content: '2026-01-07T10:00:00+05:30' },
      { property: 'article:section', content: 'Plumbing Products' },
      { property: 'article:tag', content: 'PTMT Connection Pipe' },
      { property: 'article:tag', content: 'PTMT Pipes' },
      { property: 'article:tag', content: 'PTMT Plumbing System' },
      { property: 'article:tag', content: 'Hot Water PTMT Pipes' },
      
      // Product meta tags
      { property: 'product:price:amount', content: '22.45' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'PTMT Connection Pipe | PTMT Pipes | PTMT Plumbing System | Hot Water PTMT Pipes Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of PTMT Connection Pipes, PTMT Pipes & PTMT Plumbing Systems. Premium Hot Water PTMT Pipes & Hot & Cold Water Pipes. Push-Fit Technology. ISO Certified.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg' },
      { property: 'og:image:width', content: '6720' },
      { property: 'og:image:height', content: '4480' },
      { property: 'og:image:alt', content: 'PTMT Connection Pipe - Premium Thermoplastic Plumbing System by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/ptmt-connection-pipe' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'PTMT Connection Pipe | PTMT Pipes | PTMT Plumbing System Manufacturer' },
      { name: 'twitter:description', content: 'Premium PTMT Connection Pipes with push-fit technology. PTMT Pipes, PTMT Plumbing Systems, Hot Water PTMT Pipes & Hot & Cold Water Pipes. ISO Certified. Buy Direct from Factory.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg' },
      { name: 'twitter:image:alt', content: 'PTMT Connection Pipe - Premium Thermoplastic Plumbing System' }
    ]);
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(PTMT_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(PTMT_PRODUCT_SCHEMA, ''));
      return;
    }

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "PTMT Pipe, Thermoplastic Pipe, Plumbing Pipe, Hot Water Pipe, Cold Water Pipe",
      "name": "PTMT Connection Pipe | PTMT Pipes | PTMT Plumbing System | Hot Water PTMT Pipes | Hot & Cold Water Pipe",
      "url": "https://jkindustriesrajkot.com/products/ptmt-connection-pipe",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg"
      ],
      "description": "JK Industries manufactures premium PTMT Connection Pipes with advanced push-fit technology for modern plumbing systems. Our PTMT Pipes, PTMT Plumbing Systems, and Hot Water PTMT Pipes are ideal for residential, commercial, and industrial applications. Hot & Cold Water Pipe systems available in sizes 12 inch to 60 inch.",
      "sku": "PTMT-CP-001",
      "mpn": "JK-PTMT-001",
      "gtin13": "8901234567892",
      "brand": {
        "@type": "Brand",
        "name": "Edler Clamp"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "JK Industries",
        "url": "https://jkindustriesrajkot.com",
        "logo": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "postalCode": "360004",
          "addressCountry": "IN"
        }
      },
      "countryOfOrigin": {
        "@type": "Country",
        "name": "India"
      },
      "alternateName": ["PTMT connection pipe", "PTMT pipes", "PTMT plumbing system", "hot water PTMT pipes", "hot & cold water pipe", "PTMT pipe", "polyoxymethylene thermoplastic pipe", "PTMT connection", "thermoplastic plumbing pipes", "push-fit PTMT pipes"],
      "material": ["Engineering-grade Polyoxymethylene Thermoplastic (PTMT)", "Resin Powder"],
      "color": "White",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/ptmt-connection-pipe",
        "priceCurrency": "INR",
        "lowPrice": "22.45",
        "highPrice": "55.50",
        "offerCount": "8",
        "price": "22.45",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "JK Industries"
        },
        "areaServed": [
          { "@type": "Country", "name": "India" },
          { "@type": "City", "name": "Rajkot" },
          { "@type": "State", "name": "Gujarat" },
          { "@type": "AdministrativeArea", "name": "Worldwide" },
          {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "22.25592000",
              "longitude": "70.78272000"
            },
            "geoRadius": "5000"
          }
        ],
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
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "INR"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "IN"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": "1",
              "maxValue": "2",
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": "2",
              "maxValue": "7",
              "unitCode": "DAY"
            }
          }
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "68",
        "reviewCount": "45"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.author },
        "reviewBody": t.quote
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "PTMT Plumbing System" },
      "width": {
        "@type": "QuantitativeValue",
        "value": "14",
        "unitCode": "MMT"
      },
      "height": {
        "@type": "QuantitativeValue",
        "value": "60",
        "unitCode": "CMT"
      },
      "weight": {
        "@type": "QuantitativeValue",
        "value": "150",
        "unitCode": "GRM"
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Material", "value": "Engineering-grade Polyoxymethylene Thermoplastic (PTMT)" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "12 inch - 60 inch Length, 14mm Diameter" },
        { "@type": "PropertyValue", "name": "Temperature Range", "value": "-85°C to 95°C" },
        { "@type": "PropertyValue", "name": "Pressure Rating", "value": "Up to 10 bar at 23°C" },
        { "@type": "PropertyValue", "name": "Installation Method", "value": "Push-fit connection system" },
        { "@type": "PropertyValue", "name": "UV Resistance", "value": "High" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, WPC Approved" },
        { "@type": "PropertyValue", "name": "Product Type", "value": "PTMT Thermoplastic" },
        { "@type": "PropertyValue", "name": "Application", "value": "Hot & Cold Water Pipe Systems" }
      ],
      "hasVariant": this.productSizes.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch PTMT Connection Pipe`,
        "sku": size.sku,
        "size": `${size.sizeInch} Inch`,
        "image": "https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg",
        "brand": {
          "@type": "Brand",
          "name": "Edler Clamp"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": size.price.toString(),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
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
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing Qty", "value": size.packingQty.toString() }
        ]
      }))
    };

    const schemaString = JSON.stringify(schema);
    this.transferState.set(PTMT_PRODUCT_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(PTMT_HOWTO_SCHEMA)) {
      this.addJsonLd(this.transferState.get(PTMT_HOWTO_SCHEMA, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install PTMT Connection Pipes",
      "description": "Step-by-step guide to properly install PTMT connection pipes for secure plumbing connections. Learn the correct technique for installing PTMT pipes in your plumbing system.",
      "image": "https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg",
      "totalTime": "PT15M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "PTMT Connection Pipes"
        },
        {
          "@type": "HowToSupply",
          "name": "PTMT Fittings"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Pipe Cutter"
        },
        {
          "@type": "HowToTool",
          "name": "Deburring Tool"
        },
        {
          "@type": "HowToTool",
          "name": "Measuring Tape"
        },
        {
          "@type": "HowToTool",
          "name": "Pencil for Marking"
        }
      ],
      "step": this.installationSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "image": step.image,
        "url": `https://jkindustriesrajkot.com/products/ptmt-connection-pipe#step-${index + 1}`
      }))
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(PTMT_HOWTO_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(PTMT_ITEMLIST_SCHEMA)) {
      this.addJsonLd(this.transferState.get(PTMT_ITEMLIST_SCHEMA, ''));
      return;
    }

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "PTMT Connection Pipe Sizes - Available Variants",
      "description": "Complete range of PTMT connection pipes available in sizes from 12 inch to 60 inch. PTMT pipes, PTMT plumbing systems, and hot water PTMT pipes for all plumbing requirements.",
      "numberOfItems": this.productSizes.length,
      "itemListElement": this.productSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch PTMT Connection Pipe`,
          "description": `Premium ${size.sizeInch} Inch PTMT connection pipe with push-fit technology. Perfect for PTMT plumbing systems, hot water PTMT pipes, and hot & cold water pipe applications. Temperature rating: -85°C to 95°C.`,
          "sku": size.sku,
          "image": "https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "countryOfOrigin": {
            "@type": "Country",
            "name": "India"
          },
          "material": ["Engineering-grade Polyoxymethylene Thermoplastic (PTMT)", "Resin Powder"],
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "INR",
            "price": size.price.toString(),
            "itemCondition": "https://schema.org/NewCondition",
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
            }
          }
        }
      }))
    };

    const schemaString = JSON.stringify(itemListSchema);
    this.transferState.set(PTMT_ITEMLIST_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(PTMT_WEBPAGE_SCHEMA)) {
      this.addJsonLd(this.transferState.get(PTMT_WEBPAGE_SCHEMA, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/ptmt-connection-pipe#webpage",
      "url": "https://jkindustriesrajkot.com/products/ptmt-connection-pipe",
      "name": "PTMT Connection Pipe | PTMT Pipes | PTMT Plumbing System | Hot Water PTMT Pipes Manufacturer",
      "description": "India's #1 Manufacturer of PTMT Connection Pipes, PTMT Pipes & PTMT Plumbing Systems. Premium Hot Water PTMT Pipes & Hot & Cold Water Pipes. Push-Fit Technology. ISO Certified.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of PTMT pipes, thermoplastic plumbing systems, and pipe connection solutions in India",
        "publisher": {
          "@type": "Organization",
          "name": "JK Industries"
        }
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".product-description", ".section-title", ".hero-content h1"]
      },
      "author": {
        "@type": "Organization",
        "name": "JK Industries"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg",
        "width": "6720",
        "height": "4480",
        "caption": "PTMT Connection Pipe - Premium Thermoplastic Plumbing System by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(PTMT_WEBPAGE_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData() {
    if (this.transferState.hasKey(PTMT_FAQ_SCHEMA)) {
      this.addJsonLd(this.transferState.get(PTMT_FAQ_SCHEMA, ''));
      return;
    }

    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": this.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };

    const schemaString = JSON.stringify(faqData);
    this.transferState.set(PTMT_FAQ_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(PTMT_BREADCRUMB_SCHEMA)) {
      this.addJsonLd(this.transferState.get(PTMT_BREADCRUMB_SCHEMA, ''));
      return;
    }

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
          "name": "Products",
          "item": "https://jkindustriesrajkot.com/products"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "PTMT Connection Pipe | PTMT Pipes | PTMT Plumbing System | Edler Clamp",
          "item": "https://jkindustriesrajkot.com/products/ptmt-connection-pipe"
        }
      ]
    };

    const schemaString = JSON.stringify(breadcrumbSchema);
    this.transferState.set(PTMT_BREADCRUMB_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBusinessStructuredData() {
    if (this.transferState.hasKey(PTMT_BUSINESS_SCHEMA)) {
      this.addJsonLd(this.transferState.get(PTMT_BUSINESS_SCHEMA, ''));
      return;
    }

    const businessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "JK Industries",
      "image": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "telephone": "+91 9979032430",
      "email": "jkindustries1955@gmail.com",
      "url": "https://jkindustriesrajkot.com",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
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
      "department": [
        {
          "@type": "LocalBusiness",
          "name": "PTMT Connection Pipe Manufacturing Unit",
          "description": "Premium manufacturing unit for PTMT Connection Pipes, PTMT Pipes, PTMT Plumbing Systems, and Hot Water PTMT Pipes",
          "telephone": "+91 9979032430",
          "email": "jkindustries1955@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
            "addressLocality": "Rajkot",
            "addressRegion": "Gujarat",
            "postalCode": "360004",
            "addressCountry": "IN"
          }
        }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      "areaServed": [
        { "@type": "City", "name": "Rajkot" },
        { "@type": "Country", "name": "India" },
        { "@type": "State", "name": "Gujarat" },
        { "@type": "State", "name": "Maharashtra" },
        { "@type": "State", "name": "Karnataka" },
        { "@type": "State", "name": "Tamil Nadu" },
        { "@type": "State", "name": "Kerala" },
        { "@type": "State", "name": "Andhra Pradesh" },
        { "@type": "State", "name": "Telangana" },
        { "@type": "State", "name": "Rajasthan" },
        { "@type": "State", "name": "Madhya Pradesh" },
        { "@type": "State", "name": "Uttar Pradesh" },
        { "@type": "State", "name": "West Bengal" },
        { "@type": "State", "name": "Punjab" },
        { "@type": "State", "name": "Haryana" },
        { "@type": "State", "name": "Delhi" },
        { "@type": "State", "name": "Bihar" },
        { "@type": "State", "name": "Odisha" },
        { "@type": "State", "name": "Assam" },
        { "@type": "State", "name": "Jharkhand" },
        { "@type": "State", "name": "Chhattisgarh" },
        { "@type": "State", "name": "Uttarakhand" },
        { "@type": "State", "name": "Himachal Pradesh" },
        { "@type": "State", "name": "Jammu and Kashmir" },
        { "@type": "State", "name": "Goa" },
        { "@type": "State", "name": "Puducherry" },
        { "@type": "State", "name": "Manipur" },
        { "@type": "State", "name": "Meghalaya" },
        { "@type": "State", "name": "Mizoram" },
        { "@type": "State", "name": "Nagaland" },
        { "@type": "State", "name": "Tripura" },
        { "@type": "State", "name": "Arunachal Pradesh" },
        { "@type": "State", "name": "Sikkim" },
        { "@type": "AdministrativeArea", "name": "Worldwide" }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/jk-industries-india/",
        "https://www.instagram.com/jk_industries_1995/"
      ]
    };

    const schemaString = JSON.stringify(businessData);
    this.transferState.set(PTMT_BUSINESS_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private addJsonLd(schema: string) {
    if (!isPlatformBrowser(this.platform)) return;
    
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = schema;
    this.document.head.appendChild(script);
  }

  downloadBrochure() {
    alert('Our technical datasheet for PTMT Connection Pipes will be available for download soon!');
  }

  toggleFaq(index: number) {
    // Toggle current state
    this.expandedFaqs[index] = !this.expandedFaqs[index];
    
    // Optional: Close others (accordion behavior)
    for (let i = 0; i < this.expandedFaqs.length; i++) {
      if (i !== index) this.expandedFaqs[i] = false;
    }
  }

  openEnquiryForm() {
    this.showEnquiryForm = true;
    if (isPlatformBrowser(this.platform)) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  closeEnquiryForm(event: any) {
    if (event.target.classList.contains('enquiry-modal') || event.target.classList.contains('close-modal')) {
      this.showEnquiryForm = false;
      if (isPlatformBrowser(this.platform)) {
        this.document.body.style.overflow = 'auto';
      }
    }
  }

  submitEnquiry() {
    console.log('Enquiry submitted:', this.enquiryData);
    alert('Thank you for your enquiry about PTMT Connection Pipes. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = { name: '', email: '', phone: '', company: '', quantity: null, message: '' };
    if (isPlatformBrowser(this.platform)) {
      this.document.body.style.overflow = 'auto';
    }
  }
}
