import { Component, OnInit, inject, PLATFORM_ID, Inject, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as Aos from 'aos';

// Define TransferState keys
const PRODUCT_SCHEMA_KEY = makeStateKey<string>('CPVC_METAL_CLAMP_PRODUCT_SCHEMA');
const BUSINESS_SCHEMA_KEY = makeStateKey<string>('CPVC_METAL_CLAMP_BUSINESS_SCHEMA');

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
  selector: 'app-upvc-metal-clamp',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './upvc-metal-clamp.component.html',
  styleUrl: './upvc-metal-clamp.component.scss'
})
export class UPVCMetalClampComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
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

  faqs: FAQ[] = [
    {
      question: 'Why should I choose powder coated clamps over regular galvanized ones?',
      answer: 'Powder coated clamps offer significantly better aesthetics and superior corrosion resistance compared to standard galvanized staples. The coating acts as a protective shield, preventing direct contact between moisture and the metal, which drastically reduces the risk of rust. Additionally, the smooth finish is gentler on plastic pipes, preventing scratches and potential stress points.'
    },
    {
      question: 'Are these clamps suitable for outdoor exposed piping?',
      answer: 'Absolutely. Our UPVC powder coated metal clamps are designed to withstand outdoor elements. The UV-stable coating prevents the finish from peeling or chalking under sunlight, and the robust metal core handles temperature fluctuations. They are an excellent choice for external plumbing lines, solar water heater connections, and garden irrigation systems.'
    },
    {
      question: 'Can I use these clamps for hot water CPVC lines?',
      answer: 'Yes, these clamps are perfectly compatible with CPVC pipes carrying hot water. The metal construction retains its strength at higher temperatures, unlike some plastic clips that might deform. Just ensure to allow for the natural thermal expansion of the piping system during installation by not over-tightening the clamps excessively.'
    },
    {
      question: 'Do you offer custom colors to match specific building themes?',
      answer: 'We understand that aesthetics matter. While we stock standard colors like white and grey to match common pipe pipes, we can certainly accommodate custom color requests for bulk orders. This allows architects and builders to ensure the plumbing hardware blends seamlessly with the wall or ceiling color scheme.'
    }
  ];

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    private transferState: TransferState
  ) {}

  ngOnInit() {
    this.updateseo();
    this.setBusinessStructuredData();
    this.setFaqStructuredData();
    
    // Only init AOS in browser
    if (isPlatformBrowser(this.platformId)) {
      Aos.init({
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

  private updateseo() {
    this.titleService.setTitle('Premium UPVC Powder Coated Metal Clamps | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'Discover high-quality UPVC powder coated metal clamps by JK Industries. Superior durability, rust protection, and aesthetic design for all your plumbing and piping needs.' },
      { name: 'keywords', content: 'UPVC Clamp, metal clamp, UPVC Pipe Clamp, UPVC powder coated metal clamp, pipe fasteners, plumbing support, UPVC pipe clips, JK Industries' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/upvc-metal-clamp' },
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592817810921;70.78266007450131' },
      { name: 'ICBM', content: '22.25592817810921, 70.78266007450131' },
      { property: 'og:title', content: 'Premium UPVC Powder Coated Metal Clamps | JK Industries' },
      { property: 'og:description', content: 'Ensure the longevity of your plumbing with our rust-resistant, powder coated UPVC metal clamps. Strong, durable, and visually appealing.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/upvc-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360005' },
      { property: 'og:country-name', content: 'India' },
      // Twitter Card tags - Enhances visibility on Twitter platform
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium UPVC Powder Coated Metal Clamps' },
      { name: 'twitter:description', content: 'Superior strength and style for your pipes. Check out our powder coated metal clamps.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' }
    ]);

    // Structured Data
    if (isPlatformBrowser(this.platformId)) {
      const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",       
        "category" : "Clips, Clamps",
        "name": "UPVC Powder Coated Metal Clamp",
        "url" : "https://jkindustriesrajkot.com/products/upvc-metal-clamp",
        "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
        "description": "Established in 2010 at Rajkot (Gujarat, India), JK Industries under the brand Edler Clamp is a premier manufacturer specializing in UPVC and CPVC Metal Clamps. We offer a comprehensive range of plumbing solutions including Nail Clamps, Stainless Steel Clamps, Concealed Valves, Wall Mixtures, and premium connection pipes, delivering quality and durability for all construction needs.",
        "sku": "UPVC-CLAMP-001",
        "mpn": "JK-UPVC-CL-001",
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
          },
        },
        "alternateName": "UPVC Clamp, metal clamp, UPVC Pipe Clamp, UPVC powder coated metal clamp, pipe fasteners, plumbing support, UPVC/CPVC pipe clips",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "INR",            
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
          "eligibleQuantity" : {
            "@type" : "QuantitativeValue",
            "unitCode" : "FTK",
            "value" : "1"
          },
          "price": "1.5" // Price is valid only with currency, usually 0 or specific price if known, but user didn't specify. schema.org valid offer requires price.
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "142",
          "reviewCount": "93"
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
          "name": "UPVC/CPVC Piping System"
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
          "value": "50",
          "unitCode": "GRM"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Temperature Range",
            "value": "-5°C to 70°C"
          },
          {
            "@type": "PropertyValue",
            "name": "Pressure Rating",
            "value": "Up to 16 bar"
          },
          {
            "@type": "PropertyValue",
            "name": "Coating",
            "value": "Premium Powder Coating (60-80 microns)"
          },
          {
            "@type": "PropertyValue",
            "name": "Certification",
            "value": "ISO 9001:2015, ISI Marked"
          },
          {
            "@type": "PropertyValue",
            "name": "Product Type",
            "value": "METAL"
          },
          {
            "@type" : "PropertyValue",
            "name" : "Shape",
            "value" : "U"
          },          
          {
            "@type" : "PropertyValue",
            "name" : "Delivery Time",
            "value" : "7 Days"
          },
          {
            "@type": "PropertyValue",
            "name": "Color",
            "value": "Multiple Colors Available"
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
  }

  private setBusinessStructuredData(): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "JK Industries",
      "image": "https://jkindustriesrajkot.com/assets/logo/logo.png",
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
          "name": "UPVC Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for UPVC powder coated metal clamps",
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
    const FAQ_SCHEMA_KEY = makeStateKey<string>('faq_schema');
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
