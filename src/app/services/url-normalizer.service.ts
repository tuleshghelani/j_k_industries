import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

/**
 * @deprecated This service is no longer needed as trailing slash redirects
 * are now handled at the server level (server.ts) with proper 301 redirects.
 * This prevents "Page with redirect" issues in Google Search Console.
 * 
 * Server-side redirects are better for SEO because:
 * 1. They return proper HTTP 301 status codes
 * 2. They happen before Angular routing, so Google sees them as permanent redirects
 * 3. They don't cause client-side redirects that Google flags
 */
@Injectable({ providedIn: 'root' })
export class UrlNormalizerService {
  constructor(private router: Router) {
    // Service disabled - trailing slashes now handled server-side
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart && event.url.length > 1 && event.url.endsWith('/')) {
    //     this.router.navigateByUrl(event.url.slice(0, -1), { replaceUrl: true });
    //   }
    // });
  }
}