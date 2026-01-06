import { Component, OnInit, inject, PLATFORM_ID, Inject, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import * as Aos from 'aos';

// Define TransferState keys
const SS_CLAMP_PRODUCT_SCHEMA = makeStateKey<string>('SS_CLAMP_PRODUCT_SCHEMA');
const SS_CLAMP_BUSINESS_SCHEMA = makeStateKey<string>('SS_CLAMP_BUSINESS_SCHEMA');
const SS_CLAMP_FAQ_SCHEMA = makeStateKey<string>('SS_CLAMP_FAQ_SCHEMA');

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
  selector: 'app-stainless-steel-clamp',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './stainless-steel-clamp.component.html',
  styleUrl: './stainless-steel-clamp.component.scss'
})
export class StainlessSteelClampComponent implements OnInit {
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
      description: 'Manufactured from premium SS202 and stainless steel grades, offering exceptional resistance to rust, oxidation, and chemical corrosion in harsh industrial environments.'
    },
    {
      icon: 'temperature-high',
      title: 'High Temperature Tolerance',
      description: 'Engineered to withstand extreme temperatures up to 800°C without losing structural integrity, making them ideal for furnaces and high-heat processing lines.'
    },
    {
      icon: 'anchor',
      title: 'Marine Grade Durability',
      description: 'The inherent properties of our stainless steel metal clamps make them perfect for marine applications, effectively resisting saltwater corrosion.'
    },
    {
      icon: 'cogs',
      title: 'Precision Engineering',
      description: 'CNC-manufactured with tight tolerances to ensure a perfect fit for all standard pipe sizes, preventing leakage and ensuring secure fastening.'
    },
    {
      icon: 'leaf',
      title: 'Hygienic & Sanitary',
      description: 'The non-porous surface of stainless steel makes these clamps ideal for food processing, pharmaceutical, and dairy industries where hygiene is critical.'
    },
    {
      icon: 'check-double',
      title: 'Heavy Duty Strength',
      description: 'High tensile strength construction provides superior load-bearing capacity compared to standard metal clamps, ensuring safety in high-pressure systems.'
    }
  ];

  applications: Application[] = [
    {
      icon: 'flask',
      title: 'Chemical Processing',
      description: 'Essential for securing corrosive fluid lines in chemical plants where standard metal clamps would fail.'
    },
    {
      icon: 'ship',
      title: 'Marine & Offshore',
      description: 'Reliable piping support for ships, oil rigs, and coastal facilities exposed to saline environments.'
    },
    {
      icon: 'utensils',
      title: 'Food & Beverage',
      description: 'Sanitary support for process piping in food manufacturing plants, adhering to strict hygiene standards.'
    },
    {
      icon: 'prescription-bottle',
      title: 'Pharmaceutical',
      description: 'Clean-room compatible clamps for critical pharmaceutical manufacturing and biotech applications.'
    },
    {
      icon: 'water',
      title: 'Water Treatment',
      description: 'Durable fastening for filtration and desalination plants handling aggressive water conditions.'
    },
    {
      icon: 'industry',
      title: 'Heavy Industry',
      description: 'Robust support for hydraulic lines, steam pipes, and pneumatic systems in manufacturing units.'
    }
  ];

  specifications: Spec[] = [
    { label: 'Material', value: 'SS202 (Marine Grade Available)' },
    { label: 'Sizes Available', value: '15mm - 150mm Diameter' },
    { label: 'Surface Finish', value: 'Polished, Matte, or Custom Finish' },
    { label: 'Temperature Range', value: '-50°C to 800°C' },
    { label: 'Tensile Strength', value: '520-720 MPa' },
    { label: 'Pressure Rating', value: 'Up to 40 bar (Depending on Size)' },
    { label: 'Certification', value: 'ISO 9001:2015, CE Compliant' },
    { label: 'Application Standards', value: 'ASTM A276, AISI 202' }
  ];

  whyChoose = [
    {
      title: 'Premium Material Quality',
      description: 'We use only certified high-grade stainless steel raw materials to ensure consistent quality and maximum durability.'
    },
    {
      title: 'Direct Manufacturer Pricing',
      description: 'Get the best rates for high-quality SS clamps by buying directly from the manufacturer, eliminating middleman costs.'
    },
    {
      title: 'Custom Engineering',
      description: 'Our in-house design team can create bespoke clamping solutions tailored to your specific industrial requirements.'
    },
    {
      title: 'Ready Stock Availability',
      description: 'We maintain a huge inventory of standard sizes to ensure 24-48 hour dispatch for urgent project requirements.'
    },
    {
      title: 'ISO 9001:2015 Certified',
      description: 'Our manufacturing processes adhere to strict international quality standards, guaranteeing zero-defect products.'
    }
  ];

  testimonials = [
    {
      quote: "JK Industries' stainless steel clamps have been a game-changer for our chemical plant. The corrosion resistance is phenomenal—we haven't replaced a single clamp in 2 years, whereas previous ones rusted in months.",
      author: 'Rajesh Malhotra',
      role: ''
    },
    {
      quote: "We source all our SS pipe clamps from JK Industries for our marine engineering projects. The quality consistency and precision fit are exactly what we need for critical offshore installations.",
      author: 'Vikram Singh',
      role: ''
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'What is an SS clamp and how is it different from a regular metal clamp?',
      answer: 'An SS clamp (Stainless Steel clamp) is a premium-grade metal clamp made from stainless steel alloys like SS202 or SS304. Unlike regular metal clamps that rust and corrode, SS clamps offer superior corrosion resistance, making them ideal for harsh environments including marine, chemical processing, and food industries. Our stainless steel clamps are engineered for durability and long-term performance.'
    },
    {
      question: 'Where can I buy SS clamps and metal clamps online?',
      answer: 'JK Industries is a leading manufacturer of SS clamps and metal clamps in India. You can purchase our stainless steel clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and free shipping across India. Contact us for a quote on SS pipe clamps, SS pipe clips, and custom metal clamp solutions.'
    },
    {
      question: 'What is the difference between SS202 and SS304 stainless steel clamps?',
      answer: 'SS202 is a cost-effective austenitic stainless steel suitable for general industrial and indoor applications. SS304 offers higher nickel content, providing superior corrosion resistance, making it better suited for outdoor, marine, and chemical environments. We manufacture both grades of stainless steel clamps based on your specific requirements.'
    },
    {
      question: 'Are SS pipe clamps and SS pipe clips the same thing?',
      answer: 'SS pipe clamps and SS pipe clips are similar products used for securing pipes. SS pipe clamps typically refer to full-circle clamping systems, while SS pipe clips often refer to U-shaped or partial support systems. Both are made from stainless steel and provide excellent corrosion resistance. We manufacture both types of SS pipe support systems to meet various industrial needs.'
    },
    {
      question: 'Can stainless steel clamps be used for high-pressure hydraulic lines?',
      answer: 'Yes, our heavy-duty stainless steel clamps are engineered with high tensile strength to securely hold pipes in high-pressure hydraulic and pneumatic systems. We recommend checking the pressure rating specifications for your specific pipe size or consulting our technical team for the right SS clamp solution.'
    },
    {
      question: 'What sizes of metal clamps and SS clamps do you manufacture?',
      answer: 'We manufacture stainless steel clamps and metal clamps in sizes ranging from 15mm to 150mm diameter. Our SS clamps are available in standard sizes with ready stock availability, and we also offer custom-sized metal clamps for specialized applications. Contact us for specific size requirements for your SS pipe clamp or metal clamp needs.'
    },
    {
      question: 'Do you provide material test certificates (MTC) for SS clamps?',
      answer: 'Absolutely. As a quality-focused manufacturer, we provide Mill Test Certificates (MTC) with every batch of stainless steel clamps, certifying the chemical composition and mechanical properties of the material used. This ensures traceability and quality assurance for all our SS clamp and metal clamp products.'
    },
    {
      question: 'What is the lead time for custom-sized SS clamps and metal clamps?',
      answer: 'For standard custom sizes, we typically require 3-5 days for production. For highly specialized designs requiring new dies, the lead time may be 7-10 days. We always strive to meet your project timelines and can offer expedited services for urgent orders of stainless steel clamps and metal clamps.'
    },
    {
      question: 'Are stainless steel clamps and metal clamps reusable?',
      answer: 'Yes, our high-quality stainless steel metal clamps are designed for multiple uses. The durable material and robust fastening mechanism allow them to be installed, removed, and reinstalled during maintenance without losing their grip or structural integrity. This makes SS clamps a cost-effective long-term solution.'
    },
    {
      question: 'Why choose JK Industries for SS clamps and metal clamps?',
      answer: 'JK Industries is a trusted manufacturer of SS clamps, metal clamps, and stainless steel pipe clamps in India. We offer ISO 9001:2015 certified products, competitive pricing, direct factory prices, ready stock availability, and excellent customer service. Our stainless steel clamps are manufactured using premium SS202 and SS304 grades, ensuring superior quality and durability.'
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
    this.titleService.setTitle('SS Clamp | Metal Clamp | Stainless Steel Clamp Manufacturer | SS Pipe Clamp | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 SS Clamp & Metal Clamp Manufacturer. Premium Stainless Steel Clamps, SS Pipe Clamps & SS Pipe Clips. SS202/SS304 Grade. ISO Certified. Best Prices. Free Shipping. Buy Direct from Factory in Rajkot, Gujarat.' },
      { name: 'keywords', content: 'SS clamp, Metal clamp, stainless steel clamp, stainless steel pipe clamp, SS pipe clip, SS pipe clips, SS metal clamp, stainless steel pipe clip, metal pipe clamp, SS clamp manufacturer, metal clamp manufacturer, stainless steel clamp manufacturer India, SS clamp Rajkot, metal clamp Gujarat' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/stainless-steel-clamp' },
      
      // Location Tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.255928;70.782660' },
      { name: 'ICBM', content: '22.255928, 70.782660' },

      // Open Graph
      { property: 'og:title', content: 'SS Clamp | Metal Clamp | Stainless Steel Clamp Manufacturer | SS Pipe Clamp' },
      { property: 'og:description', content: 'India\'s #1 SS Clamp & Metal Clamp Manufacturer. Premium Stainless Steel Clamps, SS Pipe Clamps & SS Pipe Clips. ISO Certified. Best Prices. Buy Direct from Factory.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/stainless-steel-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360005' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'SS Clamp | Metal Clamp | Stainless Steel Clamp Manufacturer' },
      { name: 'twitter:description', content: 'India\'s #1 SS Clamp & Metal Clamp Manufacturer. Premium Stainless Steel Clamps, SS Pipe Clamps & SS Pipe Clips. ISO Certified.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg' }
    ]);
  }

  private setProductStructuredData() {
    if (isPlatformBrowser(this.platformId)) {
      const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "category": "Clips, Clamps",
        "name": "SS Clamp | Metal Clamp | Stainless Steel Clamp | SS Pipe Clamp | SS Pipe Clip",
        "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "url": "https://jkindustriesrajkot.com/products/stainless-steel-clamp",
        "description": "JK Industries manufactures premium Stainless Steel (SS) Metal Clamps designed for exceptional durability and corrosion resistance. Ideal for chemical, marine, and food processing industries, our SS clamps are available in SS202, SS304, and SS316 grades.",
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
        "alternateName": "SS clamp, Metal clamp, stainless steel clamp, stainless steel pipe clamp, SS pipe clip, SS pipe clips, SS metal clamp, metal pipe clamp, stainless steel pipe clip, SS clamp manufacturer, metal clamp manufacturer, stainless steel clamp manufacturer",
        "sku": "SS-CLAMP-IND-001",
        "mpn": "JK-SS-CL-001",
        "material": "Stainless Steel (SS202, SS304)",
        "color": "Silver / Polished Steel",
        "offers": {
          "@type": "Offer",
          "url": "https://jkindustriesrajkot.com/products/stainless-steel-clamp",
          "priceCurrency": "INR",
          "price": "2.05",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "22.255928",
              "longitude": "70.782660"
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
          "ratingValue": "4.9",
          "ratingCount": "85",
          "reviewCount": "62"
        },
        "review": this.testimonials.map(t => ({
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": t.author },
          "reviewBody": t.quote
        })),          
        "isAccessoryOrSparePartFor": { "@type": "Product", "name": "Stainless Steel Pipe" },
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
          { "@type": "PropertyValue", "name": "Material", "value": "SS202 (Marine Grade Available)" },
          { "@type": "PropertyValue", "name": "Corrosion Resistance", "value": "High" },
          { "@type": "PropertyValue", "name": "Application", "value": "Industrial, Marine, Chemical" },
          { "@type": "PropertyValue", "name": "Sizes Available", "value": "15mm - 150mm Diameter" },
          { "@type": "PropertyValue", "name": "Surface Finish", "value": "Polished, Matte, or Custom Finish" },
          { "@type": "PropertyValue", "name": "Temperature Range", "value": "-50°C to 800°C" },
          { "@type": "PropertyValue", "name": "Tensile Strength", "value": "520-720 MPa" },
          { "@type": "PropertyValue", "name": "Pressure Rating", "value": "Up to 40 bar (Depending on Size)" },
          { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, CE Compliant" },
          { "@type": "PropertyValue", "name": "Application Standards", "value": "ASTM A276, AISI 202" }
        ]
      };

      this.transferState.set(SS_CLAMP_PRODUCT_SCHEMA, JSON.stringify(schema));
      
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
        "postalCode": "360005",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.255928",
        "longitude": "70.782660"
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
          "name": "Stainless Steel Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for Stainless Steel Metal Clamps",
          "telephone": "+91 9979032430"
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

    this.transferState.set(SS_CLAMP_BUSINESS_SCHEMA, JSON.stringify(businessData));

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

    this.transferState.set(SS_CLAMP_FAQ_SCHEMA, JSON.stringify(faqData));

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
            "name": "SS Clamp | Metal Clamp | Stainless Steel Clamp",
            "item": "https://jkindustriesrajkot.com/products/stainless-steel-clamp"
          }
        ]
      };

      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(breadcrumbSchema);
      this.document.head.appendChild(script);
    }
  }
}
