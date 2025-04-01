import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, OnDestroy, AfterViewInit {
  currentSlide = 0;
  totalImages = 5; 
  imagesLoaded = 0;
  isLoading = true;
  sliderInterval: any;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.preloadImages();
    } else {
      // In server environment, skip loading animation
      this.isLoading = false;
    }
  }

  ngAfterViewInit() {
    this.checkAndStartSlider();
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  private preloadImages() {
    if (!isPlatformBrowser(this.platformId)) return;

    const imageUrls = Array.from({ length: this.totalImages }, (_, i) => `assets/slider/slider_${i + 1}.jpeg`);
    this.isLoading = true;
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        this.imagesLoaded++;
        if (this.imagesLoaded === this.totalImages) {
          this.isLoading = false;
          this.checkAndStartSlider();
          this.cdr.detectChanges();
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        this.imagesLoaded++;
        if (this.imagesLoaded === this.totalImages) {
          this.isLoading = false;
          this.checkAndStartSlider();
          this.cdr.detectChanges();
        }
      };
      img.src = url;
    });
  }

  private checkAndStartSlider() {
    if (isPlatformBrowser(this.platformId) && !this.sliderInterval) {
      this.sliderInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.totalImages;
        this.cdr.detectChanges();
      }, 5000);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalImages;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalImages) % this.totalImages;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }
} 