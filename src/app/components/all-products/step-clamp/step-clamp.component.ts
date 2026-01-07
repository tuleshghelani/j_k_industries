import { Component, OnInit, inject, PLATFORM_ID, Inject, TransferState, makeStateKey } from '@angular/core';
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

@Component({
  selector: 'app-step-clamp',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './step-clamp.component.html',
  styleUrl: './step-clamp.component.scss'
})
export class StepClampComponent implements OnInit {
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
      answer: 'A step clamp is a specialized metal clamp featuring a stepped internal design that allows it to accommodate multiple pipe diameters. Unlike proper standard clamps that fit only one size, a single step clamp can securely hold 2-3 different pipe sizes. This versatility makes it a superior choice for projects with varied piping needs.'
    },
    {
      question: 'Where can I buy Step Clamps and Metal Clamps in India?',
      answer: 'JK Industries is a premier manufacturer of Step Clamps and Metal Clamps in India. You can buy directly from our factory in Rajkot, Gujarat. We supply high-quality step clamps to major industrial hubs across India with competitive pricing and fast delivery.'
    },
    {
      question: 'Can step clamps handle high loads like standard heavy-duty clamps?',
      answer: 'Yes, our step clamps are engineered for high load-bearing capacity. The stepped design is structurally reinforced to ensure that it provides secure support comparable to traditional heavy-duty metal clamps, making them suitable for industrial piping and hydraulic systems.'
    },
    {
      question: 'Do you offer stainless steel step clamps?',
      answer: 'Yes, we manufacture step clamps in high-grade Stainless Steel (SS304/SS316) for corrosion resistance, as well as Carbon Steel and Galvanized Steel for general industrial use. We can recommend the best material based on your specific application environment.'
    },
    {
      question: 'Are these clamps suitable for vibrating machinery?',
      answer: 'Absolutely. The precision-engineered steps coupled with our robust fastening mechanism provide excellent grip and vibration dampening properties, making them ideal for hydraulic lines and machinery susceptible to vibration.'
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
    alert('Thank you for your enquiry. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = { name: '', email: '', phone: '', company: '', quantity: null, message: '' };
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  downloadBrochure() {    
    alert('Our technical datasheet will be available for download soon!');
  }

  private updateSeo() {
    this.titleService.setTitle('Step Clamp | Metal Clamp | Multi-Size Pipe Clamp Manufacturer India | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Step Clamp & Metal Clamp Manufacturer. Innovative Multi-Size Pipe Clamps for Industrial & Construction use. Save Inventory. Buy Direct from Factory in Rajkot.' },
      { name: 'keywords', content: 'step clamp, metal clamp, step clamp India, step pipe clamp, multi-size clamp, metal pipe clamp, step clamp manufacturer, stepped pipe clamp, industrial pipe clamp, JK Industries step clamp, metal clamp manufacturer India' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/step-clamp' },
      
      // Location Tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },

      // Open Graph
      { property: 'og:title', content: 'Step Clamp | Metal Clamp | Multi-Size Pipe Clamp Manufacturer' },
      { property: 'og:description', content: 'Premium Step Clamps & Metal Clamps by JK Industries. Versatile multi-size pipe mounting solutions. Buy direct from manufacturer.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/step-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Step Clamp | Metal Clamp | Industrial Pipe Supports' },
      { name: 'twitter:description', content: 'Innovative Step Clamps for multiple pipe sizes. Premium Metal Clamps manufacturer in India.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/step-clamp.jpg' }
    ]);
  }

  private setProductStructuredData() {
    if (isPlatformBrowser(this.platformId)) {
      const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "category": "Metal Clamp, Clips, Clamps",
        "name": "Step Clamp | Metal Clamp | Multi-Size Pipe Clamp",
        "image": "https://jkindustriesrajkot.com/assets/products/step-clamp.jpg",
        "url": "https://jkindustriesrajkot.com/products/step-clamp",
        "description": "JK Industries manufactures premium Step Clamps and Metal Clamps. Our innovative stepped design allows a single clamp to hold multiple pipe sizes, offering versatility and cost savings for industrial piping.",
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
        "alternateName": "Step Clamp, Metal Clamp, Multi-Size Pipe Clamp, Stepped Pipe Clamp, Industrial Metal Clamp, Variable Size Clamp",
        "sku": "STP-CL-001",
        "mpn": "JK-STP-CL-001",
        "material": "Galvanized Steel / Stainless Steel",
        "color": "Silver / Grey",
        "offers": {
          "@type": "Offer",
          "url": "https://jkindustriesrajkot.com/products/step-clamp",
          "priceCurrency": "INR",
          "price": "1.00",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "22.25592000",
              "longitude": "70.78272000"
            },
            "geoRadius": "5000"
          },
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "unitCode": "FTK",
            "value": "1"
          },
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": "2",
            "maxValue": "7",
            "unitCode": "DAY"
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
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
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
          { "@type": "PropertyValue", "name": "Type", "value": "Step Clamp / Metal Clamp" },
          { "@type": "PropertyValue", "name": "Application", "value": "Industrial, Construction, Hydraulic" },
          { "@type": "PropertyValue", "name": "Feature", "value": "Multi-Size Compatibility" },
          { "@type": "PropertyValue", "name": "Material Options", "value": "Galvanized Steel, Stainless Steel (304/316), Carbon Steel" },
          { "@type": "PropertyValue", "name": "Step Size Ranges", "value": "75mm, 110mm (Custom Sizes Available)" },
          { "@type": "PropertyValue", "name": "Surface Finish", "value": "Hot-Dip Galvanized, Electro-Galvanized, Polished" },
          { "@type": "PropertyValue", "name": "Temperature Range", "value": "-30°C to 120°C (Standard), Up to 550°C (High-Temp)" },
          { "@type": "PropertyValue", "name": "Load Capacity", "value": "30-50 kg (Size Dependent)" },
          { "@type": "PropertyValue", "name": "Mounting Options", "value": "Wall Mount, Channel Mount, Strut Mount" },
          { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, CE Compliant" },
          { "@type": "PropertyValue", "name": "Application Standards", "value": "DIN 3015, EN 10242" }
        ]
      };

      this.transferState.set(STEP_CLAMP_PRODUCT_SCHEMA, JSON.stringify(schema));
      
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      this.document.head.appendChild(script);
    }
  }

  private setBusinessStructuredData() {
    const businessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "JK Industries",
      "image": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "telephone": "+91 9979032430",
      "email": "jkindustries1955@gmail.com",
      "url": "https://jkindustriesrajkot.com",
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
          "name": "Metal Clamp Manufacturing Unit",
          "description": "Manufacturing unit for Premium Step Clamps and Metal Clamps",
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
        "https://www.facebook.com/jkindustriesrajkot",
        "https://www.linkedin.com/company/jk-industries-rajkot"
      ]
    };

    this.transferState.set(STEP_CLAMP_BUSINESS_SCHEMA, JSON.stringify(businessData));

    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(businessData);
      this.document.head.appendChild(script);
    }
  }

  private setFaqStructuredData() {
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

    this.transferState.set(STEP_CLAMP_FAQ_SCHEMA, JSON.stringify(faqData));

    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqData);
      this.document.head.appendChild(script);
    }
  }

  private setBreadcrumbStructuredData() {
    if (isPlatformBrowser(this.platformId)) {
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
            "name": "Step Clamp | Metal Clamp | Multi-Size Clamp",
            "item": "https://jkindustriesrajkot.com/products/step-clamp"
          }
        ]
      };

      this.transferState.set(STEP_CLAMP_BREADCRUMB_SCHEMA, JSON.stringify(breadcrumbSchema));

      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(breadcrumbSchema);
      this.document.head.appendChild(script);
    }
  }
}
