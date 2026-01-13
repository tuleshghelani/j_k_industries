import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID, Inject, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import * as Aos from 'aos';

// Define TransferState keys
const PRODUCT_SCHEMA_KEY = makeStateKey<string>('UPVC_METAL_CLAMP_PRODUCT_SCHEMA');
const BUSINESS_SCHEMA_KEY = makeStateKey<string>('UPVC_METAL_CLAMP_BUSINESS_SCHEMA');
const FAQ_SCHEMA_KEY = makeStateKey<string>('UPVC_METAL_CLAMP_FAQ_SCHEMA');
const BREADCRUMB_SCHEMA_KEY = makeStateKey<string>('UPVC_METAL_CLAMP_BREADCRUMB_SCHEMA');
const HOWTO_SCHEMA_KEY = makeStateKey<string>('UPVC_METAL_CLAMP_HOWTO_SCHEMA');
const ITEMLIST_SCHEMA_KEY = makeStateKey<string>('UPVC_METAL_CLAMP_ITEMLIST_SCHEMA');
const WEBPAGE_SCHEMA_KEY = makeStateKey<string>('UPVC_METAL_CLAMP_WEBPAGE_SCHEMA');

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
  selector: 'app-upvc-metal-clamp',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './upvc-metal-clamp.component.html',
  styleUrl: './upvc-metal-clamp.component.scss'
})
export class UPVCMetalClampComponent implements OnInit, AfterViewInit {
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
  
  features: Feature[] = [
    {
      icon: 'shield-alt',
      title: 'Superior Corrosion Resistance',
      description: 'Engineered with high-grade powder coating that provides an impermeable barrier against moisture, preventing rust and ensuring longevity even in humid environments.'
    },
    {
      icon: 'compress-arrows-alt',
      title: 'Secure Grip Technology',
      description: 'Designed with precision dimensions to hold pipes firmly in place, reducing vibration noise and preventing slippage without damaging the pipe surface.'
    },
    {
      icon: 'layer-group',
      title: 'Double-Layer Protection',
      description: 'Features a durable metal core for structural strength combined with a premium powder coat finish for aesthetic appeal and environmental protection.'
    },
    {
      icon: 'tools',
      title: 'Effortless Installation',
      description: 'Simplified mounting system allows for quick and easy installation, saving valuable time and labor costs on both small and large-scale projects.'
    },
    {
      icon: 'sun',
      title: 'UV & Weather Stable',
      description: 'The specialized coating resists fading and degradation from UV exposure, making these clamps ideal for both indoor and outdoor applications.'
    },
    {
      icon: 'check-circle',
      title: 'Standard Compliance',
      description: 'Manufactured to strict quality standards, ensuring compatibility with all standard UPVC and CPVC pipe dimensions available in the market.'
    }
  ];

  applications: Application[] = [
    {
      icon: 'home',
      title: 'Residential Plumbing',
      description: 'Perfect for securing water supply lines and drainage pipes in homes, offering a clean look that complements modern interiors.'
    },
    {
      icon: 'building',
      title: 'Commercial Complexes',
      description: 'Reliable support for extensive piping networks in office buildings, malls, and hotels where durability and low maintenance are priority.'
    },
    {
      icon: 'industry',
      title: 'Industrial Facilities',
      description: 'Robust enough to handle the rigorous demands of industrial plants, ensuring safe and stable routing of process piping.'
    },
    {
      icon: 'tint',
      title: 'Irrigation Systems',
      description: 'Excellent for agricultural and landscape irrigation setups, withstanding exposure to water, soil, and fertilizers.'
    },
    {
      icon: 'fire-extinguisher',
      title: 'Fire Fighting Lines',
      description: 'Provides dependable support for critical fire safety water lines, maintaining structural integrity when it matters most.'
    },
    {
      icon: 'warehouse',
      title: 'HVAC Installations',
      description: 'Ideal for supporting drain lines and condensate pipes in heating, ventilation, and air conditioning systems.'
    }
  ];

  specifications: Spec[] = [
    { label: 'Base Material', value: 'CRC - MS' },
    { label: 'Finish', value: 'Premium Powder Coating (Multiple Colors Available)' },
    { label: 'Sizes Available', value: '15mm - 160mm Diameter' },
    { label: 'Pipe Compatibility', value: 'UPVC, CPVC, PVC, WDC, HDP' },
    { label: 'Temperature Range', value: '-5°C to 70°C' },
    { label: 'Pressure Rating', value: 'Up to 16 bar (Depending on Size)' },
    { label: 'Coating Thickness', value: '60-80 microns' },
    { label: 'Certification', value: 'ISO 9001:2015, ISI Marked' },
    { label: 'Application Standards', value: 'IS 4985, ASTM D1785, BS EN 1452' }
  ];

  whyChoose = [
    {
      title: 'Enhanced Durability',
      description: 'Precision manufacturing with premium powder coating ensures perfect fit and extended service life'
    },
    {
      title: 'Cost-Effective Solution',
      description: 'Longer service life than standard plastic clamps or uncoated alternatives'
    },
    {
      title: 'Customizable Options',
      description: 'Available in custom configurations and colors to meet unique installation requirements'
    },
    {
      title: 'Quality Tested',
      description: 'Rigorously tested for durability in various environmental conditions including salt spray testing'
    },
    {
      title: 'Expert Support',
      description: 'Technical support available for installation guidance and product selection'
    }
  ];

  testimonials = [
    {
      quote: '"JK Industries UPVC powder coated clamps have been a reliable part of our plumbing installations for years. We\'ve seen significantly fewer leaks and virtually no corrosion issues since switching to these clamps."',
      author: 'Rajesh Sharma',
      role: ''
    },
    {
      quote: '"We\'ve been using these UPVC powder coated metal clamps in our chemical processing facility for over 2 years. They hold up exceptionally well even in our harsh environment with chemical exposure. The powder coating has maintained its integrity throughout."',
      author: 'Vikram Patel',
      role: ''
    }
  ];

  // Product sizes for 0.5MM UPVC Metal Clamp
  productSizes0_5MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 1.30, qtyPcs: 200, packingQty: 5600, sku: 'UPVC-0.5MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 1.40, qtyPcs: 200, packingQty: 4600, sku: 'UPVC-0.5MM-20' },
    { size: '25mm', sizeInch: '1', price: 1.60, qtyPcs: 200, packingQty: 3600, sku: 'UPVC-0.5MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 1.80, qtyPcs: 200, packingQty: 2600, sku: 'UPVC-0.5MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 2.10, qtyPcs: 200, packingQty: 2000, sku: 'UPVC-0.5MM-40' },
    { size: '50mm', sizeInch: '2', price: 2.50, qtyPcs: 200, packingQty: 1800, sku: 'UPVC-0.5MM-50' },
    { size: '75mm', sizeInch: '2 1/2', price: 4, qtyPcs: 100, packingQty: 2000, sku: 'UPVC-0.5MM-75' },
    { size: '80mm', sizeInch: '3', price: 5, qtyPcs: 100, packingQty: 2000, sku: 'UPVC-0.5MM-80' },
    { size: '110mm', sizeInch: '4', price: 6.20, qtyPcs: 100, packingQty: 2000, sku: 'UPVC-0.5MM-110' },
    { size: '160mm', sizeInch: '6', price: 8, qtyPcs: 50, packingQty: 1000, sku: 'UPVC-0.5MM-160' }
  ];

  // Product sizes for 1MM UPVC Metal Clamp
  productSizes1MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 1.80, qtyPcs: 100, packingQty: 3000, sku: 'UPVC-1MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 2, qtyPcs: 100, packingQty: 2500, sku: 'UPVC-1MM-20' },
    { size: '25mm', sizeInch: '1', price: 2.35, qtyPcs: 100, packingQty: 2000, sku: 'UPVC-1MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 2.70, qtyPcs: 100, packingQty: 1400, sku: 'UPVC-1MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 3.20, qtyPcs: 100, packingQty: 1200, sku: 'UPVC-1MM-40' },
    { size: '50mm', sizeInch: '2', price: 3.70, qtyPcs: 100, packingQty: 1000, sku: 'UPVC-1MM-50' },
    { size: '75mm', sizeInch: '2 1/2', price: 5.20, qtyPcs: 50, packingQty: 2000, sku: 'UPVC-1MM-75' },
    { size: '80mm', sizeInch: '3', price: 6.30, qtyPcs: 50, packingQty: 1000, sku: 'UPVC-1MM-80' },
    { size: '110mm', sizeInch: '4', price: 7.40, qtyPcs: 50, packingQty: 1000, sku: 'UPVC-1MM-110' },
    { size: '160mm', sizeInch: '6', price: 12, qtyPcs: 25, packingQty: 500, sku: 'UPVC-1MM-160' }
  ];

  // Product sizes for 1.5MM UPVC Metal Clamp (Powder Coated)
  productSizes1_5MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 2.70, qtyPcs: 100, packingQty: 2500, sku: 'UPVC-1.5MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 3.07, qtyPcs: 100, packingQty: 2000, sku: 'UPVC-1.5MM-20' },
    { size: '25mm', sizeInch: '1', price: 3.44, qtyPcs: 100, packingQty: 1400, sku: 'UPVC-1.5MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 4.12, qtyPcs: 100, packingQty: 1000, sku: 'UPVC-1.5MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 4.55, qtyPcs: 100, packingQty: 900, sku: 'UPVC-1.5MM-40' },
    { size: '50mm', sizeInch: '2', price: 5.35, qtyPcs: 100, packingQty: 800, sku: 'UPVC-1.5MM-50' },
    { size: '75mm', sizeInch: '2 1/2', price: 8.60, qtyPcs: 50, packingQty: 900, sku: 'UPVC-1.5MM-75' },
    { size: '90mm', sizeInch: '3', price: 10.00, qtyPcs: 50, packingQty: 700, sku: 'UPVC-1.5MM-90' },
    { size: '110mm', sizeInch: '4', price: 12.00, qtyPcs: 50, packingQty: 600, sku: 'UPVC-1.5MM-110' },
    { size: '160mm', sizeInch: '6', price: 15.00, qtyPcs: 50, packingQty: 500, sku: 'UPVC-1.5MM-160' }
  ];

  // Related products for internal linking
  relatedProducts: RelatedProduct[] = [
    {
      name: 'UPVC Double Nail Clamp',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      link: '/products/upvc-double-nail-clamp',
      description: 'Premium dual fastening UPVC nail clamps with 40% more holding power'
    },
    {
      name: 'CPVC Metal Clamp',
      image: 'assets/products/cpvc-metal-clamp.jpg',
      link: '/products/cpvc-metal-clamp',
      description: 'High-temperature resistant metal clamps designed for CPVC hot water systems'
    },
    {
      name: 'Golden Metal Clamp',
      image: 'assets/products/golden-metal-clamp.jpg',
      link: '/products/golden-metal-clamp',
      description: 'Luxury gold-plated clamps for decorative plumbing installations'
    },
    {
      name: 'Silver Metal Clamp',
      image: 'assets/products/upvc-metal-clamp.jpg',
      link: '/products/silver-metal-clamp',
      description: 'Premium silver-plated clamps for modern installations'
    },
    {
      name: 'Stainless Steel Clamp',
      image: 'assets/products/stainless-steel-clamp.jpg',
      link: '/products/stainless-steel-clamp',
      description: 'Premium SS clamps for industrial and marine applications'
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
      text: 'Place the UPVC metal clamp against the mounting surface, ensuring proper alignment with the marked position. Verify the clamp size matches the pipe diameter.',
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

  faqs: FAQ[] = [
    {
      question: 'What is the difference between UPVC Clamp, UPVC Metal Clamp, and Metal Clamp?',
      answer: 'A <strong>UPVC clamp</strong> refers to any clamp designed for UPVC pipes, while a <strong>UPVC metal clamp</strong> specifically uses metal construction with powder coating. Our <strong>metal clamp</strong> range includes both standard and powder coated options. The <strong>UPVC powder coated metal clamp</strong> offers superior corrosion resistance and aesthetic appeal compared to standard <strong>metal clamps</strong>.'
    },
    {
      question: 'Why should I choose powder coated UPVC metal clamps over regular galvanized ones?',
      answer: 'Powder coated <strong>UPVC metal clamps</strong> offer significantly better aesthetics and superior corrosion resistance compared to standard galvanized <strong>metal clamps</strong>. The coating acts as a protective shield, preventing direct contact between moisture and the metal, which drastically reduces the risk of rust. Additionally, the smooth finish is gentler on plastic pipes, preventing scratches and potential stress points. Our <strong>UPVC powder coated metal clamp</strong> range provides long-lasting protection for your piping systems.'
    },
    {
      question: 'Are UPVC clamps and UPVC metal clamps suitable for outdoor exposed piping?',
      answer: 'Absolutely. Our <strong>UPVC metal clamps</strong> and <strong>UPVC powder coated metal clamps</strong> are designed to withstand outdoor elements. The UV-stable coating prevents the finish from peeling or chalking under sunlight, and the robust metal core handles temperature fluctuations. They are an excellent choice for external plumbing lines, solar water heater connections, and garden irrigation systems. The <strong>metal clamp</strong> construction ensures durability in harsh environments.'
    },
    {
      question: 'Can I use UPVC metal clamps for hot water CPVC lines?',
      answer: 'Yes, our <strong>UPVC metal clamps</strong> are perfectly compatible with CPVC pipes carrying hot water. The metal construction retains its strength at higher temperatures, unlike some plastic clips that might deform. Just ensure to allow for the natural thermal expansion of the piping system during installation by not over-tightening the <strong>metal clamps</strong> excessively. Our <strong>UPVC pipe clamp</strong> range handles temperatures up to 70°C effectively.'
    },
    {
      question: 'What sizes are available for UPVC clamps and UPVC metal clamps?',
      answer: 'JK Industries offers comprehensive size ranges for <strong>UPVC clamps</strong> and <strong>UPVC metal clamps</strong> from 1/2 inch (15mm) to 6 inch (160mm). We manufacture <strong>UPVC powder coated metal clamps</strong> in three thickness options: 0.5MM, 1MM, and 1.5MM. Our <strong>metal clamp</strong> range covers all standard UPVC and CPVC pipe diameters. Custom sizes are also available on request for specialized applications.'
    },
    {
      question: 'Do you offer custom colors for UPVC powder coated metal clamps?',
      answer: 'We understand that aesthetics matter. While we stock standard colors like white and grey to match common pipe colors, we can certainly accommodate custom color requests for bulk orders of <strong>UPVC powder coated metal clamps</strong>. This allows architects and builders to ensure the plumbing hardware blends seamlessly with the wall or ceiling color scheme. Our <strong>metal clamp</strong> customization options help achieve your design vision.'
    },
    {
      question: 'Where can I buy UPVC clamps, UPVC metal clamps, and metal clamps online in India?',
      answer: 'JK Industries is a leading manufacturer of <strong>UPVC clamps</strong>, <strong>UPVC metal clamps</strong>, <strong>metal clamps</strong>, and <strong>UPVC pipe clamps</strong> in India. You can purchase our clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India. Contact us for a quote on <strong>UPVC powder coated metal clamps</strong> and <strong>metal clamps</strong>.'
    },
    {
      question: 'What is the price range of UPVC clamps and UPVC metal clamps?',
      answer: 'JK Industries offers competitive pricing for <strong>UPVC clamps</strong>, <strong>UPVC metal clamps</strong>, and <strong>metal clamps</strong>. Our <strong>UPVC metal clamp</strong> prices range from ₹1.30 to ₹15.00 per piece depending on size and thickness (0.5MM, 1MM, or 1.5MM). We provide factory direct pricing with significant bulk discounts for large orders. As a direct manufacturer, we eliminate middlemen costs, ensuring you get the best <strong>UPVC clamp</strong> and <strong>metal clamp</strong> prices in India.'
    },
    {
      question: 'Why choose JK Industries for UPVC clamps, UPVC metal clamps, and metal clamps?',
      answer: 'JK Industries (Edler Clamp brand) is India\'s trusted manufacturer of <strong>UPVC clamps</strong>, <strong>UPVC metal clamps</strong>, <strong>metal clamps</strong>, and <strong>UPVC pipe clamps</strong>. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our <strong>UPVC powder coated metal clamps</strong> are manufactured using premium materials ensuring superior quality and durability. We are the #1 choice for <strong>UPVC clamp</strong> and <strong>metal clamp</strong> requirements across India.'
    },
    {
      question: 'What is the best UPVC clamp and UPVC metal clamp brand in India?',
      answer: 'JK Industries, operating under the Edler Clamp brand, is recognized as India\'s #1 manufacturer of <strong>UPVC clamps</strong>, <strong>UPVC metal clamps</strong>, <strong>metal clamps</strong>, and <strong>UPVC pipe clamps</strong>. With ISO 9001:2015 certification, superior quality materials, and comprehensive size ranges, our <strong>UPVC powder coated metal clamps</strong> are trusted by contractors, plumbers, and industrial clients across India. We offer the best combination of quality, price, and service for all your <strong>UPVC clamp</strong> and <strong>metal clamp</strong> requirements.'
    },
    {
      question: 'How to choose between UPVC clamp and metal clamp?',
      answer: 'Choose <strong>UPVC clamps</strong> for standard plastic pipe systems requiring lightweight, corrosion-resistant support. Choose <strong>UPVC metal clamps</strong> or <strong>metal clamps</strong> for heavy-duty applications, high-temperature systems, or when maximum strength is required. Our <strong>UPVC powder coated metal clamps</strong> offer the best of both worlds with superior corrosion resistance and industrial-grade strength. For most standard plumbing applications, <strong>UPVC metal clamps</strong> are the preferred choice due to their durability, weather resistance, and value.'
    },
    {
      question: 'Are UPVC metal clamps suitable for CPVC hot water lines?',
      answer: 'Yes, our <strong>UPVC metal clamps</strong> are designed to handle temperature ranges from -5°C to 70°C, making them suitable for both cold water and moderate hot water applications. The <strong>metal clamp</strong> construction retains its strength at higher temperatures, unlike some plastic clips that might deform. For very high-temperature CPVC lines, we recommend checking our CPVC-specific clamp range or consulting our technical team for the best solution.'
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
    this.setProductStructuredData();
    this.setBusinessStructuredData();
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
    
    // Optional: Close others (accordion behavior)
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

  closeEnquiryForm(event?: any) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('enquiry-modal') || target.classList.contains('close-modal')) {
        this.showEnquiryForm = false;
        if (isPlatformBrowser(this.platformId)) {
          this.document.body.style.overflow = 'auto';
        }
      }
    } else {
      this.showEnquiryForm = false;
      if (isPlatformBrowser(this.platformId)) {
        this.document.body.style.overflow = 'auto';
      }
    }
  }

  submitEnquiry() {
    console.log('Enquiry submitted:', this.enquiryData);
    alert('Thank you for your enquiry about UPVC Metal Clamps, UPVC Clamps, and Metal Clamps. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = { name: '', email: '', phone: '', company: '', quantity: null, message: '' };
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'auto';
    }
  }

  downloadBrochure() {
    alert('Our technical datasheet for UPVC Metal Clamps, UPVC Clamps, and Metal Clamps will be available for download soon!');
  }

  private updateSeo() {
    this.titleService.setTitle('UPVC Clamp | UPVC Metal Clamp | Metal Clamp | UPVC Powder Coated Metal Clamp | UPVC Pipe Clamp Manufacturer - JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of UPVC Clamps, UPVC Metal Clamps, Metal Clamps, UPVC Powder Coated Metal Clamps & UPVC Pipe Clamps. Premium quality with superior corrosion resistance. ISO Certified. Factory Direct Prices. Buy Now!' },
      { name: 'keywords', content: 'UPVC Clamp, UPVC metal clamp, metal clamp, UPVC powder coated metal clamp, UPVC pipe clamp, UPVC clamp manufacturer, metal clamp India, powder coated clamp, pipe clamp, UPVC clamp Rajkot, Edler Clamp, JK Industries, UPVC metal clamp manufacturer, UPVC clamp price, best UPVC clamp, UPVC clamp online, metal clamp supplier India' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/upvc-metal-clamp' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Article meta tags
      { property: 'article:section', content: 'Plumbing Products' },
      { property: 'article:tag', content: 'UPVC Clamp' },
      { property: 'article:tag', content: 'UPVC Metal Clamp' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'UPVC Powder Coated Metal Clamp' },
      { property: 'article:tag', content: 'UPVC Pipe Clamp' },
      
      // Product meta tags
      { property: 'product:price:amount', content: '1.30' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'UPVC Clamp | UPVC Metal Clamp | Metal Clamp | UPVC Powder Coated Metal Clamp | UPVC Pipe Clamp Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of UPVC Clamps, UPVC Metal Clamps, Metal Clamps, UPVC Powder Coated Metal Clamps & UPVC Pipe Clamps. Premium quality with superior corrosion resistance. ISO Certified. Factory Direct Prices.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '800' },
      { property: 'og:image:alt', content: 'UPVC Metal Clamp - Premium Powder Coated Pipe Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/upvc-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'UPVC Clamp | UPVC Metal Clamp | Metal Clamp | UPVC Pipe Clamp Manufacturer' },
      { name: 'twitter:description', content: 'India\'s #1 Manufacturer of UPVC Clamps, UPVC Metal Clamps, Metal Clamps & UPVC Pipe Clamps. Premium quality. ISO Certified. Factory Direct Prices.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'UPVC Metal Clamp - Premium Powder Coated Pipe Clamp' }
    ]);

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
      "category": "UPVC Clamp, UPVC Metal Clamp, Metal Clamp, UPVC Powder Coated Metal Clamp, UPVC Pipe Clamp, Clips, Clamps",
      "name": "UPVC Clamp | UPVC Metal Clamp | Metal Clamp | UPVC Powder Coated Metal Clamp | UPVC Pipe Clamp",
      "url": "https://jkindustriesrajkot.com/products/upvc-metal-clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg"
      ],
      "description": "JK Industries manufactures premium UPVC Clamps, UPVC Metal Clamps, Metal Clamps, and UPVC Powder Coated Metal Clamps with superior corrosion resistance and aesthetic design. Our UPVC Pipe Clamps are ideal for residential plumbing, commercial construction, irrigation systems, and industrial applications. Best quality metal clamps available in sizes 15mm to 160mm with ISO 9001:2015 certification.",
      "keywords": "UPVC Clamp, UPVC metal clamp, metal clamp, UPVC powder coated metal clamp, UPVC pipe clamp, UPVC clamp manufacturer, metal clamp India, powder coated clamp, pipe clamp, UPVC clamp Rajkot, Edler Clamp, JK Industries",
      "sku": "UPVC-CLAMP-001",
      "mpn": "JK-UPVC-CL-001",
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
      "alternateName": ["UPVC Clamp", "UPVC metal clamp", "metal clamp", "UPVC powder coated metal clamp", "UPVC pipe clamp", "UPVC clamp manufacturer", "metal clamp India", "powder coated clamp", "pipe clamp", "UPVC clamp Rajkot", "Edler Clamp", "JK Industries", "UPVC metal clamp manufacturer", "UPVC clamp price", "best UPVC clamp", "UPVC clamp online", "metal clamp supplier India"],
      "material": ["CRC - MS", "Premium Powder Coating"],
      "color": "Multiple Colors Available",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/upvc-metal-clamp",
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
        "reviewCount": "93"
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
        "value": "2",
        "unitCode": "INH"
      },
      "weight": {
        "@type": "QuantitativeValue",
        "value": "50",
        "unitCode": "GRM"
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Size Range", "value": "1/2 inch to 6 inch (15mm - 160mm Diameter)" },
        { "@type": "PropertyValue", "name": "Thickness Options", "value": "0.5MM, 1MM, 1.5MM" },
        { "@type": "PropertyValue", "name": "Temperature Range", "value": "-5°C to 70°C" },
        { "@type": "PropertyValue", "name": "Pressure Rating", "value": "Up to 16 bar (Depending on Size)" },
        { "@type": "PropertyValue", "name": "Coating Thickness", "value": "60-80 microns" },
        { "@type": "PropertyValue", "name": "UV Resistance", "value": "High (10+ years outdoor exposure)" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, ISI Marked" },
        { "@type": "PropertyValue", "name": "Product Type", "value": "METAL" },
        { "@type": "PropertyValue", "name": "Shape", "value": "U" },
        { "@type": "PropertyValue", "name": "Delivery Time", "value": "7 Days" },
        { "@type": "PropertyValue", "name": "Color", "value": "Multiple Colors Available" },
        { "@type": "PropertyValue", "name": "Product Category", "value": "UPVC Clamp, UPVC Metal Clamp, Metal Clamp, UPVC Pipe Clamp" },
        { "@type": "PropertyValue", "name": "Manufacturer Location", "value": "Rajkot, Gujarat, India" },
        { "@type": "PropertyValue", "name": "Price Range", "value": `₹${minPrice} to ₹${maxPrice} per piece` },
        { "@type": "PropertyValue", "name": "Availability", "value": "In Stock - Ready to Ship" }
      ],
      "hasVariant": allSizes.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch UPVC Metal Clamp`,
        "sku": size.sku,
        "size": `${size.sizeInch} Inch / ${size.size} MM`,
        "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
        "description": `Premium ${size.sizeInch} Inch (${size.size} MM) UPVC clamp, UPVC metal clamp, and metal clamp with powder coating. Perfect for ${size.size} OD pipes. Best quality UPVC pipe clamp for residential and commercial plumbing applications.`,
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
          "name": "UPVC Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for UPVC Clamps, UPVC Metal Clamps, Metal Clamps, and UPVC Powder Coated Metal Clamps",
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
          "name": "UPVC Clamp | UPVC Metal Clamp | Metal Clamp | Edler Clamp",
          "item": "https://jkindustriesrajkot.com/products/upvc-metal-clamp"
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
      "name": "How to Install UPVC Metal Clamps / UPVC Clamps",
      "description": "Step-by-step guide to properly install UPVC Clamps, UPVC Metal Clamps, and Metal Clamps for secure pipe mounting. Learn the correct technique for installing powder coated clamps and UPVC pipe clamps.",
      "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
      "totalTime": "PT10M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "UPVC Metal Clamps or UPVC Clamps"
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
        "url": `https://jkindustriesrajkot.com/products/upvc-metal-clamp#step-${index + 1}`
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
      "name": "UPVC Clamp | UPVC Metal Clamp | Metal Clamp Sizes - Available Variants",
      "description": "Complete range of UPVC Clamps, UPVC Metal Clamps, Metal Clamps, and UPVC Pipe Clamps available in 0.5MM, 1MM, and 1.5MM thicknesses from 1/2 inch to 6 inch. Powder coated clamps for all pipe diameters. Best quality metal clamps with competitive pricing.",
      "numberOfItems": allSizes.length,
      "itemListElement": allSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch UPVC Metal Clamp`,
          "description": `Premium ${size.sizeInch} Inch (${size.size} MM) UPVC clamp, UPVC metal clamp, and metal clamp with powder coating. Perfect for ${size.size} OD pipes. Best quality UPVC pipe clamp for residential and commercial plumbing applications.`,
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
      "@id": "https://jkindustriesrajkot.com/products/upvc-metal-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/upvc-metal-clamp",
      "name": "UPVC Clamp | UPVC Metal Clamp | Metal Clamp | UPVC Powder Coated Metal Clamp | UPVC Pipe Clamp Manufacturer",
      "description": "India's #1 Manufacturer of UPVC Clamps, UPVC Metal Clamps, Metal Clamps, UPVC Powder Coated Metal Clamps & UPVC Pipe Clamps. Premium Metal Clamps with superior corrosion resistance. ISO Certified. Factory Direct Prices. Contact Us for Best Quality UPVC Clamps, UPVC Metal Clamps, Metal Clamps & UPVC Pipe Clamps. Rajkot, Gujarat, India.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of UPVC clamps, UPVC metal clamps, metal clamps, and pipe support systems in India",
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
        "caption": "UPVC Metal Clamp - Premium Powder Coated Pipe Clamp by JK Industries"
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
