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
    this.title.setTitle('Contact JK Industries | Industrial Clamp Manufacturer');
    
    this.meta.addTags([
      { name: 'description', content: 'Contact JK Industries for premium industrial clamps, pipe clamps, and hardware solutions. Get expert consultation and quotes for your industrial clamping needs.' },
      { name: 'keywords', content: 'contact JK Industries, industrial clamp manufacturer contact, pipe clamp supplier, clamp manufacturing company contact' },
      { property: 'og:title', content: 'Contact JK Industries | Industrial Clamp Manufacturer' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/contact-us' },
      { name: 'robots', content: 'index, follow' }
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
