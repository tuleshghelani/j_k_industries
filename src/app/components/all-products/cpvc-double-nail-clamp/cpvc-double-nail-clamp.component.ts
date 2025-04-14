import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-cpvc-double-nail-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cpvc-double-nail-clamp.component.html',
  styleUrl: './cpvc-double-nail-clamp.component.scss'
})
export class CpvcDoubleNailClampComponent implements OnInit, AfterViewInit {
  showEnquiryForm: boolean = false;
  expandedFaqs: boolean[] = [false, false, false, false, false];
  expandedFeatures: { [key: number]: boolean } = {};

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize all FAQs as collapsed
    // for (let i = 0; i < 5; i++) {
    //   this.expandedFaqs[i] = false;
    // }
  }

  ngOnInit() {
    // Set meta tags for SEO optimization - Specific to CPVC Double Nail Clamps
    this.title.setTitle('Premium CPVC Double Nail Clamps | Heat-Resistant Dual Fastening Pipe Supports | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality CPVC double nail clamps manufactured by JK Industries. Superior dual fastening system for enhanced stability in hot water plumbing installations. Innovative heat-resistant design with reinforced mounting points for maximum load capacity and durability.' },
      { name: 'keywords', content: 'CPVC double nail clamp, CPVC nail clamp, dual fastening clamp, double nail pipe support, CPVC pipe clamp, heat resistant pipe fastener, plastic clamp, hot water pipe support, CPVC mounting clamp, nail clamp, CPVC pipe holder' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Premium CPVC Double Nail Clamps | Heat-Resistant Dual Fastening Pipe Supports | JK Industries' },
      { property: 'og:description', content: 'High-quality CPVC double nail clamps manufactured by JK Industries. Superior dual fastening system for enhanced stability in hot water plumbing installations.' },
      { property: 'og:image', content: 'https://www.jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg' },
      { property: 'og:url', content: 'https://www.jkindustriesrajkot.com/products/cpvc-double-nail-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium CPVC Double Nail Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality CPVC double nail clamps with innovative dual fastening system for superior pipe stability in hot water applications.' },
      { name: 'twitter:image', content: 'https://www.jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg' }
    ]);

    // Add structured data only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.addProductSchema();
      this.addFaqSchema();
    }
  }

  ngAfterViewInit() {
  }

  downloadBrochure() {
    alert('Brochure download will be available soon. Please contact us for specifications.');
  }
  
  toggleFaq(index: number) {
    this.expandedFaqs[index] = !this.expandedFaqs[index];
  }

  // Add structured data for product
  private addProductSchema() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "CPVC Double Nail Clamp",
      "image": "https://www.jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
      "description": "Advanced heat-resistant CPVC clamp system featuring innovative double nail design for superior pipe stability and enhanced load distribution in hot water plumbing installations.",
      "sku": "CPVC-DN-001",
      "mpn": "JKIND-CPVCDN-001",
      "brand": {
        "@type": "Brand",
        "name": "JK Industries"
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
      "offers": {
        "@type": "Offer",
        "url": "https://www.jkindustriesrajkot.com/products/cpvc-double-nail-clamp",
        "priceCurrency": "INR",
        "priceValidUntil": "2024-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "87"
      }
    });
    document.head.appendChild(script);
  }

  // Add structured data for FAQs
  private addFaqSchema() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What makes CPVC double nail clamps better than standard clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CPVC double nail clamps feature a dual fastening system that provides up to 40% more holding power than standard single-nail clamps. This innovative design ensures superior stability for hot water pipes, prevents movement during thermal expansion, and distributes load more evenly to prevent wall damage. The heat-resistant CPVC material can withstand temperatures up to 93°C, making these clamps ideal for hot water systems where standard clamps might fail."
          }
        },
        {
          "@type": "Question",
          "name": "What sizes are available for CPVC double nail clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JK Industries CPVC double nail clamps are available in a comprehensive range of sizes from 15mm to 75mm diameter to accommodate various pipe dimensions. Custom sizes can also be manufactured upon request for specific project requirements. Each size is color-coded for easy identification during installation."
          }
        },
        {
          "@type": "Question",
          "name": "Are CPVC double nail clamps suitable for outdoor installations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our CPVC double nail clamps are manufactured with UV-stabilized material that provides excellent resistance to outdoor conditions. They can withstand prolonged exposure to sunlight, rain, and varying temperatures without degradation, making them suitable for both indoor and outdoor plumbing installations. The specialized formulation ensures they maintain structural integrity and appearance even after years of outdoor exposure."
          }
        },
        {
          "@type": "Question",
          "name": "What is the recommended spacing for CPVC double nail clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For optimal support and performance, we recommend installing CPVC double nail clamps at intervals of 80-100cm for horizontal pipe runs. For vertical runs, spacing of 100-120cm is typically sufficient. However, for hot water applications where thermal expansion is significant, reducing spacing to 60-80cm may provide better support. Always follow local plumbing codes and specific project requirements when determining exact spacing."
          }
        },
        {
          "@type": "Question",
          "name": "Can CPVC double nail clamps be used with other pipe materials?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While CPVC double nail clamps are specifically designed for CPVC pipes, they can also be used with other plastic pipe materials such as UPVC and PVC. However, for hot water applications, CPVC clamps are recommended due to their superior temperature resistance. The silicone cushioning insert prevents pipe damage and accommodates slight variations in pipe diameter, making them versatile for various plastic pipe systems."
          }
        }
      ]
    });
    document.head.appendChild(script);
  }
}
