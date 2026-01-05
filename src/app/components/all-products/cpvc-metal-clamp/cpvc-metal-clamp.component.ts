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
      company: "Gujarat Chemical Works"
    },
    {
      quote: "We've installed these CPVC powder coated metal clamps in multiple hot water systems for commercial buildings. They've consistently outperformed other supports, especially in preventing pipe damage from thermal expansion.",
      author: "Vikram Patel",
      position: "Senior Engineer",
      company: "Patel Constructions"
    },
    {
      quote: "The CPVC metal clamps from JK Industries are perfect for our pharmaceutical manufacturing facility. Their chemical resistance and precision manufacturing meet our strict quality standards.",
      author: "Dr. Meena Iyer",
      position: "Plant Director",
      company: "PharmaChem Industries"
    },
    {
      quote: "Outstanding quality and durability! These CPVC clamps have been performing flawlessly in our water treatment plant for over 3 years. Highly recommended for industrial applications.",
      author: "Amit Desai",
      position: "Maintenance Head",
      company: "Aqua Treatment Solutions"
    }
  ];

  // FAQs for dynamic FAQ schema
  faqs: FAQ[] = [
    {
      question: "What makes CPVC powder coated metal clamps better than standard plastic clips?",
      answer: "CPVC powder coated metal clamps combine the strength of metal with specialized CRC / MS coating that protects CPVC pipes. Unlike standard plastic clips, they provide superior load-bearing capacity, better chemical resistance, higher temperature tolerance (up to 93°C), and longer service life. The powder coating adds an extra layer of corrosion protection, making them ideal for demanding industrial environments."
    },
    {
      question: "Are your CPVC powder coated clamps suitable for hot water systems?",
      answer: "Yes, our CPVC powder coated metal clamps are specifically designed for hot water systems. They can withstand continuous temperatures up to 93°C (200°F), making them ideal for hot water distribution lines in residential, commercial, and industrial applications. The specialized CRC / MS construction accommodates thermal expansion while maintaining secure support of the piping system."
    },
    {
      question: "Do you offer custom sizes for CPVC powder coated pipe clamps?",
      answer: "Yes, we manufacture custom-sized CPVC powder coated metal clamps according to specific requirements. Our engineering team can design and produce clamps for non-standard pipe diameters, special mounting requirements, or unique configurations. Please contact our sales team with your specifications for a custom quote and production timeline."
    },
    {
      question: "Are these powder coated clamps resistant to chemicals and corrosive environments?",
      answer: "Yes, our CPVC powder coated metal clamps feature specialized CRC / MS coating that provides excellent chemical resistance, complementing the inherent chemical resistance of CPVC pipes. The metal components are treated to resist corrosion, making these clamps suitable for chemical processing plants, water treatment facilities, and other environments with exposure to acids, bases, and corrosive agents."
    },
    {
      question: "What is the minimum order quantity for CPVC powder coated metal clamps?",
      answer: "Our standard minimum order quantity is 10000 pieces for stock sizes. However, we understand that different projects have different requirements, so we're flexible with order quantities. For custom sizes or specifications, minimum order quantities may vary. Please contact our sales team for specific information about your project needs."
    }
  ];

  expandedFaqs: boolean[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta,
    private titleService: Title,
    private transferState: TransferState
  ) {
    this.expandedFaqs = new Array(this.faqs.length).fill(false);
  }

  ngOnInit() {
    // Set SEO Meta Tags - Optimized for CPVC Clamp, Metal Clamp keywords
    this.titleService.setTitle('CPVC Metal Clamp Manufacturer | CPVC Powder Coated Clamps | Edler Clamp');
    
    this.meta.addTags([
      { name: 'description', content: 'Premium CPVC metal clamps & CPVC powder coated metal clamps by JK Industries (Edler Clamp). Hot water resistant, chemical-proof pipe supports. Leading CPVC clamp manufacturer in India.' },
      { name: 'keywords', content: 'CPVC Clamp, Metal Clamp, CPVC Metal Clamp, CPVC Powder Coated Metal Clamp, CPVC pipe clamp, hot water pipe clamp, chemical resistant clamp, CPVC pipe support, Edler Clamp, JK Industries Rajkot' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/cpvc-metal-clamp' },
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592817810921;70.78266007450131' },
      { name: 'ICBM', content: '22.25592817810921, 70.78266007450131' },
      { property: 'og:title', content: 'CPVC Metal Clamp Manufacturer | CPVC Powder Coated Clamps | Edler Clamp' },
      { property: 'og:description', content: 'Premium CPVC metal clamps for hot water systems & chemical applications. Superior temperature resistance up to 93°C. Manufactured by JK Industries.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/cpvc-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360005' },
      { property: 'og:country-name', content: 'India' },
      // Twitter Card tags - Enhances visibility on Twitter platform
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'CPVC Metal Clamp | CPVC Powder Coated Clamps | Edler Clamp' },
      { name: 'twitter:description', content: 'Premium CPVC metal clamps for hot water & chemical applications. JK Industries - Leading manufacturer in India.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg' }
    ]);

    // Add structured data only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.addProductSchema();
      this.setBusinessStructuredData();
      this.setFaqStructuredData();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-in-out',
        offset: 100
      });
    }
  }

  ngOnDestroy() {
    // Re-enable scrolling if modal was open
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'auto';
    }
  }

  toggleFaq(index: number) {
    this.expandedFaqs[index] = !this.expandedFaqs[index];
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
    alert('Thank you for your enquiry. We will contact you shortly.');
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
    alert('Our brochure will be available for download soon! Stay tuned for updates.');
  }

  private addProductSchema() {
    if (!isPlatformBrowser(this.platformId)) return;

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "Clips, Clamps",
      "name": "CPVC Powder Coated Metal Clamp",
      "url": "https://jkindustriesrajkot.com/products/cpvc-metal-clamp",
      "image": "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
      "description": "Established in 2010 at Rajkot (Gujarat, India), JK Industries under the brand Edler Clamp is a premier manufacturer specializing in CPVC and UPVC Metal Clamps. Our CPVC metal clamps offer superior temperature resistance up to 93°C, chemical compatibility, and durability for hot water systems and industrial applications.",
      "sku": "CPVC-CLAMP-001",
      "mpn": "JK-CPVC-CL-001",
      "brand": {
        "@type": "Brand",
        "name": "Edler Clamp"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "JK Industries",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "postalCode": "360005",
          "addressCountry": "IN"
        }
      },
      "alternateName": "CPVC Clamp, Metal Clamp, CPVC Metal Clamp, CPVC Pipe Clamp, CPVC powder coated metal clamp, hot water pipe clamp, chemical resistant clamp",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "INR",
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
        "price": "1.5"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "156",
        "reviewCount": "98"
      },
      "review": this.testimonials.map(testimonial => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": testimonial.author
        },
        "reviewBody": testimonial.quote
      })),
      "isAccessoryOrSparePartFor": {
        "@type": "Product",
        "name": "CPVC/UPVC Piping System"
      },
      "material": "CRC - MS, Powder Coating",
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
        {
          "@type": "PropertyValue",
          "name": "Temperature Range",
          "value": "-10°C to 93°C"
        },
        {
          "@type": "PropertyValue",
          "name": "Pressure Rating",
          "value": "Up to 25 bar"
        },
        {
          "@type": "PropertyValue",
          "name": "Coating",
          "value": "Premium Powder Coating (60-80 microns)"
        },
        {
          "@type": "PropertyValue",
          "name": "Certification",
          "value": "ISO 9001:2015, NSF/ANSI 14 Compliant"
        },
        {
          "@type": "PropertyValue",
          "name": "Product Type",
          "value": "METAL"
        },
        {
          "@type": "PropertyValue",
          "name": "Shape",
          "value": "U"
        },
        {
          "@type": "PropertyValue",
          "name": "Delivery Time",
          "value": "7 Days"
        },
        {
          "@type": "PropertyValue",
          "name": "Color",
          "value": "Multiple Colors Available"
        },
        {
          "@type": "PropertyValue",
          "name": "Chemical Resistance",
          "value": "Excellent - Acids, Bases, Chlorinated Water"
        }
      ]
    };

    
    // Store the structured data in transfer state
    this.transferState.set(PRODUCT_SCHEMA_KEY, JSON.stringify(schema));
    
    // Only add script tag in browser environment
    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      this.document.head.appendChild(script);
    }
  }

  private setBusinessStructuredData(): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "JK Industries",
      "image": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "url": "https://jkindustriesrajkot.com",
      "telephone": "+91 9979032430",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road, Rajkot, Gujarat 360005",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360005",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.25592817810921",
        "longitude": "70.78266007450131"
      },
      "department": [
        {
          "@type": "LocalBusiness",
          "name": "CPVC Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for CPVC powder coated metal clamps",
          "telephone": "+91 9979032430"
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

    this.transferState.set(BUSINESS_SCHEMA_KEY, JSON.stringify(structuredData));

    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      this.document.head.appendChild(script);
    }
  }

  private setFaqStructuredData(): void {
    const FAQ_SCHEMA_KEY = makeStateKey<string>('cpvc_faq_schema');
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

    this.transferState.set(FAQ_SCHEMA_KEY, JSON.stringify(faqStructuredData));

    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqStructuredData);
      this.document.head.appendChild(script);
    }
  }
}
