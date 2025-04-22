import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import Aos from 'aos';
import { Meta, Title } from '@angular/platform-browser';

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
  milestones = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'JK Industries was established with a vision to create high-quality industrial clamps.'
    },
    {
      year: '2013',
      title: 'Product Expansion',
      description: 'Expanded our product line to include UPVC/CPVC clamps and specialized nico clamps.'
    },
    {
      year: '2016',
      title: 'Manufacturing Enhancement',
      description: 'Upgraded our manufacturing facility with state-of-the-art machinery for precision clamp production.'
    },
    {
      year: '2018',
      title: 'Quality Certification',
      description: 'Obtained ISO 9001:2015 certification for our quality management system in clamp manufacturing.'
    },
    {
      year: '2021',
      title: 'Market Expansion',
      description: 'Extended our clamp products distribution network across India and began exports to international markets.'
    },
    {
      year: '2023',
      title: 'Digital Transformation',
      description: 'Launched our online presence to reach more customers in need of premium industrial clamps.'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    // Enhanced meta tags for SEO
    this.title.setTitle('About JK Industries | Leading Industrial Clamp Manufacturer in India Since 2010');
    
    this.meta.addTags([
      { name: 'description', content: 'Learn about JK Industries - premier manufacturer of industrial pipe clamps, nico clamps, and UPVC/CPVC clamps since 2010. Discover our journey, quality manufacturing values, and commitment to producing premium clamp solutions in Rajkot, Gujarat.' },
      { name: 'keywords', content: 'about JK Industries, clamp manufacturer history, industrial clamp company, pipe clamp manufacturer, nico clamp producer, UPVC clamp manufacturer, premium clamp manufacturing, Indian clamp manufacturer, Rajkot industrial clamps' },
      { property: 'og:title', content: 'About JK Industries | Leading Industrial Clamp Manufacturer in India Since 2010' },
      { property: 'og:description', content: 'Learn about JK Industries - premier manufacturer of industrial pipe clamps, nico clamps, and UPVC/CPVC clamps since 2010. Discover our state-of-the-art manufacturing facility in Rajkot, Gujarat.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://edlerclamp.com/about-us' },
      { property: 'og:image', content: 'https://edlerclamp.com/assets/logo/jk_logo.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'About JK Industries | Leading Clamp Manufacturer in India' },
      { name: 'twitter:description', content: 'Learn about JK Industries, manufacturing premium industrial clamps in India since 2010.' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      Aos.refresh();
      this.addAboutPageSchema();
      this.addOrganizationSchema();
    }
  }

  private addAboutPageSchema() {
    const aboutSchema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About JK Industries",
      "description": "JK Industries is a leading manufacturer of high-quality industrial clamps including pipe clamps, nico clamps, and UPVC/CPVC clamps since 2010.",
      "url": "https://edlerclamp.com/about-us",
      "publisher": {
        "@type": "Organization",
        "name": "JK Industries",
        "logo": {
          "@type": "ImageObject",
          "url": "https://edlerclamp.com/assets/logo/jk_logo.png"
        }
      },
      "mainEntity": {
        "@type": "Corporation",
        "name": "JK Industries",
        "foundingDate": "2010",
        "foundingLocation": "Rajkot, Gujarat, India",
        "description": "Manufacturer of premium industrial clamps for various applications including pipe clamps, nico clamps, and UPVC/CPVC clamps.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "postalCode": "360005",
          "addressCountry": "IN"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(aboutSchema);
    document.head.appendChild(script);
  }

  private addOrganizationSchema() {
    // Enhanced Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "JK Industries",
      "url": "https://edlerclamp.com",
      "logo": "https://edlerclamp.com/assets/logo/jk_logo.png",
      "foundingDate": "2010",
      "description": "Premium manufacturer of industrial clamps including pipe clamps, nico clamps, and UPVC/CPVC clamps.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360005",
        "addressCountry": "India"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9925602660",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Gujarati"]
      },
      "sameAs": [
        "https://facebook.com/jkindustriesrajkot",
        "https://instagram.com/jkindustriesrajkot"
      ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(organizationSchema);
    document.head.appendChild(script);
  }
}
