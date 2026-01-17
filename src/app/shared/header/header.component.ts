import { Component, HostListener, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  isMobileMenuOpen = false;
  isProductsSubmenuOpen = false;
  private submenuTimeoutId: number | null = null;
  private touchStartTime = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:resize')
  onResize(): void {
    // Close mobile menu on resize to desktop
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 767 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    // Close submenu if clicking outside on desktop
    if (!target.closest('.has-submenu') && this.isProductsSubmenuOpen && !this.isMobileMenuOpen) {
      this.closeProductsSubmenu();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
    
    // Close submenu when closing mobile menu
    if (!this.isMobileMenuOpen) {
      this.closeProductsSubmenu();
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
    this.closeProductsSubmenu();
  }

  onProductsMouseEnter(): void {
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 767) {
      this.clearSubmenuTimeout();
      this.isProductsSubmenuOpen = true;
    }
  }

  onProductsMouseLeave(): void {
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 767) {
      // Add slight delay to allow moving cursor to submenu
      this.submenuTimeoutId = window.setTimeout(() => {
        this.isProductsSubmenuOpen = false;
      }, 150);
    }
  }

  onProductsTouchStart(event: TouchEvent): void {
    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 767) {
      this.touchStartTime = Date.now();
      // Prevent default to avoid double-tap zoom on mobile
      event.preventDefault();
      this.toggleProductsSubmenu(event);
    }
  }

  handleProductsClick(event: Event): void {
    // On mobile, if submenu is closed, allow navigation
    // If submenu is open, prevent navigation and let toggle handle it
    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 767 && this.isProductsSubmenuOpen) {
      event.preventDefault();
    }
  }

  toggleProductsSubmenu(event?: Event | MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    this.isProductsSubmenuOpen = !this.isProductsSubmenuOpen;
  }

  closeProductsSubmenu(): void {
    this.clearSubmenuTimeout();
    this.isProductsSubmenuOpen = false;
  }

  private clearSubmenuTimeout(): void {
    if (this.submenuTimeoutId !== null) {
      clearTimeout(this.submenuTimeoutId);
      this.submenuTimeoutId = null;
    }
  }

  ngOnDestroy(): void {
    this.clearSubmenuTimeout();
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}