import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';

const SPRINKLER_CLAMP_PRODUCT_SCHEMA = makeStateKey<string>('sprinkler_clamp_product_schema');
const SPRINKLER_CLAMP_FAQ_SCHEMA = makeStateKey<string>('sprinkler_clamp_faq_schema');
const SPRINKLER_CLAMP_BREADCRUMB_SCHEMA = makeStateKey<string>('sprinkler_clamp_breadcrumb_schema');
const SPRINKLER_CLAMP_BUSINESS_SCHEMA = makeStateKey<string>('sprinkler_clamp_business_schema');

@Component({
  selector: 'app-sprinkler-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      question: 'Are your sprinkler clamps UL/FM approved?',
      answer: 'Our sprinkler clamps are manufactured in strict accordance with UL and FM standards and NFPA 13 guidelines. We use certified materials and rigorous testing to ensure they meet high-safety requirements for fire protection systems.'
    },
    {
      question: 'What is the difference between Clevis Hangers and Sprinkler Clamps?',
      answer: 'Clevis hangers allow for some vertical adjustment and pipe movement, ideal for effective gravity drainage. Sprinkler clamps (like pear clamps or loop hangers) are specifically designed for securing fire lines. We manufacture both types to suit your specific system design.'
    },
    {
      question: 'Can these clamps be used for PVC/CPVC fire pipes?',
      answer: 'Yes, but for plastic pipes (CPVC), we recommend our specific rubber-lined or flared-edge clamps to effectively support the pipe without damaging the surface. Standard metal clamps are best for Steel/GI pipes.'
    },
    {
      question: 'Do you provide the threaded rods and mounting hardware?',
      answer: 'Yes, we can supply the complete assembly including threaded rods, beam clamps, and anchor fasteners as a complete kit. Please specify your mounting surface (concrete/beam) when enquiring.'
    },
    {
      question: 'What finish is best for outdoor irrigation systems?',
      answer: 'For outdoor or humid environments, we highly recommend our Hot-Dip Galvanized (HDG) finish or Stainless Steel options, as they offer far superior corrosion resistance compared to standard electro-galvanized or painted clamps.'
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
    this.titleService.setTitle('Sprinkler Clamp | Fire Sprinkler Pipe Clamp Manufacturer - JK Industries');

    this.meta.addTags([
      { name: 'description', content: 'Premium Sprinkler Clamps & Fire Sprinkler Hangers by JK Industries. NFPA compliant, Heavy Duty support for Fire Protection & Irrigation systems. Manufacturer price.' },
      { name: 'keywords', content: 'sprinkler clamp, sprinkler metal clamp, Metal clamp, fire sprinkler clamp, irrigation sprinkler clamp, sprinkler hangers, clevis hanger, fire pipe support, adjustable sprinkler clamp, pear clamp, loop hanger, fire protection hardware, sprinkler system clamps' },
      { name: 'author', content: 'JK Industries' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/sprinkler-clamp' },
      
      // Location Tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },

      // Open Graph
      { property: 'og:title', content: 'Sprinkler Clamp | Fire Protection Pipe Support Systems' },
      { property: 'og:description', content: 'Heavy Duty Sprinkler Clamps for Fire Safety & Irrigation. NFPA compliant, Red Powder Coated or Galvanized. Manufactured by JK Industries.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/sprinkler-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:country-name', content: 'India' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Fire Sprinkler Clamps | JK Industries' },
      { name: 'twitter:description', content: 'Reliable support for fire protection systems. Buy direct from manufacturer.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg' }
    ]);

    this.setProductStructuredData();
    this.setFaqStructuredData();
    this.setBreadcrumbStructuredData();
    this.setLocalBusinessStructuredData();

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

  private setProductStructuredData() {
    if (this.transferState.hasKey(SPRINKLER_CLAMP_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SPRINKLER_CLAMP_PRODUCT_SCHEMA, ''));
      return;
    }

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Sprinkler Clamp | Fire Protection Pipe Hanger",
      "image": "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg",
      "url": "https://jkindustriesrajkot.com/products/sprinkler-clamp",
      "description": "Heavy-duty Sprinkler Clamps and Hangers by JK Industries. Designed for fire protection systems and irrigation support. NFPA compliant, high load capacity.",
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
          "postalCode": "360004",
          "addressCountry": "IN"
        }
      },
      "sku": "SPR-CL-001",
      "mpn": "JK-SPR-001",
      "alternateName": "Sprinkler Clamp, Fire Sprinkler Clamp, Fire Sprinkler Hanger, Fire Sprinkler Pipe Clamp, Fire Sprinkler Pipe Hanger",
      "category": "Metal Clamp, Fire Safety Hardware",
      "material": ["Carbon Steel", "Red Epoxy Coating", "Galvanized"],
      "price": "4.00",
      "offers": {
        "@type": "Offer",
        "url": "https://jkindustriesrajkot.com/products/sprinkler-clamp",
        "priceCurrency": "INR",
        "price": "4.00",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "JK Industries"
        },
        "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "unitCode": "FTK",
            "value": "1"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "140",
        "reviewCount": "120",
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": t.name },
        "reviewBody": t.content,
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
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
        { "@type": "PropertyValue", "name": "Type", "value": "Sprinkler Clamp" },
        { "@type": "PropertyValue", "name": "Material", "value": "Galvanized Steel, Stainless Steel, Powder-Coated Steel" },
        { "@type": "PropertyValue", "name": "Finish", "value": "Hot-Dip Galvanized or Red Powder Coated" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "1\" (25mm) to 8\" (200mm) Pipe Diameters" },
        { "@type": "PropertyValue", "name": "Load Capacity", "value": "Up to 100-200 kg (Depending on Size)" },
        { "@type": "PropertyValue", "name": "Mounting Options", "value": "Beam Flange, Concrete, Wall, Ceiling" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, NFPA 13 Compliant" },
        { "@type": "PropertyValue", "name": "Size Range (Extended)", "value": "1/2\" (15mm) to 12\" (300mm) NB Pipes" },
        { "@type": "PropertyValue", "name": "Compliance Standards", "value": "NFPA 13, UL Listed Standards, FM Approved Standards" },
        { "@type": "PropertyValue", "name": "Load Rating (Heavy Duty)", "value": "Up to 1500 lbs (Depending on size and type)" },
        { "@type": "PropertyValue", "name": "Thickness", "value": "1.5mm to 6mm (Heavy Duty Options Available)" },
        { "@type": "PropertyValue", "name": "Rod Size", "value": "M8, M10, M12, M16 Threaded Rod Compatibility" },
        { "@type": "PropertyValue", "name": "Temperature Rating", "value": "Rated for up to 600°F (315°C)" },
        { "@type": "PropertyValue", "name": "Application", "value": "Fire Sprinkler Lines, Chilled Water Lines, Irrigation" }
      ]
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
          "description": "Specialized unit for Fire Sprinkler Clamps",
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

  private addJsonLd(schema: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = schema;
    this.document.head.appendChild(script);
  }
}

