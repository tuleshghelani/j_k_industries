import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-sprinkler-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sprinkler-clamp.component.html',
  styleUrl: './sprinkler-clamp.component.scss'
})
export class SprinklerClampComponent implements OnInit, AfterViewInit {
  showEnquiryForm: boolean = false;
  expandedFaqs: boolean[] = [false, false, false, false, false];
  
  enquiryData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: null,
    message: ''
  };  

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    // Set meta tags for SEO optimization
    this.title.setTitle('Premium Sprinkler Clamps | Fire Protection & Irrigation Support | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality sprinkler clamps manufactured by JK Industries. Durable metal clamps ideal for fire protection systems & irrigation applications. NFPA compliant with excellent load capacity.' },
      { name: 'keywords', content: 'sprinkler clamp, sprinkler metal clamp, metal clamp, fire sprinkler clamp, sprinkler pipe support, irrigation sprinkler clamp, fire protection support, sprinkler system clamps, sprinkler hangers, sprinkler mounting, hanging clmap, chilly clamp' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Premium Sprinkler Clamps | Fire Protection & Irrigation Support | JK Industries' },
      { property: 'og:description', content: 'High-quality sprinkler clamps manufactured by JK Industries. Durable metal clamps for fire protection systems & irrigation applications.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/sprinkler-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium Sprinkler Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality metal sprinkler clamps for fire protection and irrigation. Durable and code-compliant.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg' }
    ]);

    // Add structured data only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.addProductSchema();
      this.addFaqSchema();
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

  toggleFaq(index: number) {
    this.expandedFaqs[index] = !this.expandedFaqs[index];
  }

  openEnquiryForm() {
    this.showEnquiryForm = true;
    // Prevent background scrolling
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeEnquiryForm(event: any) {
    if (event.target.classList.contains('enquiry-modal') || event.target.classList.contains('close-modal')) {
      this.showEnquiryForm = false;
      // Re-enable background scrolling
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = 'auto';
      }
    }
  }

  submitEnquiry() {
    console.log('Enquiry submitted:', this.enquiryData);
    // Here you would typically send the data to your backend
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
    // Re-enable background scrolling
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  downloadBrochure() {    
    alert('Our sprinkler clamp brochure will be available for download soon! Stay tuned for updates.');
  }

  private addProductSchema() {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId)) return;

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Premium Sprinkler Clamps",
      "image": "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg",
      "description": "High-quality metal sprinkler clamps designed for fire protection systems and irrigation applications. Engineered for durability, safety-compliance, and reliable performance under demanding conditions.",
      "sku": "SPR-CL-001",
      "mpn": "JKIND-SPRCL-001",
      "brand": {
        "@type": "Brand",
        "name": "Edler Clamp"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "JK Industries",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "addressCountry": "India"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "65"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(productSchema);
    document.head.appendChild(script);
  }

  private addFaqSchema() {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId)) return;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of sprinkler systems are your clamps compatible with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our sprinkler clamps are designed for compatibility with all standard fire sprinkler systems including wet pipe, dry pipe, deluge, and pre-action systems. They're also suitable for agricultural irrigation sprinkler networks and can accommodate both steel and fire piping depending on the model selected."
          }
        },
        {
          "@type": "Question",
          "name": "Are your sprinkler clamps fire-rated and code compliant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our sprinkler clamps are manufactured to meet NFPA 13 standards for fire sprinkler installations. They have undergone testing for fire resistance and structural integrity during fire conditions. Our products comply with local building codes and international fire protection standards, including UL and FM approvals where specified."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer custom sprinkler clamp configurations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we manufacture custom sprinkler clamps according to specific project requirements. Our engineering team can design and produce clamps for non-standard pipe sizes, specialized mounting configurations, or unusual load requirements. We also offer custom finishes and materials for special environments. Please contact our sales team with your specifications for a custom solution."
          }
        },
        {
          "@type": "Question",
          "name": "What materials are used in your sprinkler clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We manufacture sprinkler clamps in multiple materials to suit different environments. Our standard offerings include hot-dip galvanized steel for general applications, powder-coated (typically red for fire systems) for enhanced visibility and corrosion protection, and stainless steel for highly corrosive environments. The rubber lining in our clamps is fire-retardant and designed to protect pipe integrity."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum order quantity for sprinkler clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For standard sprinkler clamp sizes, our minimum order quantity is 1000 pieces. However, we understand that project requirements vary, so we maintain flexibility in our ordering process. For larger projects or custom specifications, we can adjust minimum quantities. Please contact our sales team to discuss your specific needs and receive a customized quotation."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
  }
}

