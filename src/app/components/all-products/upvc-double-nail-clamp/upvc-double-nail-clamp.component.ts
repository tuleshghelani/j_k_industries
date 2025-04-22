import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-upvc-double-nail-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './upvc-double-nail-clamp.component.html',
  styleUrl: './upvc-double-nail-clamp.component.scss'
})
export class UpvcDoubleNailClampComponent implements OnInit, AfterViewInit {
  showEnquiryForm: boolean = false;
  expandedFaqs: boolean[] = [false, false, false, false, false];

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit(): void {
    // Initialize AOS or other client-side libraries if needed
    if (isPlatformBrowser(this.platformId)) {
      // Client-side code
    }
  }

  ngOnInit() {
    // Set meta tags for SEO optimization - Specific to UPVC Double Nail Clamps
    this.title.setTitle('Premium UPVC Double Nail Clamps | Dual Fastening Pipe Supports | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality UPVC double nail clamps manufactured by JK Industries. Superior dual fastening system for enhanced stability in plumbing installations. Innovative design with reinforced mounting points for maximum load capacity and durability.' },
      { name: 'keywords', content: 'UPVC double nail clamp, UPVC nail clamp, dual fastening clamp, double nail pipe support, UPVC pipe clamp, plastic pipe, plastic pipe clamp, plastic clamp, plumbing pipe support, UPVC mounting clamp, double fastening system, UPVC pipe holder, nail clamp' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Premium UPVC Double Nail Clamps | Dual Fastening Pipe Supports | JK Industries' },
      { property: 'og:description', content: 'High-quality UPVC double nail clamps manufactured by JK Industries. Superior dual fastening system for enhanced stability in plumbing installations.' },
      { property: 'og:image', content: 'https://edlerclamp.com/assets/products/upvc-double-nail-clamp.jpg' },
      { property: 'og:url', content: 'https://edlerclamp.com/products/upvc-double-nail-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium UPVC Double Nail Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality UPVC double nail clamps with innovative dual fastening system for superior pipe stability and enhanced load distribution.' },
      { name: 'twitter:image', content: 'https://edlerclamp.com/assets/products/upvc-double-nail-clamp.jpg' }
    ]);

    // Add structured data only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.addProductSchema();
      this.addFaqSchema();
    }
  }

  downloadBrochure() {
    // Implement download functionality
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
      "name": "UPVC Double Nail Clamp",
      "image": "https://edlerclamp.com/assets/products/upvc-double-nail-clamp.jpg",
      "description": "Advanced dual-fastening UPVC clamp system featuring innovative double nail design for superior pipe stability and enhanced load distribution in residential and commercial plumbing installations.",
      "sku": "UPVC-DN-001",
      "mpn": "JKIND-UPVCDN-001",
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
        "reviewCount": "72"
      }
    });
    document.head.appendChild(script);
  }

  // Add FAQ schema for SEO
  private addFaqSchema() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the advantages of UPVC double nail clamps over standard clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UPVC double nail clamps offer superior stability with their dual fastening system, distributing load more evenly and preventing pipe movement. They provide up to 40% more holding strength than standard single-nail clamps, making them ideal for high-pressure systems and areas with vibration. The reinforced mounting points also reduce the risk of wall damage during installation and long-term use."
          }
        },
        {
          "@type": "Question",
          "name": "What pipe sizes are compatible with JK Industries UPVC double nail clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JK Industries UPVC double nail clamps are available in a comprehensive range of sizes from 15mm to 110mm diameter, making them compatible with all standard UPVC pipe systems used in residential and commercial plumbing installations. Custom sizes can also be manufactured upon request for specialized applications."
          }
        },
        {
          "@type": "Question",
          "name": "Are UPVC double nail clamps suitable for outdoor installations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our UPVC double nail clamps are manufactured with high-impact UPVC material containing UV stabilizers, making them highly resistant to weathering, UV radiation, and temperature fluctuations. They maintain their structural integrity and appearance even after years of outdoor exposure, making them ideal for exterior plumbing, irrigation systems, and outdoor installations."
          }
        },
        {
          "@type": "Question",
          "name": "What is the load capacity of JK Industries UPVC double nail clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JK Industries UPVC double nail clamps offer exceptional load capacity of up to 85kg depending on the size, which is significantly higher than standard single-nail clamps. This superior strength comes from the innovative dual fastening system and fiberglass-reinforced UPVC material, ensuring reliable support even for water-filled pipes and systems with vibration."
          }
        },
        {
          "@type": "Question",
          "name": "How do I install UPVC double nail clamps correctly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For proper installation of UPVC double nail clamps: 1) Mark the position ensuring proper pipe alignment, 2) Pre-drill pilot holes if mounting on hard surfaces, 3) Position the clamp and insert both nails, 4) Drive the nails fully using a hammer or power tool until flush with the clamp surface, 5) Check that the pipe sits securely in the clamp without being compressed. For optimal support, install clamps every 80-100cm along horizontal runs and at each change of direction."
          }
        }
      ]
    });
    document.head.appendChild(script);
  }
}
