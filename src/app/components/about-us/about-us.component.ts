import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import Aos from 'aos';
import { Meta, Title } from '@angular/platform-browser';

interface Product {
  name: string;
  description: string;
  image: string;
  link: string;
  keywords: string[];
}

interface Statistic {
  value: string;
  label: string;
  icon: string;
}

interface Certification {
  name: string;
  description: string;
  icon: string;
}

interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit, AfterViewInit {
  yearsOfExperience: number = new Date().getFullYear() - 2010;
  experienceText: string = this.yearsOfExperience + '+';

  // Products showcase for SEO
  products: Product[] = [
    {
      name: 'Metal Clamp',
      description: 'Premium SS Metal Clamps and Stainless Steel Clamps for industrial pipe support. Available in 0.5mm and 1mm thickness for UPVC and CPVC pipes.',
      image: 'assets/products/stainless-steel-clamp.jpg',
      link: '/products/metal-clamp',
      keywords: ['Metal Clamp', 'SS Metal Clamp', 'Stainless Steel Clamp', 'SS Clamp']
    },
    {
      name: 'UPVC Double Nail Clamp',
      description: 'High-quality UPVC Clamps with dual fastening system for superior pipe stability. Premium nail clamps for cold water applications.',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      link: '/products/upvc-double-nail-clamp',
      keywords: ['UPVC Clamp', 'UPVC Nail Clamp', 'UPVC Pipe Clamp', 'Nail Clamp']
    },
    {
      name: 'CPVC Double Nail Clamp',
      description: 'Heat-resistant CPVC Clamps designed for hot water systems. Advanced nail clamp technology with dual nail fastening.',
      image: 'assets/products/cpvc-double-nail-clamp.jpg',
      link: '/products/cpvc-double-nail-clamp',
      keywords: ['CPVC Clamp', 'CPVC Nail Clamp', 'CPVC Pipe Clamp', 'Hot Water Clamp']
    },
    {
      name: 'Step Clamp',
      description: 'Versatile step clamps for multiple pipe sizes. Adjustable design for flexible pipe support applications.',
      image: 'assets/products/step-clamp.jpg',
      link: '/products/step-clamp',
      keywords: ['Step Clamp', 'Adjustable Clamp', 'Multi-size Clamp']
    },
    {
      name: 'PTMT Connection Pipe',
      description: 'Advanced PTMT connection pipes with push-fit technology for modern plumbing systems.',
      image: 'assets/products/ptmt-connection-pipe.jpg',
      link: '/products/ptmt-connection-pipe',
      keywords: ['PTMT Pipe', 'Connection Pipe', 'Push-fit Pipe']
    },
    {
      name: 'Sprinkler Clamp',
      description: 'Specialized sprinkler clamps for irrigation and fire safety systems. Durable construction for outdoor applications.',
      image: 'assets/products/sprinkler-clamp.jpg',
      link: '/products/sprinkler-clamp',
      keywords: ['Sprinkler Clamp', 'Irrigation Clamp', 'Fire Sprinkler Clamp']
    }
  ];

  // Statistics for credibility
  statistics: Statistic[] = [
    { value: this.experienceText, label: 'Years of Excellence in Metal Clamp Manufacturing', icon: 'calendar-alt' },
    { value: '50+', label: 'Premium Clamp Products (Metal Clamp, UPVC, CPVC, Nail Clamp)', icon: 'cubes' },
    { value: '1000+', label: 'Happy Customers Across India', icon: 'users' },
    { value: '100%', label: 'Quality Assurance on Every Metal Clamp', icon: 'check-circle' }
  ];

  // Certifications
  certifications: Certification[] = [
    { name: 'ISO 9001:2015', description: 'Quality Management System certified for Metal Clamp and all clamp manufacturing', icon: 'certificate' },
    { name: 'CE Compliant', description: 'European conformity standards for UPVC clamp and CPVC clamp products', icon: 'check-double' },
    { name: 'BIS Standards', description: 'Bureau of Indian Standards compliant nail clamp and pipe clamp products', icon: 'award' }
  ];

  // Why Choose Us
  whyChooseUs: WhyChooseItem[] = [
    { title: 'Premium Metal Clamp Quality', description: 'Our metal clamps are manufactured from SS202 and SS304 grade stainless steel, ensuring superior corrosion resistance and durability.', icon: 'medal' },
    { title: 'Complete UPVC & CPVC Clamp Range', description: 'Comprehensive range of UPVC clamps and CPVC clamps in all standard sizes from 1/2" to 6" for residential and industrial use.', icon: 'layer-group' },
    { title: 'Innovative Nail Clamp Design', description: 'Our dual fastening nail clamps provide 40% more holding power than standard single-nail clamps for secure pipe installation.', icon: 'lightbulb' },
    { title: 'Direct Factory Pricing', description: 'Buy metal clamps, UPVC clamps, CPVC clamps, and nail clamps directly from manufacturer at competitive wholesale prices.', icon: 'tags' },
    { title: 'Pan-India Delivery', description: 'Fast shipping of all clamp products across India with ready stock availability for urgent requirements.', icon: 'truck' },
    { title: 'Expert Technical Support', description: 'Dedicated team to help you select the right metal clamp, UPVC clamp, or CPVC clamp for your specific application.', icon: 'headset' }
  ];

  milestones = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'JK Industries was established with a vision to manufacture high-quality metal clamps and industrial pipe clamps in Rajkot, Gujarat.'
    },
    {
      year: '2013',
      title: 'Product Expansion',
      description: 'Expanded our product line to include UPVC clamps, CPVC clamps, and specialized nail clamps for plumbing applications.'
    },
    {
      year: '2016',
      title: 'Manufacturing Enhancement',
      description: 'Upgraded our metal clamp manufacturing facility with CNC machines for precision production of SS clamps and stainless steel clamps.'
    },
    {
      year: '2018',
      title: 'Quality Certification',
      description: 'Obtained ISO 9001:2015 certification for our quality management system in metal clamp, UPVC clamp, and CPVC clamp manufacturing.'
    },
    {
      year: '2021',
      title: 'Market Expansion',
      description: 'Extended our metal clamp and nail clamp distribution network across India with exports to international markets.'
    },
    {
      year: '2023',
      title: 'Digital Transformation',
      description: 'Launched our online platform for customers to buy metal clamps, UPVC clamps, CPVC clamps, and nail clamps directly from manufacturer.'
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
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      Aos.refresh();
      this.addAboutPageSchema();
      this.addOrganizationSchema();
      this.addLocalBusinessSchema();
      this.addBreadcrumbSchema();
      this.addItemListSchema();
      this.addWebPageSchema();
    }
  }

  private updateSeo() {
    // Enhanced title with primary keyword
    this.title.setTitle('About JK Industries | Metal Clamp Manufacturer | UPVC Clamp | CPVC Clamp | Nail Clamp | India');
    
    this.meta.addTags([
      // Primary meta description with all keywords
      { name: 'description', content: 'JK Industries is India\'s leading Metal Clamp manufacturer since 2010. We manufacture premium Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps, SS Clamps & Stainless Steel Clamps. ISO 9001:2015 certified. Factory direct prices. Buy Metal Clamp online from Rajkot, Gujarat.' },
      { name: 'keywords', content: 'Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp, SS Clamp, Stainless Steel Clamp, Metal Clamp Manufacturer, UPVC Clamp Manufacturer, CPVC Clamp Manufacturer, Nail Clamp Manufacturer, Pipe Clamp, SS Metal Clamp, Metal Clamp India, UPVC Clamp Rajkot, CPVC Clamp Gujarat, Nail Clamp Manufacturer India, JK Industries, Edler Clamp' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/about-us' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'About JK Industries | Metal Clamp | UPVC Clamp | CPVC Clamp | Nail Clamp Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Metal Clamp Manufacturer. Premium UPVC Clamps, CPVC Clamps, Nail Clamps & SS Clamps. ISO Certified. Factory Direct Prices.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/logo/jk_logo.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'JK Industries - Metal Clamp, UPVC Clamp, CPVC Clamp Manufacturer' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/about-us' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'About JK Industries | Metal Clamp | UPVC Clamp | CPVC Clamp Manufacturer' },
      { name: 'twitter:description', content: 'India\'s leading Metal Clamp, UPVC Clamp, CPVC Clamp & Nail Clamp manufacturer since 2010. ISO Certified. Factory Direct Prices.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/logo/jk_logo.png' },
      { name: 'twitter:image:alt', content: 'JK Industries Metal Clamp Manufacturer' },
      
      // Article meta tags
      { property: 'article:section', content: 'About Us' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'UPVC Clamp' },
      { property: 'article:tag', content: 'CPVC Clamp' },
      { property: 'article:tag', content: 'Nail Clamp' }
    ]);
  }

  private addAboutPageSchema() {
    const aboutSchema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About JK Industries - Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp Manufacturer",
      "description": "JK Industries is India's leading manufacturer of Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps, and SS Clamps since 2010. ISO 9001:2015 certified manufacturing facility in Rajkot, Gujarat.",
      "url": "https://jkindustriesrajkot.com/about-us",
      "mainContentOfPage": {
        "@type": "WebPageElement",
        "cssSelector": ".about-page"
      },
      "publisher": {
        "@type": "Organization",
        "name": "JK Industries",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png"
        }
      },
      "mainEntity": {
        "@type": "Corporation",
        "name": "JK Industries",
        "alternateName": ["Edler Clamp", "JK Industries"],
        "foundingDate": "2010",
        "foundingLocation": "Rajkot, Gujarat, India",
        "description": "India's premier manufacturer of Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps, SS Clamps, and Stainless Steel Clamps for industrial and residential plumbing applications.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "postalCode": "360004",
          "addressCountry": "IN"
        },
        "knowsAbout": ["Metal Clamp", "UPVC Clamp", "CPVC Clamp", "Nail Clamp", "SS Clamp", "Stainless Steel Clamp", "Pipe Clamp", "Industrial Clamps"]
      }
    };

    this.addJsonLd(JSON.stringify(aboutSchema));
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
            "name": "Stainless Steel Clamp - SS Clamp",
            "description": "Marine-grade Stainless Steel Clamps with superior corrosion resistance. Ideal for harsh industrial environments, chemical processing, and outdoor applications.",
            "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
            "url": "https://jkindustriesrajkot.com/products/stainless-steel-clamp",
            "brand": { "@type": "Brand", "name": "Edler Clamp" },
            "category": "SS Clamps",
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
              "price": "7.00",
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
              "price": "4.00",
              "availability": "https://schema.org/InStock"
            }
          }
        }
      ],
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "name": "ISO 9001:2015" },
        { "@type": "EducationalOccupationalCredential", "name": "CE Compliant" }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/jk-industries-india/",
        "https://www.instagram.com/jk_industries_1995/"
      ]
    };
    
    this.addJsonLd(JSON.stringify(organizationSchema));
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
      "description": "JK Industries is India's leading manufacturer of Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps, and SS Clamps. Factory direct prices with pan-India delivery.",
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
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": "2.05",
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
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": "1.5",
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
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": "1.5",
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
                  "name": "Edler Nail Clamp - Nico Clamp",
                  "description": "Premium Industrial Nico Clamps with integrated nail fastening for construction and industrial mounting solutions. Eliminates need for separate fasteners.",
                  "image": "https://jkindustriesrajkot.com/assets/products/nail-clamp.jpg",
                  "url": "https://jkindustriesrajkot.com/products/nico-clamp",
                  "brand": { "@type": "Brand", "name": "Edler Clamp" },
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
                  "category": "Nail Clamps",
                  "material": "Galvanized Steel, Stainless Steel",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": "1.5",
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
                    "@type": "Offer",
                    "priceCurrency": "INR",
                    "price": "3.00",
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
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
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
                  "manufacturer": { "@type": "Organization", "name": "JK Industries" },
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
            ]
          }
        ]
      }
    };

    this.addJsonLd(JSON.stringify(localBusinessSchema));
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
          "name": "About JK Industries - Metal Clamp, UPVC Clamp, CPVC Clamp Manufacturer",
          "item": "https://jkindustriesrajkot.com/about-us"
        }
      ]
    };

    this.addJsonLd(JSON.stringify(breadcrumbSchema));
  }

  private addItemListSchema() {
    // Product pricing data from actual product components
    const productPricing: { [key: string]: { price: string, lowPrice?: string, highPrice?: string } } = {
      'UPVC Double Nail Clamp': { price: '1.08', lowPrice: '1.08', highPrice: '6.63' },
      'CPVC Double Nail Clamp': { price: '1.00', lowPrice: '1.00', highPrice: '6.07' },
      'Step Clamp': { price: '3.00' },
      'PTMT Connection Pipe': { price: '22.45', lowPrice: '22.45', highPrice: '55.50' },
      'Sprinkler Clamp': { price: '4.00' },
      'Golden Metal Clamp': { price: '1.5' },
      'Silver Metal Clamp': { price: '1.5' },
      'Metal Clamp': { price: '2.00', lowPrice: '2.00', highPrice: '25.00' },
      'Stainless Steel Clamp': { price: '2.05' },
      'UPVC Metal Clamp': { price: '1.5' },
      'CPVC Metal Clamp': { price: '1.5' },
      'Edler Nail Clamp': { price: '1.5' },
    };

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "JK Industries Product Range - Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp",
      "description": "Complete range of Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps, and SS Clamps manufactured by JK Industries",
      "numberOfItems": this.products.length,
      "itemListElement": this.products.map((product, index) => {
        const pricing = productPricing[product.name] || {};
        const productSchema: any = {
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": `https://jkindustriesrajkot.com/${product.image}`,
          "url": `https://jkindustriesrajkot.com${product.link}`,
          "brand": { "@type": "Brand", "name": "Edler Clamp" },
          "manufacturer": { "@type": "Organization", "name": "JK Industries" }
        };

        // Add offers with pricing
        if (pricing.lowPrice && pricing.highPrice) {
          productSchema.offers = {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": pricing.lowPrice,
            "highPrice": pricing.highPrice,
            "availability": "https://schema.org/InStock"
          };
        } else if (pricing.price) {
          productSchema.offers = {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": pricing.price,
            "availability": "https://schema.org/InStock"
          };
        }

        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": productSchema
        };
      })
    };

    this.addJsonLd(JSON.stringify(itemListSchema));
  }

  private addWebPageSchema() {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/about-us#webpage",
      "url": "https://jkindustriesrajkot.com/about-us",
      "name": "About JK Industries | Metal Clamp | UPVC Clamp | CPVC Clamp | Nail Clamp Manufacturer India",
      "description": "JK Industries is India's leading manufacturer of Metal Clamps, UPVC Clamps, CPVC Clamps, Nail Clamps & SS Clamps since 2010. ISO Certified. Factory Direct Prices.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
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
        "cssSelector": [".about-hero h1", ".company-overview h2", ".seo-content h2"]
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
        "caption": "JK Industries - Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp Manufacturer"
      }
    };

    this.addJsonLd(JSON.stringify(webPageSchema));
  }

  private addJsonLd(schema: string) {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = schema;
    this.document.head.appendChild(script);
  }
}
