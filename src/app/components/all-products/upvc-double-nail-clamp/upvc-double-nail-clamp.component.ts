import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as Aos from 'aos';

// Define TransferState keys for SSR
const UPVC_DN_PRODUCT_SCHEMA = makeStateKey<string>('UPVC_DOUBLE_NAIL_CLAMP_PRODUCT_SCHEMA');
const UPVC_DN_BUSINESS_SCHEMA = makeStateKey<string>('UPVC_DOUBLE_NAIL_CLAMP_BUSINESS_SCHEMA');
const UPVC_DN_FAQ_SCHEMA = makeStateKey<string>('UPVC_DOUBLE_NAIL_CLAMP_FAQ_SCHEMA');
const UPVC_DN_BREADCRUMB_SCHEMA = makeStateKey<string>('UPVC_DOUBLE_NAIL_CLAMP_BREADCRUMB_SCHEMA');
const UPVC_DN_HOWTO_SCHEMA = makeStateKey<string>('UPVC_DOUBLE_NAIL_CLAMP_HOWTO_SCHEMA');
const UPVC_DN_ITEMLIST_SCHEMA = makeStateKey<string>('UPVC_DOUBLE_NAIL_CLAMP_ITEMLIST_SCHEMA');
const UPVC_DN_WEBPAGE_SCHEMA = makeStateKey<string>('UPVC_DOUBLE_NAIL_CLAMP_WEBPAGE_SCHEMA');

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
  selector: 'app-upvc-double-nail-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './upvc-double-nail-clamp.component.html',
  styleUrl: './upvc-double-nail-clamp.component.scss'
})
export class UpvcDoubleNailClampComponent implements OnInit, AfterViewInit {
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

  // Product sizes for ItemList schema and size table
  productSizes: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', pipeOD: '15mm', price: 1.08, qtyPcs: 100, packingQty: 5000, loadCapacity: '25kg', nailLength: '25mm', sku: 'UPVC-DN-15' },
    { size: '20mm', sizeInch: '3/4', pipeOD: '20mm', price: 1.74, qtyPcs: 100, packingQty: 3000, loadCapacity: '35kg', nailLength: '30mm', sku: 'UPVC-DN-20' },
    { size: '25mm', sizeInch: '1', pipeOD: '25mm', price: 2.29, qtyPcs: 100, packingQty: 2000, loadCapacity: '45kg', nailLength: '35mm', sku: 'UPVC-DN-25' },
    { size: '32mm', sizeInch: '1 1/4', pipeOD: '32mm', price: 3.13, qtyPcs: 50, packingQty: 1300, loadCapacity: '55kg', nailLength: '40mm', sku: 'UPVC-DN-32' },
    { size: '40mm', sizeInch: '1 1/2', pipeOD: '40mm', price: 4.41, qtyPcs: 50, packingQty: 1000, loadCapacity: '65kg', nailLength: '45mm', sku: 'UPVC-DN-40' },
    { size: '50mm', sizeInch: '2', pipeOD: '50mm', price: 6.63, qtyPcs: 25, packingQty: 700, loadCapacity: '70kg', nailLength: '50mm', sku: 'UPVC-DN-50' }
  ];

  // Related products for internal linking
  relatedProducts: RelatedProduct[] = [
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
    },
    {
      name: 'Sprinkler Clamp',
      image: 'assets/products/sprinkler-clamp.jpg',
      link: '/products/sprinkler-clamp',
      description: 'Specialized clamps for fire sprinkler and irrigation systems'
    },
    {
      name: 'Golden Metal Clamp',
      image: 'assets/products/golden-metal-clamp.jpg',
      link: '/products/golden-metal-clamp',
      description: 'Luxury gold-plated clamps for decorative plumbing installations'
    }
  ];

  // Installation steps for HowTo schema
  installationSteps = [
    {
      name: 'Preparation',
      text: 'Mark the position ensuring proper pipe alignment and spacing (recommended every 80-100cm for horizontal runs)',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg'
    },
    {
      name: 'Pre-drilling',
      text: 'For hard surfaces, pre-drill pilot holes using a 3mm drill bit to prevent splitting and ensure accurate nail placement',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg'
    },
    {
      name: 'Positioning',
      text: 'Place the clamp against the mounting surface, ensuring both nail guides are properly aligned with the marked positions',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg'
    },
    {
      name: 'Fastening',
      text: 'Insert both hardened steel nails and drive them simultaneously using a hammer or power tool until flush with the clamp surface',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the pipe sits securely in the clamp without being compressed, ensuring proper movement allowance for thermal expansion',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg'
    }
  ];

  features: Feature[] = [
    {
      icon: 'lock',
      title: 'Dual Fastening System',
      description: 'Patented double nail design provides twice the holding power of standard clamps, ensuring maximum stability and preventing pipe movement even under high pressure conditions.'
    },
    {
      icon: 'shield-alt',
      title: 'Reinforced Structure',
      description: 'Fiberglass-reinforced UPVC material with strategically designed stress distribution points delivers superior load capacity up to 85kg depending on size.'
    },
    {
      icon: 'tools',
      title: 'Easy Installation',
      description: 'Hammer-driven or power tool compatible design with pre-positioned nail guides enables quick and precise mounting, reducing installation time by up to 40%.'
    },
    {
      icon: 'sun',
      title: 'UV & Weather Resistant',
      description: 'UV-stabilized UPVC material maintains structural integrity and appearance even after years of outdoor exposure, ideal for exterior plumbing applications.'
    },
    {
      icon: 'compress-arrows-alt',
      title: 'Superior Grip Technology',
      description: 'Precision-molded inner surface ensures secure pipe holding without scratching or damaging pipe surface, reducing vibration noise in water systems.'
    },
    {
      icon: 'check-double',
      title: 'Quality Certified',
      description: 'ISO 9001:2015 certified manufacturing ensures consistent quality with exact dimensions for perfect pipe fit every time across all sizes.'
    }
  ];

  applications: Application[] = [
    {
      icon: 'home',
      title: 'Residential Plumbing',
      description: 'Perfect for securing UPVC pipes in home plumbing systems, providing reliable dual-point support for water supply and drainage lines with enhanced stability.'
    },
    {
      icon: 'building',
      title: 'Commercial Construction',
      description: 'Ideal for large-scale commercial plumbing installations where reliability, load capacity, and system integrity are critical requirements.'
    },
    {
      icon: 'tint',
      title: 'Irrigation Systems',
      description: 'Superior support for outdoor irrigation piping with excellent UV resistance and weather protection for long-term reliability in exposed conditions.'
    },
    {
      icon: 'industry',
      title: 'Industrial Applications',
      description: 'Enhanced stability for industrial plastic piping systems subject to vibration, pressure fluctuations, or heavy loads in manufacturing facilities.'
    },
    {
      icon: 'fire-extinguisher',
      title: 'Fire Safety Lines',
      description: 'Reliable support for fire safety water lines with dual fastening points providing secure mounting in critical emergency systems.'
    },
    {
      icon: 'warehouse',
      title: 'HVAC Installations',
      description: 'Excellent for supporting drain lines and condensate pipes in heating, ventilation, and air conditioning systems requiring stable mounting.'
    }
  ];

  specifications: Spec[] = [
    { label: 'Material', value: 'High-impact UPVC with fiberglass reinforcement' },
    { label: 'Size Range', value: '15mm to 50mm diameter' },
    { label: 'Nail Type', value: 'Hardened steel with anti-corrosion coating' },
    { label: 'Temperature Rating', value: '-5°C to 60°C' },
    { label: 'Load Capacity', value: 'Up to 85kg (size dependent)' },
    { label: 'Installation Method', value: 'Hammer-driven or power tool compatible' },
    { label: 'Color Options', value: 'White (standard), Custom colors available' },
    { label: 'UV Resistance', value: 'High (10+ years outdoor exposure)' },
    { label: 'Recommended Spacing', value: '80-100cm for horizontal runs' },
    { label: 'Certification', value: 'ISO 9001:2015, ISI Marked' }
  ];

  whyChoose = [
    {
      title: 'Superior Stability',
      description: 'Dual nail design provides up to 40% more holding power than standard single-nail clamps for unmatched pipe support.'
    },
    {
      title: 'Enhanced Load Distribution',
      description: 'Reinforced structure prevents wall damage and ensures long-term reliability even in high-stress installations.'
    },
    {
      title: 'Vibration Resistant',
      description: 'Dual fastening points minimize pipe movement and reduce noise from water hammer in plumbing systems.'
    },
    {
      title: 'Precision Manufacturing',
      description: 'Consistent quality with exact dimensions for perfect pipe fit every time, manufactured by JK Industries.'
    },
    {
      title: 'Comprehensive Size Range',
      description: 'Available in all standard pipe diameters from 15mm to 50mm with custom sizes on request.'
    }
  ];

  testimonials = [
    {
      quote: 'JK Industries UPVC double nail clamps have been a game-changer for our residential plumbing projects. The dual fastening system provides unmatched stability, and we have seen significantly fewer callbacks since switching to these clamps.',
      author: 'Suresh Patel',
      role: ''
    },
    {
      quote: 'We have been using these double nail clamps for commercial construction projects for over 2 years. The quality is exceptional, and the enhanced holding power is exactly what we need for large-scale installations.',
      author: 'Ramesh Kumar',
      role: ''
    },
    {
      quote: 'The UV resistance of these UPVC nail clamps is outstanding. We use them for outdoor irrigation systems, and they maintain their strength and appearance even after years of exposure.',
      author: 'Vijay Sharma',
      role: ''
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'What are the advantages of UPVC double nail clamps over standard nail clamps?',
      answer: 'UPVC double nail clamps offer superior stability with their dual fastening system, distributing load more evenly and preventing pipe movement. They provide up to 40% more holding strength than standard single-nail clamps, making them ideal for high-pressure systems and areas with vibration. The reinforced mounting points also reduce the risk of wall damage during installation and long-term use.'
    },
    {
      question: 'What pipe sizes are compatible with JK Industries UPVC double nail clamps?',
      answer: 'JK Industries UPVC double nail clamps are available in a comprehensive range of sizes from 15mm to 50mm diameter, making them compatible with all standard UPVC pipe systems used in residential and commercial plumbing installations. Custom sizes can also be manufactured upon request for specialized applications.'
    },
    {
      question: 'Are UPVC double nail clamps suitable for outdoor installations?',
      answer: 'Yes, our UPVC double nail clamps are manufactured with high-impact UPVC material containing UV stabilizers, making them highly resistant to weathering, UV radiation, and temperature fluctuations. They maintain their structural integrity and appearance even after years of outdoor exposure, making them ideal for exterior plumbing, irrigation systems, and outdoor installations.'
    },
    {
      question: 'What is the load capacity of JK Industries UPVC double nail clamps?',
      answer: 'JK Industries UPVC double nail clamps offer exceptional load capacity of up to 85kg depending on the size, which is significantly higher than standard single-nail clamps. This superior strength comes from the innovative dual fastening system and fiberglass-reinforced UPVC material, ensuring reliable support even for water-filled pipes and systems with vibration.'
    },
    {
      question: 'How do I install UPVC double nail clamps correctly?',
      answer: 'For proper installation of UPVC double nail clamps: 1) Mark the position ensuring proper pipe alignment, 2) Pre-drill pilot holes if mounting on hard surfaces, 3) Position the clamp and insert both nails, 4) Drive the nails fully using a hammer or power tool until flush with the clamp surface, 5) Check that the pipe sits securely in the clamp without being compressed. For optimal support, install clamps every 80-100cm along horizontal runs and at each change of direction.'
    },
    {
      question: 'Where can I buy UPVC double nail clamps and nail clamps online in India?',
      answer: 'JK Industries is a leading manufacturer of UPVC double nail clamps, nail clamps, and pipe clamps in India. You can purchase our dual fastening clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India. Contact us for a quote on UPVC double nail clamps, metal clamps, and UPVC pipe clamps.'
    },
    {
      question: 'What is the difference between UPVC nail clamps and metal clamps?',
      answer: 'UPVC nail clamps are made from high-impact plastic material with UV stabilizers, making them lightweight, corrosion-resistant, and ideal for plastic pipe systems. Metal clamps offer higher strength and are suitable for heavy-duty applications. Our UPVC double nail clamps combine the best of both worlds with a dual fastening system that provides metal-like strength with UPVC convenience.'
    },
    {
      question: 'Are UPVC double nail clamps suitable for CPVC hot water lines?',
      answer: 'Yes, our UPVC double nail clamps are designed to handle temperature ranges from -5°C to 60°C, making them suitable for both cold water and moderate hot water applications. For very high-temperature CPVC lines, we recommend checking our CPVC-specific clamp range or consulting our technical team for the best solution.'
    },
    {
      question: 'Do you offer bulk wholesale pricing for UPVC double nail clamps?',
      answer: 'Yes, as a direct manufacturer (JK Industries), we offer competitive wholesale pricing for bulk orders of UPVC double nail clamps, nail clamps, and UPVC pipe clamps. We provide significant discounts for large quantity orders and can arrange direct factory delivery across India. Contact us for bulk pricing on dual fastening clamps.'
    },
    {
      question: 'Why choose JK Industries for UPVC double nail clamps?',
      answer: 'JK Industries (Edler Clamp brand) is India\'s trusted manufacturer of UPVC double nail clamps, metal clamps, and pipe support systems. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our UPVC nail clamps are manufactured using premium materials ensuring superior quality and durability.'
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
    this.titleService.setTitle('UPVC Double Nail Clamp | Metal Clamp | UPVC Nail Clamp | Dual Fastening Clamp | UPVC Pipe Clamp Manufacturer | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of UPVC Double Nail Clamps, Metal Clamps, UPVC Nail Clamps, Dual Fastening Clamps & UPVC Pipe Clamps. Premium Nail Clamps with 40% more holding power. ISO Certified. Best Prices. Buy Direct from Factory in Rajkot, Gujarat.' },
      { name: 'keywords', content: 'UPVC double nail clamp, Metal clamp, UPVC nail clamp, dual fastening clamp, UPVC pipe clamp, nail clamp, double nail clamp, UPVC clamp, pipe clamp, plastic pipe clamp, plastic clamp, dual nail clamp, UPVC pipe holder, nail clamp manufacturer, UPVC clamp manufacturer India, double fastening clamp, UPVC mounting clamp, pipe support clamp, plumbing clamp, UPVC nail clamp Rajkot, dual fastening pipe support' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/upvc-double-nail-clamp' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Article meta tags
      { property: 'article:published_time', content: '2024-01-15T10:00:00+05:30' },
      { property: 'article:modified_time', content: '2026-01-07T10:00:00+05:30' },
      { property: 'article:section', content: 'Plumbing Products' },
      { property: 'article:tag', content: 'UPVC Double Nail Clamp' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'UPVC Nail Clamp' },
      { property: 'article:tag', content: 'Nail Clamp' },
      
      // Product meta tags
      { property: 'product:price:amount', content: '1.08' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'UPVC Double Nail Clamp | Metal Clamp | UPVC Nail Clamp | Dual Fastening Clamp Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of UPVC Double Nail Clamps, Metal Clamps, UPVC Nail Clamps & Dual Fastening Clamps. Premium Nail Clamps with 40% more holding power. ISO Certified.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg' },
      { property: 'og:image:width', content: '6720' },
      { property: 'og:image:height', content: '4480' },
      { property: 'og:image:alt', content: 'UPVC Double Nail Clamp - Premium Dual Fastening Pipe Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/upvc-double-nail-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'UPVC Double Nail Clamp | Metal Clamp | UPVC Nail Clamp Manufacturer' },
      { name: 'twitter:description', content: 'Premium UPVC Double Nail Clamps with dual fastening system. 40% more holding power. Metal Clamps, UPVC Nail Clamps & Pipe Clamps. ISO Certified. Buy Direct from Factory.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'UPVC Double Nail Clamp - Premium Dual Fastening Pipe Clamp' }
    ]);
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(UPVC_DN_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(UPVC_DN_PRODUCT_SCHEMA, ''));
      return;
    }

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "UPVC Clamp, Metal Clamp, Nail Clamp, Pipe Clamp, Clips, Clamps",
      "name": "UPVC Double Nail Clamp | Metal Clamp | UPVC Nail Clamp | Dual Fastening Clamp | UPVC Pipe Clamp",
      "url": "https://jkindustriesrajkot.com/products/upvc-double-nail-clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg"
      ],
      "description": "JK Industries manufactures premium UPVC Double Nail Clamps with innovative dual fastening system providing 40% more holding power than standard nail clamps. Our Metal Clamps, UPVC Nail Clamps, and Dual Fastening Clamps are ideal for residential, commercial plumbing, and industrial applications. UPVC Pipe Clamps available in sizes 15mm to 50mm.",
      "sku": "UPVC-DN-001",
      "mpn": "JK-UPVCDN-001",
      "gtin13": "8901234567890",
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
      "alternateName": ["UPVC double nail clamp", "Metal clamp", "UPVC nail clamp", "dual fastening clamp", "UPVC pipe clamp", "nail clamp", "double nail clamp", "plastic pipe clamp", "dual nail clamp", "UPVC pipe holder", "UPVC mounting clamp", "plumbing clamp"],
      "material": ["High-impact UPVC", "Fiberglass Reinforcement", "Hardened Steel Nails"],
      "color": "White",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/upvc-double-nail-clamp",
        "priceCurrency": "INR",
        "lowPrice": "1.08",
        "highPrice": "6.63",
        "offerCount": "10",
        "price": "1.08",
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
        "ratingValue": "4.8",
        "ratingCount": "156",
        "reviewCount": "89"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.author },
        "reviewBody": t.quote
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "UPVC/CPVC Piping System" },
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
        "value": "35",
        "unitCode": "GRM"
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Material", "value": "High-impact UPVC with fiberglass reinforcement" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "15mm - 50mm Diameter" },
        { "@type": "PropertyValue", "name": "Nail Type", "value": "Hardened steel with anti-corrosion coating" },
        { "@type": "PropertyValue", "name": "Temperature Range", "value": "-5°C to 60°C" },
        { "@type": "PropertyValue", "name": "Load Capacity", "value": "Up to 85kg (size dependent)" },
        { "@type": "PropertyValue", "name": "UV Resistance", "value": "High (10+ years outdoor exposure)" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, ISI Marked" },
        { "@type": "PropertyValue", "name": "Fastening Type", "value": "Dual Nail / Double Nail" },
        { "@type": "PropertyValue", "name": "Holding Power", "value": "40% more than standard clamps" },
        { "@type": "PropertyValue", "name": "Product Type", "value": "UPVC" }
      ]
    };

    const schemaString = JSON.stringify(schema);
    this.transferState.set(UPVC_DN_PRODUCT_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(UPVC_DN_HOWTO_SCHEMA)) {
      this.addJsonLd(this.transferState.get(UPVC_DN_HOWTO_SCHEMA, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install UPVC Double Nail Clamps",
      "description": "Step-by-step guide to properly install UPVC double nail clamps for secure pipe mounting. Learn the correct technique for installing dual fastening clamps on UPVC and CPVC pipes.",
      "image": "https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg",
      "totalTime": "PT10M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "UPVC Double Nail Clamps"
        },
        {
          "@type": "HowToSupply",
          "name": "Hardened Steel Nails (included)"
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
        "url": `https://jkindustriesrajkot.com/products/upvc-double-nail-clamp#step-${index + 1}`
      }))
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(UPVC_DN_HOWTO_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(UPVC_DN_ITEMLIST_SCHEMA)) {
      this.addJsonLd(this.transferState.get(UPVC_DN_ITEMLIST_SCHEMA, ''));
      return;
    }

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "UPVC Double Nail Clamp Sizes - Available Variants",
      "description": "Complete range of UPVC double nail clamps available in sizes from 15mm to 50mm. Metal clamps, UPVC nail clamps, and dual fastening clamps for all pipe diameters.",
      "numberOfItems": this.productSizes.length,
      "itemListElement": this.productSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch UPVC Nail Clamp`,
          "description": `Premium ${size.size} Inch (${size.size} MM) UPVC double nail clamp with dual fastening system. Load capacity: ${size.loadCapacity}. Nail length: ${size.nailLength}. Perfect for ${size.pipeOD} OD pipes.`,
          "sku": size.sku,
          "image": "https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "countryOfOrigin": {
            "@type": "Country",
            "name": "India"
          },
          "material": ["High-impact UPVC", "Fiberglass Reinforcement", "Hardened Steel Nails"],
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
            },
            
          }
        }
      }))
    };

    const schemaString = JSON.stringify(itemListSchema);
    this.transferState.set(UPVC_DN_ITEMLIST_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(UPVC_DN_WEBPAGE_SCHEMA)) {
      this.addJsonLd(this.transferState.get(UPVC_DN_WEBPAGE_SCHEMA, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/upvc-double-nail-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/upvc-double-nail-clamp",
      "name": "UPVC Double Nail Clamp | Metal Clamp | UPVC Nail Clamp | Dual Fastening Clamp Manufacturer",
      "description": "India's #1 Manufacturer of UPVC Double Nail Clamps, Metal Clamps, UPVC Nail Clamps & Dual Fastening Clamps. Premium Nail Clamps with 40% more holding power. ISO Certified.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of UPVC clamps, metal clamps, and pipe support systems in India",
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
        "url": "https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg",
        "width": "6720",
        "height": "4480",
        "caption": "UPVC Double Nail Clamp - Premium Dual Fastening Pipe Clamp by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(UPVC_DN_WEBPAGE_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData() {
    if (this.transferState.hasKey(UPVC_DN_FAQ_SCHEMA)) {
      this.addJsonLd(this.transferState.get(UPVC_DN_FAQ_SCHEMA, ''));
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
    this.transferState.set(UPVC_DN_FAQ_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(UPVC_DN_BREADCRUMB_SCHEMA)) {
      this.addJsonLd(this.transferState.get(UPVC_DN_BREADCRUMB_SCHEMA, ''));
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
          "name": "UPVC Double Nail Clamp | Metal Clamp | UPVC Nail Clamp | Edler Clamp",
          "item": "https://jkindustriesrajkot.com/products/upvc-double-nail-clamp"
        }
      ]
    };

    const schemaString = JSON.stringify(breadcrumbSchema);
    this.transferState.set(UPVC_DN_BREADCRUMB_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBusinessStructuredData() {
    if (this.transferState.hasKey(UPVC_DN_BUSINESS_SCHEMA)) {
      this.addJsonLd(this.transferState.get(UPVC_DN_BUSINESS_SCHEMA, ''));
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
          "name": "UPVC Double Nail Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for UPVC Double Nail Clamps, Metal Clamps, UPVC Nail Clamps, and Dual Fastening Clamps",
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
    this.transferState.set(UPVC_DN_BUSINESS_SCHEMA, schemaString);
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
    alert('Our technical datasheet for UPVC Double Nail Clamps will be available for download soon!');
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
    alert('Thank you for your enquiry about UPVC Double Nail Clamps. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = { name: '', email: '', phone: '', company: '', quantity: null, message: '' };
    if (isPlatformBrowser(this.platform)) {
      this.document.body.style.overflow = 'auto';
    }
  }
}
