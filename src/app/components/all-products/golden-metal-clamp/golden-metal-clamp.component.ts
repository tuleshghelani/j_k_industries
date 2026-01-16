import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';

const GOLDEN_METAL_CLAMP_PRODUCT_SCHEMA = makeStateKey<string>('golden_metal_clamp_product_schema');
const GOLDEN_METAL_CLAMP_FAQ_SCHEMA = makeStateKey<string>('golden_metal_clamp_faq_schema');
const GOLDEN_METAL_CLAMP_BREADCRUMB_SCHEMA = makeStateKey<string>('golden_metal_clamp_breadcrumb_schema');
const GOLDEN_METAL_CLAMP_BUSINESS_SCHEMA = makeStateKey<string>('golden_metal_clamp_business_schema');
const GOLDEN_METAL_CLAMP_HOWTO_SCHEMA = makeStateKey<string>('golden_metal_clamp_howto_schema');
const GOLDEN_METAL_CLAMP_ITEMLIST_SCHEMA = makeStateKey<string>('golden_metal_clamp_itemlist_schema');
const GOLDEN_METAL_CLAMP_WEBPAGE_SCHEMA = makeStateKey<string>('golden_metal_clamp_webpage_schema');

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
  selector: 'app-golden-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './golden-metal-clamp.component.html',
  styleUrl: './golden-metal-clamp.component.scss'
})
export class GoldenMetalClampComponent implements OnInit, AfterViewInit {
  
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
    alert('Thank you for your enquiry about Golden Clamps, GI Clamps, and Golden Metal Clamps. We will contact you shortly.');
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

  // Product sizes for 1MM GI CPVC Clamp
  productSizes1MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 1.50, qtyPcs: 100, packingQty: 3000, sku: 'GLD-1MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 1.75, qtyPcs: 100, packingQty: 2500, sku: 'GLD-1MM-20' },
    { size: '25mm', sizeInch: '1', price: 2.00, qtyPcs: 100, packingQty: 1800, sku: 'GLD-1MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 2.30, qtyPcs: 100, packingQty: 1400, sku: 'GLD-1MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 2.70, qtyPcs: 100, packingQty: 1000, sku: 'GLD-1MM-40' },
    { size: '50mm', sizeInch: '2', price: 3.40, qtyPcs: 100, packingQty: 1000, sku: 'GLD-1MM-50' }
  ];

  // Product sizes for 1.5MM GI CPVC Clamp
  productSizes1_5MM: ProductSize[] = [
    { size: '15mm', sizeInch: '1/2', price: 2.20, qtyPcs: 100, packingQty: 2500, sku: 'GLD-1.5MM-15' },
    { size: '20mm', sizeInch: '3/4', price: 2.65, qtyPcs: 100, packingQty: 2000, sku: 'GLD-1.5MM-20' },
    { size: '25mm', sizeInch: '1', price: 3.05, qtyPcs: 100, packingQty: 1500, sku: 'GLD-1.5MM-25' },
    { size: '32mm', sizeInch: '1 1/4', price: 3.45, qtyPcs: 100, packingQty: 1000, sku: 'GLD-1.5MM-32' },
    { size: '40mm', sizeInch: '1 1/2', price: 4.05, qtyPcs: 100, packingQty: 800, sku: 'GLD-1.5MM-40' },
    { size: '50mm', sizeInch: '2', price: 5.30, qtyPcs: 100, packingQty: 700, sku: 'GLD-1.5MM-50' }
  ];

  // Related products for internal linking
  relatedProducts: RelatedProduct[] = [
    {
      name: 'Silver Metal Clamp',
      image: 'assets/products/upvc-metal-clamp.jpg',
      link: '/products/silver-metal-clamp',
      description: 'Premium silver-plated clamps for modern installations'
    },
    {
      name: 'UPVC Metal Clamp',
      image: 'assets/products/upvc-metal-clamp.jpg',
      link: '/products/upvc-metal-clamp',
      description: 'Premium powder coated metal clamps for UPVC pipes'
    },
    {
      name: 'CPVC Metal Clamp',
      image: 'assets/products/cpvc-metal-clamp.jpg',
      link: '/products/cpvc-metal-clamp',
      description: 'High-temperature resistant metal clamps for CPVC systems'
    },
    {
      name: 'Metal Clamp - SS Metal Clamp',
      image: 'assets/products/metal-clamp.jpg',
      link: '/products/stainless-steel-clamp',
      description: 'Premium stainless steel clamps for industrial applications'
    }
  ];
  
  features = [
    {
      icon: 'shield-alt',
      title: 'Premium Gold Plating',
      description: 'High-quality electroplated <strong>gold plated clamp</strong> finish provides superior corrosion resistance while adding a luxurious aesthetic to visible piping installations. Our <strong>golden metal clamp</strong> range offers exceptional durability.'
    },
    {
      icon: 'gem',
      title: 'Luxury Aesthetic',
      description: 'Designed for high-end interiors, these <strong>golden clamps</strong> feature a mirror-polished golden finish that perfectly complements premium brass and copper fixtures. Perfect for luxury <strong>GI clamp</strong> applications.'
    },
    {
      icon: 'cogs',
      title: 'Precision Engineering',
      description: 'Manufactured with high-grade carbon steel and precise dimensions to ensure a secure fit and reliable support for all pipe types. Our <strong>golden metal clamp</strong> and <strong>GI CPVC clamp</strong> solutions provide superior performance.'
    },
    {
      icon: 'tint',
      title: 'Moisture Resistance',
      description: 'Advanced plating technology ensures excellent protection against humidity and tarnish, maintaining the golden shine for years. Our <strong>gold plated clamp</strong> range is ideal for premium installations.'
    },
    {
      icon: 'check-double',
      title: 'Easy Installation',
      description: 'Engineered for quick and hassle-free installation with standard mounting hardware, reducing labor time on premium projects. Our <strong>golden clamp</strong> and <strong>metal clamp</strong> solutions are installation-friendly.'
    },
    {
      icon: 'certificate',
      title: 'Certified Quality',
      description: 'JK Industries ensures strict quality control with ISO 9001:2015 certification, guaranteeing consistency and durability in every piece. Every <strong>golden metal clamp</strong> and <strong>GI clamp</strong> meets international standards.'
    }
  ];

  applications = [
    {
      icon: 'home',
      title: 'Luxury Residential',
      description: 'Ideal for exposed plumbing in high-end bathrooms, kitchens, and living spaces where aesthetics are paramount. Our <strong>golden clamp</strong> and <strong>gold plated clamp</strong> solutions elevate residential interiors.'
    },
    {
      icon: 'hotel',
      title: 'Hotels & Hospitality',
      description: 'Perfect for 5-star hotels, resorts, and spas requiring elegant details and superior finish in visible infrastructure. Premium <strong>golden metal clamp</strong> and <strong>GI clamp</strong> solutions for hospitality.'
    },
    {
      icon: 'store',
      title: 'Commercial Showrooms',
      description: 'Enhances the visual appeal of showrooms, boutiques, and corporate offices with exposed ceiling or wall piping. <strong>Metal clamp</strong> solutions with premium <strong>golden clamp</strong> finish.'
    },
    {
      icon: 'building',
      title: 'Architectural Projects',
      description: 'A favorite choice for architects and interior designers creating industrial-chic or luxury modern designs. Our <strong>golden metal clamp</strong> and <strong>GI CPVC clamp</strong> range supports premium architecture.'
    },
    {
      icon: 'water',
      title: 'Decorative Plumbing',
      description: 'Essential for decorative piping systems where ordinary industrial clamps would detract from the overall design. Premium <strong>gold plated clamp</strong> solutions for visible installations.'
    },
    {
      icon: 'landmark',
      title: 'Heritage Renovation',
      description: 'Suitable for restoring or upgrading plumbing in heritage buildings where classic aesthetics are required. Our <strong>golden clamp</strong> range maintains historical elegance.'
    }
  ];

  specifications = [
    { label: 'Base Material', value: 'Premium CRC / MS with Precision Machining' },
    { label: 'Gold Plating Type', value: 'Gold Electroplating with Protective Sealant' },
    { label: 'Sizes Available', value: '1/2 inch to 4 inch (15mm to 110mm) Standard (Custom Sizes Available)' },
    { label: 'Surface Finishes', value: 'Mirror Polished Gold, Brushed Gold, Matte Gold, Antique Gold' },
    { label: 'Plating Thickness', value: '15-25 microns (Premium Grade)' },
    { label: 'Tensile Strength', value: '450-650 MPa (Depending on Base Material)' },
    { label: 'Corrosion Resistance', value: '600+ hours Salt Spray Test (ASTM B117 Certified)' },
    { label: 'Certifications', value: 'ISO 9001:2015, RoHS Compliant, REACH Compliant' },
    { label: 'Load Capacity', value: 'Up to 250 kg (Depending on size)' },
    { label: 'Application', value: 'Luxury Plumbing, Interior Design' }
  ];

  whyChoose = [
    { item: 'Direct from Manufacturer (JK Industries)' },
    { item: 'Premium "Edler" Brand Quality' },
    { item: 'Superior Gold Plating Durability' },
    { item: 'Competitive Factory Pricing' },
    { item: 'Pan India Fast Delivery' },
    { item: 'Custom Sizes Available on Request' }
  ];

  testimonials = [
    {
      name: 'Rajesh Mehta',
      role: 'Interior Designer',
      content: 'We used JK Industries\' Golden Metal Clamps and GI Clamps for a luxury villa project in Mumbai. The finish is unmatched, and they truly elevate the exposed piping look. The golden clamp quality is exceptional. Highly recommended!'
    },
    {
      name: 'Amit Patel',
      role: 'Construction Contractor',
      content: 'Best quality golden clamps and GI CPVC clamps in the market. The gold plated clamp finish is durable and doesn\'t tarnish easily. Fast delivery from Rajkot to Bangalore. Perfect metal clamp solution for premium projects.'
    },
    {
      name: 'Sarah Fernandez',
      role: 'Architect',
      content: 'Finding aesthetic pipe supports was a challenge until we found Edler brand golden clamps. They are perfect for our high-end hospitality projects. The golden metal clamp range offers exactly what we need for luxury installations.'
    }
  ];

  faqs = [
    {
      question: 'What is the difference between Golden Clamp, GI Clamp, and Golden Metal Clamp?',
      answer: 'A <strong>golden clamp</strong> refers to any clamp with a gold finish, while a <strong>GI clamp</strong> (Galvanized Iron clamp) is a standard industrial clamp. Our <strong>golden metal clamp</strong> combines premium metal construction with high-quality gold electroplating, offering both superior aesthetics and durability. The <strong>gold plated clamp</strong> finish provides luxury appearance while maintaining industrial-grade strength.'
    },
    {
      question: 'What is the base material of the Golden Metal Clamp and GI CPVC Clamp?',
      answer: 'Our <strong>Golden Metal Clamps</strong> and <strong>GI CPVC clamps</strong> are manufactured from high-quality Carbon Steel (CRC) and then finished with premium gold electroplating for exceptional strength and aesthetics. The base material ensures structural integrity while the gold plating provides superior corrosion resistance.'
    },
    {
      question: 'Will the gold finish on Golden Clamps and Gold Plated Clamps tarnish over time?',
      answer: 'Our <strong>golden clamps</strong> and <strong>gold plated clamps</strong> feature high-micron gold plating with a protective lacquer coat to maximize resistance to tarnish and humidity. For indoor luxury applications, they maintain their shine for years. The <strong>golden metal clamp</strong> finish is specifically designed for long-term durability.'
    },
    {
      question: 'Do you offer bulk wholesale pricing for Golden Clamps, GI Clamps, and Metal Clamps?',
      answer: 'Yes, as a manufacturer (JK Industries), we offer competitive wholesale pricing for bulk orders of <strong>golden clamps</strong>, <strong>GI clamps</strong>, <strong>metal clamps</strong>, and <strong>GI CPVC clamps</strong>. Contact us directly for a quote on golden fasteners and premium clamps.'
    },
    {
      question: 'Can I use Golden Clamps and GI CPVC Clamps for outdoor installation?',
      answer: 'While our <strong>golden clamps</strong> and <strong>GI CPVC clamps</strong> are corrosion-resistant, we recommend them primarily for indoor luxury applications to preserve the premium gold finish. For harsh outdoor environments, our SS304 clamps might be more suitable. However, our <strong>gold plated clamp</strong> range can handle moderate outdoor conditions.'
    },
    {
      question: 'Are Golden Metal Clamps and GI Clamps compatible with all pipe types?',
      answer: 'Yes, our <strong>golden metal clamps</strong> and <strong>GI clamps</strong> are designed to fit standard CPVC, UPVC, and GI pipes of corresponding sizes. Our <strong>GI CPVC clamp</strong> range is specifically optimized for CPVC pipe systems. Please verify the outer diameter of your pipes when ordering.'
    },
    {
      question: 'Where can I buy Golden Clamps, GI Clamps, and Golden Metal Clamps online in India?',
      answer: 'JK Industries is a leading manufacturer of <strong>golden clamps</strong>, <strong>GI clamps</strong>, <strong>golden metal clamps</strong>, and <strong>gold plated clamps</strong> in India. You can purchase our clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India.'
    },
    {
      question: 'What sizes are available for Golden Clamps and GI CPVC Clamps?',
      answer: 'JK Industries offers comprehensive size ranges for both 1MM and 1.5MM <strong>GI CPVC clamps</strong> and <strong>golden clamps</strong> from 1/2 inch to 4 inch. We manufacture <strong>golden metal clamps</strong> and <strong>GI clamps</strong> in all standard sizes. Custom sizes are also available on request.'
    },
    {
      question: 'Why choose JK Industries for Golden Clamps, GI Clamps, and Metal Clamps?',
      answer: 'JK Industries (Edler Clamp brand) is India\'s trusted manufacturer of <strong>golden clamps</strong>, <strong>GI clamps</strong>, <strong>metal clamps</strong>, and <strong>GI CPVC clamps</strong>. We offer ISO 9001:2015 certified products, competitive factory pricing, ready stock availability, custom size options, and excellent customer service. Our <strong>golden metal clamps</strong> and <strong>gold plated clamps</strong> are manufactured using premium materials ensuring superior quality and durability.'
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
    this.titleService.setTitle('Golden Clamp | GI Clamp | Golden Metal Clamp | Metal Clamp | GI CPVC Clamp | Gold Plated Clamp Manufacturer - JK Industries');

    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of Golden Clamps, GI Clamps, Golden Metal Clamps, Metal Clamps, GI CPVC Clamps & Gold Plated Clamps. Premium Golden Clamps with superior gold finish. ISO Certified. Best Prices. Buy Direct from Factory in Rajkot, Gujarat.' },
      { name: 'keywords', content: 'golden clamp, GI clamp, golden metal clamp, Metal Clamp, GI cpvc clamp, gold plated clamp, golden clamp manufacturer, GI clamp India, golden metal clamp price, gold plated pipe clamp, GI CPVC clamp supplier, golden clamp Rajkot, metal clamp manufacturer, GI clamp manufacturer, golden clamp online, gold plated clamp India, golden fasteners, gold plated pipe clamp, decorative metal clamp, luxury pipe support, gold clamp India, Edler clamp, JK Industries, golden pipe fasteners, gold finish clamps, GI pipe clamp, golden metal clamp supplier' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/golden-metal-clamp' },
      
      // Location Tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },

      // Article meta tags
      { property: 'article:section', content: 'Plumbing Products' },
      { property: 'article:tag', content: 'Golden Clamp' },
      { property: 'article:tag', content: 'GI Clamp' },
      { property: 'article:tag', content: 'Golden Metal Clamp' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'GI CPVC Clamp' },
      { property: 'article:tag', content: 'Gold Plated Clamp' },

      // Product meta tags
      { property: 'product:price:amount', content: '1.50' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },

      // Open Graph
      { property: 'og:title', content: 'Golden Clamp | GI Clamp | Golden Metal Clamp | Metal Clamp | GI CPVC Clamp | Gold Plated Clamp Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of Golden Clamps, GI Clamps, Golden Metal Clamps, Metal Clamps, GI CPVC Clamps & Gold Plated Clamps. Premium Golden Clamps with superior finish. ISO Certified.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '800' },
      { property: 'og:image:alt', content: 'Golden Metal Clamp - Premium GI CPVC Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/golden-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Golden Clamp | GI Clamp | Golden Metal Clamp | Metal Clamp Manufacturer' },
      { name: 'twitter:description', content: 'Premium Golden Clamps, GI Clamps, Golden Metal Clamps & Gold Plated Clamps. Superior gold finish. ISO Certified. Buy Direct from Factory.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'Golden Metal Clamp - Premium GI CPVC Clamp' }
    ]);

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
    alert('Thank you for your interest! Our product brochure will be available shortly. Our team will contact you with more information.');
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(GOLDEN_METAL_CLAMP_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(GOLDEN_METAL_CLAMP_PRODUCT_SCHEMA, ''));
      return;
    }

    const allSizes = [...this.productSizes1MM, ...this.productSizes1_5MM];
    const minPrice = Math.min(...allSizes.map(s => s.price));
    const maxPrice = Math.max(...allSizes.map(s => s.price));

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "Golden Clamp, GI Clamp, Golden Metal Clamp, Metal Clamp, GI CPVC Clamp, Gold Plated Clamp, Clips, Clamps",
      "name": "Golden Clamp | GI Clamp | Golden Metal Clamp | Metal Clamp | GI CPVC Clamp | Gold Plated Clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg"
      ],
      "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp",
      "description": "JK Industries manufactures premium Golden Clamps, GI Clamps, Golden Metal Clamps, Metal Clamps, GI CPVC Clamps, and Gold Plated Clamps (Edler Brand) with high-quality gold plated finish for superior aesthetics and luxury interiors. Ideal for visible piping in commercial and luxury residential projects. Available in 1MM and 1.5MM thicknesses from 1/2 inch to 4 inch.",
      "sku": "GLD-CL-001",
      "mpn": "JK-GLD-001",
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
      "alternateName": ["Golden clamp", "GI clamp", "golden metal clamp", "Metal Clamp", "GI cpvc clamp", "gold plated clamp", "golden clamp manufacturer", "GI clamp India", "golden metal clamp price", "gold plated pipe clamp", "GI CPVC clamp supplier", "golden clamp Rajkot", "metal clamp manufacturer"],
      "material": ["Carbon Steel", "Gold Plating", "Galvanized Iron"],
      "color": "Gold",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp",
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
        "ratingValue": "4.9",
        "ratingCount": "95",
        "reviewCount": "75"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": t.name },
        "reviewBody": t.content,
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "Industrial Pipes" },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Type", "value": "Golden Metal Clamp" },
        { "@type": "PropertyValue", "name": "Finish", "value": "Gold Plated" },
        { "@type": "PropertyValue", "name": "Thickness Options", "value": "1MM and 1.5MM" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "1/2 inch to 4 inch (15mm to 110mm)" },
        { "@type": "PropertyValue", "name": "Material", "value": "Carbon Steel with Gold Plating" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, RoHS Compliant" }
      ],
      "hasVariant": allSizes.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch Golden Metal Clamp / GI CPVC Clamp`,
        "sku": size.sku,
        "size": `${size.size} / ${size.sizeInch} Inch`,
        "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
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
    this.transferState.set(GOLDEN_METAL_CLAMP_PRODUCT_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData() {
    if (this.transferState.hasKey(GOLDEN_METAL_CLAMP_FAQ_SCHEMA)) {
      this.addJsonLd(this.transferState.get(GOLDEN_METAL_CLAMP_FAQ_SCHEMA, ''));
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
    this.transferState.set(GOLDEN_METAL_CLAMP_FAQ_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(GOLDEN_METAL_CLAMP_BREADCRUMB_SCHEMA)) {
      this.addJsonLd(this.transferState.get(GOLDEN_METAL_CLAMP_BREADCRUMB_SCHEMA, ''));
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
          "name": "Golden Clamp | GI Clamp | Golden Metal Clamp | Edler Clamp",
          "item": "https://jkindustriesrajkot.com/products/golden-metal-clamp"
        }
      ]
    };

    const schemaString = JSON.stringify(schema);
    this.transferState.set(GOLDEN_METAL_CLAMP_BREADCRUMB_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setLocalBusinessStructuredData() {
    if (this.transferState.hasKey(GOLDEN_METAL_CLAMP_BUSINESS_SCHEMA)) {
      this.addJsonLd(this.transferState.get(GOLDEN_METAL_CLAMP_BUSINESS_SCHEMA, ''));
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
          "name": "Golden Metal Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for Golden Metal Clamps",
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
      "priceRange": "₹₹"
    };

    const schemaString = JSON.stringify(businessSchema);
    this.transferState.set(GOLDEN_METAL_CLAMP_BUSINESS_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(GOLDEN_METAL_CLAMP_HOWTO_SCHEMA)) {
      this.addJsonLd(this.transferState.get(GOLDEN_METAL_CLAMP_HOWTO_SCHEMA, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install Golden Metal Clamps / GI CPVC Clamps",
      "description": "Step-by-step guide to properly install Golden Clamps, GI Clamps, and Golden Metal Clamps for secure pipe mounting. Learn the correct technique for installing gold plated clamps and GI CPVC clamps.",
      "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
      "totalTime": "PT10M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Golden Metal Clamps or GI CPVC Clamps"
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
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Preparation",
          "text": "Mark the position ensuring proper pipe alignment and spacing (recommended every 80-100cm for horizontal runs). Ensure the mounting surface is clean and free from debris.",
          "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
          "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp#step-1"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Pre-drilling",
          "text": "For hard surfaces like concrete or brick, pre-drill pilot holes using a 3mm drill bit to ensure accurate placement and prevent surface cracking.",
          "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
          "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp#step-2"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Positioning",
          "text": "Place the golden metal clamp against the mounting surface, ensuring proper alignment with the marked position. Verify the clamp size matches the pipe diameter.",
          "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
          "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp#step-3"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Fastening",
          "text": "Secure the clamp using appropriate fasteners (screws or nails) until the clamp is firmly attached to the mounting surface. Ensure the clamp is flush and secure.",
          "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
          "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp#step-4"
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Verification",
          "text": "Check that the pipe sits securely in the clamp without being compressed, ensuring proper movement allowance for thermal expansion. Verify the installation is stable.",
          "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
          "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp#step-5"
        }
      ]
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(GOLDEN_METAL_CLAMP_HOWTO_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(GOLDEN_METAL_CLAMP_ITEMLIST_SCHEMA)) {
      this.addJsonLd(this.transferState.get(GOLDEN_METAL_CLAMP_ITEMLIST_SCHEMA, ''));
      return;
    }

    const allSizes = [...this.productSizes1MM, ...this.productSizes1_5MM];
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Golden Clamp | GI Clamp | Golden Metal Clamp Sizes - Available Variants",
      "description": "Complete range of Golden Clamps, GI Clamps, Golden Metal Clamps, Metal Clamps, and GI CPVC Clamps available in 1MM and 1.5MM thicknesses from 1/2 inch to 4 inch. Gold plated clamps for all pipe diameters.",
      "numberOfItems": allSizes.length,
      "itemListElement": allSizes.map((size, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": `${size.sizeInch} Inch Golden Metal Clamp / GI CPVC Clamp`,
          "description": `Premium ${size.sizeInch} Inch (${size.size} mm) Golden Clamp, GI Clamp, or Golden Metal Clamp. Perfect for ${size.size} mm OD pipes. Available in both 1MM and 1.5MM thicknesses.`,
          "sku": size.sku,
          "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "countryOfOrigin": {
            "@type": "Country",
            "name": "India"
          },
          "size": `${size.sizeInch} Inch`,
          "material": ["Carbon Steel", "Gold Plating", "Galvanized Iron"],
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
    this.transferState.set(GOLDEN_METAL_CLAMP_ITEMLIST_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(GOLDEN_METAL_CLAMP_WEBPAGE_SCHEMA)) {
      this.addJsonLd(this.transferState.get(GOLDEN_METAL_CLAMP_WEBPAGE_SCHEMA, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/golden-metal-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp",
      "name": "Golden Clamp | GI Clamp | Golden Metal Clamp | Metal Clamp | GI CPVC Clamp | Gold Plated Clamp Manufacturer",
      "description": "India's #1 Manufacturer of Golden Clamps, GI Clamps, Golden Metal Clamps, Metal Clamps, GI CPVC Clamps & Gold Plated Clamps. Premium Golden Clamps with superior finish. ISO Certified.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of Golden Clamps, GI Clamps, Metal Clamps, and pipe support systems in India",
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
        "url": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
        "width": "1200",
        "height": "800",
        "caption": "Golden Metal Clamp - Premium GI CPVC Clamp by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(GOLDEN_METAL_CLAMP_WEBPAGE_SCHEMA, schemaString);
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


