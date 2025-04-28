import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-stainless-steel-clamp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './stainless-steel-clamp.component.html',
  styleUrl: './stainless-steel-clamp.component.scss'
})
export class StainlessSteelClampComponent implements OnInit, AfterViewInit {
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
    // Set meta tags for SEO optimization
    this.title.setTitle('Premium Stainless Steel Clamps | Industrial SS Clamps | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality stainless steel clamps manufactured by JK Industries. Corrosion-resistant SS clamps ideal for industrial, marine & chemical applications. Premium SS304 & SS316 grade.' },
      { name: 'keywords', content: 'stainless steel clamps, SS clamps, industrial clamps, SS202 clamps, pipe clamps, marine grade clamps, corrosion resistant clamps, stainless steel pipe clamps, industrial stainless steel clamps, premium SS clamps' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/stainless-steel-clamp' },
      { property: 'og:title', content: 'Premium Stainless Steel Clamps | Industrial SS Clamps | JK Industries' },
      { property: 'og:description', content: 'High-quality stainless steel clamps manufactured by JK Industries. Corrosion-resistant SS clamps ideal for industrial, marine & chemical applications.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/stainless-steel-clamp' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium Stainless Steel Clamps | JK Industries' },
      { name: 'twitter:description', content: 'High-quality stainless steel clamps for industrial applications. Corrosion-resistant and durable.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg' }
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
      "name": "Premium Stainless Steel Clamps",
      "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
      "description": "High-quality stainless steel clamps manufactured using premium SS304 and SS316 materials, offering exceptional corrosion resistance and durability for industrial applications.",
      "sku": "SS-CL-001",
      "mpn": "JKIND-SSCL-001",
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
        "reviewCount": "75"
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
          "name": "What makes stainless steel clamps better than regular steel clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stainless steel clamps offer superior corrosion resistance, longer service life, and better performance in extreme environments. Unlike regular steel clamps, SS clamps don't rust when exposed to moisture or chemicals, making them ideal for critical applications where reliability is essential. They also maintain their structural integrity at higher temperatures."
          }
        },
        {
          "@type": "Question",
          "name": "Are your SS clamps suitable for outdoor applications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our stainless steel clamps are perfect for outdoor applications. They resist corrosion from rain, humidity, UV exposure, and environmental pollutants."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer custom sizes for stainless steel clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we manufacture custom-sized stainless steel clamps according to specific requirements. Our engineering team can design and produce clamps for non-standard diameters, unique load requirements, or special applications. Please contact our sales team with your specifications for a custom quote."
          }
        },
        {
          "@type": "Question",
          "name": "What grade of stainless steel do you use for your clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We primarily use SS202 (austenitic stainless steel) for standard applications for marine and highly corrosive environments. Both grades offer excellent corrosion resistance and mechanical properties. We can also source and manufacture using other specialized grades upon request."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum order quantity for SS clamps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard minimum order quantity is 5000 pieces for stock sizes. However, we understand that different projects have different requirements, so we're flexible with order quantities. For custom sizes or specifications, minimum order quantities may vary. Please contact our sales team for specific information."
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
