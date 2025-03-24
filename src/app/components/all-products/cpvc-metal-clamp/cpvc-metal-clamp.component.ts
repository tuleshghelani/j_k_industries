import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-cpvc-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cpvc-metal-clamp.component.html',
  styleUrl: './cpvc-metal-clamp.component.scss'
})
export class CPVCMetalClampComponent implements OnInit, AfterViewInit {
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
    // Set meta tags for SEO optimization - Specific to CPVC Metal Clamps
    this.title.setTitle('Premium CPVC Metal Clamps | CPVC Pipe Clamps & Supports | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality CPVC metal clamps manufactured by JK Industries. Superior CPVC pipe supports with rubber lining for chemical resistance, ideal for hot water systems & chemical processing applications.' },
      { name: 'keywords', content: 'CPVC metal clamps, CPVC clamps, CPVC pipe clamps, chlorinated PVC clamps, CPVC pipe supports, hot water pipe clamps, chemical resistant clamps, premium CPVC clamps, CPVC pipe fasteners, CPVC mounting solutions' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Premium CPVC Metal Clamps | CPVC Pipe Clamps & Supports | JK Industries' },
      { property: 'og:description', content: 'High-quality CPVC metal clamps manufactured by JK Industries. Superior pipe supports with rubber lining for chemical resistance and hot water applications.' },
      { property: 'og:image', content: 'https://www.jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg' },
      { property: 'og:url', content: 'https://www.jkindustriesrajkot.com/products/cpvc-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium CPVC Metal Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality CPVC clamps for hot water systems and chemical applications. Temperature and corrosion resistant.' },
      { name: 'twitter:image', content: 'https://www.jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg' }
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
    // Implement brochure download logic
    alert('Brochure download functionality will be implemented here.');
  }

  private addProductSchema() {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId)) return;

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Premium CPVC Metal Clamps",
      "image": "https://www.jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
      "description": "High-quality CPVC metal clamps with rubber lining for superior chemical resistance and temperature tolerance. Ideal for hot water systems, chemical processing, and industrial plumbing applications.",
      "sku": "CPVC-CL-001",
      "mpn": "JKIND-CPVCCL-001",
      "brand": {
        "@type": "Brand",
        "name": "JK Industries"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "JK Industries"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.jkindustriesrajkot.com/products/cpvc-metal-clamp",
        "priceCurrency": "INR",
        "priceValidUntil": "2024-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "58"
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
          "name": "What makes CPVC metal clamps better than standard plastic clips?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CPVC metal clamps combine the strength of metal with specialized rubber lining that protects CPVC pipes. Unlike standard plastic clips, they provide superior load-bearing capacity, better chemical resistance, higher temperature tolerance (up to 93°C), and longer service life. The rubber lining prevents pipe damage while the metal structure ensures secure fastening even in challenging environments."
          }
        },
        {
          "@type": "Question",
          "name": "Are your CPVC clamps suitable for hot water systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our CPVC metal clamps are specifically designed for hot water systems. They can withstand continuous temperatures up to 93°C (200°F), making them ideal for hot water distribution lines in residential, commercial, and industrial applications. The specialized rubber lining accommodates thermal expansion while maintaining secure support of the piping system."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer custom sizes for CPVC pipe clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we manufacture custom-sized CPVC metal clamps according to specific requirements. Our engineering team can design and produce clamps for non-standard pipe diameters, special mounting requirements, or unique configurations. Please contact our sales team with your specifications for a custom quote and production timeline."
          }
        },
        {
          "@type": "Question",
          "name": "Are these clamps resistant to chemicals and corrosive environments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our CPVC metal clamps feature specialized rubber lining that provides excellent chemical resistance, complementing the inherent chemical resistance of CPVC pipes. The metal components are treated to resist corrosion, making these clamps suitable for chemical processing plants, water treatment facilities, and other environments with exposure to acids, bases, and corrosive agents."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum order quantity for CPVC metal clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard minimum order quantity is 100 pieces for stock sizes. However, we understand that different projects have different requirements, so we're flexible with order quantities. For custom sizes or specifications, minimum order quantities may vary. Please contact our sales team for specific information about your project needs."
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

