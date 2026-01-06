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

@Component({
  selector: 'app-silver-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './silver-metal-clamp.component.html',
  styleUrl: './silver-metal-clamp.component.scss'
})
export class SilverMetalClampComponent implements OnInit, AfterViewInit {
  showEnquiryForm: boolean = false;
  activeFaqIndex: number | null = null;
  
  features = [
    {
      icon: 'shield-alt',
      title: 'Premium Corrosion Resistance',
      description: 'Advanced silver plating offers superior protection against rust and environmental wear, outlasting standard galvanized coatings.'
    },
    {
      icon: 'gem',
      title: 'Elegant Aesthetic Finish',
      description: 'High-gloss silver finish provides a sophisticated look ideal for visible installations in modern architectural and commercial spaces.'
    },
    {
      icon: 'layer-group',
      title: 'Multi-Layer Protection',
      description: 'Engineered with a triple-layer coating system: base metal treatment, primer, and high-grade silver finish for maximum durability.'
    },
    {
      icon: 'temperature-high',
      title: 'Thermal Stability',
      description: 'Maintains structural integrity and finish quality across a wide temperature range (-20°C to 110°C), preventing discoloration.'
    },
    {
      icon: 'compress-arrows-alt',
      title: 'Precision Fit',
      description: 'Manufactured to strict tolerances ensuring a secure grip on pipes while minimizing surface damage to the installation material.'
    },
    {
      icon: 'check-circle',
      title: 'Certified Quality',
      description: 'ISI marked and ISO 9001:2015 certified production ensures consistency and reliability in every clamp we manufacture.'
    }
  ];

  applications = [
    {
      icon: 'building',
      title: 'Commercial Complexes',
      description: 'Ideal for malls, hotels, and office buildings where exposed piping requires a clean, professional appearance.'
    },
    {
      icon: 'flask',
      title: 'Pharmaceutical Plants',
      description: 'Clean, smooth surface finish meets the hygiene and aesthetic standards required in pharma and lab environments.'
    },
    {
      icon: 'home',
      title: 'Luxury Residences',
      description: 'Enhances the look of utility areas in high-end homes, matching premium plumbing and electrical fixtures.'
    },
    {
      icon: 'industry',
      title: 'Showroom Industries',
      description: 'Perfect for manufacturing facilities that host client visits, maintaining a tidy and world-class industrial look.'
    }
  ];

  specifications = [
    { label: 'Base Material', value: 'High-grade carbon steel with premium silver plating' },
    { label: 'Plating Thickness', value: '10-20 microns (industrial grade)' },
    { label: 'Sizes Available', value: '15mm to 150mm diameter' },
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
      answer: 'Silver Metal Clamps offer a superior aesthetic finish and smoother surface compared to standard GI (Galvanized Iron) clamps. While both offer corrosion resistance, silver clamps are specifically designed for applications where looks matter, providing a brighter, cleaner appearance that resists dulling over time.'
    },
    {
      question: 'Can these clamps be used for outdoor plumbing?',
      answer: 'Yes, our Silver Metal Clamps are treated for weather resistance. However, for extreme coastal or highly corrosive industrial environments, we recommend our Stainless Steel (SS) range. For general outdoor use in standard conditions, silver clamps perform excellently.'
    },
    {
      question: 'Do you offer custom sizes for special projects?',
      answer: 'Absolutely. As a direct manufacturer, JK Industries can produce "Edler" brand silver metal clamps in custom sizes, widths, and thicknesses to match your specific project requirements. Minimum order quantities may apply for custom dies.'
    },
    {
      question: 'How do I maintain the shine of these clamps?',
      answer: 'Our silver clamps are maintenance-free for the most part. In dusty environments, a simple wipe with a dry or slightly damp cloth is enough to restore their original shine. Avoid using harsh acidic cleaners.'
    },
    {
      question: 'Is the "Edler" brand your own manufacturing?',
      answer: 'Yes, "Edler" is the premium brand of JK Industries. All Edler clamps are manufactured in our state-of-the-art facility in Rajkot, Gujarat, ensuring direct-from-factory pricing and quality control.'
    }
  ];

  testimonials = [
    {
      name: 'Rajesh Patel',
      role: '',
      content: 'We used JK Industries\' silver metal clamps for a luxury hotel project. The finish is outstanding and adds a real touch of class to the exposed HVAC lines. The client was very impressed with the attention to detail.'
    },
    {
      name: 'Amitabh Verma',
      role: '',
      content: 'Finding hardware that looks good is always a challenge. These silver clamps blend perfectly with modern industrial interior themes. Strong, durable, and good looking.'
    },
    {
      name: 'Suresh Reddy',
      role: '',
      content: 'Consistent quality and timely delivery. We shifted from local unbranded clamps to Edler silver clamps and the difference in site finishing is visible. Highly recommended.'
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
    this.titleService.setTitle('Silver Metal Clamp | Premium GI Pipe Clamp Manufacturer - JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'Premium Silver Metal Clamps by JK Industries. Superior finish, high corrosion resistance, and elegant look for modern piping. Manufacturer of Edler Brand clamps in Rajkot.' },
      { name: 'keywords', content: 'silver metal clamp, Metal clamp, GI pipe clamp, GI metal clamp, silver clamp, silver plated clamp, decorative pipe clamp, premium pipe fasteners, JK Industries clamp, edler clamp' },
      { name: 'author', content: 'JK Industries' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/silver-metal-clamp' },
      // Location Tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.255928;70.782660' },
      { name: 'ICBM', content: '22.255928, 70.782660' },

      // Open Graph
      { property: 'og:title', content: 'Silver Metal Clamp | Premium GI Pipe Clamp Manufacturer' },
      { property: 'og:description', content: 'Discover JK Industries\' range of Silver Metal Clamps. Perfect for visible installations requiring a premium aesthetic and lasting durability.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/silver-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360005' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Silver Metal Clamp | Premium Pipe Support' },
      { name: 'twitter:description', content: 'High-quality Silver Metal Clamps for premium industrial and commercial use. Durable, stylish, and cost-effective.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' }
    ]);

    this.setProductStructuredData();
    this.setFaqStructuredData();
    this.setBreadcrumbStructuredData();
    this.setLocalBusinessStructuredData();
    
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
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  downloadBrochure() {
    alert('Thank you for your interest! Our product brochure will be available shortly. Our team will contact you with more information.');
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(SILVER_METAL_CLAMP_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SILVER_METAL_CLAMP_PRODUCT_SCHEMA, ''));
      return;
    }

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Silver Metal Clamp | Premium GI Pipe Clamp",
      "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
      "url": "https://jkindustriesrajkot.com/products/silver-metal-clamp",
      "description": "JK Industries manufactures premium Silver Metal Clamps (Edler Brand) with a high-gloss silver finish for superior aesthetics and corrosion resistance. Ideal for visible piping in commercial and luxury residential projects.",
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
      "sku": "SLV-CL-001",
      "mpn": "JK-SLV-001",
      "category": "Metal Clamp, Clips, Clamps",
      "material": ["Carbon Steel", "Silver Plating"],
      "offers": {
        "@type": "Offer",
        "url": "https://jkindustriesrajkot.com/products/silver-metal-clamp",
        "priceCurrency": "INR",
        "price": "4.00",
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
        },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "22.25592817810921",
            "longitude": "70.78266007450131"
          },
          "geoRadius": "2000"
        },
        "deliveryLeadTime": {
          "@type": "QuantitativeValue",
          "minValue": "2",
          "maxValue": "7",
          "unitCode": "DAY"
        },
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "125",
        "reviewCount": "95"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": t.name },
        "reviewBody": t.content,
        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "Industrial Pipes" },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Type", "value": "Silver Metal Clamp" },
        { "@type": "PropertyValue", "name": "Material", "value": "Carbon Steel" },
        { "@type": "PropertyValue", "name": "Finish", "value": "Silver Plated" }
      ]
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
      "image": "https://jkindustriesrajkot.com/assets/img/logo.png",
      "telephone": "+91 9979032430",
      "email": "jkindustries1955@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
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
          "name": "Silver Metal Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for Silver Metal Clamps",
          "telephone": "+91 9979032430"
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

  private addJsonLd(schema: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = schema;
    this.document.head.appendChild(script);
  }
}
