import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UrlNormalizerService {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url.length > 1 && event.url.endsWith('/')) {
        this.router.navigateByUrl(event.url.slice(0, -1), { replaceUrl: true });
      }
    });
  }
}