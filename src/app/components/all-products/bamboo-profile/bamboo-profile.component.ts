import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import * as Aos from 'aos';

// Define TransferState keys
const PRODUCT_SCHEMA_KEY = makeStateKey<string>('BAMBOO_PROFILE_PRODUCT_SCHEMA');
const BUSINESS_SCHEMA_KEY = makeStateKey<string>('BAMBOO_PROFILE_BUSINESS_SCHEMA');

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Application {
  icon: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-bamboo-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bamboo-profile.component.html',
  styleUrl: './bamboo-profile.component.scss'
})
export class BambooProfileComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private baseUrl = 'https://captainsteelroofsolution.com';

  features: Feature[] = [
    {
      icon: 'leaf',
      title: 'Eco-Friendly Material',
      description: 'Made from sustainable bamboo fibers, offering an environmentally conscious roofing alternative with minimal carbon footprint'
    },
    {
      icon: 'tint-slash',
      title: 'Weather Resistant',
      description: 'Advanced treatment processes ensure excellent resistance to moisture, UV damage, and extreme weather conditions'
    },
    {
      icon: 'temperature-low',
      title: 'Thermal Insulation',
      description: 'Natural insulating properties help maintain comfortable indoor temperatures and reduce energy consumption'
    },
    {
      icon: 'bolt',
      title: 'Lightweight Design',
      description: 'Significantly lighter than traditional roofing materials, reducing structural load requirements and installation complexity'
    },
    {
      icon: 'volume-mute',
      title: 'Acoustic Performance',
      description: 'Superior sound dampening qualities reduce noise from rain and external sources for quieter interior spaces'
    },
    {
      icon: 'palette',
      title: 'Aesthetic Appeal',
      description: 'Natural bamboo texture and customizable finishes create distinctive, elegant roofing solutions with timeless appeal'
    }
  ];

  applications: Application[] = [
    {
      icon: 'home',
      title: 'Residential Buildings',
      description: 'Perfect for eco-conscious homeowners looking for distinctive, sustainable roofing with natural appeal'
    },
    {
      icon: 'hotel',
      title: 'Hospitality Structures',
      description: 'Ideal for resorts, eco-hotels, and tourism facilities seeking to create natural aesthetic environments'
    },
    {
      icon: 'store',
      title: 'Commercial Spaces',
      description: 'Distinctive option for retail, restaurants, and office buildings wanting to showcase environmental commitment'
    },
    {
      icon: 'tree',
      title: 'Garden Structures',
      description: 'Perfect for gazebos, pergolas, garden shelters, and outdoor entertainment areas requiring natural integration'
    },
    {
      icon: 'umbrella-beach',
      title: 'Beach & Waterfront',
      description: 'Excellent for beach-side structures, resorts, and waterfront properties with salt-water exposure'
    },
    {
      icon: 'pagelines',
      title: 'Eco-Developments',
      description: 'Essential component for green building projects, eco-communities, and environmentally certified structures'
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'What makes bamboo profile sheets different from traditional roofing materials?',
      answer: 'Bamboo profile sheets represent a revolutionary sustainable alternative to conventional roofing. Unlike traditional materials, they\'re crafted from rapidly renewable bamboo fibers, which can be harvested in 3-5 years compared to decades for timber. The manufacturing process has a significantly lower carbon footprint than metal or cement-based materials. Bamboo profiles offer natural thermal and acoustic insulation properties, reducing energy costs. They\'re also notably lighter, reducing structural requirements and installation complexity. While providing comparable weather resistance and durability when properly treated, they bring the distinctive aesthetic of natural materials that ages gracefully, creating unique character over time that synthetic materials cannot replicate.'
    },
    {
      question: 'How durable are bamboo profile roofing sheets in different weather conditions?',
      answer: 'Our bamboo profile sheets undergo specialized treatment processes that ensure excellent durability across diverse climate conditions. They feature advanced water-resistant coatings that prevent moisture penetration, swelling, and warping, while UV-protective treatments prevent degradation from sun exposure. The natural density and fiber structure of bamboo provides inherent resistance to high winds, and the material demonstrates excellent thermal stability, withstanding temperature fluctuations without expansion or contraction issues common in other materials. In tropical environments, the sheets are treated to resist mold, mildew, and insect infestations. When properly installed and maintained, our bamboo profile sheets have a service life of 25+ years, comparable to many conventional roofing materials, while aging with a distinctive patina that many homeowners find aesthetically appealing.'
    },
    {
      question: 'What maintenance is required for bamboo profile roofing?',
      answer: 'Bamboo profile roofing requires minimal but specific maintenance to maximize its longevity. We recommend bi-annual inspections, ideally before and after monsoon or rainy seasons, to check for any signs of wear, loose fasteners, or accumulated debris. Regular cleaning with a soft brush to remove leaves, dirt, and organic matter helps prevent moisture retention. Unlike metal roofing, bamboo profiles don\'t require repainting, but we recommend reapplication of our UV-protective sealant every 3-5 years, depending on your climate conditions. Any damaged sections should be addressed promptly to prevent water infiltration. For coastal areas with high salt content in the air, a freshwater rinse every 3-4 months helps preserve the protective coatings. When properly maintained, our bamboo profiles develop a beautiful natural patina while maintaining their functional integrity throughout their 25+ year lifespan.'
    },
    {
      question: 'How do bamboo profile sheets contribute to energy efficiency in buildings?',
      answer: 'Bamboo profile sheets significantly enhance building energy efficiency through multiple mechanisms. Their natural cellular structure provides exceptional thermal insulation with R-values typically 20-30% higher than standard metal roofing, reducing heating and cooling requirements year-round. The material\'s natural breathability helps regulate moisture and prevent heat buildup in attic spaces. Our bamboo profiles reflect up to 80% of solar radiation when installed with recommended underlayment, further reducing cooling costs in hot climates. Research indicates buildings with bamboo roofing can experience indoor temperature reductions of 5-8°C compared to conventional metal roofing during summer months, potentially reducing cooling costs by 15-25%. Additionally, the reduced weight of bamboo profiles minimizes embodied energy in supporting structures, while the sustainable harvesting and manufacturing process represents a 60-70% smaller carbon footprint compared to conventional roofing options, contributing to overall environmental efficiency.'
    }
  ];

  galleryImages = [
    {
      src: 'assets/products/BAMBOO_PROFILE/UPVC 3 WAY RIDGE.png',
      alt: '3-Way Ridge for Bamboo Profile Sheets - Premium Natural Roofing Component',
      title: '3-Way Ridge'
    },
    {
      src: 'assets/products/BAMBOO_PROFILE/UPVC 4 WAY RIDGE.png',
      alt: '4-Way Ridge for Bamboo Profile Sheets - Advanced Natural Roofing Installation',
      title: '4-Way Ridge'
    },
    {
      src: 'assets/products/BAMBOO_PROFILE/UPVC MAIN RIDGE END CAP.png',
      alt: 'Main Ridge Cap for Bamboo Profile Roofing - Quality Roof Finishing Component',
      title: 'Main Ridge Cap'
    },
    {
      src: 'assets/products/BAMBOO_PROFILE/PLAIN RIDGE.png',
      alt: 'Plain Ridge for Bamboo Profile Sheets - Elegant Natural Roofing Solution',
      title: 'Plain Ridge'
    },
    {
      src: 'assets/products/BAMBOO_PROFILE/UPVC SIDE RIDGE.png',
      alt: 'Side Ridge Cap for Bamboo Profile Installation - Premium Roofing Accessory',
      title: 'Side Ridge Cap'
    },
    {
      src: 'assets/products/BAMBOO_PROFILE/BAMBOO-PROFILE.jpeg',
      alt: 'Bamboo Profile Roof Installation - Sustainable Commercial Building Solution',
      title: 'Commercial Installation'
    },
    {
      src: 'assets/products/BAMBOO_PROFILE/WPC ZALAR.png',
      alt: 'WPC Zalar with Bamboo Profile Roofing - Modern Eco-Friendly Building Material',
      title: 'WPC Zalar'
    },
    {
      src: 'assets/products/BAMBOO_PROFILE/UPVC ZALAR.png',
      alt: 'Zalar Installation with Bamboo Profile Sheets - Premium Architectural Detail',
      title: 'Zalar Component'
    },
    {
      src: 'assets/products/BAMBOO_PROFILE/UPVC SCREW CAP.png',
      alt: 'Screw Cap for Bamboo Profile Roofing - Premium Roofing Accessory',
      title: 'Screw Cap'
    }
  ];

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    private transferState: TransferState
  ) {}

  ngOnInit() {
    // Set SEO meta tags - Title tags influence search rankings and are the first impression for users
    this.titleService.setTitle('Premium Bamboo Profile Sheets | Captain Steel');
    
    // Meta descriptions impact click-through rates by providing concise page summaries under 155 characters
    this.meta.addTags([
      { name: 'description', content: 'Buy premium bamboo profile sheets, Gujarat. Our sustainable bamboo sheets offer superior thermal insulation, weather resistance, and natural aesthetics. Available for residential and commercial buildings with free delivery across Rajkot, Gujarat.' },
      { name: 'keywords', content: 'bamboo profile sheets, bamboo profile sheets in Rajkot, bamboo sheets, bamboo sheets Rajkot, bamboo roofing Rajkot, sustainable roofing, eco-friendly roofing, natural roofing material, bamboo roofing Gujarat, green building material, thermal insulation roofing, acoustic roofing' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Captain Steel Roof Solutions' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://captainsteelroofsolution.com/products/bamboo-profile' },
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.089547;70.783704' },
      { name: 'ICBM', content: '22.089547, 70.783704' },
      // Open Graph tags for social sharing - Extends SEO impact to social platforms
      { property: 'og:title', content: 'Premium Bamboo Profile Sheets | Sustainable Bamboo Sheets' },
      { property: 'og:description', content: 'Buy premium bamboo profile sheets in Rajkot. Our sustainable bamboo sheets offer superior thermal insulation and natural aesthetics with delivery across Gujarat.' },
      { property: 'og:image', content: 'https://captainsteelroofsolution.com/assets/products/BAMBOO_PROFILE/UPVC BAMBOO TILE SHEET.png' },
      { property: 'og:url', content: 'https://captainsteelroofsolution.com/products/bamboo-profile' },
      { property: 'og:type', content: 'product' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360311' },
      { property: 'og:country-name', content: 'India' },
      // Twitter Card tags - Enhances visibility on Twitter platform
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium Bamboo Profile Sheets | Sustainable Bamboo Sheets' },
      { name: 'twitter:description', content: 'Buy premium bamboo sheets. Sustainable, eco-friendly roofing with superior thermal insulation. Local delivery across Gujarat.' },
      { name: 'twitter:image', content: 'https://captainsteelroofsolution.com/assets/products/BAMBOO_PROFILE/UPVC BAMBOO TILE SHEET.png' }
    ]);
    
    // Add structured data
    this.setProductStructuredData();
    this.setBusinessStructuredData();
    this.setFaqStructuredData(); // Add this line
    
    // Only run browser-specific code if we are in a browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Initialize AOS animations
      Aos.init({
        duration: 1000,
        once: true,
        offset: 100
      });
      
      // Add click event listeners to FAQ items after view is initialized
      setTimeout(() => {
        const faqItems = document.querySelectorAll('.faq-question');
        faqItems.forEach(item => {
          item.addEventListener('click', () => {
            const parent = item.parentElement;
            if (parent) {
              parent.classList.toggle('active');
            }
          });
        });

        // Add click event listeners to gallery thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.main-gallery-image img') as HTMLImageElement;
        
        if (thumbnails.length > 0 && mainImage) {
          thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
              // Remove active class from all thumbnails
              thumbnails.forEach(t => t.classList.remove('active'));
              
              // Add active class to clicked thumbnail
              thumb.classList.add('active');
              
              // Update main image
              const thumbImg = thumb.querySelector('img') as HTMLImageElement;
              if (thumbImg) {
                mainImage.src = thumbImg.src;
                mainImage.alt = thumbImg.alt;
              }
            });
          });
        }
      }, 500);
    }
  }

  private setProductStructuredData(): void {
    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Premium Bamboo Profile Sheets",
      "alternateName": ["Bamboo Sheets", "Eco-Friendly Bamboo Roofing", "Sustainable Bamboo Sheets"],
      "image": [
        `${this.baseUrl}/assets/products/BAMBOO_PROFILE/UPVC BAMBOO TILE SHEET.png`,
        `${this.baseUrl}/assets/products/BAMBOO_PROFILE/BAMBOO-PROFILE.jpeg`,
        `${this.baseUrl}/assets/products/BAMBOO_PROFILE/PLAIN RIDGE.png`
      ],
      "description": "Premium bamboo profile sheets available in Rajkot, Gujarat. Our bamboo sheets offer eco-friendly roofing with superior thermal insulation, weather resistance and natural aesthetics. Ideal for residential, commercial and hospitality structures with local delivery and installation services throughout Rajkot and Gujarat.",
      "sku": "BAMBOO-PROFILE-01",
      "mpn": "CSRS-BP-2023",
      "brand": {
        "@type": "Brand",
        "name": "Captain Steel"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Captain Steel Roof Solutions",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "postalCode": "360311",
          "addressCountry": "IN"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "142",
        "reviewCount": "93"
      },
      "isAccessoryOrSparePartFor": {
        "@type": "Product",
        "name": "Eco-Friendly Building Materials"
      },
      "material": ["Bamboo Fiber", "Eco-Friendly Binding Agents", "UV-Resistant Coating"],
      "width": {
        "@type": "QuantitativeValue",
        "value": "3-4",
        "unitCode": "FOT"
      },
      "height": {
        "@type": "QuantitativeValue",
        "value": "3-6",
        "unitCode": "MMT"
      },
      "weight": {
        "@type": "QuantitativeValue",
        "value": "3.5-4.8",
        "unitCode": "KGM"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Water Absorption",
          "value": "<2.0%"
        },
        {
          "@type": "PropertyValue",
          "name": "Fire Resistance",
          "value": "Class B fire rating"
        },
        {
          "@type": "PropertyValue",
          "name": "Sound Reduction",
          "value": "25-30 dB"
        },
        {
          "@type": "PropertyValue",
          "name": "Local Availability",
          "value": "Available in Rajkot with same-day delivery"
        }
      ]
    };
    
    // Store the structured data in transfer state
    this.transferState.set(PRODUCT_SCHEMA_KEY, JSON.stringify(structuredData));
    
    // Only add script tag in browser environment
    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      this.document.head.appendChild(script);
    }
  }
  
  private setBusinessStructuredData(): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Captain Steel Roof Solutions",
      "image": `${this.baseUrl}/assets/logo/logo.png`,
      "url": this.baseUrl,
      "telephone": "+91 9879109091",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sadak Pipliya, National Highway, Ta. Gondal",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360311",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.089547",
        "longitude": "70.783704"
      },
      "department": [
        {
          "@type": "LocalBusiness",
          "name": "Bamboo Profile Sheets Department",
          "description": "Specializing in premium bamboo profile sheets for sustainable roofing in Rajkot and across Gujarat",
          "telephone": "+91 9879109091"
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Rajkot"
        },
        {
          "@type": "State",
          "name": "Gujarat"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/captainroof/",
        "https://www.linkedin.com/company/captain-steel/",
        "https://twitter.com/captainsteel"
      ]
    };
    
    // Store the structured data in transfer state
    this.transferState.set(BUSINESS_SCHEMA_KEY, JSON.stringify(structuredData));
    
    // Only add script tag in browser environment
    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      this.document.head.appendChild(script);
    }
  }

  private setFaqStructuredData(): void {
    const faqStructuredData = {
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
    
    // Only add script tag in browser environment
    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqStructuredData);
      this.document.head.appendChild(script);
    }
  }
}
