import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TransferState, makeStateKey } from '@angular/core';
import * as AOS from 'aos';

// Define TransferState keys
const PRODUCT_SCHEMA_KEY = makeStateKey<string>('CPVC_METAL_CLAMP_PRODUCT_SCHEMA');
const BUSINESS_SCHEMA_KEY = makeStateKey<string>('CPVC_METAL_CLAMP_BUSINESS_SCHEMA');
const FAQ_SCHEMA_KEY = makeStateKey<string>('CPVC_METAL_CLAMP_FAQ_SCHEMA');
const BREADCRUMB_SCHEMA_KEY = makeStateKey<string>('CPVC_METAL_CLAMP_BREADCRUMB_SCHEMA');
const HOWTO_SCHEMA_KEY = makeStateKey<string>('CPVC_METAL_CLAMP_HOWTO_SCHEMA');
const ITEMLIST_SCHEMA_KEY = makeStateKey<string>('CPVC_METAL_CLAMP_ITEMLIST_SCHEMA');
const WEBPAGE_SCHEMA_KEY = makeStateKey<string>('CPVC_METAL_CLAMP_WEBPAGE_SCHEMA');


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
  selector: 'app-cpvc-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cpvc-metal-clamp.component.html',
  styleUrl: './cpvc-metal-clamp.component.scss'
})
export class CPVCMetalClampComponent implements OnInit, AfterViewInit, OnDestroy {
  showEnquiryForm: boolean = false;
  
  enquiryData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: null,
    message: ''
  };

  // Testimonials for dynamic review schema
  testimonials: Testimonial[] = [
    {
      quote: "JK Industries CPVC powder coated metal clamps have been essential for our chemical plant operations. They maintain integrity even when exposed to harsh chemicals and elevated temperatures. The quality is unmatched in the market.",
      author: "Rajesh Sharma",
      position: "Project Manager",
      company: ""
    },
    {
      quote: "We've installed these CPVC powder coated metal clamps in multiple hot water systems for commercial buildings. They've consistently outperformed other supports, especially in preventing pipe damage from thermal expansion.",
      author: "Vikram Patel",
      position: "Senior Engineer",
      company: ""
    },
    {
      quote: "The CPVC metal clamps from JK Industries are perfect for our pharmaceutical manufacturing facility. Their chemical resistance and precision manufacturing meet our strict quality standards.",
      author: "Dr. Meena Iyer",
      position: "Plant Director",
      company: ""
    },
    {
      quote: "Outstanding quality and durability! These CPVC clamps have been performing flawlessly in our water treatment plant for over 3 years. Highly recommended for industrial applications.",
      author: "Amit Desai",
      position: "Maintenance Head",
      company: ""
    }
  ];

  // FAQs for dynamic FAQ schema
  faqs: FAQ[] = [
    {
      question: "What is the difference between CPVC Clamp, CPVC Metal Clamp, and Metal Clamp?",
      answer: "A <strong>CPVC clamp</strong> refers to any clamp designed for CPVC pipes, while a <strong>CPVC metal clamp</strong> specifically uses metal construction with powder coating. Our <strong>metal clamp</strong> range includes both standard and powder coated options. The <strong>CPVC powder coated metal clamp</strong> offers superior temperature resistance up to 93°C and chemical compatibility compared to standard <strong>metal clamps</strong>. Our <strong>CPVC pipe clamp</strong> range is specifically optimized for hot water and chemical applications."
    },
    {
      question: "What makes CPVC powder coated metal clamps better than standard plastic clips?",
      answer: "<strong>CPVC powder coated metal clamps</strong> combine the strength of metal with specialized CRC / MS coating that protects CPVC pipes. Unlike standard plastic clips, they provide superior load-bearing capacity, better chemical resistance, higher temperature tolerance (up to 93°C), and longer service life. The powder coating adds an extra layer of corrosion protection, making them ideal for demanding industrial environments. Our <strong>CPVC metal clamps</strong> are specifically designed for hot water systems and chemical processing applications."
    },
    {
      question: "Are your CPVC powder coated clamps suitable for hot water systems?",
      answer: "Yes, our <strong>CPVC powder coated metal clamps</strong> are specifically designed for hot water systems. They can withstand continuous temperatures up to 93°C (200°F), making them ideal for hot water distribution lines in residential, commercial, and industrial applications. The specialized CRC / MS construction accommodates thermal expansion while maintaining secure support of the piping system. Our <strong>CPVC clamps</strong> and <strong>CPVC metal clamps</strong> are the preferred choice for hot water applications."
    },
    {
      question: "What sizes are available for CPVC clamps and CPVC metal clamps?",
      answer: "JK Industries offers comprehensive size ranges for <strong>CPVC clamps</strong> and <strong>CPVC metal clamps</strong> from 1/2 inch (15mm) to 2 inch (50mm). We manufacture <strong>CPVC powder coated metal clamps</strong> in three thickness options: 0.5MM, 1MM, and 1.5MM. Our <strong>metal clamp</strong> range covers all standard CPVC pipe diameters. Custom sizes are also available on request for specialized applications requiring non-standard <strong>CPVC clamps</strong> or <strong>CPVC pipe clamps</strong>."
    },
    {
      question: "Do you offer custom sizes for CPVC powder coated pipe clamps?",
      answer: "Yes, we manufacture custom-sized <strong>CPVC powder coated metal clamps</strong> according to specific requirements. Our engineering team can design and produce <strong>CPVC clamps</strong> for non-standard pipe diameters, special mounting requirements, or unique configurations. Please contact our sales team with your specifications for a custom quote on <strong>CPVC metal clamps</strong> and <strong>CPVC pipe clamps</strong>."
    },
    {
      question: "Are these powder coated clamps resistant to chemicals and corrosive environments?",
      answer: "Yes, our <strong>CPVC powder coated metal clamps</strong> feature specialized CRC / MS coating that provides excellent chemical resistance, complementing the inherent chemical resistance of CPVC pipes. The metal components are treated to resist corrosion, making these <strong>CPVC clamps</strong> suitable for chemical processing plants, water treatment facilities, and other environments with exposure to acids, bases, and corrosive agents. Our <strong>CPVC metal clamps</strong> are ideal for harsh industrial environments."
    },
    {
      question: "Where can I buy CPVC clamps, CPVC metal clamps, and metal clamps online in India?",
      answer: "JK Industries is a leading manufacturer of <strong>CPVC clamps</strong>, <strong>CPVC metal clamps</strong>, <strong>metal clamps</strong>, and <strong>CPVC pipe clamps</strong> in India. You can purchase our clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India. Contact us for a quote on <strong>CPVC powder coated metal clamps</strong> and <strong>metal clamps</strong>."
    },
    {
      question: "What is the price range of CPVC clamps and CPVC metal clamps?",
      answer: "JK Industries offers competitive pricing for <strong>CPVC clamps</strong>, <strong>CPVC metal clamps</strong>, and <strong>metal clamps</strong>. Our <strong>CPVC metal clamp</strong> prices range from ₹1.25 to ₹5.35 per piece depending on size and thickness (0.5MM, 1MM, or 1.5MM). We provide factory direct pricing with significant bulk discounts for large orders. As a direct manufacturer, we eliminate middlemen costs, ensuring you get the best <strong>CPVC clamp</strong> and <strong>metal clamp</strong> prices in India."
    },
    {
      question: "What is the minimum order quantity for CPVC powder coated metal clamps?",
      answer: "Our standard minimum order quantity is 10000 pieces for stock sizes of <strong>CPVC clamps</strong> and <strong>CPVC metal clamps</strong>. However, we understand that different projects have different requirements, so we're flexible with order quantities. For custom sizes or specifications, minimum order quantities may vary. Please contact our sales team for specific information about your <strong>CPVC pipe clamp</strong> project needs."
    },
    {
      question: "Why choose JK Industries for CPVC clamps, CPVC metal clamps, and metal clamps?",
      answer: "JK Industries (Edler Clamp brand) is India's trusted manufacturer of <strong>CPVC clamps</strong>, <strong>CPVC metal clamps</strong>, <strong>metal clamps</strong>, and <strong>CPVC pipe clamps</strong>. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our <strong>CPVC powder coated metal clamps</strong> are manufactured using premium materials ensuring superior quality and durability. We are the #1 choice for <strong>CPVC clamp</strong> and <strong>metal clamp</strong> requirements across India."
    },
    {
      question: "What is the best CPVC clamp and CPVC metal clamp brand in India?",
      answer: "JK Industries, operating under the Edler Clamp brand, is recognized as India's #1 manufacturer of <strong>CPVC clamps</strong>, <strong>CPVC metal clamps</strong>, <strong>metal clamps</strong>, and <strong>CPVC pipe clamps</strong>. With ISO 9001:2015 certification, superior quality materials, and comprehensive size ranges, our <strong>CPVC powder coated metal clamps</strong> are trusted by contractors, plumbers, and industrial clients across India. We offer the best combination of quality, price, and service for all your <strong>CPVC clamp</strong> and <strong>metal clamp</strong> requirements."
    },
    {
      question: "How to choose between CPVC clamp and metal clamp?",
      answer: "Choose <strong>CPVC clamps</strong> or <strong>CPVC metal clamps</strong> for hot water systems, chemical processing, and applications requiring temperature resistance up to 93°C. Our <strong>CPVC powder coated metal clamps</strong> offer superior temperature resistance and chemical compatibility compared to standard <strong>metal clamps</strong>. For most hot water and chemical applications, <strong>CPVC metal clamps</strong> are the preferred choice due to their durability, temperature resistance, and value. Choose standard <strong>metal clamps</strong> for general-purpose applications not requiring high-temperature resistance."
    }
  ];

  expandedFaqs: boolean[] = [];

  // Product sizes for 0.5MM CPVC Metal Clamp
  productSizes0_5MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 1.25, qtyPcs: 100, packingQty: 6000, sku: 'CPVC-0.5MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 1.35, qtyPcs: 100, packingQty: 5600, sku: 'CPVC-0.5MM-20' },
    { size: '25mm', sizeInch: '1', price: 1.45, qtyPcs: 100, packingQty: 4600, sku: 'CPVC-0.5MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 1.65, qtyPcs: 100, packingQty: 3600, sku: 'CPVC-0.5MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 2.15, qtyPcs: 100, packingQty: 2600, sku: 'CPVC-0.5MM-40' },
    { size: '50mm', sizeInch: '2', price: 2.35, qtyPcs: 100, packingQty: 2000, sku: 'CPVC-0.5MM-50' }
  ];

  // Product sizes for 1MM CPVC Metal Clamp
  productSizes1MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 1.75, qtyPcs: 100, packingQty: 3500, sku: 'CPVC-1MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 1.85, qtyPcs: 100, packingQty: 3000, sku: 'CPVC-1MM-20' },
    { size: '25mm', sizeInch: '1', price: 2.05, qtyPcs: 100, packingQty: 2500, sku: 'CPVC-1MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 2.40, qtyPcs: 100, packingQty: 2000, sku: 'CPVC-1MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 2.75, qtyPcs: 100, packingQty: 1400, sku: 'CPVC-1MM-40' },
    { size: '50mm', sizeInch: '2', price: 3.50, qtyPcs: 100, packingQty: 1000, sku: 'CPVC-1MM-50' }
  ];

  // Product sizes for 1.5MM CPVC Powder Coated Metal Clamp
  productSizes1_5MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 2.35, qtyPcs: 100, packingQty: 3000, sku: 'CPVC-1.5MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 2.75, qtyPcs: 100, packingQty: 2500, sku: 'CPVC-1.5MM-20' },
    { size: '25mm', sizeInch: '1', price: 3.12, qtyPcs: 100, packingQty: 2000, sku: 'CPVC-1.5MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 3.50, qtyPcs: 100, packingQty: 1400, sku: 'CPVC-1.5MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 4.15, qtyPcs: 100, packingQty: 1000, sku: 'CPVC-1.5MM-40' },
    { size: '50mm', sizeInch: '2', price: 5.35, qtyPcs: 100, packingQty: 800, sku: 'CPVC-1.5MM-50' }
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
      name: 'UPVC Double Nail Clamp',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      link: '/products/upvc-double-nail-clamp',
      description: 'Premium dual fastening UPVC nail clamps with 40% more holding power'
    },
    {
      name: 'CPVC Double Nail Clamp',
      image: 'assets/products/cpvc-double-nail-clamp.jpg',
      link: '/products/cpvc-double-nail-clamp',
      description: 'High-temperature resistant double nail clamps for CPVC hot water systems'
    },
    {
      name: 'Golden Metal Clamp',
      image: 'assets/products/golden-metal-clamp.jpg',
      link: '/products/golden-metal-clamp',
      description: 'Luxury gold-plated clamps for decorative plumbing installations'
    },
    {
      name: 'Silver Metal Clamp',
      image: 'assets/products/silver-metal-clamp.jpg',
      link: '/products/silver-metal-clamp',
      description: 'Premium silver-plated clamps for modern installations'
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
      text: 'Mark the position ensuring proper pipe alignment and spacing (recommended every 80-100cm for horizontal runs). Ensure the mounting surface is clean and free from debris.',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg'
    },
    {
      name: 'Pre-drilling',
      text: 'For hard surfaces like concrete or brick, pre-drill pilot holes using a 3mm drill bit to ensure accurate placement and prevent surface cracking.',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg'
    },
    {
      name: 'Positioning',
      text: 'Place the CPVC metal clamp against the mounting surface, ensuring proper alignment with the marked position. Verify the clamp size matches the pipe diameter.',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg'
    },
    {
      name: 'Fastening',
      text: 'Secure the clamp using appropriate fasteners (screws or nails) until the clamp is firmly attached to the mounting surface. Ensure the clamp is flush and secure.',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the pipe sits securely in the clamp without being compressed, ensuring proper movement allowance for thermal expansion. Verify the installation is stable.',
      image: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg'
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
    // Toggle current state
    this.expandedFaqs[index] = !this.expandedFaqs[index];
    
    // Optional: Close others (accordion behavior)
    for (let i = 0; i < this.expandedFaqs.length; i++) {
      if (i !== index) this.expandedFaqs[i] = false;
    }
  }

  ngOnInit() {
    this.updateSeo();
    this.setProductStructuredData();
    this.setBusinessStructuredData();
    this.setFaqStructuredData();
    this.setBreadcrumbStructuredData();
    this.setHowToStructuredData();
    this.setItemListStructuredData();
    this.setWebPageStructuredData();
  }

  private updateSeo() {
    this.titleService.setTitle('CPVC Clamp | CPVC Metal Clamp | Metal Clamp | CPVC Powder Coated Metal Clamp | CPVC Pipe Clamp Manufacturer - JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of CPVC Clamps, CPVC Metal Clamps, Metal Clamps, CPVC Powder Coated Metal Clamps & CPVC Pipe Clamps. Premium quality with superior temperature resistance up to 93°C. ISO Certified. Factory Direct Prices. Buy Now!' },
      { name: 'keywords', content: 'CPVC Clamp, CPVC metal clamp, metal clamp, CPVC powder coated metal clamp, CPVC pipe clamp, CPVC clamp manufacturer, metal clamp India, hot water pipe clamp, CPVC clamp Rajkot, Edler Clamp, JK Industries, CPVC metal clamp manufacturer, CPVC clamp price, best CPVC clamp, CPVC clamp online, metal clamp supplier Rajkot, Gujarat, India' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/cpvc-metal-clamp' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Article meta tags
      { property: 'article:section', content: 'Plumbing Products' },
      { property: 'article:tag', content: 'CPVC Clamp' },
      { property: 'article:tag', content: 'CPVC Metal Clamp' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'CPVC Powder Coated Metal Clamp' },
      { property: 'article:tag', content: 'CPVC Pipe Clamp' },
      
      // Product meta tags
      { property: 'product:price:amount', content: '1.25' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'CPVC Clamp | CPVC Metal Clamp | Metal Clamp | CPVC Powder Coated Metal Clamp | CPVC Pipe Clamp Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of CPVC Clamps, CPVC Metal Clamps, Metal Clamps, CPVC Powder Coated Metal Clamps & CPVC Pipe Clamps. Premium quality with superior temperature resistance up to 93°C. ISO Certified. Factory Direct Prices.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '800' },
      { property: 'og:image:alt', content: 'CPVC Metal Clamp - Premium Powder Coated Pipe Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/cpvc-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'CPVC Clamp | CPVC Metal Clamp | Metal Clamp | CPVC Pipe Clamp Manufacturer' },
      { name: 'twitter:description', content: 'India\'s #1 Manufacturer of CPVC Clamps, CPVC Metal Clamps, Metal Clamps & CPVC Pipe Clamps. Premium quality. ISO Certified. Factory Direct Prices.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'CPVC Metal Clamp - Premium Powder Coated Pipe Clamp' }
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
    // Re-enable scrolling if modal was open
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'auto';
    }
  }

  openEnquiryForm() {
    this.showEnquiryForm = true;
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'hidden';
    }
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
    alert('Thank you for your enquiry about CPVC Metal Clamps, CPVC Clamps, and Metal Clamps. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      quantity: null,
      message: ''
    };
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'auto';
    }
  }

  downloadBrochure() {    
    alert('Our technical datasheet for CPVC Metal Clamps, CPVC Clamps, and Metal Clamps will be available for download soon!');
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(PRODUCT_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(PRODUCT_SCHEMA_KEY, ''));
      return;
    }

    const allSizes = [...this.productSizes0_5MM, ...this.productSizes1MM, ...this.productSizes1_5MM];
    const minPrice = Math.min(...allSizes.map(s => s.price));
    const maxPrice = Math.max(...allSizes.map(s => s.price));

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "CPVC Clamp, CPVC Metal Clamp, Metal Clamp, CPVC Powder Coated Metal Clamp, CPVC Pipe Clamp, Clips, Clamps",
      "name": "CPVC Clamp | CPVC Metal Clamp | Metal Clamp | CPVC Powder Coated Metal Clamp | CPVC Pipe Clamp",
      "url": "https://jkindustriesrajkot.com/products/cpvc-metal-clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg"
      ],
      "description": "JK Industries manufactures premium CPVC Clamps, CPVC Metal Clamps, Metal Clamps, and CPVC Powder Coated Metal Clamps with superior temperature resistance up to 93°C and chemical compatibility. Our CPVC Pipe Clamps are ideal for hot water systems, chemical processing, pharmaceutical manufacturing, and industrial applications. Best quality metal clamps available in sizes 15mm to 50mm with ISO 9001:2015 certification.",
      "keywords": "CPVC Clamp, CPVC metal clamp, metal clamp, CPVC powder coated metal clamp, CPVC pipe clamp, CPVC clamp manufacturer, metal clamp India, hot water pipe clamp, CPVC clamp Rajkot, Edler Clamp, JK Industries",
      "sku": "CPVC-CLAMP-001",
      "mpn": "JK-CPVC-CL-001",
      "gtin13": "8901234567893",
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
      "alternateName": ["CPVC Clamp", "CPVC metal clamp", "metal clamp", "CPVC powder coated metal clamp", "CPVC pipe clamp", "CPVC clamp manufacturer", "metal clamp India", "hot water pipe clamp", "CPVC clamp Rajkot", "Edler Clamp", "JK Industries", "CPVC metal clamp manufacturer", "CPVC clamp price", "best CPVC clamp", "CPVC clamp online", "metal clamp supplier India"],
      "material": ["CRC - MS", "Premium Powder Coating"],
      "color": "Multiple Colors Available",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/cpvc-metal-clamp",
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
        "ratingCount": "156",
        "reviewCount": "98"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.author },
        "reviewBody": t.quote
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "CPVC/UPVC Piping System" },
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
        "value": "55",
        "unitCode": "GRM"
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Material", "value": "CRC - MS with Premium Powder Coating" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "15mm - 50mm Diameter (1/2 inch to 2 inch)" },
        { "@type": "PropertyValue", "name": "Thickness Options", "value": "0.5MM, 1MM, 1.5MM" },
        { "@type": "PropertyValue", "name": "Temperature Range", "value": "-10°C to 93°C (14°F to 200°F)" },
        { "@type": "PropertyValue", "name": "Pressure Rating", "value": "Up to 25 bar (Depending on Size)" },
        { "@type": "PropertyValue", "name": "Coating Thickness", "value": "60-80 microns" },
        { "@type": "PropertyValue", "name": "Chemical Resistance", "value": "Excellent - Acids, Bases, Chlorinated Water" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, NSF/ANSI 14 Compliant" },
        { "@type": "PropertyValue", "name": "Product Type", "value": "METAL" },
        { "@type": "PropertyValue", "name": "Shape", "value": "U" },
        { "@type": "PropertyValue", "name": "Delivery Time", "value": "7 Days" },
        { "@type": "PropertyValue", "name": "Color", "value": "Multiple Colors Available" },
        { "@type": "PropertyValue", "name": "Product Category", "value": "CPVC Clamp, CPVC Metal Clamp, Metal Clamp, CPVC Pipe Clamp" },
        { "@type": "PropertyValue", "name": "Manufacturer Location", "value": "Rajkot, Gujarat, India" },
        { "@type": "PropertyValue", "name": "Price Range", "value": `₹${minPrice} to ₹${maxPrice} per piece` },
        { "@type": "PropertyValue", "name": "Availability", "value": "In Stock - Ready to Ship" }
      ],
      "hasVariant": allSizes.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch CPVC Metal Clamp`,
        "sku": size.sku,
        "size": `${size.sizeInch} Inch / ${size.size} MM`,
        "image": "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
        "description": `Premium ${size.sizeInch} Inch (${size.size} MM) CPVC clamp, CPVC metal clamp, and metal clamp with powder coating. Perfect for ${size.size} OD pipes. Best quality CPVC pipe clamp for hot water systems and chemical applications.`,
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
          { "@type": "PropertyValue", "name": "Size", "value": `${size.sizeInch} Inch / ${size.size} MM` },
          { "@type": "PropertyValue", "name": "Pipe OD", "value": `${size.size} MM` },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing Qty", "value": size.packingQty.toString() }
        ]
      }))
    };

    const schemaString = JSON.stringify(schema);
    this.transferState.set(PRODUCT_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBusinessStructuredData(): void {
    if (this.transferState.hasKey(BUSINESS_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(BUSINESS_SCHEMA_KEY, ''));
      return;
    }

    const structuredData = {
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
        "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road, Rajkot, Gujarat 360004",
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
          "name": "CPVC Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for CPVC Clamps, CPVC Metal Clamps, Metal Clamps, and CPVC Powder Coated Metal Clamps",
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
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      },
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
        "https://www.linkedin.com/company/jk-industries-india/",
        "https://www.instagram.com/jk_industries_1995/"
      ]
    };

    const schemaString = JSON.stringify(structuredData);
    this.transferState.set(BUSINESS_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData(): void {
    if (this.transferState.hasKey(FAQ_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(FAQ_SCHEMA_KEY, ''));
      return;
    }

    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": this.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const schemaString = JSON.stringify(faqStructuredData);
    this.transferState.set(FAQ_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }
  

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(BREADCRUMB_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(BREADCRUMB_SCHEMA_KEY, ''));
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
          "name": "CPVC Clamp | CPVC Metal Clamp | Metal Clamp | Edler Clamp",
          "item": "https://jkindustriesrajkot.com/products/cpvc-metal-clamp"
        }
      ]
    };

    const schemaString = JSON.stringify(breadcrumbSchema);
    this.transferState.set(BREADCRUMB_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(HOWTO_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(HOWTO_SCHEMA_KEY, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install CPVC Metal Clamps / CPVC Clamps",
      "description": "Step-by-step guide to properly install CPVC Clamps, CPVC Metal Clamps, and Metal Clamps for secure pipe mounting. Learn the correct technique for installing powder coated clamps and CPVC pipe clamps.",
      "image": "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
      "totalTime": "PT10M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "CPVC Metal Clamps or CPVC Clamps"
        },
        {
          "@type": "HowToSupply",
          "name": "Appropriate Fasteners (screws or nails)"
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
        "url": `https://jkindustriesrajkot.com/products/cpvc-metal-clamp#step-${index + 1}`
      }))
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(HOWTO_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(ITEMLIST_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(ITEMLIST_SCHEMA_KEY, ''));
      return;
    }

    const allSizes = [...this.productSizes0_5MM, ...this.productSizes1MM, ...this.productSizes1_5MM];
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "CPVC Clamp | CPVC Metal Clamp | Metal Clamp Sizes - Available Variants",
      "description": "Complete range of CPVC Clamps, CPVC Metal Clamps, Metal Clamps, and CPVC Pipe Clamps available in 0.5MM, 1MM, and 1.5MM thicknesses from 1/2 inch to 2 inch. Powder coated clamps for all pipe diameters. Best quality metal clamps with competitive pricing.",
      "numberOfItems": allSizes.length,
      "itemListElement": allSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch CPVC Metal Clamp`,
          "description": `Premium ${size.sizeInch} Inch (${size.size} MM) CPVC clamp, CPVC metal clamp, and metal clamp with powder coating. Perfect for ${size.size} OD pipes. Best quality CPVC pipe clamp for hot water systems and chemical applications.`,
          "sku": size.sku,
          "image": "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "countryOfOrigin": {
            "@type": "Country",
            "name": "India"
          },
          "material": ["CRC - MS", "Premium Powder Coating"],
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
          }
        }
      }))
    };

    const schemaString = JSON.stringify(itemListSchema);
    this.transferState.set(ITEMLIST_SCHEMA_KEY, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(WEBPAGE_SCHEMA_KEY)) {
      this.addJsonLd(this.transferState.get(WEBPAGE_SCHEMA_KEY, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/cpvc-metal-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/cpvc-metal-clamp",
      "name": "CPVC Clamp | CPVC Metal Clamp | Metal Clamp | CPVC Powder Coated Metal Clamp | CPVC Pipe Clamp Manufacturer",
      "description": "India's #1 Manufacturer of CPVC Clamps, CPVC Metal Clamps, Metal Clamps, CPVC Powder Coated Metal Clamps & CPVC Pipe Clamps. Premium Metal Clamps with superior temperature resistance up to 93°C. ISO Certified. Factory Direct Prices. Contact Us for Best Quality CPVC Clamps, CPVC Metal Clamps, Metal Clamps & CPVC Pipe Clamps. Rajkot, Gujarat, India.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of CPVC clamps, CPVC metal clamps, metal clamps, and pipe support systems in India",
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
        "url": "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
        "width": "1200",
        "height": "800",
        "caption": "CPVC Metal Clamp - Premium Powder Coated Pipe Clamp by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(WEBPAGE_SCHEMA_KEY, schemaString);
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
