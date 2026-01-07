import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';

const GOLDEN_METAL_CLAMP_PRODUCT_SCHEMA = makeStateKey<string>('golden_metal_clamp_product_schema');
const GOLDEN_METAL_CLAMP_FAQ_SCHEMA = makeStateKey<string>('golden_metal_clamp_faq_schema');
const GOLDEN_METAL_CLAMP_BREADCRUMB_SCHEMA = makeStateKey<string>('golden_metal_clamp_breadcrumb_schema');
const GOLDEN_METAL_CLAMP_BUSINESS_SCHEMA = makeStateKey<string>('golden_metal_clamp_business_schema');

@Component({
  selector: 'app-golden-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      icon: 'shield-alt',
      title: 'Premium Gold Plating',
      description: 'High-quality electroplated gold finish provides superior corrosion resistance while adding a luxurious aesthetic to visible piping installations.'
    },
    {
      icon: 'gem',
      title: 'Luxury Aesthetic',
      description: 'Designed for high-end interiors, these clamps feature a mirror-polished golden finish that perfectly complements premium brass and copper fixtures.'
    },
    {
      icon: 'cogs',
      title: 'Precision Engineering',
      description: 'Manufactured with high-grade carbon steel and precise dimensions to ensure a secure fit and reliable support for all pipe types.'
    },
    {
      icon: 'tint',
      title: 'Moisture Resistance',
      description: 'Advanced plating technology ensures excellent protection against humidity and tarnish, maintaining the golden shine for years.'
    },
    {
      icon: 'check-double',
      title: 'Easy Installation',
      description: 'Engineered for quick and hassle-free installation with standard mounting hardware, reducing labor time on premium projects.'
    },
    {
      icon: 'certificate',
      title: 'Certified Quality',
      description: 'JK Industries ensures strict quality control with ISO 9001:2015 certification, guaranteeing consistency and durability in every piece.'
    }
  ];

  applications = [
    {
      title: 'Luxury Residential',
      description: 'Ideal for exposed plumbing in high-end bathrooms, kitchens, and living spaces where aesthetics are paramount.',
      image: 'assets/products/golden-metal-clamp.jpg'
    },
    {
      title: 'Hotels & Hospitality',
      description: 'Perfect for 5-star hotels, resorts, and spas requiring elegant details and superior finish in visible infrastructure.',
      image: 'assets/products/golden-metal-clamp.jpg'
    },
    {
      title: 'Commercial Interactions',
      description: 'Enhances the visual appeal of showrooms, boutiques, and corporate offices with exposed ceiling or wall piping.',
      image: 'assets/products/golden-metal-clamp.jpg'
    },
    {
      title: 'Architectural Projects',
      description: 'A favorite choice for architects and interior designers creating industrial-chic or luxury modern designs.',
      image: 'assets/products/golden-metal-clamp.jpg'
    },
    {
      title: 'Decorative Plumbing',
      description: 'Essential for decorative piping systems where ordinary industrial clamps would detract from the overall design.',
      image: 'assets/products/golden-metal-clamp.jpg'
    },
    {
      title: 'Heritage Renovation',
      description: 'Suitable for restoring or upgrading plumbing in heritage buildings where classic aesthetics are required.',
      image: 'assets/products/golden-metal-clamp.jpg'
    }
  ];

  specifications = [
    { label: 'Base Material', value: 'Premium CRC / MS with Precision Machining' },
    { label: 'Gold Plating Type', value: 'Gold Electroplating with Protective Sealant' },
    { label: 'Sizes Available', value: '10mm, 15mm, 20mm, 25mm, 32mm Standard (Custom Sizes Available)' },
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
      content: 'We used JK Industries\' Golden Metal Clamps for a luxury villa project in Mumbai. The finish is unmatched, and they truly elevate the exposed piping look. Highly recommended!'
    },
    {
      name: 'Amit Patel',
      role: 'Construction Contractor',
      content: 'Best quality golden clamps in the market. The gold plating is durable and doesn\'t tarnish easily. Fast delivery from Rajkot to Bangalore.'
    },
    {
      name: 'Sarah Fernandez',
      role: 'Architect',
      content: 'Finding aesthetic pipe supports was a challenge until we found Edler brand golden clamps. They are perfect for our high-end hospitality projects.'
    }
  ];

  faqs = [
    {
      question: 'What is the base material of the Golden Metal Clamp?',
      answer: 'Our Golden Metal Clamps are manufactured from high-quality Carbon Steel (CRC) and then finished with premium gold electroplating for exceptional strength and aesthetics.'
    },
    {
      question: 'Will the gold finish tarnish over time?',
      answer: 'Our clamps feature high-micron gold plating with a protective lacquer coat to maximize resistance to tarnish and humidity. For indoor luxury applications, they maintain their shine for years.'
    },
    {
      question: 'Do you offer bulk wholesale pricing for golden clamps?',
      answer: 'Yes, as a manufacturer (JK Industries), we offer competitive wholesale pricing for bulk orders. Contact us directly for a quote on "golden fasteners" and clamps.'
    },
    {
      question: 'Can I use these clamps for outdoor installation?',
      answer: 'While they are corrosion-resistant, we recommend these primarily for indoor luxury applications to preserve the premium gold finish. For harsh outdoor environments, our SS304 clamps might be more suitable.'
    },
    {
      question: 'Are these clamps compatible with all pipe types?',
      answer: 'Yes, they are designed to fit standard CPVC, UPVC, and GI pipes of corresponding sizes. Please verify the outer diameter of your pipes when ordering.'
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
    this.titleService.setTitle('Golden Metal Clamp | Premium Gold Plated Pipe Clamps - JK Industries');

    this.meta.addTags([
      { name: 'description', content: 'Transform your piping with Premium Golden Metal Clamps by JK Industries. Gold plated, corrosion-resistant, and luxurious. Ideal for high-end interiors. Manufacturer of Edler Brand clamps. Rajkot, Gujarat, India.' },
      { name: 'keywords', content: 'golden clamp, golden metal clamp, Metal clamp, gold plated clamp, golden fasteners, gold plated pipe clamp, decorative metal clamp, luxury pipe support, gold clamp India, Edler clamp, JK Industries, golden pipe fasteners, gold finish clamps' },
      { name: 'author', content: 'JK Industries' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/golden-metal-clamp' },
      
      // Location Tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },

      // Open Graph
      { property: 'og:title', content: 'Golden Metal Clamp | Luxury Gold Plated Pipe Support' },
      { property: 'og:description', content: 'Premium Golden Metal Clamps for luxury interiors. Durable gold plating, rust-resistant, and elegant. Manufactured by JK Industries, Rajkot, Gujarat, India.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/golden-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:country-name', content: 'India' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Golden Metal Clamp | Premium Pipe Fasteners' },
      { name: 'twitter:description', content: 'Elevate your interiors with JK Industries\' Golden Metal Clamps. Superior finish and durability. Buy direct from manufacturer.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg' }
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
    alert('Thank you for your interest! Our product brochure will be available shortly. Our team will contact you with more information.');
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(GOLDEN_METAL_CLAMP_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(GOLDEN_METAL_CLAMP_PRODUCT_SCHEMA, ''));
      return;
    }

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Golden Metal Clamp | Premium Gold Plated Pipe Clamp",
      "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
      "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp",
      "description": "JK Industries manufactures premium Golden Metal Clamps (Edler Brand) with a high-quality gold plated finish for superior aesthetics and luxury interiors. Ideal for visible piping.",
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
      "sku": "GLD-CL-001",
      "mpn": "JK-GLD-001",
      "category": "Metal Clamp, Clips, Golden Fasteners",
      "material": ["Carbon Steel", "Gold Plating"],
      "offers": {
        "@type": "Offer",
        "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp",
        "priceCurrency": "INR",
        "price": "25.00",
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
        "ratingValue": "4.9",
        "reviewCount": "85"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": t.name },
        "reviewBody": t.content,
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      })),
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Finish", "value": "Gold Plated" },
         { "@type": "PropertyValue", "name": "Corrosion Resistance", "value": "Yes" },
         { "@type": "PropertyValue", "name": "Application", "value": "Luxury Interiors, Hotels, Showrooms" }
      ]
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
          "name": "Golden Metal Clamp",
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

  private addJsonLd(schema: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = schema;
    this.document.head.appendChild(script);
  }
}


