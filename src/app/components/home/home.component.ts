import { Component, OnInit, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageSliderComponent } from "../../shared/components/image-slider/image-slider.component";
import * as AOS from 'aos';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  yearsOfExperience: number = new Date().getFullYear() - 2010;
  experienceText: string = this.yearsOfExperience + '+';
  featuredProducts = [
    {
      name: 'Premium Stainless Steel Clamps',
      description: 'High-quality stainless steel pipe clamps for industrial applications',
      image: 'assets/products/stainless-steel-clamp.jpg',
      keywords: 'pipe clamps, industrial clamps, stainless steel clamps'
    },
    {
      name: 'Nico Clamps',
      description: 'Durable stainless steel nico clamps with superior grip',
      image: 'assets/products/nico-clamp.jpg',
      keywords: 'nico clamps, steel clamps, grip clamps'
    },
    {
      name: 'UPVC Metal Clamps',
      description: 'Precision-engineered metal fitting clamps for secure connections',
      image: 'assets/products/upvc-metal-clamp.jpg',
      keywords: 'UPVC clamps, CPVC clamps, metal fitting clamps'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    // Set meta tags for SEO
    this.title.setTitle('JK Industries - Premium Industrial Clamps & Hardware Solutions');
    
    this.meta.addTags([
      { name: 'description', content: 'JK Industries - Leading manufacturer of high-quality industrial clamps, pipe clamps, nico clamps, and UPVC CPVC metal clamps since 2010. Premium engineering and durability guaranteed.' },
      { name: 'keywords', content: 'industrial clamps, pipe clamps, nico clamps, UPVC metal clamps, CPVC metal clamps, stainless steel clamps, premium clamps, clamp manufacturer, double nail clamp' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'JK Industries - Premium Industrial Clamps & Hardware Solutions' },
      { property: 'og:description', content: 'Leading manufacturer of high-quality industrial clamps, pipe clamps, nico clamps, and hardware solutions since 2010.' },
      { property: 'og:image', content: 'assets/logo/jk_logo.png' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]);
    
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.addOrganizationSchema();
      this.addProductSchema();
    }
  }

  private addOrganizationSchema() {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "JK Industries",
      "url": "https://jkindustriesrajkot.com",
      "logo": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "description": "Leading manufacturer of high-quality industrial clamps, pipe clamps, nico clamps, and UPVC CPVC metal clamps since 2010.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360005",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919979032430",
        "contactType": "Customer Service"
      },
      "sameAs": [
        "https://www.facebook.com/jkindustries",
        "https://www.linkedin.com/company/jk-industries"
      ]
    };

    this.appendSchemaToHead(organizationSchema);
  }

  private addProductSchema() {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Industrial Clamps by JK Industries",
      "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
      "description": "Premium quality industrial clamps including pipe clamps, nico clamps, and UPVC CPVC metal clamps for various applications.",
      "brand": {
        "@type": "Brand",
        "name": "JK Industries"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      }
    };

    this.appendSchemaToHead(productSchema);
  }

  private addFaqSchema() {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of clamps does JK Industries manufacture?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JK Industries manufactures a wide range of premium clamps including pipe clamps, nico clamps, UPVC/CPVC clamps, and custom industrial clamp solutions."
          }
        },
      ]
    };
    
    this.appendSchemaToHead(faqSchema);
  }

  private appendSchemaToHead(schema: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
