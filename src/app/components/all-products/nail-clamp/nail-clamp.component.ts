import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as Aos from 'aos';

// Define TransferState keys for SSR
const NAIL_CLAMP_PRODUCT_SCHEMA = makeStateKey<string>('NAIL_CLAMP_PRODUCT_SCHEMA');
const NAIL_CLAMP_BUSINESS_SCHEMA = makeStateKey<string>('NAIL_CLAMP_BUSINESS_SCHEMA');
const NAIL_CLAMP_FAQ_SCHEMA = makeStateKey<string>('NAIL_CLAMP_FAQ_SCHEMA');
const NAIL_CLAMP_BREADCRUMB_SCHEMA = makeStateKey<string>('NAIL_CLAMP_BREADCRUMB_SCHEMA');
const NAIL_CLAMP_HOWTO_SCHEMA = makeStateKey<string>('NAIL_CLAMP_HOWTO_SCHEMA');
const NAIL_CLAMP_ITEMLIST_SCHEMA = makeStateKey<string>('NAIL_CLAMP_ITEMLIST_SCHEMA');
const NAIL_CLAMP_WEBPAGE_SCHEMA = makeStateKey<string>('NAIL_CLAMP_WEBPAGE_SCHEMA');

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
  thickness1_2MM?: number;
  thickness1_5MM?: number;
  thickness2MM?: number;
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
  selector: 'app-nail-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './nail-clamp.component.html',
  styleUrl: './nail-clamp.component.scss'
})
export class NailClampComponent implements OnInit, AfterViewInit {
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

  // Product sizes based on provided image data
  productSizes1_2MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', thickness1_2MM: 9, qtyPcs: 200, packingQty: 5000, sku: 'NC-1.2MM-15' },
    { size: '20mm', sizeInch: '3/4', thickness1_2MM: 9.50, qtyPcs: 200, packingQty: 4600, sku: 'NC-1.2MM-20' },
    { size: '25mm', sizeInch: '1', thickness1_2MM: 10.20, qtyPcs: 200, packingQty: 3600, sku: 'NC-1.2MM-25' },
    { size: '32mm', sizeInch: '1 ¼', thickness1_2MM: 10.50, qtyPcs: 200, packingQty: 2600, sku: 'NC-1.2MM-32' },
    { size: '40mm', sizeInch: '1 ½', thickness1_2MM: 11, qtyPcs: 200, packingQty: 2000, sku: 'NC-1.2MM-40' },
    { size: '50mm', sizeInch: '2', thickness1_2MM: 11.50, thickness1_5MM: 16.50, thickness2MM: 19.10, qtyPcs: 200, packingQty: 1800, sku: 'NC-1.2MM-50' },
    { size: '65mm', sizeInch: '2 ½', thickness1_2MM: 12.40, thickness1_5MM: 17.90, thickness2MM: 21.10, qtyPcs: 100, packingQty: 2000, sku: 'NC-1.2MM-65' },
    { size: '80mm', sizeInch: '3', thickness1_2MM: 13.50, thickness1_5MM: 18.90, thickness2MM: 22.50, qtyPcs: 100, packingQty: 2000, sku: 'NC-1.2MM-80' },
    { size: '110mm', sizeInch: '4', thickness1_2MM: 15.90, thickness1_5MM: 21.50, thickness2MM: 24.80, qtyPcs: 100, packingQty: 2000, sku: 'NC-1.2MM-110' }
  ];

  productSizes1_5MM: ProductSize[] = [
    { size: '50mm', sizeInch: '2', thickness1_5MM: 16.50, thickness2MM: 19.10, qtyPcs: 200, packingQty: 1800, sku: 'NC-1.5MM-50' },
    { size: '65mm', sizeInch: '2 ½', thickness1_5MM: 17.90, thickness2MM: 21.10, qtyPcs: 100, packingQty: 2000, sku: 'NC-1.5MM-65' },
    { size: '80mm', sizeInch: '3', thickness1_5MM: 18.90, thickness2MM: 22.50, qtyPcs: 100, packingQty: 2000, sku: 'NC-1.5MM-80' },
    { size: '110mm', sizeInch: '4', thickness1_5MM: 21.50, thickness2MM: 24.80, qtyPcs: 100, packingQty: 2000, sku: 'NC-1.5MM-110' },
    { size: '160mm', sizeInch: '6', thickness1_5MM: 26, thickness2MM: 32.30, qtyPcs: 50, packingQty: 1000, sku: 'NC-1.5MM-160' },
    { size: '200mm', sizeInch: '8', thickness1_5MM: 34, thickness2MM: 41.30, qtyPcs: 50, packingQty: 1000, sku: 'NC-1.5MM-200' }
  ];

  productSizes2MM: ProductSize[] = [
    { size: '50mm', sizeInch: '2', thickness2MM: 19.10, qtyPcs: 200, packingQty: 1800, sku: 'NC-2MM-50' },
    { size: '65mm', sizeInch: '2 ½', thickness2MM: 21.10, qtyPcs: 100, packingQty: 2000, sku: 'NC-2MM-65' },
    { size: '80mm', sizeInch: '3', thickness2MM: 22.50, qtyPcs: 100, packingQty: 2000, sku: 'NC-2MM-80' },
    { size: '110mm', sizeInch: '4', thickness2MM: 24.80, qtyPcs: 100, packingQty: 2000, sku: 'NC-2MM-110' },
    { size: '160mm', sizeInch: '6', thickness2MM: 32.30, qtyPcs: 50, packingQty: 1000, sku: 'NC-2MM-160' },
    { size: '200mm', sizeInch: '8', thickness2MM: 41.30, qtyPcs: 50, packingQty: 1000, sku: 'NC-2MM-200' }
  ];

  features: Feature[] = [
    {
      icon: 'lock',
      title: 'Superior Grip Strength',
      description: 'Patented interlocking design provides 40% more grip strength than standard mounting clips. Precision-engineered teeth create multiple contact points ensuring secure fastening even under vibration and stress.'
    },
    {
      icon: 'shield-alt',
      title: 'Durable Construction',
      description: 'Manufactured from high-grade galvanized material and carbon steel, our <strong>nail clamps</strong> and <strong>nico clamps</strong> resist corrosion, impacts, and environmental damage for long-term reliability.'
    },
    {
      icon: 'tools',
      title: 'Quick Installation',
      description: 'Simple one-step mounting process reduces labor time and installation costs. Our <strong>metal nail clamps</strong> and <strong>construction nico clamps</strong> enable fast, efficient installation.'
    },
    {
      icon: 'cog',
      title: 'Versatile Design',
      description: 'Flexible adjustment capability accommodates various mounting requirements. Our <strong>pipe mounting clamps</strong> and <strong>industrial nico clamps</strong> adapt to different nico sizes and positions.'
    },
    {
      icon: 'sun',
      title: 'Weather Resistant',
      description: 'Galvanized coating provides excellent resistance to moisture, UV exposure, and temperature variations. Ideal for both indoor and outdoor applications in construction and industrial settings.'
    },
    {
      icon: 'check-circle',
      title: 'Quality Certified',
      description: 'ISO 9001:2015 certified manufacturing ensures consistent quality and performance. All <strong>nail clamps</strong> and <strong>nico clamps</strong> meet international standards for reliability and durability.'
    }
  ];

  applications: Application[] = [
    {
      icon: 'building',
      title: 'Construction Projects',
      description: 'Widely used in building construction for secure mounting of fixtures, electrical systems, and plumbing. Our <strong>construction nico clamps</strong> provide reliable fastening solutions for all construction applications.'
    },
    {
      icon: 'industry',
      title: 'Industrial Manufacturing',
      description: 'Essential in production facilities for mounting equipment, wiring harnesses, and mechanical components. <strong>Industrial nico clamps</strong> deliver superior performance in demanding manufacturing environments.'
    },
    {
      icon: 'solar-panel',
      title: 'Photovoltaic Systems',
      description: 'Used for mounting solar panels and associated components in renewable energy installations. Our <strong>pipe mounting clamps</strong> ensure secure fastening for solar panel mounting systems.'
    },
    {
      icon: 'wrench',
      title: 'Pipe & Conduit Installation',
      description: 'Ideal for securing pipes, conduits, and cable trays in industrial and commercial settings. <strong>Metal nail clamps</strong> provide reliable support for all pipe mounting applications.'
    },
    {
      icon: 'plug',
      title: 'Electrical Installations',
      description: 'Perfect for securing electrical conduits, cable trays, and wiring systems. Our <strong>nico clamps</strong> ensure safe and secure mounting for all electrical installations.'
    },
    {
      icon: 'warehouse',
      title: 'Infrastructure Development',
      description: 'Essential for infrastructure projects including bridges, tunnels, and public facilities. <strong>Industrial nico clamps</strong> provide long-term reliability for critical infrastructure applications.'
    }
  ];

  specifications: Spec[] = [
    { label: 'Materials', value: 'Galvanized Steel, Carbon Steel' },
    { label: 'Sizes Available', value: '1/2 inch to 8 inch (15mm - 200mm)' },
    { label: 'Thickness Options', value: '1.2mm, 1.5mm, 2.0mm' },
    { label: 'Load Capacity', value: 'Up to 50kg (Depending on Size and Material)' },
    { label: 'Surface Finish', value: 'Zinc-Plated, Galvanized' },
    { label: 'Nico Compatibility', value: 'Standard Construction Nicos, Masonry Nicos' },
    { label: 'Operating Temperature', value: '-30°C to 150°C' },
    { label: 'Certifications', value: 'ISO 9001:2015, CE Certified' },
    { label: 'Design Standards', value: 'IS 1367, DIN 471, EN 10088-2' },
    { label: 'Corrosion Resistance', value: 'Excellent (Galvanized Coating)' }
  ];

  whyChoose = [
    {
      title: 'Industry-Leading Grip Strength',
      description: 'Our <strong>nail clamps</strong> and <strong>nico clamps</strong> feature patented interlocking design providing 40% more holding power than standard mounting clips.'
    },
    {
      title: 'Precision Manufacturing',
      description: 'Consistent quality and performance through rigorous quality control. Every <strong>metal nail clamp</strong> meets international standards for reliability.'
    },
    {
      title: 'Comprehensive Size Range',
      description: 'Available in sizes from 1/2 inch to 8 inch with three thickness options (1.2MM, 1.5MM, 2MM) to meet all application requirements.'
    },
    {
      title: 'Fast Installation',
      description: 'Simple mounting process reduces installation time by up to 40%, saving valuable labor costs on construction and industrial projects.'
    },
    {
      title: 'Long-Term Durability',
      description: 'Rigorous quality testing ensures long-term performance. Our <strong>construction nico clamps</strong> and <strong>industrial nico clamps</strong> maintain grip strength throughout their service life.'
    },
    {
      title: 'Expert Support',
      description: 'Technical support and customization options available. Our team helps you select the right <strong>pipe mounting clamps</strong> for your specific application.'
    }
  ];

  testimonials = [
    {
      quote: 'JK Industries <strong>nail clamps</strong> and <strong>nico clamps</strong> have been a game-changer for our construction projects. Their secure grip and easy installation have significantly reduced our mounting time.',
      author: 'Rajesh Sharma',
      role: ''
    },
    {
      quote: 'We\'ve been using these <strong>metal nail clamps</strong> in our factory for mounting equipment for over 2 years. The durability is exceptional, and they\'ve maintained their grip strength throughout.',
      author: 'Vikram Patel',
      role: ''
    },
    {
      quote: 'The <strong>construction nico clamps</strong> from JK Industries are perfect for our infrastructure projects. Superior quality and reliable performance in all weather conditions.',
      author: 'Amit Kumar',
      role: ''
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'What makes JK <strong>nail clamps</strong> and <strong>nico clamps</strong> better than standard mounting clips?',
      answer: 'JK <strong>nail clamps</strong> and <strong>nico clamps</strong> feature a patented interlocking design that provides 40% more grip strength than standard mounting clips. Their precision-engineered teeth create multiple contact points with both the nico and the mounting surface, distributing pressure evenly and preventing loosening even under vibration or temperature fluctuations. Additionally, our <strong>metal nail clamps</strong> use higher grade materials that resist bending and deformation, ensuring long-term reliability.'
    },
    {
      question: 'Are your <strong>nico clamps</strong> and <strong>nail clamps</strong> suitable for outdoor installations?',
      answer: 'Yes, our <strong>nico clamps</strong> and <strong>nail clamps</strong> are designed for both indoor and outdoor applications. For outdoor installations, we recommend our galvanized material, which provides excellent resistance to moisture, UV exposure, and temperature variations. The galvanized coating offers protection against rust and corrosion, making our <strong>construction nico clamps</strong> ideal for exposed applications.'
    },
    {
      question: 'What size <strong>nail clamps</strong> and <strong>nico clamps</strong> do you offer?',
      answer: 'We manufacture <strong>nail clamps</strong> and <strong>nico clamps</strong> in standard sizes ranging from 1/2 inch (15mm) to 8 inch (200mm), suitable for most common applications. Our <strong>pipe mounting clamps</strong> are available in three thickness options: 1.2MM, 1.5MM, and 2MM. For specialized projects, we also offer custom sizing options to meet specific requirements. Our engineering team can design and produce <strong>industrial nico clamps</strong> according to your exact specifications.'
    },
    {
      question: 'What materials are your <strong>nail clamps</strong> and <strong>nico clamps</strong> made from?',
      answer: 'Our <strong>nail clamps</strong> and <strong>nico clamps</strong> are manufactured using high-grade galvanized steel and carbon steel. The galvanized material clamps feature a zinc coating that provides excellent corrosion resistance, making them ideal for <strong>construction nico clamps</strong> and <strong>industrial nico clamps</strong> applications. Carbon steel options are available for high-strength requirements.'
    },
    {
      question: 'What is the difference between <strong>nail clamp</strong> and <strong>nico clamp</strong>?',
      answer: '<strong>Nail clamp</strong> and <strong>nico clamp</strong> are terms often used interchangeably. Both refer to fastening devices designed to secure objects to nicos (anchors) in construction and industrial applications. Our <strong>metal nail clamps</strong> and <strong>nico clamps</strong> provide the same superior grip strength and durability, with the choice of terminology depending on regional preferences.'
    },
    {
      question: 'Where can I buy <strong>nail clamps</strong>, <strong>nico clamps</strong>, and <strong>pipe mounting clamps</strong> online in India?',
      answer: 'JK Industries is a leading manufacturer of <strong>nail clamps</strong>, <strong>nico clamps</strong>, <strong>metal nail clamps</strong>, <strong>construction nico clamps</strong>, <strong>pipe mounting clamps</strong>, and <strong>industrial nico clamps</strong> in India. You can purchase our clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India.'
    },
    {
      question: 'What is the price range of <strong>nail clamps</strong> and <strong>nico clamps</strong>?',
      answer: 'JK Industries offers competitive pricing for <strong>nail clamps</strong>, <strong>nico clamps</strong>, and <strong>metal nail clamps</strong>. Our <strong>pipe mounting clamps</strong> prices range from ₹9 to ₹41.30 per piece depending on size and thickness (1.2MM, 1.5MM, or 2MM). We provide factory direct pricing with significant bulk discounts for large orders. As a direct manufacturer, we eliminate middlemen costs, ensuring you get the best <strong>nail clamp</strong> and <strong>nico clamp</strong> prices in India.'
    },
    {
      question: 'What is the minimum order quantity for <strong>nail clamps</strong> and <strong>nico clamps</strong>?',
      answer: 'Our standard minimum order quantity is 2000 pieces for stock sizes of <strong>nail clamps</strong> and <strong>nico clamps</strong>. For bulk orders, we offer additional discounts. For custom <strong>metal nail clamp</strong> designs or specialized requirements, minimum order quantities may vary based on manufacturing complexity and material requirements. Please contact our sales team for detailed information about custom orders and quantity-based pricing.'
    },
    {
      question: 'Are <strong>nail clamps</strong> and <strong>nico clamps</strong> suitable for heavy-duty industrial applications?',
      answer: 'Yes, our <strong>industrial nico clamps</strong> and <strong>metal nail clamps</strong> are specifically designed for heavy-duty applications. With load capacities up to 50kg depending on size and material, our <strong>construction nico clamps</strong> provide reliable fastening for industrial equipment, machinery mounting, and infrastructure applications. The 2MM thickness option offers maximum strength for the most demanding applications.'
    },
    {
      question: 'How do I install <strong>nail clamps</strong> and <strong>nico clamps</strong> correctly?',
      answer: 'For proper installation of <strong>nail clamps</strong> and <strong>nico clamps</strong>: 1) Mark the position ensuring proper alignment, 2) Pre-drill pilot holes if mounting on hard surfaces, 3) Position the clamp and insert the nico, 4) Secure the clamp until firmly attached, 5) Verify the installation is stable. Our <strong>pipe mounting clamps</strong> feature a simple one-step mounting process that reduces installation time significantly.'
    },
    {
      question: 'Why choose JK Industries for <strong>nail clamps</strong>, <strong>nico clamps</strong>, and <strong>pipe mounting clamps</strong>?',
      answer: 'JK Industries (Edler Clamp brand) is India\'s trusted manufacturer of <strong>nail clamps</strong>, <strong>nico clamps</strong>, <strong>metal nail clamps</strong>, <strong>construction nico clamps</strong>, <strong>pipe mounting clamps</strong>, and <strong>industrial nico clamps</strong>. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our <strong>nail clamps</strong> and <strong>nico clamps</strong> are manufactured using premium materials ensuring superior quality and durability.'
    },
    {
      question: 'What is the best <strong>nail clamp</strong> and <strong>nico clamp</strong> brand in India?',
      answer: 'JK Industries, operating under the Edler Clamp brand, is recognized as India\'s #1 manufacturer of <strong>nail clamps</strong>, <strong>nico clamps</strong>, <strong>metal nail clamps</strong>, <strong>construction nico clamps</strong>, <strong>pipe mounting clamps</strong>, and <strong>industrial nico clamps</strong>. With ISO 9001:2015 certification, superior quality materials, and 40% more holding power than standard clamps, our <strong>nail clamps</strong> and <strong>nico clamps</strong> are trusted by contractors, builders, and industrial clients across India.'
    }
  ];

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
      description: 'Heat-resistant CPVC double nail clamps for hot water systems'
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
      name: 'CPVC Metal Clamp',
      image: 'assets/products/cpvc-metal-clamp.jpg',
      link: '/products/cpvc-metal-clamp',
      description: 'High-temperature resistant metal clamps designed for CPVC hot water systems'
    }
  ];

  installationSteps = [
    {
      name: 'Preparation',
      text: 'Mark the position ensuring proper alignment and spacing. Ensure the mounting surface is clean and free from debris. For <strong>pipe mounting clamps</strong>, verify the pipe diameter matches the clamp size.',
      image: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg'
    },
    {
      name: 'Pre-drilling',
      text: 'For hard surfaces like concrete or brick, pre-drill pilot holes using appropriate drill bit size to ensure accurate placement and prevent surface cracking. This is especially important for <strong>construction nico clamps</strong>.',
      image: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg'
    },
    {
      name: 'Positioning',
      text: 'Place the <strong>nail clamp</strong> or <strong>nico clamp</strong> against the mounting surface, ensuring proper alignment with the marked position. Verify the clamp size matches the nico diameter for <strong>metal nail clamps</strong>.',
      image: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg'
    },
    {
      name: 'Fastening',
      text: 'Insert the nico and secure the <strong>nail clamp</strong> until firmly attached to the mounting surface. Ensure the clamp is flush and secure. For <strong>industrial nico clamps</strong>, verify proper engagement with the nico.',
      image: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the installation is stable and the <strong>nico clamp</strong> provides secure fastening. Verify proper grip strength and ensure the clamp maintains its position under load. This is critical for <strong>pipe mounting clamps</strong> and <strong>construction nico clamps</strong>.',
      image: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta,
    private titleService: Title,
    private transferState: TransferState
  ) {}

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
      Aos.refresh();
    }
  }

  private updateSeo() {
    this.titleService.setTitle('Nail Clamp | Nico Clamp | Metal Nail Clamp | Construction Nico Clamps | Pipe Mounting Clamps | Industrial Nico Clamps Manufacturer - JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of Nail Clamps, Nico Clamps, Metal Nail Clamps, Construction Nico Clamps, Pipe Mounting Clamps & Industrial Nico Clamps. Premium Quality with 40% More Grip Strength. ISO Certified. Factory Direct Prices. Buy Now!' },
      { name: 'keywords', content: 'nail clamp, nico clamp, metal nail clamp, construction nico clamps, pipe mounting clamps, industrial nico clamps, nail clamp manufacturer, nico clamp manufacturer, metal nail clamp India, construction nico clamps Rajkot, pipe mounting clamps Gujarat, industrial nico clamps manufacturer, nail clamp price, nico clamp price, best nail clamp, best nico clamp, nail clamp online, nico clamp online, nail clamp supplier India, nico clamp supplier, Edler Clamp, JK Industries' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/nail-clamp' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Article meta tags
      { property: 'article:section', content: 'Industrial Hardware' },
      { property: 'article:tag', content: 'Nail Clamp' },
      { property: 'article:tag', content: 'Nico Clamp' },
      { property: 'article:tag', content: 'Metal Nail Clamp' },
      { property: 'article:tag', content: 'Construction Nico Clamps' },
      { property: 'article:tag', content: 'Pipe Mounting Clamps' },
      { property: 'article:tag', content: 'Industrial Nico Clamps' },
      
      // Product meta tags
      { property: 'product:price:amount', content: '9' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'Nail Clamp | Nico Clamp | Metal Nail Clamp | Construction Nico Clamps | Pipe Mounting Clamps | Industrial Nico Clamps Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of Nail Clamps, Nico Clamps, Metal Nail Clamps, Construction Nico Clamps, Pipe Mounting Clamps & Industrial Nico Clamps. Premium Quality with 40% More Grip Strength. ISO Certified. Factory Direct Prices.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '800' },
      { property: 'og:image:alt', content: 'Nail Clamp | Nico Clamp | Metal Nail Clamp - Premium Industrial Mounting Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/nail-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Nail Clamp | Nico Clamp | Metal Nail Clamp | Construction Nico Clamps Manufacturer' },
      { name: 'twitter:description', content: 'India\'s #1 Manufacturer of Nail Clamps, Nico Clamps, Metal Nail Clamps & Construction Nico Clamps. 40% More Grip Strength. ISO Certified. Factory Direct Prices.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'Nail Clamp | Nico Clamp | Metal Nail Clamp - Premium Industrial Mounting Clamp' }
    ]);
  }

  toggleFaq(index: number) {
    // Toggle current state
    this.expandedFaqs[index] = !this.expandedFaqs[index];
    
    // Optional: Close others (accordion behavior)
    for (let i = 0; i < this.expandedFaqs.length; i++) {
      if (i !== index) this.expandedFaqs[i] = false;
    }
  }

  downloadBrochure() {
    alert('Our technical datasheet for Nail Clamps, Nico Clamps, and Metal Nail Clamps will be available for download soon!');
  }

  openEnquiryForm() {
    this.showEnquiryForm = true;
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  closeEnquiryForm(event: any) {
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
    alert('Thank you for your enquiry about Nail Clamps, Nico Clamps, and Metal Nail Clamps. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = { name: '', email: '', phone: '', company: '', quantity: null, message: '' };
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'auto';
    }
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(NAIL_CLAMP_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(NAIL_CLAMP_PRODUCT_SCHEMA, ''));
      return;
    }

    const allSizes = [...this.productSizes1_2MM, ...this.productSizes1_5MM, ...this.productSizes2MM];
    const allPrices = allSizes
      .map(s => [s.thickness1_2MM, s.thickness1_5MM, s.thickness2MM])
      .flat()
      .filter((p): p is number => p !== undefined);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "Nail Clamp, Nico Clamp, Metal Nail Clamp, Construction Nico Clamps, Pipe Mounting Clamps, Industrial Nico Clamps, Clips, Clamps",
      "name": "Nail Clamp | Nico Clamp | Metal Nail Clamp | Construction Nico Clamps | Pipe Mounting Clamps | Industrial Nico Clamps",
      "url": "https://jkindustriesrajkot.com/products/nail-clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg"
      ],
      "description": "JK Industries manufactures premium Nail Clamps, Nico Clamps, Metal Nail Clamps, Construction Nico Clamps, Pipe Mounting Clamps, and Industrial Nico Clamps with patented interlocking design providing 40% more grip strength than standard mounting clips. Our clamps are ideal for construction, industrial manufacturing, infrastructure development, and pipe mounting applications. Best quality nail clamps and nico clamps available in sizes 1/2 inch to 8 inch with three thickness options (1.2MM, 1.5MM, 2MM) with ISO 9001:2015 certification.",
      "keywords": "nail clamp, nico clamp, metal nail clamp, construction nico clamps, pipe mounting clamps, industrial nico clamps, nail clamp manufacturer, nico clamp manufacturer, metal nail clamp India, construction nico clamps Rajkot, pipe mounting clamps Gujarat, industrial nico clamps manufacturer, nail clamp price, nico clamp price, best nail clamp, best nico clamp, nail clamp online, nico clamp online, nail clamp supplier India, nico clamp supplier, Edler Clamp, JK Industries",
      "sku": "NC-001",
      "mpn": "JKIND-NC-001",
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
      "alternateName": ["nail clamp", "nico clamp", "metal nail clamp", "construction nico clamps", "pipe mounting clamps", "industrial nico clamps", "nail clamp manufacturer", "nico clamp manufacturer", "metal nail clamp India", "construction nico clamps Rajkot", "pipe mounting clamps Gujarat", "industrial nico clamps manufacturer", "nail clamp price", "nico clamp price", "best nail clamp", "best nico clamp", "nail clamp online", "nico clamp online", "nail clamp supplier India", "nico clamp supplier", "Edler Clamp", "JK Industries"],
      "material": ["Galvanized Steel", "Carbon Steel"],
      "color": "Galvanized / Zinc-Plated",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/nail-clamp",
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
        "ratingCount": "142",
        "reviewCount": "89"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.author },
        "reviewBody": t.quote
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "Construction and Industrial Mounting Systems" },
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
        "value": "45",
        "unitCode": "GRM"
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Size Range", "value": "1/2 inch to 8 inch (15mm - 200mm Diameter)" },
        { "@type": "PropertyValue", "name": "Thickness Options", "value": "1.2MM, 1.5MM, 2MM" },
        { "@type": "PropertyValue", "name": "Load Capacity", "value": "Up to 50kg (Depending on Size and Material)" },
        { "@type": "PropertyValue", "name": "Material", "value": "Galvanized Steel, Carbon Steel" },
        { "@type": "PropertyValue", "name": "Surface Finish", "value": "Zinc-Plated, Galvanized" },
        { "@type": "PropertyValue", "name": "Operating Temperature", "value": "-30°C to 150°C" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, CE Certified" },
        { "@type": "PropertyValue", "name": "Grip Strength", "value": "40% more than standard clamps" },
        { "@type": "PropertyValue", "name": "Product Type", "value": "METAL" },
        { "@type": "PropertyValue", "name": "Product Category", "value": "Nail Clamp, Nico Clamp, Metal Nail Clamp, Construction Nico Clamps, Pipe Mounting Clamps, Industrial Nico Clamps" },
        { "@type": "PropertyValue", "name": "Manufacturer Location", "value": "Rajkot, Gujarat, India" },
        { "@type": "PropertyValue", "name": "Price Range", "value": `₹${minPrice} to ₹${maxPrice} per piece` },
        { "@type": "PropertyValue", "name": "Availability", "value": "In Stock - Ready to Ship" }
      ],
      "hasVariant": allSizes.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch Nail Clamp / Nico Clamp`,
        "sku": size.sku,
        "size": `${size.sizeInch} Inch / ${size.size} MM`,
        "image": "https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg",
        "description": `Premium ${size.sizeInch} Inch (${size.size} MM) nail clamp, nico clamp, and metal nail clamp. Available in 1.2MM, 1.5MM, and 2MM thickness options. Perfect for construction nico clamps and industrial nico clamps applications. Best quality pipe mounting clamps for all mounting requirements.`,
        "brand": {
          "@type": "Brand",
          "name": "Edler Clamp"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": (size.thickness1_2MM || size.thickness1_5MM || size.thickness2MM || minPrice).toString(),
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
    this.transferState.set(NAIL_CLAMP_PRODUCT_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData() {
    if (this.transferState.hasKey(NAIL_CLAMP_FAQ_SCHEMA)) {
      this.addJsonLd(this.transferState.get(NAIL_CLAMP_FAQ_SCHEMA, ''));
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
    this.transferState.set(NAIL_CLAMP_FAQ_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(NAIL_CLAMP_BREADCRUMB_SCHEMA)) {
      this.addJsonLd(this.transferState.get(NAIL_CLAMP_BREADCRUMB_SCHEMA, ''));
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
          "name": "Nail Clamp | Nico Clamp | Metal Nail Clamp | Edler Clamp",
          "item": "https://jkindustriesrajkot.com/products/nail-clamp"
        }
      ]
    };

    const schemaString = JSON.stringify(breadcrumbSchema);
    this.transferState.set(NAIL_CLAMP_BREADCRUMB_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBusinessStructuredData() {
    if (this.transferState.hasKey(NAIL_CLAMP_BUSINESS_SCHEMA)) {
      this.addJsonLd(this.transferState.get(NAIL_CLAMP_BUSINESS_SCHEMA, ''));
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
          "name": "Nail Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for Nail Clamps, Nico Clamps, Metal Nail Clamps, Construction Nico Clamps, Pipe Mounting Clamps, and Industrial Nico Clamps",
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
        { "@type": "City", "name": "Rajkot" },
        { "@type": "State", "name": "Gujarat" },
        { "@type": "Country", "name": "India" }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/jk-industries-india/",
        "https://www.instagram.com/jk_industries_1995/"
      ]
    };

    const schemaString = JSON.stringify(businessData);
    this.transferState.set(NAIL_CLAMP_BUSINESS_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(NAIL_CLAMP_HOWTO_SCHEMA)) {
      this.addJsonLd(this.transferState.get(NAIL_CLAMP_HOWTO_SCHEMA, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install Nail Clamps / Nico Clamps",
      "description": "Step-by-step guide to properly install Nail Clamps, Nico Clamps, and Metal Nail Clamps for secure mounting. Learn the correct technique for installing construction nico clamps and industrial nico clamps.",
      "image": "https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg",
      "totalTime": "PT10M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Nail Clamps or Nico Clamps"
        },
        {
          "@type": "HowToSupply",
          "name": "Appropriate Nicos (anchors)"
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
          "name": "Drill Bit (for hard surfaces)"
        }
      ],
      "step": this.installationSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "image": step.image,
        "url": `https://jkindustriesrajkot.com/products/nail-clamp#step-${index + 1}`
      }))
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(NAIL_CLAMP_HOWTO_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(NAIL_CLAMP_ITEMLIST_SCHEMA)) {
      this.addJsonLd(this.transferState.get(NAIL_CLAMP_ITEMLIST_SCHEMA, ''));
      return;
    }

    const allSizes = [...this.productSizes1_2MM, ...this.productSizes1_5MM, ...this.productSizes2MM];
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Nail Clamp | Nico Clamp | Metal Nail Clamp Sizes - Available Variants",
      "description": "Complete range of Nail Clamps, Nico Clamps, Metal Nail Clamps, Construction Nico Clamps, Pipe Mounting Clamps, and Industrial Nico Clamps available in 1.2MM, 1.5MM, and 2MM thicknesses from 1/2 inch to 8 inch. Best quality nail clamps and nico clamps with competitive pricing.",
      "numberOfItems": allSizes.length,
      "itemListElement": allSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch Nail Clamp / Nico Clamp`,
          "description": `Premium ${size.sizeInch} Inch (${size.size} MM) nail clamp, nico clamp, and metal nail clamp. Available in 1.2MM, 1.5MM, and 2MM thickness options. Perfect for construction nico clamps and industrial nico clamps applications. Best quality pipe mounting clamps for all mounting requirements.`,
          "sku": size.sku,
          "image": "https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "countryOfOrigin": {
            "@type": "Country",
            "name": "India"
          },
          "material": ["Galvanized Steel", "Carbon Steel"],
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "INR",
            "price": (size.thickness1_2MM || size.thickness1_5MM || size.thickness2MM || 9).toString(),
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
    this.transferState.set(NAIL_CLAMP_ITEMLIST_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(NAIL_CLAMP_WEBPAGE_SCHEMA)) {
      this.addJsonLd(this.transferState.get(NAIL_CLAMP_WEBPAGE_SCHEMA, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/nail-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/nail-clamp",
      "name": "Nail Clamp | Nico Clamp | Metal Nail Clamp | Construction Nico Clamps | Pipe Mounting Clamps | Industrial Nico Clamps Manufacturer",
      "description": "India's #1 Manufacturer of Nail Clamps, Nico Clamps, Metal Nail Clamps, Construction Nico Clamps, Pipe Mounting Clamps & Industrial Nico Clamps. Premium Nail Clamps with 40% more grip strength. ISO Certified. Factory Direct Prices. Contact Us for Best Quality Nail Clamps, Nico Clamps, Metal Nail Clamps, Construction Nico Clamps, Pipe Mounting Clamps & Industrial Nico Clamps. Rajkot, Gujarat, India.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of nail clamps, nico clamps, metal clamps, and pipe support systems in India",
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
        "url": "https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg",
        "width": "1200",
        "height": "800",
        "caption": "Nail Clamp | Nico Clamp | Metal Nail Clamp - Premium Industrial Mounting Clamp by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(NAIL_CLAMP_WEBPAGE_SCHEMA, schemaString);
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

