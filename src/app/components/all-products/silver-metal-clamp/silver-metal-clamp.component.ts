import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-silver-metal-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './silver-metal-clamp.component.html',
  styleUrl: './silver-metal-clamp.component.scss'
})
export class SilverMetalClampComponent implements OnInit, AfterViewInit {
  showEnquiryForm: boolean = false;
  
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    // Initialize any client-side animations or scripts here
    if (isPlatformBrowser(this.platformId)) {
      this.initFaqToggle();
    }
  }

  ngOnInit() {
    // Set meta tags for SEO optimization - Specific to Silver Metal Clamps
    this.title.setTitle('Premium Silver Metal Clamps | Silver-Plated Hardware Solutions | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality silver metal clamps manufactured by JK Industries. Elegant silver-plated clamps ideal for premium installations, modern architecture & professional applications. Superior corrosion resistance with exceptional finish.' },
      { name: 'keywords', content: 'silver metal clamps, silver clamps, silver plated clamps, premium metal clamps, decorative silver clamps, architectural silver clamps, GI metal clamp, GI pipe clamp, silver pipe supports, silver fasteners, industrial silver clamps, galvanized pipe clamp, JK Industries, edler clamp, edler clamp manufacturer, edler clamp supplier, edler clamp exporter, edler clamp in india, edler clamp in rajkot, edler clamp in gujarat, edler clamp in india, edler clamp in rajkot, edler clamp in gujarat' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://edlerclamp.com/products/silver-metal-clamp' },
      { property: 'og:title', content: 'Premium Silver Metal Clamps | Silver-Plated Hardware Solutions | JK Industries' },
      { property: 'og:description', content: 'High-quality silver metal clamps manufactured by JK Industries. Elegant silver-plated clamps for premium applications with exceptional durability and finish.' },
      { property: 'og:image', content: 'https://edlerclamp.com/assets/products/upvc-metal-clamp.jpg' },
      { property: 'og:url', content: 'https://edlerclamp.com/products/silver-metal-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium Silver Metal Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality silver metal clamps for premium applications. Elegant appearance with superior durability.' },
      { name: 'twitter:image', content: 'https://edlerclamp.com/assets/products/upvc-metal-clamp.jpg' }
    ]);

    // Add structured data only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.addProductSchema();
      this.addFaqSchema();
    }
  }

  // For FAQ toggling
  toggleFaq(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      const question = event.currentTarget as HTMLElement;
      const answer = question.nextElementSibling as HTMLElement;
      
      question.classList.toggle('active');
      
      if (question.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    }
  }

  // Initialize FAQ toggle behavior
  initFaqToggle() {
    const faqAnswers = document.querySelectorAll('.faq-answer');
    faqAnswers.forEach(answer => {
      (answer as HTMLElement).style.maxHeight = '0';
    });
  }

  // Download product brochure
  downloadBrochure() {
    // Implement download functionality or redirect to contact form
    alert('Thank you for your interest! Our product brochure will be available shortly. Our team will contact you with more information.');
  }

  // Add structured data for product
  addProductSchema() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Premium Silver Metal Clamps",
      "image": "https://edlerclamp.com/assets/products/upvc-metal-clamp.jpg",
      "description": "High-quality silver metal clamps manufactured with premium silver plating for durability, corrosion resistance, and elegant appearance in professional applications.",
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
        "reviewCount": "102"
      }
    });
    document.head.appendChild(script);
  }

  // Add structured data for FAQs
  addFaqSchema() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What makes silver metal clamps different from standard metal clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Silver metal clamps feature a specialized silver plating that provides enhanced corrosion resistance and a premium aesthetic appearance. Unlike standard metal clamps, our silver-plated versions offer superior protection against environmental factors while providing an elegant finish that's ideal for visible installations in premium environments."
          }
        },
        {
          "@type": "Question",
          "name": "How long does the silver plating last in different environments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our silver metal clamps are designed for long-term durability with plating that lasts 10+ years in indoor applications and 5-7 years in controlled outdoor environments. The specialized plating process includes protective layers that resist tarnishing and maintain the silver appearance much longer than standard platings. For harsh chemical or marine environments, we recommend consulting with our technical team for specific recommendations."
          }
        },
        {
          "@type": "Question",
          "name": "Are silver metal clamps suitable for outdoor applications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our silver metal clamps can be used in protected outdoor applications. They feature enhanced corrosion resistance with specialized protective coatings over the silver plating. For fully exposed outdoor installations or harsh environments, we offer specific variants with additional UV and weather protection. We recommend discussing your specific outdoor application with our technical team to ensure you select the optimal product for long-term performance."
          }
        },
        {
          "@type": "Question",
          "name": "Can silver metal clamps be customized for specific project requirements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! JK Industries offers comprehensive customization options for our silver metal clamps. We can accommodate specific dimensions, load requirements, mounting configurations, and even variations in the silver finish (from bright mirror to satin). Our engineering team works closely with clients to design custom solutions for unique applications, ensuring perfect integration with your project specifications."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum order quantity for silver metal clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer flexible ordering options to accommodate various project sizes. For standard sizes of our silver metal clamps, the minimum order quantity is typically 5000 pieces. For custom designs or special specifications, minimum quantities may vary based on manufacturing requirements. We also offer sample orders for testing and evaluation purposes. Please contact our sales team for specific details regarding your project needs."
          }
        }
      ]
    });
    document.head.appendChild(script);
  }
}
