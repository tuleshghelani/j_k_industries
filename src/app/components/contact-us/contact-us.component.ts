import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitted = false;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      company: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit() {
    this.title.setTitle('Contact JK Industries | Metal Clamp Manufacturer | UPVC Clamp | CPVC Clamp | Nail Clamp Supplier Rajkot');
    
    this.meta.addTags([
      { name: 'description', content: 'Contact JK Industries (Edler Clamp) in Rajkot, Gujarat for premium metal clamps, UPVC clamps, CPVC clamps, nail clamps, pipe clamps, golden clamps, GI clamps, PTMT connection pipes, and plumbing systems. Get expert consultation, quotes, and technical support for all industrial clamp needs.' },
      { name: 'keywords', content: 'Contact JK Industries, Metal Clamp, UPVC Clamp, CPVC Clamp, Nail Clamp, Pipe Clamp, UPVC Metal Clamp, CPVC Metal Clamp, UPVC Nail Clamp, CPVC Nail Clamp, UPVC Double Nail Clamp, CPVC Double Nail Clamp, Golden Clamp, GI Clamp, Golden Metal Clamp, GI CPVC Clamp, Gold Plated Clamp, PTMT Connection Pipe, PTMT Pipes, PTMT Plumbing System, Hot & Cold Water Pipe, Pipe Support, Plumbing Clamp, Industrial Clamp, Clamp Manufacturer, Clamp Supplier, Metal Clamp Manufacturer, UPVC Clamp Manufacturer, CPVC Clamp Manufacturer, Nail Clamp Manufacturer, Pipe Clamp Supplier, Rajkot, Gujarat, Edler Clamp, Contact Metal Clamp Manufacturer, Contact Pipe Clamp Supplier, Metal Clamp Rajkot, UPVC Clamp Rajkot, CPVC Clamp Rajkot, Nail Clamp Rajkot, Pipe Clamp Rajkot, Clamp Manufacturer Gujarat, Industrial Clamp Supplier India' },
      { property: 'og:title', content: 'Contact JK Industries | Metal Clamp Manufacturer | UPVC Clamp | CPVC Clamp | Nail Clamp Supplier Rajkot' },
      { property: 'og:description', content: 'Contact JK Industries (Edler Clamp) in Rajkot, Gujarat for premium metal clamps, UPVC clamps, CPVC clamps, nail clamps, pipe clamps, and plumbing systems. Expert consultation and quotes available.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/contact-us' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/contact/contact-hero.jpg' },
      { property: 'og:site_name', content: 'JK Industries - Edler Clamp' },
      { property: 'og:locale', content: 'en_IN' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Contact JK Industries | Metal Clamp Manufacturer | UPVC Clamp | CPVC Clamp | Nail Clamp Supplier Rajkot' },
      { name: 'twitter:description', content: 'Contact JK Industries (Edler Clamp) in Rajkot, Gujarat for premium metal clamps, UPVC clamps, CPVC clamps, nail clamps, pipe clamps, and plumbing systems.' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'JK Industries - Edler Clamp' },
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot' },
      { name: 'geo.position', content: '22.256001;70.782881' },
      { name: 'ICBM', content: '22.256001, 70.782881' }
    ]);

    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.contactForm.valid) {
      // Handle form submission
      console.log(this.contactForm.value);
      this.submitSuccess = true;
      this.contactForm.reset();
      this.isSubmitted = false;
    }
  }

  get f() {
    return this.contactForm.controls;
  }
}
