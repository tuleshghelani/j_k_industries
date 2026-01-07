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
      name: 'UPVC Metal Clamp',
      description: 'Premium powder coated UPVC metal clamps for secure pipe installations. Corrosion-resistant and durable.',
      image: 'assets/products/upvc-metal-clamp.jpg',
      keywords: 'UPVC metal clamp, UPVC pipe clamp, powder coated metal clamp',
      url: '/products/upvc-metal-clamp',
      price: 1.5
    },
    {
      name: 'CPVC Metal Clamp',
      description: 'High-temperature resistant CPVC metal clamps designed for hot water systems and industrial applications.',
      image: 'assets/products/cpvc-metal-clamp.jpg',
      keywords: 'CPVC metal clamp, CPVC pipe clamp, hot water metal clamp',
      url: '/products/cpvc-metal-clamp',
      price: 1.5
    },
    {
      name: 'Stainless Steel Metal Clamp',
      description: 'Marine-grade stainless steel metal clamps with superior corrosion resistance for industrial environments.',
      image: 'assets/products/stainless-steel-clamp.jpg',
      keywords: 'stainless steel metal clamp, SS metal clamp, industrial metal clamp',
      url: '/products/stainless-steel-clamp',
      price: 2.05
    },
    {
      name: 'UPVC Double Nail Metal Clamp',
      description: 'Dual-nail securing metal clamp system for enhanced pipe stability and load distribution.',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      keywords: 'double nail metal clamp, nail clamp, pipe nail clamp',
      url: '/products/upvc-double-nail-clamp',
      price: 1.5
    },
    {
      name: 'Golden Metal Clamp',
      description: 'Luxury gold-plated metal clamps for premium visible installations and high-end projects.',
      image: 'assets/products/golden-metal-clamp.jpg',
      keywords: 'golden metal clamp, gold plated clamp, premium metal clamp',
      url: '/products/golden-metal-clamp',
      price: 7,
    },
    {
      name: 'Silver Metal Clamp',
      description: 'Elegant silver-plated metal clamps with superior aesthetics for commercial and residential spaces.',
      image: 'assets/products/stainless-steel-clamp.jpg',
      keywords: 'silver metal clamp, silver plated clamp, decorative metal clamp',
      url: '/products/silver-metal-clamp',
      price: 4
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    // Set meta tags for SEO - optimized for 'metal clamp' keyword
    this.title.setTitle('Metal Clamp Manufacturer India | UPVC CPVC Metal Clamps | Edler Clamp by JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'Leading metal clamp manufacturer in India. Edler Clamp by JK Industries offers premium UPVC metal clamps, CPVC metal clamps, stainless steel metal clamps, nail clamps & powder coated metal clamps in Rajkot, Gujarat since 2010.' },
      { name: 'keywords', content: 'metal clamp, metal clamp manufacturer, UPVC metal clamp, CPVC metal clamp, stainless steel metal clamp, nail clamp, double nail clamp, pipe clamp, powder coated metal clamp, metal clamp India, metal clamp Rajkot, Edler Clamp, JK Industries' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Metal Clamp Manufacturer India | Edler Clamp by JK Industries' },
      { property: 'og:description', content: 'Premium metal clamp manufacturer in Rajkot, Gujarat. UPVC metal clamps, CPVC metal clamps, stainless steel clamps since 2010.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/logo/jk_logo.png' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Metal Clamp Manufacturer India | Edler Clamp' },
      { name: 'twitter:description', content: 'Premium metal clamp manufacturer - UPVC, CPVC, stainless steel metal clamps.' }
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
      this.addItemListSchema();
      this.addBreadcrumbSchema();
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
        "postalCode": "360004",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919979032430",
        "contactType": "Customer Service"
      },
      "sameAs": [
        "https://www.instagram.com/jk_industries_1995/",
        "https://www.linkedin.com/company/jk-industries-india/"
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

  private addItemListSchema() {
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Metal Clamp Products by Edler Clamp",
      "description": "Premium metal clamp products manufactured by JK Industries under the Edler Clamp brand",
      "numberOfItems": this.featuredProducts.length,
      "itemListElement": this.featuredProducts.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": `https://jkindustriesrajkot.com/${product.image}`,
          "url": `https://jkindustriesrajkot.com${product.url}`,
          "brand": {
            "@type": "Brand",
            "name": "Edler Clamp"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "JK Industries"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "deliveryLeadTime" : "7 Days",
            "availability": "https://schema.org/InStock",
            "price": product.price
          }
        }
      }))
    };

    this.appendSchemaToHead(itemListSchema);
  }

  private addBreadcrumbSchema() {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://jkindustriesrajkot.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Metal Clamp Products",
          "item": "https://jkindustriesrajkot.com/products"
        }
      ]
    };

    this.appendSchemaToHead(breadcrumbSchema);
  }

  private appendSchemaToHead(schema: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
