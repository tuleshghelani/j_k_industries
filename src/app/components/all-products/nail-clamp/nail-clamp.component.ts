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
    // Set meta tags for SEO optimization - Updated for Nail Clamps
    this.title.setTitle('Premium Industrial Nail Clamps | Construction & Industrial Mounting Solutions | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality industrial nail clamps manufactured by JK Industries. Superior grip strength and durability for construction, manufacturing, and installation applications. Available in galvanized and stainless steel.' },
      { name: 'keywords', content: 'nail clamps, industrial nail clamps, construction nail clamps, pipe mounting clamps, heavy duty nail clamps, galvanized nail clamps, stainless steel nail clamps, nail fasteners, mounting clamps, JK Industries nail clamps' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Premium Industrial Nail Clamps | Construction & Industrial Mounting Solutions | JK Industries' },
      { property: 'og:description', content: 'High-quality industrial nail clamps manufactured by JK Industries. Superior grip strength for construction and industrial applications.' },
      { property: 'og:image', content: 'https://www.jkindustriesrajkot.com/assets/products/nail-clamp.jpg' },
      { property: 'og:url', content: 'https://www.jkindustriesrajkot.com/products/nail-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium Industrial Nail Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality nail clamps for construction and industrial applications. Superior grip strength and durability.' },
      { name: 'twitter:image', content: 'https://www.jkindustriesrajkot.com/assets/products/nail-clamp.jpg' }
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
    alert('Nail Clamp specifications will be downloaded shortly.');
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
      "name": "Premium Industrial Nail Clamps",
      "image": "https://www.jkindustriesrajkot.com/assets/products/nail-clamp.jpg",
      "description": "High-quality industrial nail clamps manufactured for superior grip strength and durability in construction and industrial applications.",
      "sku": "NC-001",
      "mpn": "JKIND-NC-001",
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
        "url": "https://www.jkindustriesrajkot.com/products/nail-clamp",
        "priceCurrency": "INR",
        "priceValidUntil": "2023-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
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
          "name": "What makes JK nail clamps better than standard mounting clips?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JK nail clamps feature a patented interlocking design that provides 40% more grip strength than standard mounting clips. Their precision-engineered teeth create multiple contact points with both the nail and the mounting surface, distributing pressure evenly and preventing loosening even under vibration or temperature fluctuations. Additionally, our clamps use higher grade materials that resist bending and deformation, ensuring long-term reliability."
          }
        },
        {
          "@type": "Question",
          "name": "Are your nail clamps suitable for outdoor installations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our nail clamps are designed for both indoor and outdoor applications. For outdoor installations, we recommend our galvanized steel or stainless steel options, which provide excellent resistance to moisture, UV exposure, and temperature variations. The galvanized coating offers protection against rust and corrosion, while our stainless steel variants deliver superior performance in coastal or high-moisture environments."
          }
        },
        {
          "@type": "Question",
          "name": "What size nail clamps do you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We manufacture nail clamps in standard sizes ranging from 8mm to 32mm, suitable for most common applications. Our most popular sizes are 10mm, 15mm, 20mm, and 25mm. For specialized projects, we also offer custom sizing options to meet specific requirements. Our engineering team can design and produce nail clamps according to your exact specifications, including non-standard dimensions, custom load ratings, or special material requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What materials are your nail clamps made from?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our nail clamps are manufactured using three primary materials: galvanized steel for general-purpose applications, stainless steel for corrosive environments, and carbon steel for high-strength requirements. The galvanized steel clamps feature a zinc coating that provides excellent corrosion resistance. Stainless steel options are available in SS304 and SS316 grades for superior performance in harsh conditions. Carbon steel clamps undergo heat treatment to enhance their strength and durability."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum order quantity for nail clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard minimum order quantity is 100 pieces for stock sizes of nail clamps. For bulk orders, we offer competitive price breaks at 500, 1000, and 5000 pieces. For custom nail clamp designs or specialized requirements, minimum order quantities may vary based on manufacturing complexity and material requirements. Please contact our sales team for detailed information about custom orders and quantity-based pricing."
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

