import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID, Inject, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as Aos from 'aos';

// Define TransferState keys
const STEP_CLAMP_PRODUCT_SCHEMA = makeStateKey<string>('STEP_CLAMP_PRODUCT_SCHEMA');
const STEP_CLAMP_BUSINESS_SCHEMA = makeStateKey<string>('STEP_CLAMP_BUSINESS_SCHEMA');
const STEP_CLAMP_FAQ_SCHEMA = makeStateKey<string>('STEP_CLAMP_FAQ_SCHEMA');
const STEP_CLAMP_BREADCRUMB_SCHEMA = makeStateKey<string>('STEP_CLAMP_BREADCRUMB_SCHEMA');
const STEP_CLAMP_HOWTO_SCHEMA = makeStateKey<string>('STEP_CLAMP_HOWTO_SCHEMA');
const STEP_CLAMP_ITEMLIST_SCHEMA = makeStateKey<string>('STEP_CLAMP_ITEMLIST_SCHEMA');
const STEP_CLAMP_WEBPAGE_SCHEMA = makeStateKey<string>('STEP_CLAMP_WEBPAGE_SCHEMA');

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
  selector: 'app-step-clamp',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './step-clamp.component.html',
  styleUrl: './step-clamp.component.scss'
})
export class StepClampComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  
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

  // Product sizes for Step Clamp 1.2MM
  productSizes1_2MM: ProductSize[] = [
    { size: '65mm', sizeInch: '2 1/2', price: 7.50, qtyPcs: 100, packingQty: 2000, sku: 'STP-1.2MM-65' },
    { size: '110mm', sizeInch: '4', price: 9.40, qtyPcs: 100, packingQty: 2000, sku: 'STP-1.2MM-110' }
  ];

  // Product sizes for Step Clamp 1.5MM
  productSizes1_5MM: ProductSize[] = [
    { size: '65mm', sizeInch: '2 1/2', price: 9.00, qtyPcs: 100, packingQty: 2000, sku: 'STP-1.5MM-65' },
    { size: '110mm', sizeInch: '4', price: 11.59, qtyPcs: 100, packingQty: 2000, sku: 'STP-1.5MM-110' }
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
      name: 'Nail Clamp',
      image: 'assets/products/nail-clamp.jpg',
      link: '/products/nail-clamp',
      description: 'Superior grip strength nail clamps for construction and industrial applications'
    },
    {
      name: 'Silver Metal Clamp',
      image: 'assets/products/upvc-metal-clamp.jpg',
      link: '/products/silver-metal-clamp',
      description: 'Premium silver-plated clamps for modern installations'
    },
    {
      name: 'Golden Metal Clamp',
      image: 'assets/products/golden-metal-clamp.jpg',
      link: '/products/golden-metal-clamp',
      description: 'Luxury gold-plated clamps for decorative plumbing installations'
    },
    {
      name: 'UPVC Double Nail Clamp',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      link: '/products/upvc-double-nail-clamp',
      description: 'Premium dual fastening UPVC nail clamps with 40% more holding power'
    }
  ];

  // Installation steps for HowTo schema
  installationSteps = [
    {
      name: 'Preparation',
      text: 'Mark the position ensuring proper pipe alignment and spacing (recommended every 80-100cm for horizontal runs). Ensure the mounting surface is clean and free from debris.',
      image: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg'
    },
    {
      name: 'Pre-drilling',
      text: 'For hard surfaces like concrete or brick, pre-drill pilot holes using a 3mm drill bit to ensure accurate placement and prevent surface cracking.',
      image: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg'
    },
    {
      name: 'Positioning',
      text: 'Place the step clamp against the mounting surface, ensuring proper alignment with the marked position. Verify the clamp size matches your pipe diameter requirements.',
      image: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg'
    },
    {
      name: 'Fastening',
      text: 'Secure the step clamp using appropriate fasteners (screws or bolts) until the clamp is firmly attached to the mounting surface. Ensure the clamp is flush and secure.',
      image: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the pipe sits securely in the appropriate step of the clamp without being compressed, ensuring proper movement allowance for thermal expansion. Verify the installation is stable.',
      image: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg'
    }
  ];

  features: Feature[] = [
    {
      icon: 'cubes',
      title: 'Multi-Size Compatibility',
      description: 'Innovative stepped design allows a single clamp to securely hold multiple pipe diameters, significantly reducing inventory requirements.'
    },
    {
      icon: 'wrench',
      title: 'Rapid Installation',
      description: 'Engineered for quick mounting, our step clamps reduce installation time by up to 60% compared to traditional single-size clamps.'
    },
    {
      icon: 'cogs',
      title: 'Precision Engineering',
      description: 'Manufactured with tight tolerances to ensure a perfect fit for all step sizes, providing slip-free support for pipes and conduits.'
    },
    {
      icon: 'balance-scale',
      title: 'Superior Load Distribution',
      description: 'Optimized structural design evenly distributes weight and stress, preventing pipe deformation and ensuring long-term system integrity.'
    },
    {
      icon: 'shield-alt',
      title: 'Corrosion Resistance',
      description: 'Available in galvanized and stainless steel options to provide excellent durability in industrial and outdoor environments.'
    },
    {
      icon: 'check-double',
      title: 'Vibration Control',
      description: 'Robust construction minimizes pipe vibration and noise, making them ideal for hydraulic and high-pressure systems.'
    }
  ];

  applications: Application[] = [
    {
      icon: 'industry',
      title: 'Industrial Piping',
      description: 'Ideal for manufacturing facilities requiring versatile mounting solutions for complex piping networks.'
    },
    {
      icon: 'building',
      title: 'Commercial Construction',
      description: 'Perfect for HVAC, plumbing, and electrical conduit installations where multiple sizes are used.'
    },
    {
      icon: 'water',
      title: 'Hydraulic Systems',
      description: 'Provides secure, vibration-resistant mounting for high-pressure hydraulic lines in machinery.'
    },
    {
      icon: 'solar-panel',
      title: 'Renewable Energy',
      description: 'Used in solar and wind energy projects for securing diverse cabling and conduit sizes.'
    },
    {
      icon: 'oil-can',
      title: 'Oil & Gas',
      description: 'Heavy-duty step clamps suitable for the demanding conditions of oil and gas infrastructure.'
    },
    {
      icon: 'bolt',
      title: 'Electrical Instrumentation',
      description: 'Reliable support for instrument tubing and electrical conduits in process plants.'
    }
  ];

  specifications: Spec[] = [
    { label: 'Material Options', value: 'Galvanized Steel, Stainless Steel (304/316), Carbon Steel' },
    { label: 'Step Size Ranges', value: '75mm, 110mm (Custom Sizes Available)' },
    { label: 'Surface Finish', value: 'Hot-Dip Galvanized, Electro-Galvanized, Polished' },
    { label: 'Temperature Range', value: '-30°C to 120°C (Standard), Up to 550°C (High-Temp)' },
    { label: 'Load Capacity', value: '30-50 kg (Size Dependent)' },
    { label: 'Mounting Options', value: 'Wall Mount, Channel Mount, Strut Mount' },
    { label: 'Certification', value: 'ISO 9001:2015, CE Compliant' },
    { label: 'Application Standards', value: 'DIN 3015, EN 10242' }
  ];

  whyChoose = [
    {
      title: 'Inventory Efficiency',
      description: 'Replace multiple specific-size clamps with our versatile step clamps, reducing stock codes and warehouse space by up to 70%.'
    },
    {
      title: 'Direct Manufacturer Pricing',
      description: 'Get the best rates for high-quality metal clamps by buying directly from JK Industries, India\'s leading clamp manufacturer.'
    },
    {
      title: 'Custom Engineering',
      description: 'We can design and manufacture bespoke step clamps with specific step increments to match your unique project requirements.'
    },
    {
      title: 'Ready Stock Availability',
      description: 'We maintain a large inventory of standard step clamps to ensure rapid delivery for urgent construction and maintenance projects.'
    },
    {
      title: 'ISO 9001:2015 Certified',
      description: 'Our manufacturing processes adhere to strict international quality standards, guaranteeing consistent performance in every batch.'
    }
  ];

  testimonials = [
    {
      quote: "JK Industries' step clamps have revolutionized our site inventory. We now carry fewer parts but can cover more pipe sizes. The quality and finish are excellent for our industrial projects.",
      author: 'Manish Patel',
      role: 'Project Manager'
    },
    {
      quote: "These metal clamps are a game-changer for maintenance. The stepped design fits perfectly, and the durability is impressive. Highly recommended for versatile pipe mounting.",
      author: 'Suresh Kumar',
      role: 'Maintenance Lead'
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'What is a step clamp and how does it differ from a regular metal clamp?',
      answer: 'A <strong>step clamp</strong> is a specialized <strong>metal clamp</strong> featuring a stepped internal design that allows it to accommodate multiple pipe diameters. Unlike standard <strong>metal clamps</strong> that fit only one size, a single <strong>step clamp</strong> can securely hold 2-3 different pipe sizes. This versatility makes <strong>step pipe clamps</strong> a superior choice for projects with varied piping needs. Our <strong>step metal clamps</strong> offer the same durability as traditional <strong>metal clamps</strong> but with enhanced flexibility.'
    },
    {
      question: 'Where can I buy Step Clamps, Metal Clamps, Step Pipe Clamps, and Step Metal Clamps in India?',
      answer: 'JK Industries is India\'s premier manufacturer of <strong>Step Clamps</strong>, <strong>Metal Clamps</strong>, <strong>Step Pipe Clamps</strong>, and <strong>Step Metal Clamps</strong>. You can buy directly from our factory in Rajkot, Gujarat. We supply high-quality <strong>step clamps</strong> and <strong>metal clamps</strong> to major industrial hubs across India with competitive pricing and fast delivery. As a direct manufacturer, we offer the best <strong>step clamp</strong> prices in India.'
    },
    {
      question: 'What is the price of Step Clamps and Metal Clamps?',
      answer: 'JK Industries offers competitive pricing for <strong>Step Clamps</strong> and <strong>Metal Clamps</strong>. Our <strong>step clamp</strong> prices range from ₹7.50 to ₹11.59 per piece depending on size and thickness (1.2MM or 1.5MM). We provide factory direct pricing with significant bulk discounts for large orders. As a direct manufacturer of <strong>step clamps</strong> and <strong>metal clamps</strong>, we eliminate middlemen costs, ensuring you get the best <strong>step clamp</strong> and <strong>metal clamp</strong> prices in India.'
    },
    {
      question: 'Can step clamps handle high loads like standard heavy-duty metal clamps?',
      answer: 'Yes, our <strong>step clamps</strong> are engineered for high load-bearing capacity. The stepped design is structurally reinforced to ensure that it provides secure support comparable to traditional heavy-duty <strong>metal clamps</strong>, making them suitable for industrial piping and hydraulic systems. Our <strong>step metal clamps</strong> offer load capacity of 30-50 kg depending on size, matching the performance of standard <strong>metal clamps</strong>.'
    },
    {
      question: 'What sizes are available for Step Clamps and Step Metal Clamps?',
      answer: 'JK Industries offers <strong>Step Clamps</strong> and <strong>Step Metal Clamps</strong> in two thickness options: 1.2MM and 1.5MM. Available sizes include 2 1/2 inch (65mm) and 4 inch (110mm) diameters. Our <strong>step pipe clamps</strong> are designed to accommodate multiple pipe sizes within each clamp, reducing inventory requirements. Custom sizes are also available on request for specialized applications requiring non-standard <strong>step clamps</strong> or <strong>metal clamps</strong>.'
    },
    {
      question: 'Do you offer stainless steel step clamps and step metal clamps?',
      answer: 'Yes, we manufacture <strong>step clamps</strong> and <strong>step metal clamps</strong> in high-grade Stainless Steel (SS304/SS316) for superior corrosion resistance, as well as Carbon Steel and Galvanized Steel for general industrial use. Our <strong>step pipe clamps</strong> are available in various material options to suit different application environments. We can recommend the best material based on your specific requirements for <strong>step clamps</strong> or <strong>metal clamps</strong>.'
    },
    {
      question: 'Are step clamps and step metal clamps suitable for vibrating machinery?',
      answer: 'Absolutely. The precision-engineered steps coupled with our robust fastening mechanism provide excellent grip and vibration dampening properties, making <strong>step clamps</strong> and <strong>step metal clamps</strong> ideal for hydraulic lines and machinery susceptible to vibration. Our <strong>step pipe clamps</strong> are specifically designed to minimize pipe movement and reduce noise in high-pressure systems.'
    },
    {
      question: 'Why choose JK Industries for Step Clamps, Metal Clamps, and Step Pipe Clamps?',
      answer: 'JK Industries (Edler Clamp brand) is India\'s trusted manufacturer of <strong>Step Clamps</strong>, <strong>Metal Clamps</strong>, <strong>Step Pipe Clamps</strong>, and <strong>Step Metal Clamps</strong>. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our <strong>step clamps</strong> and <strong>metal clamps</strong> are manufactured using premium materials ensuring superior quality and durability. We are the #1 choice for <strong>step clamp</strong> and <strong>metal clamp</strong> requirements across India.'
    },
    {
      question: 'What is the best Step Clamp and Metal Clamp brand in India?',
      answer: 'JK Industries, operating under the Edler Clamp brand, is recognized as India\'s #1 manufacturer of <strong>Step Clamps</strong>, <strong>Metal Clamps</strong>, <strong>Step Pipe Clamps</strong>, and <strong>Step Metal Clamps</strong>. With ISO 9001:2015 certification, superior quality materials, and innovative stepped design, our <strong>step clamps</strong> and <strong>metal clamps</strong> are trusted by contractors, engineers, and industrial clients across India. We offer the best combination of quality, price, and service for all your <strong>step clamp</strong> and <strong>metal clamp</strong> requirements.'
    },
    {
      question: 'How to choose between Step Clamp and regular Metal Clamp?',
      answer: 'Choose <strong>Step Clamps</strong> when you need versatility to accommodate multiple pipe sizes, want to reduce inventory costs, or have projects with varied piping requirements. <strong>Step pipe clamps</strong> are ideal for installations where different pipe diameters are used. Choose standard <strong>Metal Clamps</strong> for single-size applications or when maximum strength for a specific diameter is required. Our <strong>step metal clamps</strong> offer the best of both worlds with multi-size compatibility and industrial-grade strength. For most industrial and construction applications, <strong>step clamps</strong> provide superior flexibility and cost savings.'
    },
    {
      question: 'Are Step Clamps and Step Metal Clamps suitable for outdoor installations?',
      answer: 'Yes, our <strong>Step Clamps</strong> and <strong>Step Metal Clamps</strong> are designed for both indoor and outdoor installations. Available in galvanized steel and stainless steel options, our <strong>step pipe clamps</strong> provide excellent corrosion resistance and durability in harsh environments. The stepped design maintains structural integrity even in outdoor conditions, making <strong>step clamps</strong> and <strong>metal clamps</strong> ideal for industrial piping, construction projects, and infrastructure applications.'
    },
    {
      question: 'What is the difference between Step Clamp, Step Pipe Clamp, and Step Metal Clamp?',
      answer: '<strong>Step Clamp</strong>, <strong>Step Pipe Clamp</strong>, and <strong>Step Metal Clamp</strong> are essentially the same product with different naming conventions. All refer to a <strong>metal clamp</strong> with a stepped internal design that allows it to accommodate multiple pipe diameters. The terms are used interchangeably in the industry. JK Industries manufactures premium <strong>step clamps</strong> (also called <strong>step pipe clamps</strong> or <strong>step metal clamps</strong>) that provide versatile pipe mounting solutions for industrial and construction applications.'
    }
  ];

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    private transferState: TransferState
  ) {}

  ngOnInit() {
    this.updateSeo();
    this.setBusinessStructuredData();
    this.setProductStructuredData();
    this.setFaqStructuredData();
    this.setBreadcrumbStructuredData();
    this.setHowToStructuredData();
    this.setItemListStructuredData();
    this.setWebPageStructuredData();
    
    // Initialize expandedFaqs array
    this.expandedFaqs = new Array(this.faqs.length).fill(false);
    
    // Only init AOS in browser
    if (isPlatformBrowser(this.platformId)) {
      Aos.init({
        duration: 800,
        once: true,
        offset: 100
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Aos.refresh();
    }
  }

  toggleFaq(index: number) {
    // Toggle current state
    this.expandedFaqs[index] = !this.expandedFaqs[index];
    
    // Optional: Close others
    for (let i = 0; i < this.expandedFaqs.length; i++) {
      if (i !== index) this.expandedFaqs[i] = false;
    }
  }

  openEnquiryForm() {
    this.showEnquiryForm = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeEnquiryForm(event: any) {
    if (event.target.classList.contains('enquiry-modal') || event.target.classList.contains('close-modal')) {
      this.showEnquiryForm = false;
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = 'auto';
      }
    }
  }

  submitEnquiry() {
    console.log('Enquiry submitted:', this.enquiryData);
    alert('Thank you for your enquiry about Step Clamps, Metal Clamps, Step Pipe Clamps, and Step Metal Clamps. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = { name: '', email: '', phone: '', company: '', quantity: null, message: '' };
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'auto';
    }
  }

  downloadBrochure() {    
    alert('Our technical datasheet will be available for download soon!');
  }

  private updateSeo() {
    this.titleService.setTitle('Step Clamp | Metal Clamp | Step Pipe Clamp | Step Metal Clamp | Multi-Size Pipe Clamp Manufacturer India | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Step Clamp & Metal Clamp Manufacturer. Buy Premium Step Pipe Clamps, Step Metal Clamps & Multi-Size Pipe Clamps. Innovative Stepped Design. ISO Certified. Factory Direct Prices. Free Shipping. Order Now!' },
      { name: 'keywords', content: 'step clamp, metal clamp, step pipe clamp, step metal clamp, step clamp India, multi-size clamp, metal pipe clamp, step clamp manufacturer, stepped pipe clamp, industrial pipe clamp, step clamp Rajkot, metal clamp manufacturer India, step clamp price, buy step clamp online, step clamp Gujarat, step metal clamp manufacturer, step pipe clamp supplier, multi-size pipe clamp, stepped metal clamp, variable size clamp, step clamp manufacturer Rajkot, metal clamp Gujarat, industrial step clamp, construction step clamp, hydraulic step clamp' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/step-clamp' },
      
      // Location Tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },

      // Article meta tags
      { property: 'article:section', content: 'Plumbing Products' },
      { property: 'article:tag', content: 'Step Clamp' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'Step Pipe Clamp' },
      { property: 'article:tag', content: 'Step Metal Clamp' },
      { property: 'article:tag', content: 'Multi-Size Pipe Clamp' },

      // Product meta tags
      { property: 'product:price:amount', content: '7.50' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },

      // Open Graph
      { property: 'og:title', content: 'Step Clamp | Metal Clamp | Step Pipe Clamp | Step Metal Clamp | Multi-Size Pipe Clamp Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of Step Clamps, Metal Clamps, Step Pipe Clamps & Step Metal Clamps. Premium Multi-Size Pipe Clamps with Innovative Stepped Design. ISO Certified. Factory Direct Prices.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '800' },
      { property: 'og:image:alt', content: 'Step Clamp | Metal Clamp | Step Pipe Clamp - Premium Multi-Size Pipe Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/step-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Step Clamp | Metal Clamp | Step Pipe Clamp | Step Metal Clamp Manufacturer' },
      { name: 'twitter:description', content: 'India\'s #1 Manufacturer of Step Clamps, Metal Clamps, Step Pipe Clamps & Step Metal Clamps. Premium Multi-Size Pipe Clamps. ISO Certified. Factory Direct Prices.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'Step Clamp | Metal Clamp | Step Pipe Clamp - Premium Multi-Size Pipe Clamp' }
    ]);
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(STEP_CLAMP_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(STEP_CLAMP_PRODUCT_SCHEMA, ''));
      return;
    }

    const allSizes = [...this.productSizes1_2MM, ...this.productSizes1_5MM];
    const minPrice = Math.min(...allSizes.map(s => s.price));
    const maxPrice = Math.max(...allSizes.map(s => s.price));

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "Step Clamp, Metal Clamp, Step Pipe Clamp, Step Metal Clamp, Multi-Size Pipe Clamp, Clips, Clamps",
      "name": "Step Clamp | Metal Clamp | Step Pipe Clamp | Step Metal Clamp | Multi-Size Pipe Clamp",
      "url": "https://jkindustriesrajkot.com/products/step-clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/step-clamp.jpg"
      ],
      "description": "JK Industries manufactures premium Step Clamps, Metal Clamps, Step Pipe Clamps, and Step Metal Clamps. Our innovative stepped design allows a single clamp to hold multiple pipe sizes, offering versatility and cost savings for industrial piping. Best quality step clamps and metal clamps available in 1.2MM and 1.5MM thicknesses with ISO 9001:2015 certification.",
      "keywords": "step clamp, metal clamp, step pipe clamp, step metal clamp, multi-size clamp, metal pipe clamp, step clamp manufacturer, stepped pipe clamp, industrial pipe clamp, step clamp India, metal clamp manufacturer India",
      "sku": "STP-CL-001",
      "mpn": "JK-STP-CL-001",
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
      "alternateName": ["Step Clamp", "Metal Clamp", "Step Pipe Clamp", "Step Metal Clamp", "Multi-Size Pipe Clamp", "Stepped Pipe Clamp", "Industrial Metal Clamp", "Variable Size Clamp", "Step Clamp Manufacturer", "Metal Clamp Manufacturer", "Step Pipe Clamp Supplier", "Step Metal Clamp India"],
      "material": "Galvanized Steel / Stainless Steel / Carbon Steel",
      "color": "Silver / Grey",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/step-clamp",
        "priceCurrency": "INR",
        "lowPrice": minPrice.toString(),
        "highPrice": maxPrice.toString(),
        "offerCount": allSizes.length.toString(),
        "price": minPrice.toString(),
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
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "unitCode": "FTK",
          "value": "1"
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
        "ratingCount": "92",
        "reviewCount": "74"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.author },
        "reviewBody": t.quote
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "Industrial Pipes" },
      "width": {
        "@type": "QuantitativeValue",
        "value": "50",
        "unitCode": "MMT"
      },
      "height": {
        "@type": "QuantitativeValue",
        "value": "2",
        "unitCode": "INH"
      },
      "weight": {
        "@type": "QuantitativeValue",
        "value": "50",
        "unitCode": "GRM"
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Type", "value": "Step Clamp / Metal Clamp / Step Pipe Clamp / Step Metal Clamp" },
        { "@type": "PropertyValue", "name": "Application", "value": "Industrial, Construction, Hydraulic" },
        { "@type": "PropertyValue", "name": "Feature", "value": "Multi-Size Compatibility" },
        { "@type": "PropertyValue", "name": "Material Options", "value": "Galvanized Steel, Stainless Steel (304/316), Carbon Steel" },
        { "@type": "PropertyValue", "name": "Thickness Options", "value": "1.2MM, 1.5MM" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "2 1/2 inch (65mm) to 4 inch (110mm)" },
        { "@type": "PropertyValue", "name": "Surface Finish", "value": "Hot-Dip Galvanized, Electro-Galvanized, Polished" },
        { "@type": "PropertyValue", "name": "Temperature Range", "value": "-30°C to 120°C (Standard), Up to 550°C (High-Temp)" },
        { "@type": "PropertyValue", "name": "Load Capacity", "value": "30-50 kg (Size Dependent)" },
        { "@type": "PropertyValue", "name": "Mounting Options", "value": "Wall Mount, Channel Mount, Strut Mount" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, CE Compliant" },
        { "@type": "PropertyValue", "name": "Application Standards", "value": "DIN 3015, EN 10242" },
        { "@type": "PropertyValue", "name": "Price Range", "value": `₹${minPrice} to ₹${maxPrice} per piece` },
        { "@type": "PropertyValue", "name": "Availability", "value": "In Stock - Ready to Ship" }
      ],
      "hasVariant": allSizes.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch Step Clamp / Step Metal Clamp`,
        "sku": size.sku,
        "size": `${size.sizeInch} Inch / ${size.size} MM`,
        "image": "https://jkindustriesrajkot.com/assets/products/step-clamp.jpg",
        "description": `Premium ${size.sizeInch} Inch (${size.size} MM) Step Clamp, Step Pipe Clamp, and Step Metal Clamp with innovative stepped design. Perfect for multiple pipe diameters. Best quality step clamp and metal clamp for industrial and construction applications.`,
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
          { "@type": "PropertyValue", "name": "Pipe OD", "value": size.size },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing Qty", "value": size.packingQty.toString() }
        ]
      }))
    };

    const schemaString = JSON.stringify(schema);
    this.transferState.set(STEP_CLAMP_PRODUCT_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(STEP_CLAMP_BREADCRUMB_SCHEMA)) {
      this.addJsonLd(this.transferState.get(STEP_CLAMP_BREADCRUMB_SCHEMA, ''));
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
          "name": "Step Clamp | Metal Clamp | Step Pipe Clamp | Step Metal Clamp",
          "item": "https://jkindustriesrajkot.com/products/step-clamp"
        }
      ]
    };

    const schemaString = JSON.stringify(breadcrumbSchema);
    this.transferState.set(STEP_CLAMP_BREADCRUMB_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(STEP_CLAMP_HOWTO_SCHEMA)) {
      this.addJsonLd(this.transferState.get(STEP_CLAMP_HOWTO_SCHEMA, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install Step Clamps / Step Metal Clamps",
      "description": "Step-by-step guide to properly install Step Clamps, Metal Clamps, Step Pipe Clamps, and Step Metal Clamps for secure pipe mounting. Learn the correct technique for installing multi-size pipe clamps.",
      "image": "https://jkindustriesrajkot.com/assets/products/step-clamp.jpg",
      "totalTime": "PT10M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Step Clamps or Step Metal Clamps"
        },
        {
          "@type": "HowToSupply",
          "name": "Appropriate Fasteners (screws or bolts)"
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
        "url": `https://jkindustriesrajkot.com/products/step-clamp#step-${index + 1}`
      }))
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(STEP_CLAMP_HOWTO_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(STEP_CLAMP_ITEMLIST_SCHEMA)) {
      this.addJsonLd(this.transferState.get(STEP_CLAMP_ITEMLIST_SCHEMA, ''));
      return;
    }

    const allSizes = [...this.productSizes1_2MM, ...this.productSizes1_5MM];
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Step Clamp | Metal Clamp | Step Pipe Clamp Sizes - Available Variants",
      "description": "Complete range of Step Clamps, Metal Clamps, Step Pipe Clamps, and Step Metal Clamps available in 1.2MM and 1.5MM thicknesses from 2 1/2 inch to 4 inch. Multi-size pipe clamps for all pipe diameters. Best quality step clamps and metal clamps with competitive pricing.",
      "numberOfItems": allSizes.length,
      "itemListElement": allSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch Step Clamp / Step Metal Clamp`,
          "description": `Premium ${size.sizeInch} Inch (${size.size} MM) Step Clamp, Step Pipe Clamp, and Step Metal Clamp with innovative stepped design. Perfect for multiple pipe diameters. Best quality step clamp and metal clamp for industrial and construction applications.`,
          "sku": size.sku,
          "image": "https://jkindustriesrajkot.com/assets/products/step-clamp.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "countryOfOrigin": {
            "@type": "Country",
            "name": "India"
          },
          "material": ["Galvanized Steel", "Stainless Steel", "Carbon Steel"],
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
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "unitCode": "FTK",
              "value": "1"
            }
          },
          "additionalProperty": [
            { "@type": "PropertyValue", "name": "Pipe OD", "value": size.size },
            { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
            { "@type": "PropertyValue", "name": "Packing Qty", "value": size.packingQty.toString() }
          ]
        }
      }))
    };

    const schemaString = JSON.stringify(itemListSchema);
    this.transferState.set(STEP_CLAMP_ITEMLIST_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(STEP_CLAMP_WEBPAGE_SCHEMA)) {
      this.addJsonLd(this.transferState.get(STEP_CLAMP_WEBPAGE_SCHEMA, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/step-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/step-clamp",
      "name": "Step Clamp | Metal Clamp | Step Pipe Clamp | Step Metal Clamp | Multi-Size Pipe Clamp Manufacturer",
      "description": "India's #1 Manufacturer of Step Clamps, Metal Clamps, Step Pipe Clamps, Step Metal Clamps & Multi-Size Pipe Clamps. Premium Step Clamps with innovative stepped design. ISO Certified. Factory Direct Prices. Contact Us for Best Quality Step Clamps, Metal Clamps, Step Pipe Clamps & Step Metal Clamps. Rajkot, Gujarat, India.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of step clamps, metal clamps, step pipe clamps, and pipe support systems in India",
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
        "url": "https://jkindustriesrajkot.com/assets/products/step-clamp.jpg",
        "width": "1200",
        "height": "800",
        "caption": "Step Clamp | Metal Clamp | Step Pipe Clamp - Premium Multi-Size Pipe Clamp by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(STEP_CLAMP_WEBPAGE_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData() {
    if (this.transferState.hasKey(STEP_CLAMP_FAQ_SCHEMA)) {
      this.addJsonLd(this.transferState.get(STEP_CLAMP_FAQ_SCHEMA, ''));
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
    this.transferState.set(STEP_CLAMP_FAQ_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBusinessStructuredData() {
    if (this.transferState.hasKey(STEP_CLAMP_BUSINESS_SCHEMA)) {
      this.addJsonLd(this.transferState.get(STEP_CLAMP_BUSINESS_SCHEMA, ''));
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
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      "department": [
        {
          "@type": "LocalBusiness",
          "name": "Step Clamp Manufacturing Unit",
          "description": "Manufacturing unit for Premium Step Clamps, Metal Clamps, Step Pipe Clamps, and Step Metal Clamps",
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
      "areaServed": [
        {
          "@type": "City",
          "name": "Rajkot"
        },
        {
          "@type": "State",
          "name": "Gujarat"
        },
        {
          "@type": "Country",
          "name": "India"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/jk_industries_1995/",
        "https://www.linkedin.com/company/jk-industries-rajkot"
      ]
    };

    const schemaString = JSON.stringify(businessData);
    this.transferState.set(STEP_CLAMP_BUSINESS_SCHEMA, schemaString);
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
