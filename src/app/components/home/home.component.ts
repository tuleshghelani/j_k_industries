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
      description: 'High-quality Edler Clamp stainless steel pipe clamps for industrial applications',
      image: 'assets/products/stainless-steel-clamp.jpg',
      keywords: 'Edler Clamp pipe clamps, industrial clamps, stainless steel clamps'
    },
    {
      name: 'Nico Clamps',
      description: 'Durable Edler Clamp stainless steel nico clamps with superior grip',
      image: 'assets/products/nico-clamp.jpg',
      keywords: 'Edler Clamp nico clamps, steel clamps, grip clamps'
    },
    {
      name: 'UPVC Metal Clamps',
      description: 'Precision-engineered Edler Clamp metal fitting clamps for secure connections',
      image: 'assets/products/upvc-metal-clamp.jpg',
      keywords: 'Edler Clamp UPVC clamps, CPVC clamps, metal fitting clamps'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    // Set meta tags for SEO
    this.title.setTitle('Edler Clamp by JK Industries - Premium Industrial Clamps & Hardware Solutions');
    
    this.meta.addTags([
      { name: 'description', content: 'Edler Clamp by JK Industries - Leading manufacturer of high-quality industrial clamps, pipe clamps, nico clamps, and UPVC CPVC metal clamps since 2010. Premium engineering and durability guaranteed.' },
      { name: 'keywords', content: 'Edler Clamp, industrial clamps, pipe clamps, nico clamps, UPVC metal clamps, CPVC metal clamps, stainless steel clamps, premium clamps, clamp manufacturer, double nail clamp' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Edler Clamp by JK Industries - Premium Industrial Clamps & Hardware Solutions' },
      { property: 'og:description', content: 'Leading manufacturer of high-quality Edler Clamp industrial clamps, pipe clamps, nico clamps, and hardware solutions since 2010.' },
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
      this.addFaqSchema();
    }
  }

  private addOrganizationSchema() {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Edler Clamp by JK Industries",
      "url": "https://jkindustriesrajkot.com",
      "logo": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "description": "Leading manufacturer of high-quality Edler Clamp industrial products, pipe clamps, nico clamps, and UPVC CPVC metal clamps since 2010.",
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
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "124"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Rajesh Patel"
          },
          "datePublished": "2023-05-12",
          "reviewBody": "Edler Clamp has been our trusted supplier for premium pipe clamps for over 5 years. Their quality and durability are unmatched in the industry."
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Sunil Mehta"
          },
          "datePublished": "2023-07-18",
          "reviewBody": "The UPVC clamps from Edler Clamp were delivered promptly and exceeded our quality expectations. Highly recommended for any industrial clamp needs."
        }
      ]
    };

    this.appendSchemaToHead(organizationSchema);
  }

  private addProductSchema() {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Edler Clamp Industrial Clamps by JK Industries",
      "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
      "description": "Premium quality Edler Clamp industrial products including pipe clamps, nico clamps, and UPVC CPVC metal clamps for various applications.",
      "brand": {
        "@type": "Brand",
        "name": "Edler Clamp"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "100",
        "highPrice": "5000",
        "offerCount": "50+",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "218"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Ashok Kumar"
          },
          "datePublished": "2023-08-25",
          "reviewBody": "We've been using Edler Clamp's stainless steel pipe clamps for our chemical plant, and they've held up perfectly even in the harshest conditions."
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Pradeep Singh"
          },
          "datePublished": "2023-10-03",
          "reviewBody": "The CPVC double nail clamps from Edler Clamp are top quality. Installation is quick and they provide excellent stability for our hot water systems."
        }
      ]
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
          "name": "What types of clamps does Edler Clamp manufacture?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Edler Clamp by JK Industries manufactures a wide range of premium clamps including pipe clamps, nico clamps, UPVC/CPVC clamps, and custom industrial clamp solutions."
          }
        },
        {
          "@type": "Question",
          "name": "Are Edler Clamp products durable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all Edler Clamp products are manufactured with premium materials and precision engineering, ensuring exceptional durability and performance in industrial applications."
          }
        },
        {
          "@type": "Question",
          "name": "Does Edler Clamp offer customized industrial clamp solutions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Edler Clamp specializes in both standard and custom industrial clamp solutions to meet specific industry requirements. Contact us for personalized clamp manufacturing services."
          }
        },
        {
          "@type": "Question",
          "name": "What materials are used in Edler Clamp products?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Edler Clamp products are manufactured using high-quality materials including stainless steel, galvanized steel, UPVC, CPVC, and other premium metals with corrosion-resistant coatings suitable for various industrial applications."
          }
        },
        {
          "@type": "Question",
          "name": "How can I order Edler Clamp products?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can order Edler Clamp products by contacting our sales team directly through our website's contact form, by phone at +919979032430, or by visiting our facility in Rajkot, Gujarat."
          }
        }
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
