import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-golden-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './golden-metal-clamp.component.html',
  styleUrl: './golden-metal-clamp.component.scss'
})
export class GoldenMetalClampComponent implements OnInit, AfterViewInit {
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
    // Set meta tags for SEO optimization - Specific to Golden Metal Clamps
    this.title.setTitle('Premium Golden Metal Clamps | Luxury Gold-Plated Hardware | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality golden metal clamps manufactured by JK Industries. Elegant gold-plated clamps ideal for luxury interiors, decorative applications & premium installations. Durable with exceptional finish.' },
      { name: 'keywords', content: 'golden metal clamps, gold plated clamps, golden clamps, luxury clamps, decorative metal clamps, premium gold clamps, gold finish hardware, golden pipe supports, golden fasteners, metal clamp' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Premium Golden Metal Clamps | Luxury Gold-Plated Hardware | JK Industries' },
      { property: 'og:description', content: 'High-quality golden metal clamps manufactured by JK Industries. Elegant gold-plated clamps for premium applications with exceptional durability and finish.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/golden-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium Golden Metal Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality golden metal clamps for luxury applications. Elegant appearance with exceptional durability.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg' }
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
      "name": "Premium Golden Metal Clamps",
      "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
      "description": "High-quality gold-plated metal clamps offering exceptional aesthetics and durability for luxury applications, architectural installations, and premium environments.",
      "sku": "GLD-CL-001",
      "mpn": "JKIND-GLDCL-001",
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
        "reviewCount": "42"
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
          "name": "What makes golden metal clamps different from standard metal clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Golden metal clamps offer a premium aesthetic appearance with their gold-plated finish while maintaining excellent functional properties. Unlike standard metal clamps, our golden clamps provide enhanced corrosion resistance, tarnish protection, and a luxurious appearance that makes them ideal for visible installations in high-end environments. The gold plating also offers additional protection against oxidation and chemical exposure."
          }
        },
        {
          "@type": "Question",
          "name": "How durable is the gold plating on your metal clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our golden metal clamps feature a 10-20 micron thick gold plating that is engineered for durability. The plating process adheres to strict quality standards, providing excellent resistance to scratching, tarnishing, and fading. Our clamps undergo rigorous testing, including 600+ hours of salt spray testing, to ensure the gold finish maintains its appearance and protective properties over time, even in challenging environments."
          }
        },
        {
          "@type": "Question",
          "name": "Are your golden metal clamps suitable for outdoor applications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our premium golden metal clamps are suitable for select outdoor applications. The gold plating provides excellent protection against moisture and environmental factors. For more demanding outdoor environments, we recommend our PVD-coated golden clamps, which offer superior resistance to UV exposure, salt spray, and environmental pollutants. We can provide specific recommendations based on your outdoor installation requirements."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer custom sizes and designs for golden metal clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we manufacture custom-sized and designed golden metal clamps according to specific requirements. Our engineering team can design and produce clamps with custom dimensions, special mounting features, unique aesthetic elements, or branded designs. We also offer different gold finish options including mirror polished, brushed, and matte gold. Please contact our sales team with your specifications for a custom quote."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum order quantity for golden metal clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard minimum order quantity is 10000 pieces for stock golden metal clamp sizes. For custom designs or specifications, minimum order quantities typically start at 10000 pieces, depending on the complexity of the design and finishing requirements. We understand that different projects have different needs, so we're flexible with order quantities for special projects. Please contact our sales team to discuss your specific requirements."
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

