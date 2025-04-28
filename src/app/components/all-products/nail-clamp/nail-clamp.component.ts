import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-nail-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './nail-clamp.component.html',
  styleUrl: './nail-clamp.component.scss'
})
export class NailClampComponent implements OnInit, AfterViewInit {
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
    // Set meta tags for SEO optimization - Updated for Nico Clamps
    this.title.setTitle('Premium Industrial Nico Clamps | Construction & Industrial Mounting Solutions | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality industrial nico clamps manufactured by JK Industries. Superior grip strength and durability for construction, manufacturing, and installation applications. Available in galvanized and stainless steel.' },
      { name: 'keywords', content: 'nico clamps, industrial nico clamps, construction nico clamps, pipe mounting clamps, heavy duty nico clamps, galvanized nico clamps, metal nail clamp, mounting clamps, JK Industries nico clamps' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/nail-clamp' },
      { property: 'og:title', content: 'Premium Industrial Nico Clamps | Construction & Industrial Mounting Solutions | JK Industries' },
      { property: 'og:description', content: 'High-quality industrial nico clamps manufactured by JK Industries. Superior grip strength for construction and industrial applications.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/nail-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium Industrial Nico Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality nico clamps for construction and industrial applications. Superior grip strength and durability.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg' }
    ]);

    // Add structured data only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.addProductSchema();
      this.addFaqSchema();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  toggleFaq(index: number) {
    this.expandedFaqs[index] = !this.expandedFaqs[index];
  }

  downloadBrochure() {
    // Implement download functionality or redirect to download page
    alert('Nico Clamp specifications will be downloaded shortly.');
    // You can implement actual download functionality here
  }

  openEnquiryForm() {
    this.showEnquiryForm = true;
    // Prevent body scrolling when modal is open
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeEnquiryForm(event: Event) {
    // Close only if clicking on the background or close button
    if (
      event.target === event.currentTarget ||
      (event.target as HTMLElement).classList.contains('close-modal')
    ) {
      this.showEnquiryForm = false;
      // Re-enable body scrolling
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = 'auto';
      }
    }
  }

  submitEnquiry() {
    // Here you would implement the actual form submission logic
    console.log('Enquiry submitted:', this.enquiryData);
    alert('Thank you for your enquiry. Our team will contact you shortly.');
    this.showEnquiryForm = false;
    // Re-enable body scrolling
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
    // Reset form
    this.enquiryData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      quantity: null,
      message: ''
    };
  }

  private addProductSchema() {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId)) return;

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Premium Industrial Nico Clamps",
      "image": "https://jkindustriesrajkot.com/assets/products/nico-clamp.jpg",
      "description": "High-quality industrial nico clamps manufactured for superior grip strength and durability in construction and industrial applications.",
      "sku": "NC-001",
      "mpn": "JKIND-NC-001",
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
        "ratingValue": "4.7",
        "reviewCount": "63"
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
          "name": "What makes JK nico clamps better than standard mounting clips?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JK nico clamps feature a patented interlocking design that provides 40% more grip strength than standard mounting clips. Their precision-engineered teeth create multiple contact points with both the nico and the mounting surface, distributing pressure evenly and preventing loosening even under vibration or temperature fluctuations. Additionally, our clamps use higher grade materials that resist bending and deformation, ensuring long-term reliability."
          }
        },
        {
          "@type": "Question",
          "name": "Are your nico clamps suitable for outdoor installations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our nico clamps are designed for both indoor and outdoor applications. For outdoor installations, we recommend our galvanized material, which provides excellent resistance to moisture, UV exposure, and temperature variations. The galvanized coating offers protection against rust and corrosion."
          }
        },
        {
          "@type": "Question",
          "name": "What size nico clamps do you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We manufacture nico clamps in standard sizes ranging from 15mm to 150mm, suitable for most common applications. Our most popular sizes are 75mm, 110mm. For specialized projects, we also offer custom sizing options to meet specific requirements. Our engineering team can design and produce nico clamps according to your exact specifications, including non-standard dimensions, custom load ratings, or special material requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What materials are your nico clamps made from?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our nico clamps are manufactured using three primary materials: galvanized material for general-purpose applications for corrosive environments, and carbon steel for high-strength requirements. The galvanized material clamps feature a zinc coating that provides excellent corrosion resistance."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum order quantity for nico clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard minimum order quantity is 2000 pieces for stock sizes of nico clamps. For bulk orders. For custom nico clamp designs or specialized requirements, minimum order quantities may vary based on manufacturing complexity and material requirements. Please contact our sales team for detailed information about custom orders and quantity-based pricing."
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

