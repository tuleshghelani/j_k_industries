import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as Aos from 'aos';

// Define TransferState keys for SSR
const CPVC_DN_PRODUCT_SCHEMA = makeStateKey<string>('CPVC_DOUBLE_NAIL_CLAMP_PRODUCT_SCHEMA');
const CPVC_DN_BUSINESS_SCHEMA = makeStateKey<string>('CPVC_DOUBLE_NAIL_CLAMP_BUSINESS_SCHEMA');
const CPVC_DN_FAQ_SCHEMA = makeStateKey<string>('CPVC_DOUBLE_NAIL_CLAMP_FAQ_SCHEMA');
const CPVC_DN_BREADCRUMB_SCHEMA = makeStateKey<string>('CPVC_DOUBLE_NAIL_CLAMP_BREADCRUMB_SCHEMA');
const CPVC_DN_HOWTO_SCHEMA = makeStateKey<string>('CPVC_DOUBLE_NAIL_CLAMP_HOWTO_SCHEMA');
const CPVC_DN_ITEMLIST_SCHEMA = makeStateKey<string>('CPVC_DOUBLE_NAIL_CLAMP_ITEMLIST_SCHEMA');
const CPVC_DN_WEBPAGE_SCHEMA = makeStateKey<string>('CPVC_DOUBLE_NAIL_CLAMP_WEBPAGE_SCHEMA');

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
  size: string;
  sizeInch: string;
  pipeOD: string;
  price: number;
  qtyPcs: number;
  packingQty: number;
  loadCapacity: string;
  nailLength: string;
  sku: string;
}

interface RelatedProduct {
  name: string;
  image: string;
  link: string;
  description: string;
}

@Component({
  selector: 'app-cpvc-double-nail-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cpvc-double-nail-clamp.component.html',
  styleUrl: './cpvc-double-nail-clamp.component.scss'
})
export class CpvcDoubleNailClampComponent implements OnInit, AfterViewInit {
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

  // Product sizes from the provided image - CPVC Double Nail Clamp
  productSizes: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', pipeOD: '15mm', price: 1.00, qtyPcs: 100, packingQty: 7000, loadCapacity: '30kg', nailLength: '25mm', sku: 'CPVC-DN-15' },
    { size: '20mm', sizeInch: '3/4', pipeOD: '20mm', price: 1.12, qtyPcs: 100, packingQty: 5000, loadCapacity: '40kg', nailLength: '30mm', sku: 'CPVC-DN-20' },
    { size: '25mm', sizeInch: '1', pipeOD: '25mm', price: 1.82, qtyPcs: 100, packingQty: 3000, loadCapacity: '50kg', nailLength: '35mm', sku: 'CPVC-DN-25' },
    { size: '32mm', sizeInch: '1 1/4', pipeOD: '32mm', price: 2.40, qtyPcs: 50, packingQty: 2000, loadCapacity: '60kg', nailLength: '40mm', sku: 'CPVC-DN-32' },
    { size: '40mm', sizeInch: '1 1/2', pipeOD: '40mm', price: 3.13, qtyPcs: 25, packingQty: 1300, loadCapacity: '70kg', nailLength: '45mm', sku: 'CPVC-DN-40' },
    { size: '50mm', sizeInch: '2', pipeOD: '50mm', price: 6.07, qtyPcs: 25, packingQty: 900, loadCapacity: '75kg', nailLength: '50mm', sku: 'CPVC-DN-50' }
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
      name: 'CPVC Metal Clamp',
      image: 'assets/products/cpvc-metal-clamp.jpg',
      link: '/products/cpvc-metal-clamp',
      description: 'High-temperature resistant metal clamps designed for CPVC hot water systems'
    },
    {
      name: 'UPVC Metal Clamp',
      image: 'assets/products/upvc-metal-clamp.jpg',
      link: '/products/upvc-metal-clamp',
      description: 'Premium powder coated metal clamps for UPVC pipes with superior corrosion resistance'
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
    },
    {
      name: 'Sprinkler Clamp',
      image: 'assets/products/sprinkler-clamp.jpg',
      link: '/products/sprinkler-clamp',
      description: 'Specialized clamps for fire sprinkler and irrigation systems'
    }
  ];

  // Installation steps for HowTo schema
  installationSteps = [
    {
      name: 'Preparation',
      text: 'Mark the position ensuring proper CPVC pipe alignment and spacing (recommended every 80-100cm for horizontal runs, 60-80cm for hot water lines)',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg'
    },
    {
      name: 'Pre-drilling',
      text: 'For hard surfaces like concrete or brick, pre-drill pilot holes using a 3mm drill bit to ensure accurate nail placement and prevent surface cracking',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg'
    },
    {
      name: 'Positioning',
      text: 'Place the CPVC double nail clamp against the mounting surface, ensuring both nail guides are properly aligned with the marked positions',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg'
    },
    {
      name: 'Fastening',
      text: 'Insert both heat-treated ceramic coated nails and drive them simultaneously using a hammer or power tool until flush with the clamp surface',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the CPVC pipe sits securely in the clamp without being compressed, ensuring proper movement allowance for thermal expansion in hot water applications',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg'
    }
  ];

  features: Feature[] = [
    {
      icon: 'fire',
      title: 'Heat-Resistant Design',
      description: 'Specialized CPVC material withstands temperatures up to 93°C, making these clamps ideal for hot water systems, solar water heaters, and high-temperature plumbing applications.'
    },
    {
      icon: 'lock',
      title: 'Dual Fastening System',
      description: 'Patented double nail design provides twice the holding power of standard clamps, ensuring maximum stability and preventing pipe movement even during thermal expansion cycles.'
    },
    {
      icon: 'shield-alt',
      title: 'Reinforced Structure',
      description: 'Heat-stabilized CPVC material with fiberglass reinforcement and strategically designed stress distribution points delivers superior load capacity up to 75kg depending on size.'
    },
    {
      icon: 'tools',
      title: 'Easy Installation',
      description: 'Hammer-driven or power tool compatible design with pre-positioned nail guides enables quick and precise mounting, reducing installation time by up to 40%.'
    },
    {
      icon: 'flask',
      title: 'Chemical Resistant',
      description: 'Superior resistance to chlorinated water, acids, and common household chemicals. Perfect for chemical processing plants and industrial hot water systems.'
    },
    {
      icon: 'check-double',
      title: 'Quality Certified',
      description: 'ISO 9001:2015 certified manufacturing ensures consistent quality with exact dimensions for perfect pipe fit every time across all sizes from 15mm to 50mm.'
    }
  ];

  applications: Application[] = [
    {
      icon: 'home',
      title: 'Residential Hot Water Systems',
      description: 'Perfect for securing CPVC pipes in home hot water plumbing systems, providing reliable dual-point support for water heaters, geysers, and solar water heating installations.'
    },
    {
      icon: 'building',
      title: 'Commercial Plumbing',
      description: 'Ideal for high-rise buildings, hotels, hospitals, and commercial complexes with extensive hot water distribution networks requiring superior heat resistance.'
    },
    {
      icon: 'industry',
      title: 'Industrial Hot Water Lines',
      description: 'Engineered for industrial facilities requiring secure mounting of CPVC pipes carrying hot water, heated chemicals, or process fluids at elevated temperatures.'
    },
    {
      icon: 'flask',
      title: 'Chemical Processing',
      description: 'Superior chemical resistance makes these clamps perfect for securing CPVC pipes in chemical processing, pharmaceutical, and food processing applications.'
    }
  ];

  specifications: Spec[] = [
    { label: 'Material', value: 'Industrial-grade CPVC with thermal stabilizers and fiberglass reinforcement' },
    { label: 'Size Range', value: '15mm to 50mm diameter' },
    { label: 'Nail Type', value: 'Heat-treated carbon steel with ceramic coating' },
    { label: 'Temperature Rating', value: '0°C to 93°C' },
    { label: 'Chemical Resistance', value: 'Excellent against chlorine and acidic water' },
    { label: 'Load Capacity', value: 'Up to 75kg (size dependent)' },
    { label: 'Installation Method', value: 'Hammer-driven or power tool compatible' },
    { label: 'Color Options', value: 'Cream (standard), Custom colors available' },
    { label: 'UV Resistance', value: 'High (8+ years outdoor exposure)' },
    { label: 'Recommended Spacing', value: '80-100cm for horizontal runs' },
    { label: 'Certification', value: 'ISO 9001:2015, ISI Marked' }
  ];

  whyChoose = [
    {
      title: 'Superior Heat Resistance',
      description: 'Specially formulated CPVC material withstands temperatures up to 93°C, ideal for hot water and solar heating systems.'
    },
    {
      title: 'Enhanced Stability',
      description: 'Dual nail design provides up to 40% more holding power than standard single-nail clamps for unmatched pipe support.'
    },
    {
      title: 'Thermal Expansion Management',
      description: 'Engineered to accommodate pipe movement during heating cycles, preventing stress and ensuring long-term reliability.'
    },
    {
      title: 'Chemical Resistance',
      description: 'Superior resistance to chlorinated water, acids, and common household chemicals for versatile applications.'
    },
    {
      title: 'Comprehensive Size Range',
      description: 'Available in all standard CPVC pipe diameters from 15mm to 50mm with custom sizes on request.'
    }
  ];

  testimonials = [
    {
      quote: 'JK Industries CPVC double nail clamps have been exceptional for our hot water plumbing projects. The heat resistance and dual fastening system provide unmatched stability even at high temperatures.',
      author: 'Rajesh Mehta',
      role: ''
    },
    {
      quote: 'We have been using these CPVC nail clamps for commercial building hot water systems for over 2 years. The quality is outstanding, and they handle thermal expansion perfectly.',
      author: 'Pradeep Singh',
      role: ''
    },
    {
      quote: 'The chemical resistance of these CPVC double nail clamps is remarkable. We use them in our pharmaceutical facility and they maintain integrity despite constant exposure to chemicals.',
      author: 'Dr. Anita Sharma',
      role: ''
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'What makes CPVC double nail clamps better than standard UPVC clamps for hot water systems?',
      answer: 'CPVC double nail clamps are specifically engineered for hot water applications with heat-resistant CPVC material that withstands temperatures up to 93°C. Unlike standard UPVC clamps that may deform at high temperatures, our CPVC dual fastening clamps maintain structural integrity and provide stable support even during thermal expansion cycles. The double nail design offers 40% more holding power, essential for hot water pipes that experience constant thermal stress.'
    },
    {
      question: 'What pipe sizes are compatible with JK Industries CPVC double nail clamps?',
      answer: 'JK Industries CPVC double nail clamps are available in a comprehensive range of sizes from 15mm (1/2 inch) to 50mm (2 inch) diameter, compatible with all standard CPVC pipe systems used in residential and commercial hot water installations. Our sizes include 15mm, 20mm, 25mm, 32mm, 40mm, and 50mm. Custom sizes can also be manufactured upon request for specialized applications.'
    },
    {
      question: 'Are CPVC double nail clamps suitable for outdoor hot water installations?',
      answer: 'Yes, our CPVC double nail clamps are manufactured with UV-stabilized heat-resistant material that provides excellent resistance to outdoor conditions. They can withstand prolonged exposure to sunlight, rain, and temperature variations from 0°C to 93°C without degradation. This makes them ideal for outdoor solar water heater installations, external hot water lines, and exposed plumbing applications.'
    },
    {
      question: 'What is the load capacity of JK Industries CPVC double nail clamps?',
      answer: 'JK Industries CPVC double nail clamps offer exceptional load capacity of up to 75kg depending on the size, which is significantly higher than standard single-nail clamps. This superior strength comes from the innovative dual fastening system and fiberglass-reinforced CPVC material, ensuring reliable support for water-filled hot pipes and systems with thermal cycling.'
    },
    {
      question: 'How do I install CPVC double nail clamps correctly for hot water applications?',
      answer: 'For proper installation of CPVC double nail clamps: 1) Mark the position ensuring proper pipe alignment, 2) Pre-drill pilot holes if mounting on hard surfaces, 3) Position the clamp and insert both nails, 4) Drive the nails fully using a hammer or power tool until flush, 5) Ensure the pipe sits securely without being compressed. For hot water applications, install clamps every 60-80cm to accommodate thermal expansion, and at each change of direction.'
    },
    {
      question: 'Where can I buy CPVC double nail clamps and metal clamps online in India?',
      answer: 'JK Industries is a leading manufacturer of CPVC double nail clamps, metal clamps, CPVC nail clamps, and CPVC pipe clamps in India. You can purchase our dual fastening clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India. Contact us for a quote on CPVC double nail clamps, metal clamps, and nail clamps.'
    },
    {
      question: 'What is the difference between CPVC nail clamps and metal clamps for hot water pipes?',
      answer: 'CPVC nail clamps are made from heat-resistant CPVC material that can withstand temperatures up to 93°C, making them ideal for hot water pipe systems. They are lightweight, corrosion-resistant, and provide thermal insulation. Metal clamps offer higher strength but may conduct heat and require insulation for hot water applications. Our CPVC double nail clamps combine heat resistance with dual fastening strength, offering the best of both worlds for hot water plumbing.'
    },
    {
      question: 'Can CPVC double nail clamps be used in chemical processing applications?',
      answer: 'Yes, our CPVC double nail clamps have excellent chemical resistance, making them suitable for chemical processing, pharmaceutical, and food processing applications. CPVC material resists chlorine, acids, bases, and many industrial chemicals. The dual nail fastening system ensures secure mounting even in environments with chemical exposure and elevated temperatures.'
    },
    {
      question: 'Do you offer bulk wholesale pricing for CPVC double nail clamps?',
      answer: 'Yes, as a direct manufacturer (JK Industries), we offer competitive wholesale pricing for bulk orders of CPVC double nail clamps, nail clamps, metal clamps, and CPVC pipe clamps. We provide significant discounts for large quantity orders and can arrange direct factory delivery across India. Contact us for bulk pricing on dual fastening clamps and heat-resistant pipe supports.'
    },
    {
      question: 'Why choose JK Industries for CPVC double nail clamps and pipe clamps?',
      answer: 'JK Industries (Edler Clamp brand) is India\'s trusted manufacturer of CPVC double nail clamps, metal clamps, CPVC nail clamps, and pipe support systems. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our CPVC nail clamps are manufactured using premium heat-resistant materials ensuring superior quality, durability, and performance in hot water applications.'
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
    this.titleService.setTitle('CPVC Double Nail Clamp | Metal Clamp | CPVC Nail Clamp | Dual Fastening Clamp | CPVC Pipe Clamp Manufacturer | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of CPVC Double Nail Clamps, Metal Clamps, CPVC Nail Clamps, Dual Fastening Clamps & CPVC Pipe Clamps. Premium Heat-Resistant Nail Clamps with 40% more holding power for hot water systems. ISO Certified. Best Prices. Buy Direct from Factory in Rajkot, Gujarat.' },
      { name: 'keywords', content: 'CPVC double nail clamp, Metal clamp, CPVC nail clamp, dual fastening clamp, CPVC pipe clamp, nail clamp, double nail clamp, CPVC clamp, pipe clamp, heat resistant pipe clamp, hot water pipe clamp, dual nail clamp, CPVC pipe holder, nail clamp manufacturer, CPVC clamp manufacturer India, double fastening clamp, CPVC mounting clamp, pipe support clamp, plumbing clamp, CPVC nail clamp Rajkot, dual fastening pipe support, hot water pipe support' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Article meta tags
      { property: 'article:published_time', content: '2024-01-15T10:00:00+05:30' },
      { property: 'article:modified_time', content: '2026-01-07T10:00:00+05:30' },
      { property: 'article:section', content: 'Plumbing Products' },
      { property: 'article:tag', content: 'CPVC Double Nail Clamp' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'CPVC Nail Clamp' },
      { property: 'article:tag', content: 'Nail Clamp' },
      
      // Product meta tags
      { property: 'product:price:amount', content: '1.00' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'CPVC Double Nail Clamp | Metal Clamp | CPVC Nail Clamp | Dual Fastening Clamp Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of CPVC Double Nail Clamps, Metal Clamps, CPVC Nail Clamps & Dual Fastening Clamps. Premium Heat-Resistant Nail Clamps with 40% more holding power. ISO Certified.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg' },
      { property: 'og:image:width', content: '6720' },
      { property: 'og:image:height', content: '4480' },
      { property: 'og:image:alt', content: 'CPVC Double Nail Clamp - Premium Heat-Resistant Dual Fastening Pipe Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'CPVC Double Nail Clamp | Metal Clamp | CPVC Nail Clamp Manufacturer' },
      { name: 'twitter:description', content: 'Premium CPVC Double Nail Clamps with dual fastening system for hot water applications. 40% more holding power. Metal Clamps, CPVC Nail Clamps & Pipe Clamps. ISO Certified. Buy Direct from Factory.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'CPVC Double Nail Clamp - Premium Heat-Resistant Dual Fastening Pipe Clamp' }
    ]);
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(CPVC_DN_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(CPVC_DN_PRODUCT_SCHEMA, ''));
      return;
    }

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "CPVC Clamp, Metal Clamp, Nail Clamp, Pipe Clamp, Hot Water Pipe Clamp, Clips, Clamps",
      "name": "CPVC Double Nail Clamp | Metal Clamp | CPVC Nail Clamp | Dual Fastening Clamp | CPVC Pipe Clamp",
      "url": "https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg"
      ],
      "description": "JK Industries manufactures premium CPVC Double Nail Clamps with innovative dual fastening system providing 40% more holding power than standard nail clamps. Our Heat-Resistant Metal Clamps, CPVC Nail Clamps, and Dual Fastening Clamps are ideal for hot water systems, residential, commercial plumbing, and industrial applications. CPVC Pipe Clamps available in sizes 15mm to 50mm with temperature rating up to 93°C.",
      "sku": "CPVC-DN-001",
      "mpn": "JK-CPVCDN-001",
      "gtin13": "8901234567891",
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
      "alternateName": ["CPVC double nail clamp", "Metal clamp", "CPVC nail clamp", "dual fastening clamp", "CPVC pipe clamp", "nail clamp", "double nail clamp", "heat resistant pipe clamp", "hot water pipe clamp", "dual nail clamp", "CPVC pipe holder", "CPVC mounting clamp", "plumbing clamp"],
      "material": ["Industrial-grade CPVC", "Thermal Stabilizers", "Fiberglass Reinforcement", "Heat-treated Carbon Steel Nails"],
      "color": "Cream",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp",
        "priceCurrency": "INR",
        "lowPrice": "1.00",
        "highPrice": "6.07",
        "offerCount": "6",
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
        "price": "1.00",
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
        "ratingCount": "142",
        "reviewCount": "87"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.author },
        "reviewBody": t.quote
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "CPVC Hot Water Piping System" },
      "width": {
        "@type": "QuantitativeValue",
        "value": "50",
        "unitCode": "MMT"
      },
      "height": {
        "@type": "QuantitativeValue",
        "value": "10",
        "unitCode": "MMT"
      },
      "weight": {
        "@type": "QuantitativeValue",
        "value": "38",
        "unitCode": "GRM"
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Material", "value": "Industrial-grade CPVC with thermal stabilizers and fiberglass reinforcement" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "15mm - 50mm Diameter" },
        { "@type": "PropertyValue", "name": "Nail Type", "value": "Heat-treated carbon steel with ceramic coating" },
        { "@type": "PropertyValue", "name": "Temperature Range", "value": "0°C to 93°C" },
        { "@type": "PropertyValue", "name": "Load Capacity", "value": "Up to 75kg (size dependent)" },
        { "@type": "PropertyValue", "name": "UV Resistance", "value": "High (8+ years outdoor exposure)" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, ISI Marked" },
        { "@type": "PropertyValue", "name": "Fastening Type", "value": "Dual Nail / Double Nail" },
        { "@type": "PropertyValue", "name": "Holding Power", "value": "40% more than standard clamps" },
        { "@type": "PropertyValue", "name": "Product Type", "value": "CPVC Heat-Resistant" },
        { "@type": "PropertyValue", "name": "Chemical Resistance", "value": "Excellent against chlorine and acidic water" }
      ],
      "hasVariant": this.productSizes.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch CPVC Nail Clamp`,
        "sku": size.sku,
        "size": `${size.size} / ${size.sizeInch} Inch`,
        "image": "https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg",
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
          { "@type": "PropertyValue", "name": "Pipe OD", "value": size.pipeOD },
          { "@type": "PropertyValue", "name": "Load Capacity", "value": size.loadCapacity },
          { "@type": "PropertyValue", "name": "Nail Length", "value": size.nailLength },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing Qty", "value": size.packingQty.toString() }
        ]
      }))
    };

    const schemaString = JSON.stringify(schema);
    this.transferState.set(CPVC_DN_PRODUCT_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(CPVC_DN_HOWTO_SCHEMA)) {
      this.addJsonLd(this.transferState.get(CPVC_DN_HOWTO_SCHEMA, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install CPVC Double Nail Clamps for Hot Water Systems",
      "description": "Step-by-step guide to properly install CPVC double nail clamps for secure hot water pipe mounting. Learn the correct technique for installing dual fastening clamps on CPVC pipes in hot water applications.",
      "image": "https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg",
      "totalTime": "PT12M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "CPVC Double Nail Clamps"
        },
        {
          "@type": "HowToSupply",
          "name": "Heat-treated Ceramic Coated Nails (included)"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Hammer or Power Drill"
        },
        {
          "@type": "HowToTool",
          "name": "Measuring Tape"
        },
        {
          "@type": "HowToTool",
          "name": "Pencil for Marking"
        },
        {
          "@type": "HowToTool",
          "name": "3mm Drill Bit (for hard surfaces)"
        }
      ],
      "step": this.installationSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "image": step.image,
        "url": `https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp#step-${index + 1}`
      }))
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(CPVC_DN_HOWTO_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(CPVC_DN_ITEMLIST_SCHEMA)) {
      this.addJsonLd(this.transferState.get(CPVC_DN_ITEMLIST_SCHEMA, ''));
      return;
    }

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "CPVC Double Nail Clamp Sizes - Available Variants",
      "description": "Complete range of CPVC double nail clamps available in sizes from 15mm to 50mm. Heat-resistant metal clamps, CPVC nail clamps, and dual fastening clamps for all hot water pipe diameters.",
      "numberOfItems": this.productSizes.length,
      "itemListElement": this.productSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch CPVC Nail Clamp`,
          "description": `Premium ${size.size} Inch (${size.size} MM) CPVC double nail clamp with heat-resistant dual fastening system. Load capacity: ${size.loadCapacity}. Nail length: ${size.nailLength}. Perfect for ${size.pipeOD} OD hot water pipes. Temperature rating up to 93°C.`,
          "sku": size.sku,
          "image": "https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "countryOfOrigin": {
            "@type": "Country",
            "name": "India"
          },
          "material": ["Industrial-grade CPVC", "Thermal Stabilizers", "Fiberglass Reinforcement", "Heat-treated Carbon Steel Nails"],
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "INR",
            "price": size.price.toString(),
            "itemCondition": "https://schema.org/NewCondition"
          }
        }
      }))
    };

    const schemaString = JSON.stringify(itemListSchema);
    this.transferState.set(CPVC_DN_ITEMLIST_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(CPVC_DN_WEBPAGE_SCHEMA)) {
      this.addJsonLd(this.transferState.get(CPVC_DN_WEBPAGE_SCHEMA, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp",
      "name": "CPVC Double Nail Clamp | Metal Clamp | CPVC Nail Clamp | Dual Fastening Clamp Manufacturer",
      "description": "India's #1 Manufacturer of CPVC Double Nail Clamps, Metal Clamps, CPVC Nail Clamps & Dual Fastening Clamps. Premium Heat-Resistant Nail Clamps with 40% more holding power for hot water systems. ISO Certified.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of CPVC clamps, metal clamps, and pipe support systems in India",
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
        "url": "https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg",
        "width": "6720",
        "height": "4480",
        "caption": "CPVC Double Nail Clamp - Premium Heat-Resistant Dual Fastening Pipe Clamp by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(CPVC_DN_WEBPAGE_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData() {
    if (this.transferState.hasKey(CPVC_DN_FAQ_SCHEMA)) {
      this.addJsonLd(this.transferState.get(CPVC_DN_FAQ_SCHEMA, ''));
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
    this.transferState.set(CPVC_DN_FAQ_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(CPVC_DN_BREADCRUMB_SCHEMA)) {
      this.addJsonLd(this.transferState.get(CPVC_DN_BREADCRUMB_SCHEMA, ''));
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
          "name": "CPVC Double Nail Clamp | Metal Clamp | CPVC Nail Clamp | Edler Clamp",
          "item": "https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp"
        }
      ]
    };

    const schemaString = JSON.stringify(breadcrumbSchema);
    this.transferState.set(CPVC_DN_BREADCRUMB_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBusinessStructuredData() {
    if (this.transferState.hasKey(CPVC_DN_BUSINESS_SCHEMA)) {
      this.addJsonLd(this.transferState.get(CPVC_DN_BUSINESS_SCHEMA, ''));
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
      "priceRange": "$$",
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
          "name": "CPVC Double Nail Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for CPVC Double Nail Clamps, Metal Clamps, CPVC Nail Clamps, and Dual Fastening Clamps for hot water applications",
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
    this.transferState.set(CPVC_DN_BUSINESS_SCHEMA, schemaString);
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
    alert('Our technical datasheet for CPVC Double Nail Clamps will be available for download soon!');
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
    alert('Thank you for your enquiry about CPVC Double Nail Clamps. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = { name: '', email: '', phone: '', company: '', quantity: null, message: '' };
    if (isPlatformBrowser(this.platform)) {
      this.document.body.style.overflow = 'auto';
    }
  }
}
