import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';

const SPRINKLER_CLAMP_PRODUCT_SCHEMA = makeStateKey<string>('sprinkler_clamp_product_schema');
const SPRINKLER_CLAMP_FAQ_SCHEMA = makeStateKey<string>('sprinkler_clamp_faq_schema');
const SPRINKLER_CLAMP_BREADCRUMB_SCHEMA = makeStateKey<string>('sprinkler_clamp_breadcrumb_schema');
const SPRINKLER_CLAMP_BUSINESS_SCHEMA = makeStateKey<string>('sprinkler_clamp_business_schema');
const SPRINKLER_CLAMP_HOWTO_SCHEMA = makeStateKey<string>('sprinkler_clamp_howto_schema');
const SPRINKLER_CLAMP_ITEMLIST_SCHEMA = makeStateKey<string>('sprinkler_clamp_itemlist_schema');
const SPRINKLER_CLAMP_WEBPAGE_SCHEMA = makeStateKey<string>('sprinkler_clamp_webpage_schema');

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
  selector: 'app-sprinkler-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sprinkler-clamp.component.html',
  styleUrl: './sprinkler-clamp.component.scss'
})
export class SprinklerClampComponent implements OnInit, AfterViewInit {
  
  activeFaqIndex: number | null = null;
  showEnquiryForm = false;
  
  enquiryData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: null,
    message: ''
  };

  toggleFaq(index: number) {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  openEnquiryForm() {
    this.showEnquiryForm = true;
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  closeEnquiryForm(event?: Event) {
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
    alert('Thank you for your enquiry! We will get back to you shortly.');
    this.closeEnquiryForm();
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

  // Product sizes based on provided image data
  productSizes: ProductSize[] = [
    { size: '25mm', sizeInch: '1', price: 5.60, qtyPcs: 100, packingQty: 2000, sku: 'SPR-CL-1' },
    { size: '32mm', sizeInch: '1 1/4', price: 6.50, qtyPcs: 100, packingQty: 1800, sku: 'SPR-CL-1.25' },
    { size: '40mm', sizeInch: '1 1/2', price: 7.40, qtyPcs: 100, packingQty: 1600, sku: 'SPR-CL-1.5' },
    { size: '50mm', sizeInch: '2', price: 8.60, qtyPcs: 100, packingQty: 1400, sku: 'SPR-CL-2' },
    { size: '65mm', sizeInch: '2 1/2', price: 10.20, qtyPcs: 50, packingQty: 1000, sku: 'SPR-CL-2.5' },
    { size: '80mm', sizeInch: '3', price: 12.50, qtyPcs: 50, packingQty: 800, sku: 'SPR-CL-3' },
    { size: '110mm', sizeInch: '4', price: 15.40, qtyPcs: 50, packingQty: 600, sku: 'SPR-CL-4' },
    { size: '160mm', sizeInch: '6', price: 19.80, qtyPcs: 25, packingQty: 400, sku: 'SPR-CL-6' }
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
      name: 'UPVC Double Nail Clamp',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      link: '/products/upvc-double-nail-clamp',
      description: 'Premium dual fastening UPVC nail clamps with 40% more holding power'
    },
    {
      name: 'Nail Clamp',
      image: 'assets/products/nico-clamp.jpg',
      link: '/products/nail-clamp',
      description: 'Industrial grade nail clamps and nico clamps for construction applications'
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
    }
  ];

  // Installation steps for HowTo schema
  installationSteps = [
    {
      name: 'Preparation',
      text: 'Mark the position ensuring proper pipe alignment and spacing (recommended every 1.5-2 meters for horizontal runs). Ensure the mounting surface is clean and free from debris. Verify the clamp size matches the pipe diameter.',
      image: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg'
    },
    {
      name: 'Pre-drilling',
      text: 'For hard surfaces like concrete or steel beams, pre-drill pilot holes using appropriate drill bit size to ensure accurate placement and prevent surface damage. Use anchor fasteners suitable for the mounting surface.',
      image: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg'
    },
    {
      name: 'Positioning',
      text: 'Place the sprinkler clamp against the mounting surface, ensuring proper alignment with the marked position. Verify the clamp size matches the pipe diameter and allows for proper pipe support without compression.',
      image: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg'
    },
    {
      name: 'Fastening',
      text: 'Secure the clamp using appropriate fasteners (threaded rods, beam clamps, or anchor bolts) until the clamp is firmly attached to the mounting surface. Ensure the clamp is flush and secure. For adjustable clamps, set the proper height before final tightening.',
      image: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the pipe sits securely in the clamp without being compressed, ensuring proper movement allowance for thermal expansion. Verify the installation is stable and meets NFPA 13 spacing requirements. Test the load capacity if required.',
      image: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg'
    }
  ];
  
  features = [
    {
      icon: 'fire-extinguisher',
      title: 'NFPA & FM Compliant',
      description: 'Manufactured to meet strict NFPA 13 standards and Factory Mutual (FM) guidelines, ensuring reliable performance in critical fire protection systems.'
    },
    {
      icon: 'weight-hanging',
      title: 'Heavy Duty Load Capacity',
      description: 'Engineered to support heavy water-filled pipes with a high safety factor, preventing sagging or structural failure in emergency situations.'
    },
    {
      icon: 'shield-alt',
      title: 'Superior Corrosion Resistance',
      description: 'Available in Red Powder Coated or Hot-Dip Galvanized finishes to withstand humidity and harsh industrial environments for decades.'
    },
    {
      icon: 'tools',
      title: 'Easy Installation',
      description: 'Designed with installer-friendly features for quick mounting and adjustment, significantly reducing labor time on large commerical projects.'
    },
    {
      icon: 'expand-arrows-alt',
      title: 'Versatile Adjustability',
      description: 'Offers vertical adjustment capabilities to ensure perfect pipe alignment and slope for proper drainage and flow characteristics.'
    },
    {
      icon: 'industry',
      title: 'Industrial Grade Material',
      description: 'Fabricated from high-tensile carbon steel to provide maximum strength and durability for critical fire suppression networks.'
    }
  ];

  applications = [
    {
      title: 'Commercial Fire Systems',
      description: 'Essential support for fire sprinkler networks in offices, malls, hotels, and high-rise buildings.',
      image: 'assets/products/sprinkler-clamp.jpg'
    },
    {
      title: 'Industrial Warehousing',
      description: 'Robust clamping solutions for large-scale fire protection in factories, logistics centers, and storage facilities.',
      image: 'assets/products/sprinkler-clamp.jpg'
    },
    {
      title: 'Irrigation Networks',
      description: 'Reliable support for overhead irrigation sprinkler systems in greenhouses and agricultural setups.',
      image: 'assets/products/sprinkler-clamp.jpg'
    },
    {
      title: 'Data Centers',
      description: 'Precision clamps for protecting critical infrastructure with pre-action fire suppression systems.',
      image: 'assets/products/sprinkler-clamp.jpg'
    },
    {
      title: 'Hospitals & Healthcare',
      description: 'Certified reliable support for safety-critical fire protection systems in medical facilities.',
      image: 'assets/products/sprinkler-clamp.jpg'
    },
    {
      title: 'Parking Structures',
      description: 'Durable galvanized clamps designed to withstand outdoor conditions and vehicle exhaust in parking garages.',
      image: 'assets/products/sprinkler-clamp.jpg'
    }
  ];

  specifications = [
    { label: 'Material Options', value: 'Galvanized material, Stainless Steel, Powder-Coated Steel' },
    { label: 'Available Sizes', value: '1" (25mm) to 8" (200mm) Pipe Diameters' },
    { label: 'Coating', value: 'Hot-Dip Galvanized or Red Powder Coated (Fire Safety Standard)' },
    { label: 'Load Capacity', value: 'Up to 100-200 kg (Depending on Size)' },
    { label: 'Mounting Options', value: 'Beam Flange, Concrete, Wall, Ceiling' },
    { label: 'Certification', value: 'ISO 9001:2015, NFPA 13 Compliant' },
    { label: 'Size Range (Extended)', value: '1/2" (15mm) to 12" (300mm) NB Pipes' },
    { label: 'Compliance Standards', value: 'NFPA 13, UL Listed Standards, FM Approved Standards' },
    { label: 'Load Rating (Heavy Duty)', value: 'Up to 1500 lbs (Depending on size and type)' },
    { label: 'Thickness', value: '1.5mm to 6mm (Heavy Duty Options Available)' },
    { label: 'Rod Size', value: 'M8, M10, M12, M16 Threaded Rod Compatibility' },
    { label: 'Temperature Rating', value: 'Rated for up to 600°F (315°C)' },
    { label: 'Application', value: 'Fire Sprinkler Lines, Chilled Water Lines, Irrigation' }
  ];

  whyChoose = [
    { item: 'Direct Manufacturer Pricing (JK Industries)' },
    { item: 'NFPA & International Standards Compliant' },
    { item: 'Huge Stock for Immediate Dispatch' },
    { item: 'Custom Fabrication for Special Projects' },
    { item: 'Strict Quality Control & Load Testing' },
    { item: 'Choice of Red Powder Coat or Galvanized' }
  ];

  testimonials = [
    {
      name: 'Vikram Singh',
      role: '',
      content: 'JK Industries sprinkler clamps are my go-to recommendation. They consistently meet all compliance checks and the finish quality is excellent for exposed installations.'
    },
    {
      name: 'Robert D.',
      role: '',
      content: 'We sourced 5000+ clamps for a warehouse project. The delivery was on time, and the quality was uniform throughout. Great load bearing capacity.'
    }
  ];

  faqs = [
    {
      question: 'What is a <strong>sprinkler clamp</strong> and <strong>sprinkler metal clamp</strong>?',
      answer: 'A <strong>sprinkler clamp</strong> is a specialized pipe support device designed to secure fire sprinkler pipes and irrigation systems. Our <strong>sprinkler metal clamp</strong> range includes heavy-duty metal clamps with superior load capacity, available in red powder coated or hot-dip galvanized finishes. These <strong>fire sprinkler clamps</strong> are essential for maintaining proper pipe alignment and preventing sagging in critical fire protection systems.'
    },
    {
      question: 'Are your <strong>sprinkler clamps</strong> and <strong>sprinkler metal clamps</strong> UL/FM approved?',
      answer: 'Yes, our <strong>sprinkler clamps</strong> and <strong>sprinkler metal clamps</strong> are manufactured in strict accordance with UL and FM standards and NFPA 13 guidelines. We use certified materials and rigorous testing to ensure they meet high-safety requirements for fire protection systems. Our <strong>fire sprinkler clamps</strong> are designed to support heavy water-filled pipes with a high safety factor.'
    },
    {
      question: 'What is the difference between <strong>universal clamp</strong>, Clevis Hangers, and <strong>sprinkler clamps</strong>?',
      answer: 'A <strong>universal clamp</strong> is a versatile pipe support that can accommodate multiple pipe sizes. Clevis hangers allow for some vertical adjustment and pipe movement, ideal for effective gravity drainage. <strong>Sprinkler clamps</strong> (like pear clamps or loop hangers) are specifically designed for securing fire lines with superior load capacity. Our <strong>sprinkler metal clamps</strong> offer the best combination of strength and adjustability for fire protection systems.'
    },
    {
      question: 'Can <strong>sprinkler clamps</strong> and <strong>irrigation sprinkler clamps</strong> be used for PVC/CPVC fire pipes?',
      answer: 'Yes, but for plastic pipes (CPVC), we recommend our specific rubber-lined or flared-edge <strong>sprinkler clamps</strong> to effectively support the pipe without damaging the surface. Standard <strong>sprinkler metal clamps</strong> are best for Steel/GI pipes. Our <strong>irrigation sprinkler clamps</strong> are designed to handle both metal and plastic pipe systems.'
    },
    {
      question: 'Do you provide <strong>sprinkler hangers</strong> with threaded rods and mounting hardware?',
      answer: 'Yes, we can supply the complete assembly including threaded rods, beam clamps, and anchor fasteners as a complete kit for <strong>sprinkler hangers</strong> and <strong>fire sprinkler clamps</strong>. Please specify your mounting surface (concrete/beam) when enquiring. Our <strong>sprinkler metal clamps</strong> come with all necessary mounting hardware for easy installation.'
    },
    {
      question: 'What finish is best for outdoor <strong>irrigation sprinkler clamps</strong>?',
      answer: 'For outdoor or humid environments, we highly recommend our Hot-Dip Galvanized (HDG) finish or Stainless Steel options for <strong>irrigation sprinkler clamps</strong>, as they offer far superior corrosion resistance compared to standard electro-galvanized or painted clamps. Our <strong>sprinkler metal clamps</strong> with HDG finish are ideal for agricultural and landscape irrigation setups.'
    },
    {
      question: 'Where can I buy <strong>sprinkler clamps</strong>, <strong>sprinkler metal clamps</strong>, and <strong>fire sprinkler clamps</strong> online in India?',
      answer: 'JK Industries is a leading manufacturer of <strong>sprinkler clamps</strong>, <strong>sprinkler metal clamps</strong>, <strong>fire sprinkler clamps</strong>, <strong>irrigation sprinkler clamps</strong>, and <strong>sprinkler hangers</strong> in India. You can purchase our clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India.'
    },
    {
      question: 'What is the price range of <strong>sprinkler clamps</strong> and <strong>sprinkler metal clamps</strong>?',
      answer: 'JK Industries offers competitive pricing for <strong>sprinkler clamps</strong> and <strong>sprinkler metal clamps</strong>. Our <strong>fire sprinkler clamps</strong> prices range from ₹5.60 to ₹19.80 per piece depending on size (1 inch to 6 inch). We provide factory direct pricing with significant bulk discounts for large orders. As a direct manufacturer, we eliminate middlemen costs, ensuring you get the best <strong>sprinkler clamp</strong> and <strong>sprinkler metal clamp</strong> prices in India.'
    },
    {
      question: 'Why choose JK Industries for <strong>sprinkler clamps</strong>, <strong>sprinkler metal clamps</strong>, and <strong>sprinkler hangers</strong>?',
      answer: 'JK Industries (Edler Clamp brand) is India\'s trusted manufacturer of <strong>sprinkler clamps</strong>, <strong>sprinkler metal clamps</strong>, <strong>fire sprinkler clamps</strong>, <strong>irrigation sprinkler clamps</strong>, and <strong>sprinkler hangers</strong>. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our <strong>sprinkler metal clamps</strong> are manufactured using premium materials ensuring superior quality and durability.'
    },
    {
      question: 'What is the best <strong>sprinkler clamp</strong> and <strong>sprinkler metal clamp</strong> brand in India?',
      answer: 'JK Industries, operating under the Edler Clamp brand, is recognized as India\'s #1 manufacturer of <strong>sprinkler clamps</strong>, <strong>sprinkler metal clamps</strong>, <strong>fire sprinkler clamps</strong>, <strong>irrigation sprinkler clamps</strong>, and <strong>sprinkler hangers</strong>. With ISO 9001:2015 certification, superior quality materials, and NFPA 13 compliance, our <strong>sprinkler clamps</strong> are trusted by contractors, fire safety engineers, and industrial clients across India.'
    },
    {
      question: 'What sizes are available for <strong>sprinkler clamps</strong> and <strong>sprinkler metal clamps</strong>?',
      answer: 'JK Industries offers comprehensive size ranges for <strong>sprinkler clamps</strong> and <strong>sprinkler metal clamps</strong> from 1 inch (25mm) to 6 inch (160mm). Our <strong>fire sprinkler clamps</strong> are available in standard sizes: 1 inch, 1 ¼ inch, 1 ½ inch, 2 inch, 2 ½ inch, 3 inch, 4 inch, and 6 inch. Custom sizes are also available on request for specialized applications. All our <strong>sprinkler hangers</strong> meet NFPA 13 spacing requirements.'
    },
    {
      question: 'How to choose between <strong>sprinkler clamp</strong> and <strong>universal clamp</strong>?',
      answer: 'Choose <strong>sprinkler clamps</strong> for dedicated fire protection and irrigation systems requiring NFPA compliance and high load capacity. Our <strong>sprinkler metal clamps</strong> offer superior strength and corrosion resistance. Choose <strong>universal clamps</strong> for versatile applications where you need to accommodate multiple pipe sizes. For most fire protection and irrigation applications, <strong>sprinkler clamps</strong> are the preferred choice due to their specialized design, durability, and compliance with safety standards.'
    }
  ];

  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.updateSeo();
    this.setProductStructuredData();
    this.setFaqStructuredData();
    this.setBreadcrumbStructuredData();
    this.setLocalBusinessStructuredData();
    this.setHowToStructuredData();
    this.setItemListStructuredData();
    this.setWebPageStructuredData();

    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100
      });
      
      // FAQ interaction logic
      setTimeout(() => {
        const faqItems = this.document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
          const question = item.querySelector('.faq-question');
          if (question) {
            question.addEventListener('click', () => {
              const isActive = item.classList.contains('active');
              
              // Close all
              faqItems.forEach(f => f.classList.remove('active'));
              
              // Toggle current
              if (!isActive) {
                item.classList.add('active');
              }
            });
          }
        });
      }, 500);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }

  downloadBrochure() {
    alert('Thank you for your interest! Our Sprinkler System components brochure will be available shortly. Contact us for immediate specs.');
  }

  private updateSeo() {
    this.titleService.setTitle('Sprinkler Clamp | Sprinkler Metal Clamp | Fire Sprinkler Clamp | Irrigation Sprinkler Clamp | Sprinkler Hangers Manufacturer - JK Industries');

    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of Sprinkler Clamps, Sprinkler Metal Clamps, Fire Sprinkler Clamps, Irrigation Sprinkler Clamps & Sprinkler Hangers. Premium Quality with NFPA Compliance. ISO Certified. Factory Direct Prices. Buy Now!' },
      { name: 'keywords', content: 'Sprinkler Clamp, sprinkler metal clamp, universal clamp, fire sprinkler clamp, irrigation sprinkler clamp, sprinkler hangers, fire sprinkler hangers, sprinkler pipe clamp, fire protection clamp, adjustable sprinkler clamp, sprinkler support clamp, metal clamp for sprinklers, fire system clamp, sprinkler mounting system, sprinkler pipe support, sprinkler clamp manufacturer, sprinkler metal clamp India, fire sprinkler clamp Rajkot, irrigation sprinkler clamp Gujarat, sprinkler hangers manufacturer, Edler Clamp, JK Industries, sprinkler clamp price, best sprinkler clamp, sprinkler clamp online, sprinkler metal clamp supplier India' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/sprinkler-clamp' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Article meta tags
      { property: 'article:section', content: 'Fire Protection Products' },
      { property: 'article:tag', content: 'Sprinkler Clamp' },
      { property: 'article:tag', content: 'Sprinkler Metal Clamp' },
      { property: 'article:tag', content: 'Fire Sprinkler Clamp' },
      { property: 'article:tag', content: 'Irrigation Sprinkler Clamp' },
      { property: 'article:tag', content: 'Sprinkler Hangers' },
      { property: 'article:tag', content: 'Universal Clamp' },
      
      // Product meta tags
      { property: 'product:price:amount', content: '5.60' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'Sprinkler Clamp | Sprinkler Metal Clamp | Fire Sprinkler Clamp | Irrigation Sprinkler Clamp | Sprinkler Hangers Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of Sprinkler Clamps, Sprinkler Metal Clamps, Fire Sprinkler Clamps, Irrigation Sprinkler Clamps & Sprinkler Hangers. Premium Quality with NFPA Compliance. ISO Certified. Factory Direct Prices.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '800' },
      { property: 'og:image:alt', content: 'Sprinkler Clamp | Sprinkler Metal Clamp | Fire Sprinkler Clamp - Premium Fire Protection Pipe Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/sprinkler-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Sprinkler Clamp | Sprinkler Metal Clamp | Fire Sprinkler Clamp | Sprinkler Hangers Manufacturer' },
      { name: 'twitter:description', content: 'India\'s #1 Manufacturer of Sprinkler Clamps, Sprinkler Metal Clamps, Fire Sprinkler Clamps & Sprinkler Hangers. NFPA Compliant. ISO Certified. Factory Direct Prices.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'Sprinkler Clamp | Sprinkler Metal Clamp | Fire Sprinkler Clamp - Premium Fire Protection Pipe Clamp' }
    ]);
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(SPRINKLER_CLAMP_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SPRINKLER_CLAMP_PRODUCT_SCHEMA, ''));
      return;
    }

    const minPrice = Math.min(...this.productSizes.map(s => s.price));
    const maxPrice = Math.max(...this.productSizes.map(s => s.price));

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "Sprinkler Clamp, Sprinkler Metal Clamp, Fire Sprinkler Clamp, Irrigation Sprinkler Clamp, Sprinkler Hangers, Universal Clamp, Fire Safety Hardware",
      "name": "Sprinkler Clamp | Sprinkler Metal Clamp | Fire Sprinkler Clamp | Irrigation Sprinkler Clamp | Sprinkler Hangers",
      "url": "https://jkindustriesrajkot.com/products/sprinkler-clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg"
      ],
      "description": "JK Industries manufactures premium Sprinkler Clamps, Sprinkler Metal Clamps, Fire Sprinkler Clamps, Irrigation Sprinkler Clamps, and Sprinkler Hangers with superior load capacity and NFPA 13 compliance. Our Universal Clamps and Fire Sprinkler Clamps are ideal for commercial fire systems, industrial warehousing, irrigation networks, and critical infrastructure. Best quality sprinkler clamps available in sizes 1 inch to 6 inch with ISO 9001:2015 certification.",
      "keywords": "Sprinkler Clamp, sprinkler metal clamp, universal clamp, fire sprinkler clamp, irrigation sprinkler clamp, sprinkler hangers, fire sprinkler hangers, sprinkler pipe clamp, fire protection clamp, adjustable sprinkler clamp, sprinkler support clamp, metal clamp for sprinklers, fire system clamp, sprinkler mounting system, sprinkler pipe support, sprinkler clamp manufacturer, sprinkler metal clamp India, fire sprinkler clamp Rajkot, irrigation sprinkler clamp Gujarat, sprinkler hangers manufacturer, Edler Clamp, JK Industries",
      "sku": "SPR-CL-001",
      "mpn": "JK-SPR-001",
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
      "alternateName": ["Sprinkler Clamp", "sprinkler metal clamp", "universal clamp", "fire sprinkler clamp", "irrigation sprinkler clamp", "sprinkler hangers", "fire sprinkler hangers", "sprinkler pipe clamp", "fire protection clamp", "adjustable sprinkler clamp", "sprinkler support clamp", "metal clamp for sprinklers", "fire system clamp", "sprinkler mounting system", "sprinkler pipe support", "sprinkler clamp manufacturer", "sprinkler metal clamp India", "fire sprinkler clamp Rajkot", "irrigation sprinkler clamp Gujarat", "sprinkler hangers manufacturer", "Edler Clamp", "JK Industries", "sprinkler clamp price", "best sprinkler clamp", "sprinkler clamp online", "sprinkler metal clamp supplier India"],
      "material": ["Carbon Steel", "Red Epoxy Coating", "Galvanized Steel", "Stainless Steel", "Powder-Coated Steel"],
      "color": "Red Powder Coated or Hot-Dip Galvanized",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/sprinkler-clamp",
        "priceCurrency": "INR",
        "lowPrice": minPrice.toString(),
        "highPrice": maxPrice.toString(),
        "offerCount": this.productSizes.length.toString(),
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
        "ratingCount": "140",
        "reviewCount": "120"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.name },
        "reviewBody": t.content
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "Fire Sprinkler Lines" },
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
        { "@type": "PropertyValue", "name": "Type", "value": "Sprinkler Clamp, Sprinkler Metal Clamp, Fire Sprinkler Clamp" },
        { "@type": "PropertyValue", "name": "Material", "value": "Galvanized Steel, Stainless Steel, Powder-Coated Steel" },
        { "@type": "PropertyValue", "name": "Finish", "value": "Hot-Dip Galvanized or Red Powder Coated" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "1 inch (25mm) to 6 inch (160mm) Pipe Diameters" },
        { "@type": "PropertyValue", "name": "Load Capacity", "value": "Up to 100-200 kg (Depending on Size)" },
        { "@type": "PropertyValue", "name": "Mounting Options", "value": "Beam Flange, Concrete, Wall, Ceiling" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, NFPA 13 Compliant" },
        { "@type": "PropertyValue", "name": "Compliance Standards", "value": "NFPA 13, UL Listed Standards, FM Approved Standards" },
        { "@type": "PropertyValue", "name": "Load Rating (Heavy Duty)", "value": "Up to 1500 lbs (Depending on size and type)" },
        { "@type": "PropertyValue", "name": "Thickness", "value": "1.5mm to 6mm (Heavy Duty Options Available)" },
        { "@type": "PropertyValue", "name": "Rod Size", "value": "M8, M10, M12, M16 Threaded Rod Compatibility" },
        { "@type": "PropertyValue", "name": "Temperature Rating", "value": "Rated for up to 600°F (315°C)" },
        { "@type": "PropertyValue", "name": "Application", "value": "Fire Sprinkler Lines, Chilled Water Lines, Irrigation" },
        { "@type": "PropertyValue", "name": "Product Category", "value": "Sprinkler Clamp, Sprinkler Metal Clamp, Fire Sprinkler Clamp, Irrigation Sprinkler Clamp, Sprinkler Hangers" },
        { "@type": "PropertyValue", "name": "Manufacturer Location", "value": "Rajkot, Gujarat, India" },
        { "@type": "PropertyValue", "name": "Price Range", "value": `₹${minPrice} to ₹${maxPrice} per piece` },
        { "@type": "PropertyValue", "name": "Availability", "value": "In Stock - Ready to Ship" }
      ],
      "hasVariant": this.productSizes.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch Sprinkler Clamp | Sprinkler Metal Clamp`,
        "sku": size.sku,
        "size": `${size.sizeInch} Inch / ${size.size} MM`,
        "image": "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg",
        "description": `Premium ${size.sizeInch} Inch (${size.size} MM) sprinkler clamp, sprinkler metal clamp, and fire sprinkler clamp. Perfect for ${size.size} OD pipes. Best quality irrigation sprinkler clamp and sprinkler hangers for fire protection and irrigation systems.`,
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
    this.transferState.set(SPRINKLER_CLAMP_PRODUCT_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData() {
    if (this.transferState.hasKey(SPRINKLER_CLAMP_FAQ_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SPRINKLER_CLAMP_FAQ_SCHEMA, ''));
      return;
    }

    const schema = {
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

    const schemaString = JSON.stringify(schema);
    this.transferState.set(SPRINKLER_CLAMP_FAQ_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(SPRINKLER_CLAMP_BREADCRUMB_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SPRINKLER_CLAMP_BREADCRUMB_SCHEMA, ''));
      return;
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://jkindustriesrajkot.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "All Products",
          "item": "https://jkindustriesrajkot.com/products"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Sprinkler Clamp",
          "item": "https://jkindustriesrajkot.com/products/sprinkler-clamp"
        }
      ]
    };

    const schemaString = JSON.stringify(schema);
    this.transferState.set(SPRINKLER_CLAMP_BREADCRUMB_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setLocalBusinessStructuredData() {
    if (this.transferState.hasKey(SPRINKLER_CLAMP_BUSINESS_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SPRINKLER_CLAMP_BUSINESS_SCHEMA, ''));
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
          "name": "Sprinkler Clamp Manufacturing Unit",
          "description": "Specialized unit for Fire Sprinkler Clamps, Sprinkler Metal Clamps, and Sprinkler Hangers",
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
          "closes": "20:00"
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
      "priceRange": "₹₹",
      "sameAs": [
        "https://www.linkedin.com/company/jk-industries-india/",
        "https://www.instagram.com/jk_industries_1995/"
      ]
    };

    const schemaString = JSON.stringify(businessSchema);
    this.transferState.set(SPRINKLER_CLAMP_BUSINESS_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(SPRINKLER_CLAMP_HOWTO_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SPRINKLER_CLAMP_HOWTO_SCHEMA, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install Sprinkler Clamps / Sprinkler Metal Clamps",
      "description": "Step-by-step guide to properly install Sprinkler Clamps, Sprinkler Metal Clamps, and Fire Sprinkler Clamps for secure pipe mounting. Learn the correct technique for installing sprinkler hangers and irrigation sprinkler clamps.",
      "image": "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg",
      "totalTime": "PT15M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Sprinkler Clamps or Sprinkler Metal Clamps"
        },
        {
          "@type": "HowToSupply",
          "name": "Threaded Rods and Mounting Hardware"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Power Drill"
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
        },
        {
          "@type": "HowToTool",
          "name": "Wrench or Socket Set"
        }
      ],
      "step": this.installationSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "image": step.image,
        "url": `https://jkindustriesrajkot.com/products/sprinkler-clamp#step-${index + 1}`
      }))
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(SPRINKLER_CLAMP_HOWTO_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(SPRINKLER_CLAMP_ITEMLIST_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SPRINKLER_CLAMP_ITEMLIST_SCHEMA, ''));
      return;
    }

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Sprinkler Clamp | Sprinkler Metal Clamp Sizes - Available Variants",
      "description": "Complete range of Sprinkler Clamps, Sprinkler Metal Clamps, Fire Sprinkler Clamps, Irrigation Sprinkler Clamps, and Sprinkler Hangers available in sizes from 1 inch to 6 inch. Best quality sprinkler clamps with competitive pricing.",
      "numberOfItems": this.productSizes.length,
      "itemListElement": this.productSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch Sprinkler Clamp | Sprinkler Metal Clamp`,
          "description": `Premium ${size.sizeInch} Inch (${size.size} MM) sprinkler clamp, sprinkler metal clamp, and fire sprinkler clamp. Perfect for ${size.size} OD pipes. Best quality irrigation sprinkler clamp and sprinkler hangers for fire protection and irrigation systems.`,
          "sku": size.sku,
          "image": "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "countryOfOrigin": {
            "@type": "Country",
            "name": "India"
          },
          "material": ["Carbon Steel", "Red Epoxy Coating", "Galvanized Steel"],
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
    this.transferState.set(SPRINKLER_CLAMP_ITEMLIST_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(SPRINKLER_CLAMP_WEBPAGE_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SPRINKLER_CLAMP_WEBPAGE_SCHEMA, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/sprinkler-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/sprinkler-clamp",
      "name": "Sprinkler Clamp | Sprinkler Metal Clamp | Fire Sprinkler Clamp | Irrigation Sprinkler Clamp | Sprinkler Hangers Manufacturer",
      "description": "India's #1 Manufacturer of Sprinkler Clamps, Sprinkler Metal Clamps, Fire Sprinkler Clamps, Irrigation Sprinkler Clamps & Sprinkler Hangers. Premium Sprinkler Clamps with NFPA compliance. ISO Certified. Factory Direct Prices. Contact Us for Best Quality Sprinkler Clamps, Sprinkler Metal Clamps, Fire Sprinkler Clamps, Irrigation Sprinkler Clamps & Sprinkler Hangers. Rajkot, Gujarat, India.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of sprinkler clamps, sprinkler metal clamps, fire sprinkler clamps, and pipe support systems in India",
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
        "url": "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg",
        "width": "1200",
        "height": "800",
        "caption": "Sprinkler Clamp | Sprinkler Metal Clamp | Fire Sprinkler Clamp - Premium Fire Protection Pipe Clamp by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(SPRINKLER_CLAMP_WEBPAGE_SCHEMA, schemaString);
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

