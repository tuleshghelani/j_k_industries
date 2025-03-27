import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-upvc-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './upvc-metal-clamp.component.html',
  styleUrl: './upvc-metal-clamp.component.scss'
})
export class UPVCMetalClampComponent implements OnInit, AfterViewInit {
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
    // Set meta tags for SEO optimization - Specific to UPVC Powder Coated Metal Clamps
    this.title.setTitle('Premium UPVC Powder Coated Metal Clamps | UPVC CPVC Pipe Clamps | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality UPVC powder coated metal clamps manufactured by JK Industries. Superior corrosion-resistant clamps ideal for plastic pipe systems, plumbing installations & construction projects. Durable and pipe-friendly design with enhanced weather protection.' },
      { name: 'keywords', content: 'UPVC powder coated metal clamps, powder coated UPVC clamps, CPVC pipe clamps, plastic pipe clamps, UPVC pipe supports, PVC pipe clamps, UPVC pipe fasteners, plumbing pipe clamps, corrosion resistant pipe clamps' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Premium UPVC Powder Coated Metal Clamps | UPVC CPVC Pipe Clamps | JK Industries' },
      { property: 'og:description', content: 'High-quality UPVC powder coated metal clamps manufactured by JK Industries. Corrosion-resistant clamps ideal for plastic pipe systems and plumbing installations.' },
      { property: 'og:image', content: 'https://www.jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' },
      { property: 'og:url', content: 'https://www.jkindustriesrajkot.com/products/upvc-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium UPVC Powder Coated Metal Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality powder coated UPVC clamps for plumbing and construction applications. Enhanced corrosion resistance for extended service life.' },
      { name: 'twitter:image', content: 'https://www.jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg' }
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
      "name": "Premium UPVC Powder Coated Metal Clamps",
      "image": "https://www.jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
      "description": "High-quality UPVC powder coated metal clamps with rubber lining for plastic pipe systems. Designed for plumbing, irrigation, and construction applications with superior corrosion resistance, pipe protection and fastening security.",
      "sku": "UPVC-CL-001",
      "mpn": "JKIND-UPVCCL-001",
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
        "url": "https://www.jkindustriesrajkot.com/products/upvc-metal-clamp",
        "priceCurrency": "INR",
        "priceValidUntil": "2024-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
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
          "name": "What makes UPVC powder coated metal clamps better than standard clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UPVC powder coated metal clamps combine the strength of metal with specialized coating protection for pipe-friendly properties. Unlike standard clips or uncoated clamps, they provide superior load-bearing capacity, exceptional corrosion resistance, longer service life in humid environments, and better vibration dampening."
          }
        },
        {
          "@type": "Question",
          "name": "Are these powder coated clamps suitable for outdoor UPVC pipe installations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our UPVC powder coated metal clamps are specifically designed for outdoor installations. The powder coating applied to the CRC - MS base material provides exceptional resistance to weathering, UV exposure, and corrosion. For extremely harsh outdoor environments, we also offer specialized coatings with additional UV protection and anti-corrosion properties."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer custom sizes and colors for UPVC powder coated pipe clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we manufacture custom-sized UPVC powder coated metal clamps according to specific requirements, including custom color options to match your project aesthetics or color coding needs. Our engineering team can design and produce clamps for non-standard pipe diameters, special mounting requirements, or unique configurations with your choice of powder coating. Please contact our sales team with your specifications for a custom quote and production timeline."
          }
        },
        {
          "@type": "Question",
          "name": "Are these powder coated clamps compatible with both UPVC and CPVC pipes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our powder coated metal clamps are designed to be compatible with both UPVC and CPVC pipes, as well as other plastic pipes like PVC. The powder coating provides additional protection against pipe surface abrasion and ensures longevity in various applications. We also offer specialized versions with different coating types for specific pipe materials if required for your application."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum order quantity for UPVC powder coated metal clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard minimum order quantity is 10000 pieces for stock sizes of UPVC powder coated metal clamps. However, we understand that different projects have different requirements, so we're flexible with order quantities. For custom sizes, colors, or specifications, minimum order quantities may vary. Please contact our sales team for specific information about your requirements and we can discuss options that work for your project scale."
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

