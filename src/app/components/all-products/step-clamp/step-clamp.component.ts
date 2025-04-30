import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-step-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './step-clamp.component.html',
  styleUrl: './step-clamp.component.scss'
})
export class StepClampComponent implements OnInit, AfterViewInit {
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
    // Set meta tags for SEO optimization - Optimized for Step Clamps
    this.title.setTitle('Premium Step Clamps | Multi-Size Pipe Mounting Solutions | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality step clamps manufactured by JK Industries. Innovative stepped design fits multiple pipe sizes with a single clamp. Perfect for industrial, construction & HVAC applications. Save inventory costs & installation time.' },
      { name: 'keywords', content: 'step clamps, stepped pipe clamps, multi-size clamps, tiered pipe clamps, step clamp manufacturer, industrial pipe supports, construction clamps, versatile pipe mounting, step clamp India, adjustable pipe clamps' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/step-clamp' },
      { property: 'og:title', content: 'Premium Step Clamps | Multi-Size Pipe Mounting Solutions | JK Industries' },
      { property: 'og:description', content: 'High-quality step clamps manufactured by JK Industries. Innovative stepped design fits multiple pipe sizes with a single clamp. Reduce inventory costs & installation time.' },
      { property: 'og:image', content: 'https://edlerclamp.com/assets/products/step-clamp.jpg' },
      { property: 'og:url', content: 'https://edlerclamp.com/products/step-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium Step Clamps | JK Industries' },
      { name: 'twitter:description', content: 'Innovative step clamps for multiple pipe sizes. Reduce inventory costs and installation time with our versatile mounting solutions.' },
      { name: 'twitter:image', content: 'https://edlerclamp.com/assets/products/step-clamp.jpg' }
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
    alert('Our brochure will be available for download soon! Stay tuned for updates.');
  }

  private addProductSchema() {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId)) return;

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Premium Step Clamps",
      "image": "https://edlerclamp.com/assets/products/step-clamp.jpg",
      "description": "High-quality step clamps with innovative stepped design to accommodate multiple pipe sizes with a single clamp, reducing inventory requirements and simplifying installation for industrial and construction applications.",
      "sku": "STP-CL-001",
      "mpn": "JKIND-STPCL-001",
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
          "name": "What is a step clamp and how does it differ from standard clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A step clamp is an innovative mounting solution featuring a stepped or tiered internal design that can accommodate multiple pipe diameters with a single clamp. Unlike standard clamps that fit only one specific pipe size, step clamps reduce inventory requirements and simplify installation by supporting 2-3 different pipe sizes with the same clamp. This makes them particularly valuable in projects with varied piping requirements or where future system modifications are anticipated."
          }
        },
        {
          "@type": "Question",
          "name": "Can step clamps handle the same load as traditional single-size clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our step clamps are engineered to provide equal or superior load-bearing capacity compared to traditional single-size clamps. Each step clamp undergoes rigorous structural analysis and load testing to ensure optimal performance across all compatible pipe sizes. The load capacity varies by size and material, but our engineering team has optimized the design to maintain structural integrity regardless of which step size is being utilized."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer custom size combinations for step clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we manufacture custom step clamp configurations according to specific project requirements. Our engineering team can design and produce step clamps with unique size combinations, special step increments, or for non-standard pipe diameters. For large projects with specialized needs, we can develop completely customized step clamp solutions. Please contact our sales team with your specifications for a custom quote."
          }
        },
        {
          "@type": "Question",
          "name": "What materials are available for your step clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer step clamps in various materials to suit different application environments. Standard options include hot-dip galvanized steel for general purpose applications corrosive environments, carbon steel for high-strength requirements, and polypropylene for chemical resistance. Each material option comes with appropriate fasteners and can be further customized with various coatings and finishes based on environmental needs."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum order quantity for step clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard minimum order quantity is 5000 pieces for stock step clamp sizes. For large projects or ongoing supply requirements, we offer volume discounts and can establish a scheduled delivery program. Please contact our sales team for specific information based on your project needs."
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

