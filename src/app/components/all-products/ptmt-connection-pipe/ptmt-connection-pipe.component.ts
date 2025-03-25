import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-ptmt-connection-pipe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ptmt-connection-pipe.component.html',
  styleUrl: './ptmt-connection-pipe.component.scss'
})
export class PtmtConnectionPipeComponent implements OnInit, AfterViewInit {
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
    // Set meta tags for SEO optimization - Specific to PTMT Connection Pipe
    this.title.setTitle('Premium PTMT Connection Pipe | Advanced Thermoplastic Plumbing | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality PTMT connection pipe systems manufactured by JK Industries. Advanced thermoplastic plumbing solutions with push-fit technology for residential and commercial applications. 5+ years lifespan.' },
      { name: 'keywords', content: 'PTMT connection pipe, PTMT pipes, polyoxymethylene thermoplastic pipe, PTMT plumbing system, thermoplastic connection pipes, push-fit plumbing pipes, hot water PTMT pipes, scale resistant pipes, modern plumbing systems' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Premium PTMT Connection Pipe | Advanced Thermoplastic Plumbing | JK Industries' },
      { property: 'og:description', content: 'High-quality PTMT connection pipe systems manufactured by JK Industries. Advanced thermoplastic plumbing solutions with push-fit technology.' },
      { property: 'og:image', content: 'https://www.jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg' },
      { property: 'og:url', content: 'https://www.jkindustriesrajkot.com/products/ptmt-connection-pipe' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium PTMT Connection Pipe | JK Industries' },
      { name: 'twitter:description', content: 'Advanced thermoplastic plumbing solutions with superior durability and easy installation. Perfect for modern plumbing requirements.' },
      { name: 'twitter:image', content: 'https://www.jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg' }
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
      "name": "Premium PTMT Connection Pipe",
      "image": "https://www.jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg",
      "description": "Advanced PTMT (Polyoxymethylene Thermoplastic) connection pipe system offering superior flexibility and strength for modern plumbing installations with push-fit technology and 5+ years lifespan.",
      "sku": "PTMT-CP-001",
      "mpn": "JKIND-PTMT-001",
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
        "url": "https://www.jkindustriesrajkot.com/products/ptmt-connection-pipe",
        "priceCurrency": "INR",
        "priceValidUntil": "2024-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "68"
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
          "name": "What makes PTMT connection pipes better than traditional piping materials?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PTMT (Polyoxymethylene Thermoplastic) connection pipes offer several advantages over traditional materials: superior durability with 5+ years lifespan, excellent thermal stability (0-95°C), scale and corrosion resistance, quick push-fit installation without special tools, and lower overall lifecycle costs. They're also hygienic and don't contaminate water with rust or chemicals like some metal pipes can."
          }
        },
        {
          "@type": "Question",
          "name": "Are PTMT connection pipes suitable for hot water systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, PTMT connection pipes are specifically engineered for both hot and cold water applications. They maintain structural integrity and performance at temperatures up to 95°C, making them ideal for hot water distribution systems. Unlike some plastic pipes, PTMT doesn't soften at high temperatures and has minimal thermal expansion, ensuring stable connections even with temperature fluctuations."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer complete PTMT plumbing systems or just the connection pipes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer a comprehensive PTMT plumbing solution including connection pipes, fittings, valves, and accessories. Our complete system ensures compatibility and optimal performance across all components. For large projects, we can provide custom design support to create an integrated plumbing solution tailored to your specific requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What sizes are available for PTMT connection pipes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard PTMT connection pipes are available in diameters of 15mm, 20mm, 25mm, 32mm, and 40mm, which cover most residential and commercial plumbing requirements. For specialized industrial applications or non-standard sizes, we can manufacture custom dimensions. Please contact our sales team with your specific requirements for custom sizing options."
          }
        },
        {
          "@type": "Question",
          "name": "What is the warranty period for PTMT connection pipes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JK Industries provides a 15-year manufacturer's warranty on all PTMT connection pipes and fittings when installed according to our guidelines by qualified professionals. This warranty covers material defects and manufacturing issues. The expected service life of our PTMT products exceeds 50 years under normal operating conditions, making them a truly long-term investment for your plumbing infrastructure."
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

