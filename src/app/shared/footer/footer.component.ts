import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.addOrganizationSchema();
  }

  private addOrganizationSchema() {
    if (isPlatformBrowser(this.platformId)) {
      const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'JK Industries',
        'url': 'https://jkindustriesrajkot.com',
        'logo': 'https://jkindustriesrajkot.com/assets/logo/jk_logo.png',
        'description': 'Leading manufacturer of high-quality industrial clamps and hardware solutions.',
        'telephone': '+919979032430',
        'email': 'jkindustries1955@gmail.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Radhekrishan Chowk, Sojitra park, Mavdi baypass road',
          'addressLocality': 'Rajkot',
          'addressRegion': 'Gujarat',
          'postalCode': '360004',
          'addressCountry': 'IN'
        },
        'sameAs': [
          'https://www.linkedin.com/company/jk-industries-india/',
          'https://www.instagram.com/jk_industries_1995/'
        ]
      };
      
      // Add JSON-LD script to head
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(organizationSchema);
      this.document.head.appendChild(script);
    }
  }
}
