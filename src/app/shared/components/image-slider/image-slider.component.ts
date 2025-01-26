import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, OnDestroy, AfterViewInit {
  currentSlide = 0;
  isLoading = false;
  imagesLoaded = 0;
  totalImages = 5;
  private autoSlideInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.preloadImages();
  }

  ngAfterViewInit() {
    this.checkAndStartSlider();
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private preloadImages() {
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
    if (!this.isLoading && !this.autoSlideInterval) {
      this.startAutoSlide();
    }
  }

  private startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
      this.cdr.detectChanges();
    }, 5000);
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