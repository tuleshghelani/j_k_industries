import { Component, OnInit, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageSliderComponent } from "../../shared/components/image-slider/image-slider.component";
import * as AOS from 'aos';
import { Meta, Title } from '@angular/platform-browser';

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

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
      name: 'Metal Clamp',
      description: 'Premium SS Metal Clamps in 0.5mm & 1mm thickness for UPVC & CPVC pipes. Superior corrosion resistance and durability.',
      image: 'assets/products/stainless-steel-clamp.jpg',
      keywords: 'Metal Clamp, SS Metal Clamp, Stainless Steel Clamp, SS Clamp',
      url: '/products/metal-clamp',
      price: 2.05
    },
    {
      name: 'UPVC Double Nail Clamp',
      description: 'Premium UPVC Clamps with dual nail fastening system. Ideal for cold water plumbing applications.',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      keywords: 'UPVC Clamp, UPVC Nail Clamp, UPVC Double Nail Clamp, Nail Clamp',
      url: '/products/upvc-double-nail-clamp',
      price: 1.5
    },
    {
      name: 'CPVC Double Nail Clamp',
      description: 'Heat-resistant CPVC Clamps designed for hot water systems. Advanced dual nail technology.',
      image: 'assets/products/cpvc-double-nail-clamp.jpg',
      keywords: 'CPVC Clamp, CPVC Nail Clamp, CPVC Double Nail Clamp, Hot Water Clamp',
      url: '/products/cpvc-double-nail-clamp',
      price: 1.5
    },
    {
      name: 'UPVC Metal Clamp',
      description: 'Premium powder coated UPVC metal clamps for secure pipe installations. Corrosion-resistant.',
      image: 'assets/products/upvc-metal-clamp.jpg',
      keywords: 'UPVC Metal Clamp, UPVC Pipe Clamp, Powder Coated Clamp',
      url: '/products/upvc-metal-clamp',
      price: 1.5
    },
    {
      name: 'CPVC Metal Clamp',
      description: 'High-temperature resistant CPVC metal clamps designed for hot water systems.',
      image: 'assets/products/cpvc-metal-clamp.jpg',
      keywords: 'CPVC Metal Clamp, CPVC Pipe Clamp, Hot Water Metal Clamp',
      url: '/products/cpvc-metal-clamp',
      price: 1.5
    },
    {
      name: 'Step Clamp',
      description: 'Versatile step clamps for multiple pipe sizes. Adjustable design for flexible pipe support.',
      image: 'assets/products/step-clamp.jpg',
      keywords: 'Step Clamp, Adjustable Clamp, Multi-size Clamp',
      url: '/products/step-clamp',
      price: 3
    }
  ];

  // Enhanced FAQs for SEO
  faqs: FAQ[] = [
    {
      question: 'What is a Metal Clamp and what is it used for?',
      answer: 'A Metal Clamp is a pipe support device made from stainless steel (SS202 or SS304) used to secure and stabilize pipes in plumbing, HVAC, and industrial applications. Metal Clamps from JK Industries are available in 0.5mm and 1mm thickness for UPVC and CPVC pipes.'
    },
    {
      question: 'What types of clamps does JK Industries manufacture?',
      answer: 'JK Industries (Edler Clamp) manufactures Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps, SS Clamps, Stainless Steel Clamps, Step Clamps, Sprinkler Clamps, and PTMT Connection Pipes. We are India\'s leading clamp manufacturer since 2010.'
    },
    {
      question: 'What is the difference between UPVC Clamp and CPVC Clamp?',
      answer: 'UPVC Clamps are designed for cold water applications (up to 60°C), while CPVC Clamps are heat-resistant and suitable for hot water systems (up to 93°C). Both feature our patented dual nail fastening system for superior holding power.'
    },
    {
      question: 'What is a Nail Clamp and how does it differ from regular clamps?',
      answer: 'A Nail Clamp features integrated nails for direct wall mounting, eliminating the need for separate fasteners. Our Double Nail Clamps provide 40% more holding power than single-nail designs. Available in UPVC and CPVC variants.'
    },
    {
      question: 'What sizes of Metal Clamps are available?',
      answer: 'Our Metal Clamps are available in sizes from 1/2 inch to 6 inches, suitable for UPVC and CPVC pipes. We offer both 0.5mm and 1mm thickness options for different load requirements.'
    },
    {
      question: 'Are your Metal Clamps corrosion-resistant?',
      answer: 'Yes, our Metal Clamps are made from SS202 and SS304 grade stainless steel, providing excellent corrosion resistance. They are suitable for marine, chemical processing, and outdoor applications.'
    },
    {
      question: 'What is the price of Metal Clamps in India?',
      answer: 'Metal Clamp prices vary based on size and thickness. Contact JK Industries for competitive factory-direct pricing on Metal Clamps, UPVC Clamps, CPVC Clamps, and Nail Clamps. We offer wholesale rates for bulk orders.'
    },
    {
      question: 'Do you deliver Metal Clamps across India?',
      answer: 'Yes, JK Industries delivers Metal Clamps, UPVC Clamps, CPVC Clamps, and all clamp products across India. We ship to all major cities including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and Ahmedabad.'
    },
    {
      question: 'Is JK Industries ISO certified for Metal Clamp manufacturing?',
      answer: 'Yes, JK Industries is ISO 9001:2015 certified for Metal Clamp, UPVC Clamp, CPVC Clamp, and Nail Clamp manufacturing. Our quality management system ensures consistent product quality.'
    },
    {
      question: 'How to choose the right clamp for my application?',
      answer: 'For cold water pipes, choose UPVC Clamps. For hot water systems, select CPVC Clamps. For heavy-duty industrial use, Metal Clamps (SS Clamps) are recommended. Contact our experts for personalized recommendations.'
    }
  ];

  // Enhanced Testimonials
  testimonials: Testimonial[] = [
    {
      name: 'Rajesh Patel',
      role: '',
      content: 'Edler Clamp Metal Clamps are the best in India. We\'ve been using their UPVC Clamps and CPVC Clamps for 5 years. Exceptional quality and durability.',
      rating: 5
    },
    {
      name: 'Sunil Mehta',
      role: 'Industrial Engineer',
      content: 'The SS Metal Clamps from JK Industries exceeded our expectations. Their Nail Clamps have revolutionized our pipe installations. Highly recommended.',
      rating: 5
    },
    {
      name: 'Pradeep Singh',
      role: 'HVAC Specialist',
      content: 'Best Metal Clamp manufacturer in India. The CPVC Double Nail Clamps are perfect for hot water systems. Factory-direct pricing is unbeatable.',
      rating: 5
    },
    {
      name: 'Ashok Kumar',
      role: 'Building Contractor',
      content: 'JK Industries delivers premium UPVC Clamps and Metal Clamps at competitive prices. Their customer service and delivery are excellent.',
      rating: 5
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.updateSeo();
    
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.addOrganizationSchema();
      this.addLocalBusinessSchema();
      this.addProductSchema();
      this.addFaqSchema();
      this.addItemListSchema();
      this.addBreadcrumbSchema();
      this.addWebPageSchema();
      this.addGraphSchema();
    }
  }

  private updateSeo() {
    // Enhanced title with primary keyword
    this.title.setTitle('Metal Clamp Manufacturer India | UPVC Clamp | CPVC Clamp | Nail Clamp | Edler Clamp by JK Industries');
    
    this.meta.addTags([
      // Primary meta description with all keywords
      { name: 'description', content: 'India\'s #1 Metal Clamp Manufacturer. JK Industries (Edler Clamp) manufactures premium Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps, SS Clamps & Stainless Steel Clamps since 2010. ISO Certified. Factory Direct Prices. Buy Metal Clamp Online.' },
      { name: 'keywords', content: 'Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp, SS Clamp, Stainless Steel Clamp, Metal Clamp Manufacturer, UPVC Clamp Manufacturer, CPVC Clamp Manufacturer, Nail Clamp Manufacturer, Pipe Clamp, SS Metal Clamp, Metal Clamp India, UPVC Clamp Rajkot, CPVC Clamp Gujarat, Nail Clamp Manufacturer India, Double Nail Clamp, UPVC Double Nail Clamp, CPVC Double Nail Clamp, Metal Clamp Rajkot, Metal Clamp Gujarat, Edler Clamp, JK Industries' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'Metal Clamp Manufacturer India | UPVC Clamp | CPVC Clamp | Nail Clamp | Edler Clamp' },
      { property: 'og:description', content: 'India\'s #1 Metal Clamp Manufacturer. Premium UPVC Clamps, CPVC Clamps, Nail Clamps & SS Clamps. ISO Certified. Factory Direct Prices.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/logo/jk_logo.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'JK Industries - Metal Clamp, UPVC Clamp, CPVC Clamp Manufacturer' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'JK Industries - Edler Clamp' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Metal Clamp Manufacturer India | UPVC Clamp | CPVC Clamp | Edler Clamp' },
      { name: 'twitter:description', content: 'India\'s leading Metal Clamp, UPVC Clamp, CPVC Clamp & Nail Clamp manufacturer since 2010. ISO Certified. Factory Direct Prices.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/logo/jk_logo.png' },
      { name: 'twitter:image:alt', content: 'JK Industries Metal Clamp Manufacturer' },
      
      // Article meta tags
      { property: 'article:section', content: 'Industrial Products' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'UPVC Clamp' },
      { property: 'article:tag', content: 'CPVC Clamp' },
      { property: 'article:tag', content: 'Nail Clamp' }
    ]);
  }

  private addOrganizationSchema() {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "JK Industries",
      "alternateName": ["Edler Clamp", "JK Industries", "Metal Clamp Manufacturer"],
      "url": "https://jkindustriesrajkot.com",
      "logo": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "foundingDate": "2010",
      "description": "India's leading manufacturer of Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps, SS Clamps, and Stainless Steel Clamps. ISO 9001:2015 certified.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360004",
        "addressCountry": "India"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.25592000",
        "longitude": "70.78272000"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9979032430",
        "contactType": "sales",
        "availableLanguage": ["English", "Hindi", "Gujarati"],
        "areaServed": "IN"
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Metal Clamp - SS Metal Clamp",
            "description": "Premium Metal Clamps manufactured from SS202 and SS304 stainless steel. Available in 0.5mm and 1mm thickness for sizes 1/2\" to 6\". Superior corrosion resistance for industrial and marine applications.",
            "image": "https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/metal-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Stainless Steel Clamps",
            "material": "Stainless Steel SS202/SS304",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "2.00",
              "highPrice": "25.00",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "UPVC Double Nail Clamp",
            "description": "Premium UPVC Double Nail Clamps with dual fastening system providing 40% more holding power. Ideal for cold water applications. Available in sizes 1/2\" to 2\".",
            "image": "https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/upvc-double-nail-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Plastic Pipe Clamps",
            "material": "UPVC with Dual Nail Fastening",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "1.08",
              "highPrice": "6.63",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "CPVC Double Nail Clamp",
            "description": "Heat-resistant CPVC Double Nail Clamps engineered for hot water systems up to 93°C. Dual nail fastening technology for superior stability. Available in sizes 1/2\" to 2\".",
            "image": "https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Hot Water Clamps",
            "material": "CPVC with Dual Nail Fastening",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "1.00",
              "highPrice": "6.07",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "UPVC Metal Clamp",
            "description": "Premium powder coated UPVC Metal Clamps for secure pipe installations. Corrosion-resistant and durable for residential and commercial plumbing.",
            "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/upvc-metal-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Plastic Pipe Clamps",
            "material": "Mild Steel with Powder Coating",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "1.5",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "CPVC Metal Clamp",
            "description": "High-temperature resistant CPVC Metal Clamps designed for hot water systems and industrial applications. Premium powder coated finish.",
            "image": "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/cpvc-metal-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Hot Water Clamps",
            "material": "Mild Steel with Powder Coating",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "1.5",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Edler Nail Clamp - Nico Clamp",
            "description": "Premium Industrial Nico Clamps with integrated nail fastening for construction and industrial mounting solutions. Eliminates need for separate fasteners.",
            "image": "https://jkindustriesrajkot.com/assets/products/nail-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/nico-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Pipe Support Clamps",
            "material": "Galvanized Steel, Stainless Steel",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "1.5",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Stainless Steel Clamp - SS Clamp",
            "description": "Marine-grade Stainless Steel Clamps with superior corrosion resistance. Ideal for harsh industrial environments, chemical processing, and outdoor applications.",
            "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/stainless-steel-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Stainless Steel Clamps",
            "material": "Stainless Steel SS202/SS304",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "2.05",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Step Clamp - Multi-Size Pipe Clamp",
            "description": "Innovative Step Clamps with multi-size compatibility. A single clamp securely holds multiple pipe diameters, reducing inventory requirements.",
            "image": "https://jkindustriesrajkot.com/assets/products/step-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/step-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Step Clamps",
            "material": "Galvanized Steel, Stainless Steel",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "3.00",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Sprinkler Clamp",
            "description": "Specialized Sprinkler Clamps for irrigation and fire safety systems. Durable construction for outdoor applications with superior weather resistance.",
            "image": "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/sprinkler-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Sprinkler Clamps",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "4.00",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Golden Metal Clamp",
            "description": "Luxury Gold-Plated Metal Clamps for premium visible installations and high-end decorative projects. Elegant finish for commercial and residential spaces.",
            "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Premium Metal Clamps",
            "material": "Gold-Plated Metal",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "1.5",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Silver Metal Clamp",
            "description": "Elegant Silver-Plated Metal Clamps with superior aesthetics for commercial and residential spaces. Premium decorative finish.",
            "image": "https://jkindustriesrajkot.com/assets/products/silver-metal-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/silver-metal-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "Premium Metal Clamps",
            "material": "Silver-Plated Metal",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": "1.5",
              "availability": "https://schema.org/InStock"
            }
          }
        }
      ],
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "name": "ISO 9001:2015" }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "250"
      },
      "sameAs": [
        "https://www.linkedin.com/company/jk-industries-india/",
        "https://www.instagram.com/jk_industries_1995/"
      ]
    };

    this.appendSchemaToHead(organizationSchema);
  }

  private addLocalBusinessSchema() {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://jkindustriesrajkot.com/#localbusiness",
      "name": "JK Industries - Metal Clamp Manufacturer",
      "alternateName": ["Edler Clamp", "JK Industries Rajkot"],
      "image": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "telephone": "+91-9979032430",
      "email": "jkindustries1955@gmail.com",
      "url": "https://jkindustriesrajkot.com",
      "priceRange": "₹₹",
      "description": "India's #1 Metal Clamp Manufacturer. Premium UPVC Clamps, CPVC Clamps, Nail Clamps & SS Clamps. Factory direct prices with pan-India delivery.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360004",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.25592000",
        "longitude": "70.78272000"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "State", "name": "Gujarat" },
        { "@type": "State", "name": "Maharashtra" },
        { "@type": "State", "name": "Karnataka" },
        { "@type": "State", "name": "Tamil Nadu" },
        { "@type": "State", "name": "Rajasthan" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Metal Clamp, UPVC Clamp, CPVC Clamp & Pipe Clamp Products by JK Industries",
        "description": "Complete range of Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps, SS Clamps, Step Clamps, and plumbing accessories manufactured by JK Industries (Edler Clamp) in Rajkot, Gujarat",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Metal Clamps",
            "description": "Premium SS Metal Clamps and Stainless Steel Clamps in 0.5mm and 1mm thickness for UPVC and CPVC pipes",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Metal Clamp - SS Metal Clamp",
                  "description": "Premium Metal Clamps manufactured from SS202 and SS304 stainless steel. Available in 0.5mm and 1mm thickness for sizes 1/2\" to 6\". Superior corrosion resistance for industrial and marine applications.",
                  "image": "https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/metal-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Metal Clamps",
                  "material": "Stainless Steel SS202/SS304",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "2.00",
                    "highPrice": "25.00",
                    "availability": "https://schema.org/InStock"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Stainless Steel Clamp - SS Clamp",
                  "description": "Marine-grade Stainless Steel Clamps with superior corrosion resistance. Ideal for harsh industrial environments, chemical processing, and outdoor applications.",
                  "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/stainless-steel-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Stainless Steel Clamps",
                  "material": "Stainless Steel SS202/SS304",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "2.00",
                    "highPrice": "25.00",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "UPVC Clamps",
            "description": "Premium UPVC Clamps and UPVC Double Nail Clamps for cold water plumbing systems",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "UPVC Double Nail Clamp",
                  "description": "Premium UPVC Double Nail Clamps with dual fastening system providing 40% more holding power. Ideal for cold water applications. Available in sizes 1/2\" to 2\".",
                  "image": "https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/upvc-double-nail-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "UPVC Clamps",
                  "material": "UPVC with Dual Nail Fastening",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "1.08",
                    "highPrice": "6.63",
                    "availability": "https://schema.org/InStock"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "UPVC Metal Clamp",
                  "description": "Premium powder coated UPVC Metal Clamps for secure pipe installations. Corrosion-resistant and durable for residential and commercial plumbing.",
                  "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/upvc-metal-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "UPVC Metal Clamps",
                  "material": "Powder Coated Metal",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "1.30",
                    "highPrice": "15.00",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "CPVC Clamps",
            "description": "Heat-resistant CPVC Clamps and CPVC Double Nail Clamps designed for hot water systems",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "CPVC Double Nail Clamp",
                  "description": "Heat-resistant CPVC Double Nail Clamps engineered for hot water systems up to 93°C. Dual nail fastening technology for superior stability. Available in sizes 1/2\" to 2\".",
                  "image": "https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "CPVC Clamps",
                  "material": "CPVC with Dual Nail Fastening",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "1.00",
                    "highPrice": "6.07",
                    "availability": "https://schema.org/InStock"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "CPVC Metal Clamp",
                  "description": "High-temperature resistant CPVC Metal Clamps designed for hot water systems and industrial applications. Premium powder coated finish.",
                  "image": "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/cpvc-metal-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "CPVC Metal Clamps",
                  "material": "Powder Coated Metal",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "1.30",
                    "highPrice": "15.00",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Nail Clamps",
            "description": "Single and Double Nail Clamps with integrated fastening for direct wall mounting",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Nail Clamp - Nico Clamp",
                  "description": "Premium Industrial Nico Clamps with integrated nail fastening for construction and industrial mounting solutions. Eliminates need for separate fasteners.",
                  "image": "https://jkindustriesrajkot.com/assets/products/nail-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/nico-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Nail Clamps",
                  "material": "Galvanized Steel, Stainless Steel",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "1.50",
                    "highPrice": "15.00",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Step Clamps",
            "description": "Versatile Step Clamps for multiple pipe sizes with adjustable design",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Step Clamp - Multi-Size Pipe Clamp",
                  "description": "Innovative Step Clamps with multi-size compatibility. A single clamp securely holds multiple pipe diameters, reducing inventory requirements. Available in galvanized and stainless steel.",
                  "image": "https://jkindustriesrajkot.com/assets/products/step-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/step-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Step Clamps",
                  "material": "Galvanized Steel, Stainless Steel",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "3.00",
                    "highPrice": "30.00",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Specialty Clamps",
            "description": "Premium specialty clamps including Sprinkler Clamps, Golden Metal Clamps, and Silver Metal Clamps",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Sprinkler Clamp",
                  "description": "Specialized Sprinkler Clamps for irrigation and fire safety systems. Durable construction for outdoor applications with superior weather resistance.",
                  "image": "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/sprinkler-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Sprinkler Clamps",
                  "material": "Galvanized Steel, Stainless Steel",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "4.00",
                    "highPrice": "40.00",
                    "availability": "https://schema.org/InStock"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Golden Metal Clamp",
                  "description": "Luxury Gold-Plated Metal Clamps for premium visible installations and high-end decorative projects. Elegant finish for commercial and residential spaces.",
                  "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Premium Metal Clamps",
                  "material": "Gold-Plated Metal",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "7.00",
                    "highPrice": "70.00",
                    "availability": "https://schema.org/InStock"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Silver Metal Clamp",
                  "description": "Elegant Silver-Plated Metal Clamps with superior aesthetics for commercial and residential spaces. Premium decorative finish.",
                  "image": "https://jkindustriesrajkot.com/assets/products/silver-metal-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/silver-metal-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Premium Metal Clamps",
                  "material": "Silver-Plated Metal",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "1.5",
                    "highPrice": "11.50",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Plumbing Accessories",
            "description": "PTMT Connection Pipes and CPVC Concealed Valves for modern plumbing systems",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "PTMT Connection Pipe",
                  "description": "Advanced PTMT Connection Pipes with push-fit technology for modern plumbing systems. Available in lengths 12\", 18\", 24\", 30\", 36\", 40\", 48\", 60\". Temperature range -85°C to 95°C.",
                  "image": "https://jkindustriesrajkot.com/assets/products/ptmt-connection-pipe.jpg",
                  "url": "https://jkindustriesrajkot.com/products/ptmt-connection-pipe",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Plumbing Pipes",
                  "material": "PTMT (Polyoxymethylene Thermoplastic)",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "1.5",
                    "highPrice": "11.50",
                    "availability": "https://schema.org/InStock"
                  }
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "CPVC Concealed Valve",
                  "description": "Premium CPVC Concealed Valves for bathroom shower systems. Space-saving design with superior functionality for modern bathroom fittings.",
                  "image": "https://jkindustriesrajkot.com/assets/products/cpvc-concealed-valve.jpg",
                  "url": "https://jkindustriesrajkot.com/products/cpvc-concealed-valve",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Plumbing Valves",
                  "material": "CPVC",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "1.5",
                    "highPrice": "11.50",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }
            ]
          }
        ]
      }
    };

    this.appendSchemaToHead(localBusinessSchema);
  }

  private addProductSchema() {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Metal Clamp - Premium Clamps by Edler Clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg",
        "https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg"
      ],
      "description": "Premium Metal Clamps, UPVC Clamps, CPVC Clamps, and Nail Clamps manufactured by JK Industries (Edler Clamp). Available in sizes 1/2\" to 6\" for all pipe applications.",
      "brand": {
        "@type": "Brand",
        "name": "Edler Clamp"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "JK Industries"
      },
      "category": "Industrial Clamps",
      "material": "Stainless Steel SS202/SS304",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "250"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "1.00",
        "highPrice": "25.00",
        "offerCount": "50",
        "availability": "https://schema.org/InStock",
        "deliveryLeadTime": {
          "@type": "QuantitativeValue",
          "value": "7",
          "unitCode": "DAY"
        }
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": t.rating.toString(),
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": t.name
        },
        "reviewBody": t.content
      }))
    };

    this.appendSchemaToHead(productSchema);
  }

  private addFaqSchema() {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": this.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    
    this.appendSchemaToHead(faqSchema);
  }

  private addItemListSchema() {
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp Products by Edler Clamp",
      "description": "Premium Metal Clamps, UPVC Clamps, CPVC Clamps, and Nail Clamps manufactured by JK Industries",
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
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "deliveryLeadTime": {
              "@type": "QuantitativeValue",
              "value": "7",
              "unitCode": "DAY"
            }
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
          "name": "Home - Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp Manufacturer",
          "item": "https://jkindustriesrajkot.com"
        }
      ]
    };

    this.appendSchemaToHead(breadcrumbSchema);
  }

  private addWebPageSchema() {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/#webpage",
      "url": "https://jkindustriesrajkot.com",
      "name": "Metal Clamp Manufacturer India | UPVC Clamp | CPVC Clamp | Nail Clamp | Edler Clamp by JK Industries",
      "description": "India's #1 Metal Clamp Manufacturer. Premium UPVC Clamps, CPVC Clamps, Nail Clamps & SS Clamps. ISO Certified. Factory Direct Prices.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries - Edler Clamp",
        "description": "India's leading manufacturer of Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps",
        "publisher": { "@type": "Organization", "name": "JK Industries" }
      },
      "about": {
        "@type": "Organization",
        "name": "JK Industries",
        "description": "Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp Manufacturer"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".about-content h1", ".features h2", ".seo-content h2"]
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
        "caption": "JK Industries - Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp Manufacturer"
      }
    };

    this.appendSchemaToHead(webPageSchema);
  }

  private addGraphSchema() {
    const graphSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://jkindustriesrajkot.com/#organization",
          "name": "JK Industries",
          "alternateName": ["Edler Clamp", "JK Industries"],
          "url": "https://jkindustriesrajkot.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9979032430",
            "contactType": "sales",
            "availableLanguage": ["English", "Hindi", "Gujarati"],
            "areaServed": "IN"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
            "addressLocality": "Rajkot",
            "addressRegion": "Gujarat",
            "postalCode": "360004",
            "addressCountry": "IN"
          }
        },
        {
          "@type": "ItemList",
          "name": "Metal Clamp",
          "url": "https://jkindustriesrajkot.com",
          "numberOfItems": 12,
          "itemListElement": [
            {
              "@type": "Product",
              "position": 1,
              "name": "Metal Clamp - SS Metal Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/metal-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/metal-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "material": "Stainless Steel SS202/SS304",
              "description": "Premium Metal Clamps manufactured from SS202 and SS304 stainless steel. Available in 0.5mm and 1mm thickness for sizes 1/2\" to 6\". Superior corrosion resistance for industrial and marine applications.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "2.05",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 2,
              "name": "Stainless Steel Clamp - SS Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/stainless-steel-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "material": "Stainless Steel SS202/SS304",
              "description": "Marine-grade Stainless Steel Clamps with superior corrosion resistance. Ideal for harsh industrial environments, chemical processing, and outdoor applications.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "2.05",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 3,
              "name": "UPVC Double Nail Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/upvc-double-nail-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/upvc-double-nail-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "material": "UPVC with Dual Nail Fastening",
              "description": "Premium UPVC Double Nail Clamps with dual fastening system providing 40% more holding power. Ideal for cold water applications. Available in sizes 1/2\" to 2\".",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "1.08",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 4,
              "name": "UPVC Metal Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/upvc-metal-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/upvc-metal-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "material": "Mild Steel with Powder Coating",
              "description": "UPVC powder coated metal clamp suitable for plumbing applications. Premium powder coated finish for corrosion resistance.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "1.5",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 5,
              "name": "CPVC Double Nail Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/cpvc-double-nail-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/cpvc-double-nail-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "material": "CPVC with Dual Nail Fastening",
              "description": "Heat-resistant CPVC Double Nail Clamps engineered for hot water systems up to 93°C. Dual nail fastening technology for superior stability. Available in sizes 1/2\" to 2\".",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "1.00",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 6,
              "name": "CPVC Metal Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/cpvc-metal-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/cpvc-metal-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "material": "Mild Steel with Powder Coating",
              "description": "High-temperature resistant CPVC Metal Clamps designed for hot water systems and industrial applications. Premium powder coated finish.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "2.05",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 7,
              "name": "Edler Nail Clamp - Nico Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/nail-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/nico-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "description": "Durable nail clamp used for secure pipe fixing. Premium Industrial Nico Clamps with integrated nail fastening for construction and industrial mounting solutions.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "4.00",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 8,
              "name": "Step Clamp - Multi-Size Pipe Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/step-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/step-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "material": "Galvanized Steel, Stainless Steel",
              "description": "Innovative Step Clamps with multi-size compatibility. A single clamp securely holds multiple pipe diameters, reducing inventory requirements.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "3.00",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 9,
              "name": "Sprinkler Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/sprinkler-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/sprinkler-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "description": "Specialized Sprinkler Clamps for irrigation and fire safety systems. Durable construction for outdoor applications with superior weather resistance.",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "4.00",
                "priceCurrency": "INR",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 10,
              "name": "Golden Metal Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/golden-metal-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/golden-metal-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "material": "Gold-Plated Metal",
              "description": "Luxury Gold-Plated Metal Clamps for premium visible installations and high-end decorative projects. Elegant finish for commercial and residential spaces.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "7.00",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 11,
              "name": "Silver Metal Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/silver-metal-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/silver-metal-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler Clamp"
              },
              "material": "Silver-Plated Metal",
              "description": "Elegant Silver-Plated Metal Clamps with superior aesthetics for commercial and residential spaces. Premium decorative finish.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "4.00",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            },
            {
              "@type": "Product",
              "position": 12,
              "name": "SS Pipe Saddle Clamp",
              "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
              "url": "https://jkindustriesrajkot.com/products/metal-clamp",
              "brand": {
                "@type": "Brand",
                "name": "Edler"
              },
              "material": "Stainless Steel",
              "description": "Heavy duty stainless steel saddle clamp for piping systems. Available in various sizes for industrial applications.",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "INR",
                "price": "6.38",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@id": "https://jkindustriesrajkot.com/#organization"
                }
              }
            }
          ]
        }
      ]
    };

    this.appendSchemaToHead(graphSchema);
  }

  private appendSchemaToHead(schema: any) {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
