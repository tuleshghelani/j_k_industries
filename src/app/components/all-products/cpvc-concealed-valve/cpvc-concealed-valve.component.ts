import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';


@Component({
  selector: 'app-cpvc-concealed-valve',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cpvc-concealed-valve.component.html',
  styleUrl: './cpvc-concealed-valve.component.scss'
})
export class CpvcConcealedValveComponent implements OnInit, AfterViewInit {
  showEnquiryForm: boolean = false;
  expandedFaqs: boolean[] = [false, false, false, false, false];
  
  // Gallery properties
  showGalleryModal: boolean = false;
  currentGalleryIndex: number = 0;
  currentGalleryImage: string = '';
  galleryImages: string[] = [
    'assets/products/cpvc-concealed-valve.png',
    'assets/products/CPVC CONCEALED VALVE_2.png.jpg',
    'assets/products/CPVC CONCEALED VALVE_3.png.jpg',
    'assets/products/CPVC CONCEALED VALVE_4.png.jpg',
  ];
  
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
    this.title.setTitle('Premium CPVC Concealed Valves | Bathroom Shower Valves | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'High-quality CPVC concealed valves with premium components - CPVC body, brass spindle, stainless steel gland, and ceramic disc technology. Superior temperature control and durability for modern bathroom installations. Premium diverter and mixer valves for shower systems.' },
      { name: 'keywords', content: 'CPVC concealed valve, CPVC valve body, CPVC valve spindle, valve gland, triangle handle, turbo handle, square handle, quarter turn valve, ceramic disc valve, CPVC valve, concealed valve, bathroom valve, shower valve, concealed diverter valve, CPVC mixer valve, CPVC shower control, thermostatic valve, bathroom fixture, hidden shower valve, hot water valve' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Premium CPVC Concealed Valves | Bathroom Shower Valves | JK Industries' },
      { property: 'og:description', content: 'High-quality CPVC concealed valves manufactured by JK Industries. Superior temperature control and durability for modern bathroom installations.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/cpvc-concealed-valve.png' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/cpvc-concealed-valve' },
      { property: 'og:type', content: 'product' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Premium CPVC Concealed Valves | JK Industries' },
      { name: 'twitter:description', content: 'High-quality CPVC concealed valves for modern bathroom installations. Temperature resistant and durable.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/cpvc-concealed-valve.png' }
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

  // Gallery methods
  openGalleryImage(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentGalleryIndex = index;
      this.currentGalleryImage = this.galleryImages[index];
      this.showGalleryModal = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeGalleryModal(event: any) {
    if (event.target.classList.contains('gallery-modal') || 
        event.target.classList.contains('close-modal')) {
      this.showGalleryModal = false;
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = 'auto';
      }
    }
  }

  navigateGallery(direction: number, event: Event) {
    event.stopPropagation();
    
    let newIndex = this.currentGalleryIndex + direction;
    
    // Handle wrapping around the gallery
    if (newIndex < 0) {
      newIndex = this.galleryImages.length - 1;
    } else if (newIndex >= this.galleryImages.length) {
      newIndex = 0;
    }
    
    this.currentGalleryIndex = newIndex;
    this.currentGalleryImage = this.galleryImages[newIndex];
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
    // Here you would typically send this data to your backend
    alert('Thank you for your enquiry. We will contact you shortly.');
    this.showEnquiryForm = false;
    // Re-enable background scrolling
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  downloadBrochure() {
    // Implement download functionality
    alert('Brochure download will be available soon.');
  }

  private addProductSchema() {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId)) return;

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "CPVC Concealed Valve",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/cpvc-concealed-valve.png",
        "https://jkindustriesrajkot.com/assets/products/CPVC CONCEALED VALVE_2.png.jpg",
        "https://jkindustriesrajkot.com/assets/products/CPVC CONCEALED VALVE_3.png.jpg",
        "https://jkindustriesrajkot.com/assets/products/CPVC CONCEALED VALVE_4.png.jpg"
      ],
      "description": "High-quality CPVC concealed valve with ceramic disc technology for modern bathroom installations. Features premium components including CPVC body, brass/stainless steel spindle, durable gland, and multiple handle options. Temperature resistant up to 93°C with superior chemical resistance.",
      "sku": "CV-CPVC-001",
      "mpn": "JKIND-CPVC-CV001",
      "brand": {
        "@type": "Brand",
        "name": "Edler Clamp"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "JK Industries"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "64"
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
          "name": "What are CPVC concealed valves and why are they better than brass valves?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CPVC concealed valves are modern plumbing fixtures made from Chlorinated Polyvinyl Chloride that control water flow in shower systems while remaining hidden behind walls. They offer several advantages over traditional brass valves, including superior chemical resistance (particularly to chlorine in water supply), better insulation properties (reducing heat loss in hot water), elimination of lead contamination concerns, resistance to scale buildup, and typically lower cost. CPVC valves are also lighter, easier to install, and don't corrode or develop pinhole leaks like metal valves can over time."
          }
        },
        {
          "@type": "Question",
          "name": "How long do CPVC concealed valves typically last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our CPVC concealed valves are engineered for exceptional durability and typically have a service life of 20-25 years under normal usage conditions. This longevity is due to the high-quality CPVC material that resists chemical degradation, scale buildup, and corrosion. The ceramic disc cartridge technology ensures smooth operation for thousands of cycles. Proper installation and water quality can further extend the valve's lifespan. We provide a 7-year warranty on all our CPVC concealed valves, reflecting our confidence in their long-term performance."
          }
        },
        {
          "@type": "Question",
          "name": "Are your CPVC concealed valves compatible with existing bathroom fixtures?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our CPVC concealed valves are designed with universal compatibility in mind. They feature standard connection sizes (15mm, 20mm, and 25mm) that work with most popular shower trims, handles, and diverters available in the Indian market. The valves use industry-standard cartridge dimensions, allowing you to mix and match with various decorative trim kits from major manufacturers. For specialized installations or unique fixture compatibility, we offer adapter solutions and technical support to ensure proper integration. Our installation guides provide detailed compatibility information for major fixture brands."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between diverter, mixer, and thermostatic CPVC valves?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Diverter valves redirect water flow between multiple outlets (like a handheld shower, overhead rain shower, or body jets) without affecting temperature or pressure. Mixer valves combine hot and cold water inputs to achieve the desired temperature through a single manual control, requiring you to adjust the mix each time. Thermostatic valves are the most advanced, automatically maintaining your preset temperature regardless of pressure fluctuations in the water supply system and preventing scalding with safety stops. We offer all three types in our CPVC concealed valve range to suit different bathroom configurations and user preferences, with thermostatic options providing the highest level of comfort and safety."
          }
        },
        {
          "@type": "Question",
          "name": "What installation depth is required for your CPVC concealed valves?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our CPVC concealed valves are designed with modern thin-wall construction techniques in mind. The standard installation depth is 50-70mm from the finished wall surface, making them suitable for most contemporary bathroom installations. We provide adjustable installation cassettes with our premium models that allow for depth adjustments during installation, accommodating wall thicknesses between 40-100mm. This flexibility ensures proper fitting even when wall specifications change during construction. Each valve comes with detailed installation templates and depth guides to ensure correct positioning."
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

