import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject, makeStateKey, TransferState } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as Aos from 'aos';

const SILVER_METAL_CLAMP_PRODUCT_SCHEMA = makeStateKey<string>('silver_metal_clamp_product_schema');
const SILVER_METAL_CLAMP_FAQ_SCHEMA = makeStateKey<string>('silver_metal_clamp_faq_schema');
const SILVER_METAL_CLAMP_BREADCRUMB_SCHEMA = makeStateKey<string>('silver_metal_clamp_breadcrumb_schema');
const SILVER_METAL_CLAMP_BUSINESS_SCHEMA = makeStateKey<string>('silver_metal_clamp_business_schema');
const SILVER_METAL_CLAMP_HOWTO_SCHEMA = makeStateKey<string>('silver_metal_clamp_howto_schema');
const SILVER_METAL_CLAMP_ITEMLIST_SCHEMA = makeStateKey<string>('silver_metal_clamp_itemlist_schema');
const SILVER_METAL_CLAMP_WEBPAGE_SCHEMA = makeStateKey<string>('silver_metal_clamp_webpage_schema');

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
  selector: 'app-silver-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './silver-metal-clamp.component.html',
  styleUrl: './silver-metal-clamp.component.scss'
})
export class SilverMetalClampComponent implements OnInit, AfterViewInit {
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
  
  // Product sizes for 1MM GI UPVC Clamp
  productSizes1MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 1.75, qtyPcs: 100, packingQty: 3000, sku: 'SLV-1MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 1.95, qtyPcs: 100, packingQty: 2500, sku: 'SLV-1MM-20' },
    { size: '25mm', sizeInch: '1', price: 2.30, qtyPcs: 100, packingQty: 1800, sku: 'SLV-1MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 2.65, qtyPcs: 100, packingQty: 1400, sku: 'SLV-1MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 3.15, qtyPcs: 100, packingQty: 1000, sku: 'SLV-1MM-40' },
    { size: '50mm', sizeInch: '2', price: 3.65, qtyPcs: 100, packingQty: 1000, sku: 'SLV-1MM-50' },
    { size: '75mm', sizeInch: '2 1/2', price: 5.15, qtyPcs: 50, packingQty: 1000, sku: 'SLV-1MM-75' },
    { size: '90mm', sizeInch: '3', price: 6.25, qtyPcs: 50, packingQty: 1000, sku: 'SLV-1MM-90' },
    { size: '110mm', sizeInch: '4', price: 7.30, qtyPcs: 50, packingQty: 1000, sku: 'SLV-1MM-110' }
  ];

  // Product sizes for 1.5MM GI UPVC Clamp
  productSizes1_5MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 2.60, qtyPcs: 100, packingQty: 2500, sku: 'SLV-1.5MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 3.00, qtyPcs: 100, packingQty: 2000, sku: 'SLV-1.5MM-20' },
    { size: '25mm', sizeInch: '1', price: 3.40, qtyPcs: 100, packingQty: 1500, sku: 'SLV-1.5MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 4.00, qtyPcs: 100, packingQty: 1000, sku: 'SLV-1.5MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 4.50, qtyPcs: 100, packingQty: 800, sku: 'SLV-1.5MM-40' },
    { size: '50mm', sizeInch: '2', price: 5.30, qtyPcs: 100, packingQty: 700, sku: 'SLV-1.5MM-50' },
    { size: '75mm', sizeInch: '2 1/2', price: 8.50, qtyPcs: 50, packingQty: 1000, sku: 'SLV-1.5MM-75' },
    { size: '90mm', sizeInch: '3', price: 9.50, qtyPcs: 50, packingQty: 1000, sku: 'SLV-1.5MM-90' },
    { size: '110mm', sizeInch: '4', price: 11.50, qtyPcs: 50, packingQty: 1000, sku: 'SLV-1.5MM-110' }
  ];

  // Related products for internal linking
  relatedProducts: RelatedProduct[] = [
    {
      name: 'Golden Metal Clamp',
      image: 'assets/products/golden-metal-clamp.jpg',
      link: '/products/golden-metal-clamp',
      description: 'Luxury gold-plated clamps for decorative plumbing installations'
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
      name: 'Metal Clamp - SS Metal Clamp',
      image: 'assets/products/metal-clamp.jpg',
      link: '/products/stainless-steel-clamp',
      description: 'Premium stainless steel clamps for industrial and marine applications'
    },
    {
      name: 'Stainless Steel Clamp',
      image: 'assets/products/stainless-steel-clamp.jpg',
      link: '/products/stainless-steel-clamp',
      description: 'Marine-grade SS clamps with superior corrosion resistance'
    },
    {
      name: 'Step Clamp',
      image: 'assets/products/step-clamp.jpg',
      link: '/products/step-clamp',
      description: 'Versatile step clamps for multiple pipe sizes with adjustable design'
    }
  ];

  // Installation steps for HowTo schema
  installationSteps = [
    {
      name: 'Preparation',
      text: 'Mark the position ensuring proper pipe alignment and spacing (recommended every 80-100cm for horizontal runs). Ensure the mounting surface is clean and free from debris.',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg'
    },
    {
      name: 'Pre-drilling',
      text: 'For hard surfaces like concrete or brick, pre-drill pilot holes using a 3mm drill bit to ensure accurate placement and prevent surface cracking.',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg'
    },
    {
      name: 'Positioning',
      text: 'Place the silver metal clamp against the mounting surface, ensuring proper alignment with the marked position. Verify the clamp size matches the pipe diameter.',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg'
    },
    {
      name: 'Fastening',
      text: 'Secure the clamp using appropriate fasteners (screws or nails) until the clamp is firmly attached to the mounting surface. Ensure the clamp is flush and secure.',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the pipe sits securely in the clamp without being compressed, ensuring proper movement allowance for thermal expansion. Verify the installation is stable.',
      image: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg'
    }
  ];
  
  features = [
    {
      icon: 'shield-alt',
      title: 'Premium Corrosion Resistance',
      description: 'Advanced silver plating offers superior protection against rust and environmental wear, outlasting standard <strong>GI clamps</strong> and galvanized coatings. Our <strong>silver metal clamps</strong> provide exceptional durability for long-term installations.'
    },
    {
      icon: 'gem',
      title: 'Elegant Aesthetic Finish',
      description: 'High-gloss <strong>silver plated clamp</strong> finish provides a sophisticated look ideal for visible installations in modern architectural and commercial spaces. Perfect alternative to standard <strong>GI clamp</strong> finishes.'
    },
    {
      icon: 'layer-group',
      title: 'Multi-Layer Protection',
      description: 'Engineered with a triple-layer coating system: base metal treatment, primer, and high-grade <strong>silver clamp</strong> finish for maximum durability. Superior to standard <strong>GI UPVC clamp</strong> protection.'
    },
    {
      icon: 'temperature-high',
      title: 'Thermal Stability',
      description: 'Our <strong>metal clamp</strong> maintains structural integrity and finish quality across a wide temperature range (-20°C to 110°C), preventing discoloration and ensuring reliable performance.'
    },
    {
      icon: 'compress-arrows-alt',
      title: 'Precision Fit',
      description: 'Manufactured to strict tolerances ensuring a secure grip on pipes while minimizing surface damage. Our <strong>silver metal clamp</strong> range offers perfect fit for all standard pipe sizes.'
    },
    {
      icon: 'check-circle',
      title: 'Certified Quality',
      description: 'ISI marked and ISO 9001:2015 certified production ensures consistency and reliability. Every <strong>GI clamp</strong> and <strong>silver plated clamp</strong> meets international quality standards.'
    }
  ];

  applications = [
    {
      icon: 'building',
      title: 'Commercial Complexes',
      description: 'Ideal for malls, hotels, and office buildings where exposed piping requires a clean, professional appearance. Our <strong>silver clamp</strong> and <strong>GI clamp</strong> solutions provide superior aesthetics.'
    },
    {
      icon: 'flask',
      title: 'Pharmaceutical Plants',
      description: 'Clean, smooth surface finish of our <strong>silver plated clamp</strong> meets the hygiene and aesthetic standards required in pharma and lab environments. Perfect alternative to standard <strong>GI UPVC clamp</strong>.'
    },
    {
      icon: 'home',
      title: 'Luxury Residences',
      description: 'Enhances the look of utility areas in high-end homes, matching premium plumbing and electrical fixtures. Our <strong>silver metal clamp</strong> range adds elegance to any installation.'
    },
    {
      icon: 'industry',
      title: 'Showroom Industries',
      description: 'Perfect for manufacturing facilities that host client visits, maintaining a tidy and world-class industrial look. <strong>Metal clamp</strong> solutions with premium <strong>GI clamp</strong> quality.'
    },
    {
      icon: 'hospital',
      title: 'Healthcare Facilities',
      description: 'Our <strong>silver clamp</strong> range is ideal for hospitals and clinics where clean, visible installations are essential. Superior to standard <strong>GI clamp</strong> finishes.'
    },
    {
      icon: 'utensils',
      title: 'Food Processing',
      description: 'Premium <strong>silver plated clamp</strong> suitable for food processing facilities where hygiene and appearance matter. Our <strong>GI UPVC clamp</strong> alternatives provide better aesthetics.'
    }
  ];

  specifications = [
    { label: 'Base Material', value: 'High-grade carbon steel with premium silver plating' },
    { label: 'Plating Thickness', value: '10-20 microns (industrial grade)' },
    { label: 'Sizes Available', value: '1/2 inch to 4 inch diameter' },
    { label: 'Load Capacity', value: 'Up to 100kg (size dependent)' },
    { label: 'Temperature Range', value: '-20°C to 110°C' },
    { label: 'Corrosion Resistance', value: '500+ hours salt spray test' },
    { label: 'Certifications', value: 'ISO 9001:2015, ISI Marked' },
    { label: 'Finish Options', value: 'Premium Silver Plating (Gloss/Satin)' },
    { label: 'Application Standards', value: 'IS: 513, ISO 9001:2015' }
  ];

  faqs = [
    {
      question: 'What is the advantage of Silver Metal Clamps over GI Clamps?',
      answer: 'Silver Metal Clamps offer a superior aesthetic finish and smoother surface compared to standard GI (Galvanized Iron) clamps. While both offer corrosion resistance, silver clamps are specifically designed for applications where looks matter, providing a brighter, cleaner appearance that resists dulling over time. Our silver plated clamps are perfect alternatives to traditional GI clamps when aesthetics are important.'
    },
    {
      question: 'Can these Silver Clamps be used for outdoor plumbing?',
      answer: 'Yes, our Silver Metal Clamps and GI UPVC Clamps are treated for weather resistance. However, for extreme coastal or highly corrosive industrial environments, we recommend our Stainless Steel (SS) range. For general outdoor use in standard conditions, silver clamps and GI clamps perform excellently.'
    },
    {
      question: 'What sizes are available for Silver Metal Clamps and GI Clamps?',
      answer: 'JK Industries offers comprehensive size ranges for both 1MM and 1.5MM GI UPVC Clamps (Silver Metal Clamps) from 1/2 inch to 4 inch. We manufacture silver clamps, GI clamps, and metal clamps in all standard sizes. Custom sizes are also available on request for special projects.'
    },
    {
      question: 'Do you offer custom sizes for special projects?',
      answer: 'Absolutely. As a direct manufacturer, JK Industries can produce "Edler" brand silver metal clamps, GI clamps, and metal clamps in custom sizes, widths, and thicknesses to match your specific project requirements. Minimum order quantities may apply for custom dies.'
    },
    {
      question: 'How do I maintain the shine of Silver Plated Clamps?',
      answer: 'Our silver clamps and silver plated clamps are maintenance-free for the most part. In dusty environments, a simple wipe with a dry or slightly damp cloth is enough to restore their original shine. Avoid using harsh acidic cleaners that could damage the silver plating finish.'
    },
    {
      question: 'What is the difference between Silver Clamp and GI Clamp?',
      answer: 'Silver Clamps feature a premium silver-plated finish that provides superior aesthetics and a brighter appearance compared to standard GI (Galvanized Iron) clamps. While GI clamps offer good corrosion resistance, silver clamps are specifically designed for visible installations where appearance matters. Both are available in our product range.'
    },
    {
      question: 'Where can I buy Silver Clamps, GI Clamps, and Metal Clamps online in India?',
      answer: 'JK Industries is a leading manufacturer of Silver Clamps, GI Clamps, Metal Clamps, and GI UPVC Clamps in India. You can purchase our silver metal clamps, silver plated clamps, and GI clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India.'
    },
    {
      question: 'Is the "Edler" brand your own manufacturing?',
      answer: 'Yes, "Edler" is the premium brand of JK Industries. All Edler clamps including silver clamps, GI clamps, metal clamps, and silver plated clamps are manufactured in our state-of-the-art facility in Rajkot, Gujarat, ensuring direct-from-factory pricing and quality control.'
    },
    {
      question: 'What is the price range for Silver Metal Clamps and GI UPVC Clamps?',
      answer: 'Our Silver Metal Clamps and GI UPVC Clamps are available in competitive price ranges. 1MM GI UPVC Clamps start from ₹1.75 for 1/2 inch size, while 1.5MM GI UPVC Clamps start from ₹2.60. Prices vary based on size and thickness. Contact us for bulk pricing on silver clamps, GI clamps, and metal clamps.'
    },
    {
      question: 'Why choose JK Industries for Silver Clamps, GI Clamps, and Metal Clamps?',
      answer: 'JK Industries (Edler Clamp brand) is India\'s trusted manufacturer of Silver Clamps, GI Clamps, Metal Clamps, and GI UPVC Clamps. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our silver metal clamps, silver plated clamps, and GI clamps are manufactured using premium materials ensuring superior quality and durability.'
    }
  ];

  whyChoose = [
    {
      title: 'Premium Silver Finish',
      description: 'Advanced plating process ensures lasting beauty and durability. Our silver clamps and silver plated clamps offer superior aesthetics compared to standard GI clamps.'
    },
    {
      title: 'Precision Manufacturing',
      description: 'Consistent quality and flawless finish through rigorous quality control. Every metal clamp, GI clamp, and silver metal clamp meets international standards.'
    },
    {
      title: 'Comprehensive Size Range',
      description: 'Available in both 1MM and 1.5MM thicknesses, from 1/2 inch to 4 inch diameters. Complete range of GI UPVC clamps and silver clamps for all applications.'
    },
    {
      title: 'Cost-Effective',
      description: 'Direct manufacturer pricing for premium "Edler" brand clamps. Competitive prices on silver clamps, GI clamps, and metal clamps with bulk discounts available.'
    },
    {
      title: 'Customization Available',
      description: 'Available in custom sizes and finishes to match exact project specs. We can manufacture special silver clamps, GI clamps, and metal clamps as per your requirements.'
    }
  ];

  testimonials = [
    {
      quote: 'We used JK Industries\' silver metal clamps for a luxury hotel project. The finish is outstanding and adds a real touch of class to the exposed HVAC lines. The client was very impressed with the attention to detail.',
      author: 'Rajesh Patel',
      role: ''
    },
    {
      quote: 'Finding hardware that looks good is always a challenge. These silver clamps blend perfectly with modern industrial interior themes. Strong, durable, and good looking.',
      author: 'Amitabh Verma',
      role: ''
    },
    {
      quote: 'Consistent quality and timely delivery. We shifted from local unbranded clamps to Edler silver clamps and the difference in site finishing is visible. Highly recommended.',
      author: 'Suresh Reddy',
      role: ''
    }
  ];

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Silver Clamp | GI Clamp | Metal Clamp | GI UPVC Clamp | Silver Metal Clamp | Silver Plated Clamp Manufacturer - JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of Silver Clamps, GI Clamps, Metal Clamps, GI UPVC Clamps, Silver Metal Clamps & Silver Plated Clamps. Premium Silver Clamps with superior finish. ISO Certified. Best Prices. Buy Direct from Factory in Rajkot, Gujarat.' },
      { name: 'keywords', content: 'silver clamp, GI clamp, Metal Clamp, GI upvc clamp, silver metal clamp, silver plated clamp, GI pipe clamp, silver plated pipe clamp, galvanized iron clamp, UPVC metal clamp, decorative pipe clamp, premium metal clamp, industrial clamp, pipe support clamp, GI metal clamp, silver clamp manufacturer, GI clamp manufacturer India, metal clamp Rajkot, silver plated clamp price, GI UPVC clamp sizes' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/silver-metal-clamp' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Article meta tags
      { property: 'article:section', content: 'Plumbing Products' },
      { property: 'article:tag', content: 'Silver Clamp' },
      { property: 'article:tag', content: 'GI Clamp' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'GI UPVC Clamp' },
      { property: 'article:tag', content: 'Silver Metal Clamp' },
      
      // Product meta tags
      { property: 'product:price:amount', content: '1.75' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'Silver Clamp | GI Clamp | Metal Clamp | GI UPVC Clamp | Silver Metal Clamp Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of Silver Clamps, GI Clamps, Metal Clamps, GI UPVC Clamps & Silver Plated Clamps. Premium Silver Clamps with superior finish. ISO Certified.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '800' },
      { property: 'og:image:alt', content: 'Silver Metal Clamp - Premium GI UPVC Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/silver-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Silver Clamp | GI Clamp | Metal Clamp | GI UPVC Clamp Manufacturer' },
      { name: 'twitter:description', content: 'Premium Silver Clamps, GI Clamps, Metal Clamps & GI UPVC Clamps. Silver Plated Clamps with superior finish. ISO Certified. Buy Direct from Factory.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'Silver Metal Clamp - Premium GI UPVC Clamp' }
    ]);

    this.setProductStructuredData();
    this.setFaqStructuredData();
    this.setBreadcrumbStructuredData();
    this.setLocalBusinessStructuredData();
    this.setHowToStructuredData();
    this.setItemListStructuredData();
    this.setWebPageStructuredData();
    
    // Initialize expandedFaqs array
    this.expandedFaqs = new Array(this.faqs.length).fill(false);
    
    if (isPlatformBrowser(this.platformId)) {
      Aos.init({
        duration: 800,
        once: true,
        offset: 100
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        Aos.refresh();
      }, 500);
    }
  }

  toggleFaq(index: number) {
    // Toggle the clicked FAQ
    this.expandedFaqs[index] = !this.expandedFaqs[index];
    
    // Close other FAQs (optional - remove if you want multiple open)
    for (let i = 0; i < this.expandedFaqs.length; i++) {
      if (i !== index) this.expandedFaqs[i] = false;
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
    // Handle form submission
    console.log('Enquiry submitted:', this.enquiryData);
    alert('Thank you for your enquiry about Silver Clamps, GI Clamps, and Metal Clamps. We will contact you shortly.');
    this.showEnquiryForm = false;
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'auto';
    }
    
    // Reset form
    this.enquiryData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      quantity: null,
      message: ''
    };
  }

  downloadBrochure() {
    alert('Thank you for your interest! Our product brochure will be available shortly. Our team will contact you with more information.');
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(SILVER_METAL_CLAMP_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SILVER_METAL_CLAMP_PRODUCT_SCHEMA, ''));
      return;
    }

    const allSizes = [...this.productSizes1MM, ...this.productSizes1_5MM];
    const minPrice = Math.min(...allSizes.map(s => s.price));
    const maxPrice = Math.max(...allSizes.map(s => s.price));

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "Silver Clamp, GI Clamp, Metal Clamp, GI UPVC Clamp, Silver Metal Clamp, Silver Plated Clamp, Clips, Clamps",
      "name": "Silver Clamp | GI Clamp | Metal Clamp | GI UPVC Clamp | Silver Metal Clamp | Silver Plated Clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg"
      ],
      "url": "https://jkindustriesrajkot.com/products/silver-metal-clamp",
      "description": "JK Industries manufactures premium Silver Clamps, GI Clamps, Metal Clamps, GI UPVC Clamps, Silver Metal Clamps, and Silver Plated Clamps (Edler Brand) with high-gloss silver finish for superior aesthetics and corrosion resistance. Ideal for visible piping in commercial and luxury residential projects. Available in 1MM and 1.5MM thicknesses from 1/2 inch to 4 inch.",
      "sku": "SLV-CL-001",
      "mpn": "JK-SLV-001",
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
      "alternateName": ["Silver clamp", "GI clamp", "Metal Clamp", "GI upvc clamp", "silver metal clamp", "silver plated clamp", "GI pipe clamp", "silver plated pipe clamp", "galvanized iron clamp", "UPVC metal clamp", "decorative pipe clamp", "premium metal clamp", "industrial clamp", "pipe support clamp"],
      "material": ["Carbon Steel", "Silver Plating", "Galvanized Iron"],
      "color": "Silver",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/silver-metal-clamp",
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
        "ratingCount": "125",
        "reviewCount": "95"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": t.author },
        "reviewBody": t.quote,
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "Industrial Pipes" },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Type", "value": "Silver Metal Clamp" },
        { "@type": "PropertyValue", "name": "Finish", "value": "Silver Plated" },
        { "@type": "PropertyValue", "name": "Thickness Options", "value": "1MM and 1.5MM" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "1/2 inch to 4 inch" },
        { "@type": "PropertyValue", "name": "Material", "value": "Carbon Steel with Silver Plating" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, ISI Marked" }
      ],
      "hasVariant": allSizes.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch Silver Metal Clamp / GI UPVC Clamp`,
        "sku": size.sku,
        "size": `${size.size} / ${size.sizeInch} Inch`,
        "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
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
          { "@type": "PropertyValue", "name": "Pipe OD", "value": size.size + " mm" },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing Qty", "value": size.packingQty.toString() }
        ]
      }))
    };

    const schemaString = JSON.stringify(schema);
    this.transferState.set(SILVER_METAL_CLAMP_PRODUCT_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData() {
    if (this.transferState.hasKey(SILVER_METAL_CLAMP_FAQ_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SILVER_METAL_CLAMP_FAQ_SCHEMA, ''));
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
    this.transferState.set(SILVER_METAL_CLAMP_FAQ_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(SILVER_METAL_CLAMP_BREADCRUMB_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SILVER_METAL_CLAMP_BREADCRUMB_SCHEMA, ''));
      return;
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jkindustriesrajkot.com" },
        { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://jkindustriesrajkot.com/products" },
        { "@type": "ListItem", "position": 3, "name": "Silver Metal Clamp", "item": "https://jkindustriesrajkot.com/products/silver-metal-clamp" }
      ]
    };

    const schemaString = JSON.stringify(breadcrumbSchema);
    this.transferState.set(SILVER_METAL_CLAMP_BREADCRUMB_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setLocalBusinessStructuredData() {
    if (this.transferState.hasKey(SILVER_METAL_CLAMP_BUSINESS_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SILVER_METAL_CLAMP_BUSINESS_SCHEMA, ''));
      return;
    }

    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "JK Industries",
      "url": "https://jkindustriesrajkot.com",
      "image": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "telephone": "+91 9979032430",
      "email": "jkindustries1955@gmail.com",
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
          "name": "Silver Metal Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for Silver Metal Clamps",
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
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "19:00"
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
      "priceRange": "₹₹"
    };

    const schemaString = JSON.stringify(businessSchema);
    this.transferState.set(SILVER_METAL_CLAMP_BUSINESS_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(SILVER_METAL_CLAMP_HOWTO_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SILVER_METAL_CLAMP_HOWTO_SCHEMA, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install Silver Metal Clamps / GI UPVC Clamps",
      "description": "Step-by-step guide to properly install Silver Clamps, GI Clamps, and Metal Clamps for secure pipe mounting. Learn the correct technique for installing silver plated clamps and GI UPVC clamps.",
      "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
      "totalTime": "PT10M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Silver Metal Clamps or GI UPVC Clamps"
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
        "url": `https://jkindustriesrajkot.com/products/silver-metal-clamp#step-${index + 1}`
      }))
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(SILVER_METAL_CLAMP_HOWTO_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(SILVER_METAL_CLAMP_ITEMLIST_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SILVER_METAL_CLAMP_ITEMLIST_SCHEMA, ''));
      return;
    }

    const allSizes = [...this.productSizes1MM, ...this.productSizes1_5MM];
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Silver Clamp | GI Clamp | Metal Clamp Sizes - Available Variants",
      "description": "Complete range of Silver Clamps, GI Clamps, Metal Clamps, and GI UPVC Clamps available in 1MM and 1.5MM thicknesses from 1/2 inch to 4 inch. Silver plated clamps for all pipe diameters.",
      "numberOfItems": allSizes.length,
      "itemListElement": allSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch Silver Metal Clamp / GI UPVC Clamp`,
          "description": `Premium ${size.sizeInch} Inch (${size.size}) Silver Clamp, GI Clamp, or Metal Clamp. Perfect for ${size.size} OD pipes. Available in both 1MM and 1.5MM thicknesses.`,
          "sku": size.sku,
          "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "countryOfOrigin": {
            "@type": "Country",
            "name": "India"
          },
          "size": `${size.sizeInch} Inch`,
          "material": ["Carbon Steel", "Silver Plating", "Galvanized Iron"],
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
            { "@type": "PropertyValue", "name": "Pipe OD", "value": size.size + " mm" },
            { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
            { "@type": "PropertyValue", "name": "Packing Qty", "value": size.packingQty.toString() }
          ]
        }
      }))
    };

    const schemaString = JSON.stringify(itemListSchema);
    this.transferState.set(SILVER_METAL_CLAMP_ITEMLIST_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(SILVER_METAL_CLAMP_WEBPAGE_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SILVER_METAL_CLAMP_WEBPAGE_SCHEMA, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/silver-metal-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/silver-metal-clamp",
      "name": "Silver Clamp | GI Clamp | Metal Clamp | GI UPVC Clamp | Silver Metal Clamp Manufacturer",
      "description": "India's #1 Manufacturer of Silver Clamps, GI Clamps, Metal Clamps, GI UPVC Clamps & Silver Plated Clamps. Premium Silver Clamps with superior finish. ISO Certified.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of Silver Clamps, GI Clamps, Metal Clamps, and pipe support systems in India",
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
        "url": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
        "width": "1200",
        "height": "800",
        "caption": "Silver Metal Clamp - Premium GI UPVC Clamp by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(SILVER_METAL_CLAMP_WEBPAGE_SCHEMA, schemaString);
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
