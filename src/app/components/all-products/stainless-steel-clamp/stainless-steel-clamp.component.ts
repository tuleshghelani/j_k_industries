import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import * as Aos from 'aos';

// Define TransferState keys for SSR
const SS_PRODUCT_SCHEMA = makeStateKey<string>('SS_CLAMP_PRODUCT_SCHEMA');
const SS_BUSINESS_SCHEMA = makeStateKey<string>('SS_CLAMP_BUSINESS_SCHEMA');
const SS_FAQ_SCHEMA = makeStateKey<string>('SS_CLAMP_FAQ_SCHEMA');
const SS_BREADCRUMB_SCHEMA = makeStateKey<string>('SS_CLAMP_BREADCRUMB_SCHEMA');
const SS_HOWTO_SCHEMA = makeStateKey<string>('SS_CLAMP_HOWTO_SCHEMA');
const SS_ITEMLIST_SCHEMA = makeStateKey<string>('SS_CLAMP_ITEMLIST_SCHEMA');
const SS_WEBPAGE_SCHEMA = makeStateKey<string>('SS_CLAMP_WEBPAGE_SCHEMA');

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Application {
  icon: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Spec {
  label: string;
  value: string;
}

interface ProductSize05mm {
  sizeInch: string;
  priceUPVC: number;
  priceCPVC: number;
  qtyPcs: number;
  packingQty: number;
  sku: string;
}

interface ProductSize1mm {
  sizeInch: string;
  priceUPVC: number;
  priceCPVC: number;
  qtyPcs: number;
  packingQty: number;
  sku: string;
}

interface RelatedProduct {
  name: string;
  image: string;
  link: string;
  description: string;
}


@Component({
  selector: 'app-stainless-steel-clamp',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './stainless-steel-clamp.component.html',
  styleUrl: './stainless-steel-clamp.component.scss'
})
export class StainlessSteelClampComponent implements OnInit, AfterViewInit {
  private platformId = Inject(PLATFORM_ID);
  
  showEnquiryForm: boolean = false;
  expandedFaqs: boolean[] = [];

  enquiryData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: null,
    message: ''
  };

  // Product sizes for 0.5mm thickness (from image)
  productSizes05mm: ProductSize05mm[] = [
    { sizeInch: '1/2', priceUPVC: 2.00, priceCPVC: 1.75, qtyPcs: 100, packingQty: 5000, sku: 'SS-05-15' },
    { sizeInch: '3/4', priceUPVC: 2.50, priceCPVC: 2.05, qtyPcs: 100, packingQty: 3500, sku: 'SS-05-20' },
    { sizeInch: '1', priceUPVC: 3.10, priceCPVC: 2.55, qtyPcs: 100, packingQty: 3000, sku: 'SS-05-25' },
    { sizeInch: '1 1/4', priceUPVC: 3.90, priceCPVC: 3.15, qtyPcs: 100, packingQty: 2500, sku: 'SS-05-32' },
    { sizeInch: '1 1/2', priceUPVC: 4.60, priceCPVC: 4.05, qtyPcs: 100, packingQty: 2000, sku: 'SS-05-40' },
    { sizeInch: '2', priceUPVC: 5.10, priceCPVC: 4.90, qtyPcs: 100, packingQty: 1500, sku: 'SS-05-50' },
    { sizeInch: '2 1/2', priceUPVC: 6.10, priceCPVC: 0, qtyPcs: 50, packingQty: 2000, sku: 'SS-05-65' },
    { sizeInch: '3', priceUPVC: 7.35, priceCPVC: 0, qtyPcs: 50, packingQty: 2000, sku: 'SS-05-80' },
    { sizeInch: '4', priceUPVC: 9.10, priceCPVC: 0, qtyPcs: 50, packingQty: 2000, sku: 'SS-05-100' }
  ];

  // Product sizes for 1mm thickness (from image)
  productSizes1mm: ProductSize1mm[] = [
    { sizeInch: '1/2', priceUPVC: 2.95, priceCPVC: 2.60, qtyPcs: 100, packingQty: 4000, sku: 'SS-1-15' },
    { sizeInch: '3/4', priceUPVC: 3.55, priceCPVC: 3.00, qtyPcs: 100, packingQty: 3000, sku: 'SS-1-20' },
    { sizeInch: '1', priceUPVC: 4.15, priceCPVC: 3.60, qtyPcs: 100, packingQty: 2500, sku: 'SS-1-25' },
    { sizeInch: '1 1/4', priceUPVC: 5.00, priceCPVC: 4.20, qtyPcs: 100, packingQty: 2000, sku: 'SS-1-32' },
    { sizeInch: '1 1/2', priceUPVC: 6.15, priceCPVC: 5.10, qtyPcs: 100, packingQty: 1400, sku: 'SS-1-40' },
    { sizeInch: '2', priceUPVC: 7.40, priceCPVC: 6.70, qtyPcs: 100, packingQty: 1100, sku: 'SS-1-50' },
    { sizeInch: '2 1/2', priceUPVC: 8.85, priceCPVC: 0, qtyPcs: 50, packingQty: 1000, sku: 'SS-1-65' },
    { sizeInch: '3', priceUPVC: 10.65, priceCPVC: 0, qtyPcs: 50, packingQty: 1000, sku: 'SS-1-80' },
    { sizeInch: '4', priceUPVC: 13.35, priceCPVC: 0, qtyPcs: 50, packingQty: 1000, sku: 'SS-1-100' },
    { sizeInch: '6', priceUPVC: 16.50, priceCPVC: 0, qtyPcs: 30, packingQty: 700, sku: 'SS-1-150' }
  ];

  // Related products for internal linking
  relatedProducts: RelatedProduct[] = [
    {
      name: 'UPVC Double Nail Clamp',
      image: 'assets/products/upvc-double-nail-clamp.jpg',
      link: '/products/upvc-double-nail-clamp',
      description: 'Premium UPVC double nail clamps with dual fastening system for cold water applications'
    },
    {
      name: 'CPVC Double Nail Clamp',
      image: 'assets/products/cpvc-double-nail-clamp.jpg',
      link: '/products/cpvc-double-nail-clamp',
      description: 'Heat-resistant CPVC double nail clamps designed for hot water systems'
    },
    {
      name: 'UPVC Metal Clamp',
      image: 'assets/products/upvc-metal-clamp.jpg',
      link: '/products/upvc-metal-clamp',
      description: 'Premium powder coated metal clamps for UPVC pipes with superior corrosion resistance'
    },
    {
      name: 'CPVC Metal Clamp',
      image: 'assets/products/cpvc-metal-clamp.jpg',
      link: '/products/cpvc-metal-clamp',
      description: 'High-temperature resistant metal clamps designed for CPVC hot water systems'
    },
    {
      name: 'PTMT Connection Pipe',
      image: 'assets/products/ptmt-connection-pipe.jpg',
      link: '/products/ptmt-connection-pipe',
      description: 'Advanced PTMT connection pipes with push-fit technology for modern plumbing'
    },
    {
      name: 'Step Clamp',
      image: 'assets/products/step-clamp.jpg',
      link: '/products/step-clamp',
      description: 'Versatile step clamps for multiple pipe sizes with adjustable design'
    }
  ];

  // Installation steps for HowTo schema
  installationSteps = [
    {
      name: 'Preparation',
      text: 'Mark the position ensuring proper pipe alignment and spacing. For stainless steel metal clamps, recommended spacing is every 60-80cm for horizontal runs.',
      image: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg'
    },
    {
      name: 'Pre-drilling',
      text: 'For hard surfaces like concrete or brick, pre-drill pilot holes using a 4mm drill bit to ensure accurate mounting of your SS metal clamp.',
      image: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg'
    },
    {
      name: 'Positioning',
      text: 'Place the stainless steel clamp against the mounting surface, ensuring the clamp saddle is properly aligned with the pipe position.',
      image: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg'
    },
    {
      name: 'Fastening',
      text: 'Insert appropriate screws or anchors and drive them using a screwdriver or power tool until the SS pipe clamp is securely mounted.',
      image: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg'
    },
    {
      name: 'Verification',
      text: 'Check that the pipe sits securely in the metal clamp without being compressed. Ensure proper movement allowance for thermal expansion.',
      image: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg'
    }
  ];

  features: Feature[] = [
    {
      icon: 'shield-alt',
      title: 'Superior Corrosion Resistance',
      description: 'Our metal clamps are manufactured from premium SS202 stainless steel, offering exceptional resistance to rust, oxidation, and chemical corrosion. Ideal for harsh industrial environments where standard metal clamps would fail.'
    },
    {
      icon: 'temperature-high',
      title: 'High Temperature Tolerance',
      description: 'Engineered SS metal clamps withstand extreme temperatures up to 800°C without losing structural integrity, making them ideal for furnaces and high-heat processing lines.'
    },
    {
      icon: 'anchor',
      title: 'Marine Grade Durability',
      description: 'The inherent properties of our stainless steel clamps make them perfect for marine applications, effectively resisting saltwater corrosion. Premium SS pipe clamps for offshore installations.'
    },
    {
      icon: 'cogs',
      title: 'Precision Engineering',
      description: 'CNC-manufactured metal clamps with tight tolerances ensure a perfect fit for all standard pipe sizes, preventing leakage and ensuring secure fastening with every SS pipe clip.'
    },
    {
      icon: 'leaf',
      title: 'Hygienic & Sanitary',
      description: 'The non-porous surface of stainless steel pipe clamps makes them ideal for food processing, pharmaceutical, and dairy industries where hygiene is critical.'
    },
    {
      icon: 'check-double',
      title: 'Heavy Duty Strength',
      description: 'High tensile strength construction provides superior load-bearing capacity compared to standard clamps. Our SS metal clamps ensure safety in high-pressure systems.'
    }
  ];

  applications: Application[] = [
    {
      icon: 'flask',
      title: 'Chemical Processing',
      description: 'Essential metal clamps for securing corrosive fluid lines in chemical plants where standard clamps would fail. Our SS pipe clamps resist chemical attack.'
    },
    {
      icon: 'ship',
      title: 'Marine & Offshore',
      description: 'Reliable stainless steel pipe clamps for ships, oil rigs, and coastal facilities. Our metal clamps provide superior saltwater corrosion resistance.'
    },
    {
      icon: 'utensils',
      title: 'Food & Beverage',
      description: 'Sanitary SS metal clamps for process piping in food manufacturing plants. Our stainless steel clamps adhere to strict hygiene standards.'
    },
    {
      icon: 'prescription-bottle',
      title: 'Pharmaceutical',
      description: 'Clean-room compatible metal clamps for critical pharmaceutical manufacturing. Our SS pipe clips meet biotech application requirements.'
    },
    {
      icon: 'water',
      title: 'Water Treatment',
      description: 'Durable stainless steel pipe clamps for filtration and desalination plants. Our metal clamps handle aggressive water conditions effectively.'
    },
    {
      icon: 'industry',
      title: 'Heavy Industry',
      description: 'Robust SS metal clamps for hydraulic lines, steam pipes, and pneumatic systems. Our stainless steel clamps provide reliable support in manufacturing units.'
    }
  ];

  specifications: Spec[] = [
    { label: 'Material', value: 'SS202 (Marine Grade Available)' },
    { label: 'Thickness Options', value: '0.5mm and 1mm' },
    { label: 'Pipe Compatibility', value: 'UPVC & CPVC Pipes' },
    { label: 'Sizes Available', value: '1/2" to 6" (15mm - 150mm Diameter)' },
    { label: 'Surface Finish', value: 'Polished, Matte, or Custom Finish' },
    { label: 'Temperature Range', value: '-50°C to 800°C' },
    { label: 'Tensile Strength', value: '520-720 MPa' },
    { label: 'Pressure Rating', value: 'Up to 40 bar (Depending on Size)' },
    { label: 'Certification', value: 'ISO 9001:2015, CE Compliant' },
    { label: 'Application Standards', value: 'ASTM A276, AISI 202' }
  ];

  whyChoose = [
    {
      title: 'Premium Material Quality',
      description: 'We use only certified high-grade stainless steel raw materials to ensure consistent quality and maximum durability in every metal clamp we manufacture.'
    },
    {
      title: 'Direct Manufacturer Pricing',
      description: 'Get the best rates for high-quality SS metal clamps by buying directly from the manufacturer, eliminating middleman costs on stainless steel clamps.'
    },
    {
      title: 'UPVC & CPVC Compatible',
      description: 'Our metal clamps are designed to fit both UPVC and CPVC pipes perfectly, with specialized sizing for each pipe type.'
    },
    {
      title: 'Two Thickness Options',
      description: 'Choose between 0.5mm and 1mm thickness stainless steel clamps based on your load requirements and application specifications.'
    },
    {
      title: 'Ready Stock Availability',
      description: 'We maintain a huge inventory of SS pipe clamps in all standard sizes to ensure 24-48 hour dispatch for urgent project requirements.'
    }
  ];

  testimonials = [
    {
      quote: 'JK Industries stainless steel clamps have been a game-changer for our chemical plant. The corrosion resistance is phenomenal—we haven\'t replaced a single metal clamp in 2 years, whereas previous ones rusted in months.',
      author: 'Rajesh Malhotra',
      role: ''
    },
    {
      quote: 'We source all our SS pipe clamps from JK Industries for our marine engineering projects. The quality consistency and precision fit of their metal clamps are exactly what we need for critical offshore installations.',
      author: 'Vikram Singh',
      role: ''
    },
    {
      quote: 'The stainless steel pipe clamps from JK Industries have exceeded our expectations. The 1mm thickness metal clamps provide excellent support for our heavy-duty industrial piping systems.',
      author: 'Amit Patel',
      role: ''
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'What is a metal clamp and how is it different from a plastic clamp?',
      answer: 'A metal clamp is a pipe support device made from metal materials like stainless steel, providing superior strength, durability, and corrosion resistance compared to plastic clamps. Our SS metal clamps and stainless steel clamps are specifically engineered for industrial applications requiring high load capacity, temperature resistance, and long-term reliability. Metal clamps are essential for chemical, marine, and food processing industries.'
    },
    {
      question: 'Where can I buy metal clamps and SS metal clamps online in India?',
      answer: 'JK Industries is a leading manufacturer of metal clamps, SS metal clamps, and stainless steel clamps in India. You can purchase our metal clamps directly from our factory in Rajkot, Gujarat, or through our online platform. We offer competitive pricing, bulk discounts, and fast shipping across India. Contact us for quotes on SS pipe clamps, SS pipe clips, and custom stainless steel clamp solutions.'
    },
    {
      question: 'What is the difference between 0.5mm and 1mm thickness metal clamps?',
      answer: 'The 0.5mm thickness metal clamps are suitable for lighter applications and smaller pipe sizes, offering cost-effectiveness while maintaining durability. The 1mm thickness stainless steel clamps provide extra strength for heavier pipes, high-pressure systems, and industrial applications requiring maximum load capacity. Both SS metal clamp variants are available for UPVC and CPVC pipes.'
    },
    {
      question: 'Are stainless steel clamps suitable for both UPVC and CPVC pipes?',
      answer: 'Yes, our stainless steel clamps are specifically designed to fit both UPVC and CPVC pipes. We offer different pricing for UPVC and CPVC compatible metal clamps to ensure the perfect fit for each pipe type. Our SS pipe clamps are available in sizes from 1/2" to 6" for comprehensive pipe support solutions.'
    },
    {
      question: 'Can stainless steel pipe clamps be used for high-pressure hydraulic lines?',
      answer: 'Yes, our heavy-duty stainless steel pipe clamps are engineered with high tensile strength to securely hold pipes in high-pressure hydraulic and pneumatic systems. We recommend our 1mm thickness metal clamps for high-pressure applications. Consult our technical team for the right SS metal clamp solution for your specific pressure requirements.'
    },
    {
      question: 'What sizes of metal clamps and SS pipe clamps do you manufacture?',
      answer: 'We manufacture stainless steel clamps and metal clamps in sizes ranging from 1/2" (15mm) to 6" (150mm) diameter. Our SS pipe clamps and SS pipe clips are available in two thickness options (0.5mm and 1mm) with ready stock availability. Custom-sized metal clamps are also available for specialized applications.'
    },
    {
      question: 'What is the price difference between SS metal clamps for UPVC vs CPVC pipes?',
      answer: 'CPVC-compatible stainless steel clamps are typically slightly lower priced than UPVC variants due to sizing differences. For example, our 0.5mm thickness 1/2" metal clamp is priced at ₹2.00 for UPVC and ₹1.75 for CPVC. Check our complete price list for all SS pipe clamp sizes and thickness options.'
    },
    {
      question: 'Do you provide material test certificates (MTC) for metal clamps?',
      answer: 'Absolutely. As a quality-focused manufacturer, we provide Mill Test Certificates (MTC) with every batch of stainless steel clamps, certifying the chemical composition and mechanical properties of the SS material used. This ensures traceability and quality assurance for all our metal clamp and SS pipe clamp products.'
    },
    {
      question: 'Are stainless steel clamps and metal clamps reusable?',
      answer: 'Yes, our high-quality stainless steel metal clamps are designed for multiple uses. The durable SS material and robust construction allow them to be installed, removed, and reinstalled during maintenance without losing their grip or structural integrity. This makes our SS metal clamps a cost-effective long-term solution.'
    },
    {
      question: 'Why choose JK Industries for metal clamps and stainless steel clamps?',
      answer: 'JK Industries is India\'s trusted manufacturer of metal clamps, SS metal clamps, stainless steel clamps, and SS pipe clamps. We offer ISO 9001:2015 certified products, competitive factory pricing, two thickness options (0.5mm and 1mm), UPVC and CPVC compatibility, ready stock availability, and excellent customer service. Our stainless steel pipe clamps are manufactured using premium SS202 grade material.'
    }
  ];

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platform: Object,
    private transferState: TransferState
  ) { }

  ngOnInit() {
    this.updateSeo();
    this.setProductStructuredData();
    this.setFaqStructuredData();
    this.setBreadcrumbStructuredData();
    this.setBusinessStructuredData();
    this.setHowToStructuredData();
    this.setItemListStructuredData();
    this.setWebPageStructuredData();
    
    // Initialize expandedFaqs array
    this.expandedFaqs = new Array(this.faqs.length).fill(false);
    
    // Only init AOS in browser
    if (isPlatformBrowser(this.platform)) {
      Aos.init({
        duration: 800,
        once: true,
        offset: 100
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platform)) {
      Aos.refresh();
    }
  }

  private updateSeo() {
    this.titleService.setTitle('Metal Clamp | SS Metal Clamp | Stainless Steel Clamp | Stainless Steel Pipe Clamp | SS Pipe Clip Manufacturer | JK Industries');
    
    this.meta.addTags([
      { name: 'description', content: 'India\'s #1 Manufacturer of Metal Clamps, SS Metal Clamps, Stainless Steel Clamps, Stainless Steel Pipe Clamps & SS Pipe Clips. Premium SS202 Grade Metal Clamps for UPVC & CPVC Pipes. 0.5mm & 1mm Thickness. ISO Certified. Best Prices. Buy Direct from Factory in Rajkot, Gujarat.' },
      { name: 'keywords', content: 'Metal clamp, SS metal clamp, stainless steel clamp, stainless steel pipe clamp, SS pipe clip, SS clamp, metal pipe clamp, SS pipe clamp, stainless steel pipe clip, metal clamp manufacturer, SS clamp manufacturer, stainless steel clamp manufacturer India, metal clamp Rajkot, SS metal clamp Gujarat, UPVC metal clamp, CPVC metal clamp, 0.5mm metal clamp, 1mm stainless steel clamp' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'author', content: 'JK Industries' },
      { name: 'publisher', content: 'JK Industries' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'canonical', content: 'https://jkindustriesrajkot.com/products/metal-clamp' },
      
      // Location-specific meta tags
      { name: 'geo.region', content: 'IN-GJ' },
      { name: 'geo.placename', content: 'Rajkot, Gujarat' },
      { name: 'geo.position', content: '22.25592000;70.78272000' },
      { name: 'ICBM', content: '22.25592000, 70.78272000' },
      
      // Article meta tags
      { property: 'article:published_time', content: '2024-01-15T10:00:00+05:30' },
      { property: 'article:modified_time', content: '2026-01-08T10:00:00+05:30' },
      { property: 'article:section', content: 'Plumbing Products' },
      { property: 'article:tag', content: 'Metal Clamp' },
      { property: 'article:tag', content: 'SS Metal Clamp' },
      { property: 'article:tag', content: 'Stainless Steel Clamp' },
      { property: 'article:tag', content: 'SS Pipe Clamp' },
      
      // Product meta tags
      { property: 'product:price:amount', content: '1.75' },
      { property: 'product:price:currency', content: 'INR' },
      { property: 'product:availability', content: 'in stock' },
      { property: 'product:condition', content: 'new' },
      { property: 'product:brand', content: 'Edler Clamp' },
      
      // Open Graph Tags
      { property: 'og:title', content: 'Metal Clamp | SS Metal Clamp | Stainless Steel Clamp | Stainless Steel Pipe Clamp Manufacturer' },
      { property: 'og:description', content: 'India\'s #1 Manufacturer of Metal Clamps, SS Metal Clamps & Stainless Steel Clamps. Premium SS Pipe Clamps & SS Pipe Clips for UPVC & CPVC Pipes. ISO Certified.' },
      { property: 'og:image', content: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg' },
      { property: 'og:image:width', content: '6720' },
      { property: 'og:image:height', content: '4480' },
      { property: 'og:image:alt', content: 'Metal Clamp - Premium SS Metal Clamp and Stainless Steel Pipe Clamp by JK Industries' },
      { property: 'og:url', content: 'https://jkindustriesrajkot.com/products/metal-clamp' },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: 'JK Industries' },
      { property: 'og:locality', content: 'Rajkot' },
      { property: 'og:region', content: 'Gujarat' },
      { property: 'og:postal-code', content: '360004' },
      { property: 'og:country-code', content: 'IN' },
      { property: 'og:country-name', content: 'India' },
      
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Metal Clamp | SS Metal Clamp | Stainless Steel Clamp Manufacturer' },
      { name: 'twitter:description', content: 'Premium Metal Clamps, SS Metal Clamps & Stainless Steel Pipe Clamps. SS Pipe Clips for UPVC & CPVC Pipes. 0.5mm & 1mm Thickness. ISO Certified. Buy Direct from Factory.' },
      { name: 'twitter:image', content: 'https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg' },
      { name: 'twitter:image:alt', content: 'Metal Clamp - Premium Stainless Steel Pipe Clamp' }
    ]);
  }

  private setProductStructuredData() {
    if (this.transferState.hasKey(SS_PRODUCT_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SS_PRODUCT_SCHEMA, ''));
      return;
    }

    // Combine all sizes for hasVariant
    const allVariants = [
      ...this.productSizes05mm.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch SS Metal Clamp 0.5mm UPVC`,
        "sku": `${size.sku}-UPVC`,
        "size": `${size.sizeInch} Inch / 0.5mm Thickness`,
        "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "brand": { "@type": "Brand", "name": "Edler Clamp" },
        "material": ["Stainless Steel"],
        "color": "Silver / Polished Steel",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": size.priceUPVC.toString(),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": "2",
            "maxValue": "7",
            "unitCode": "DAY"
          },
          "eligibleQuantity" : {
            "@type" : "QuantitativeValue",
            "unitCode" : "FTK",
            "value" : "1"
          }
        },
        "countryOfOrigin": {
          "@type": "Country",
          "name": "India"
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Thickness", "value": "0.5mm" },
          { "@type": "PropertyValue", "name": "Pipe Type", "value": "UPVC" },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing", "value": size.packingQty.toString() }
        ]
      })),
      ...this.productSizes05mm.filter(size => size.priceCPVC > 0).map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch SS Metal Clamp 0.5mm CPVC`,
        "sku": `${size.sku}-CPVC`,
        "size": `${size.sizeInch} Inch / 0.5mm Thickness`,
        "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "brand": { "@type": "Brand", "name": "Edler Clamp" },
        "material": ["Stainless Steel"],
        "color": "Silver / Polished Steel",
        "countryOfOrigin": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": size.priceCPVC.toString(),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": "2",
            "maxValue": "7",
            "unitCode": "DAY"
          },
          "eligibleQuantity" : {
            "@type" : "QuantitativeValue",
            "unitCode" : "FTK",
            "value" : "1"
          }
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Thickness", "value": "0.5mm" },
          { "@type": "PropertyValue", "name": "Pipe Type", "value": "CPVC" },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing", "value": size.packingQty.toString() }
        ]
      })),
      ...this.productSizes1mm.map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch SS Metal Clamp 1mm UPVC`,
        "sku": `${size.sku}-UPVC`,
        "size": `${size.sizeInch} Inch / 1mm Thickness`,
        "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "brand": { "@type": "Brand", "name": "Edler Clamp" },
        "material": ["Stainless Steel"],
        "color": "Silver / Polished Steel",
        "countryOfOrigin": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": size.priceUPVC.toString(),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": "2",
            "maxValue": "7",
            "unitCode": "DAY"
          },
          "eligibleQuantity" : {
            "@type" : "QuantitativeValue",
            "unitCode" : "FTK",
            "value" : "1"
          }
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Thickness", "value": "1mm" },
          { "@type": "PropertyValue", "name": "Pipe Type", "value": "UPVC" },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing", "value": size.packingQty.toString() }
        ]
      })),
      ...this.productSizes1mm.filter(size => size.priceCPVC > 0).map(size => ({
        "@type": "Product",
        "name": `${size.sizeInch} Inch SS Metal Clamp 1mm CPVC`,
        "sku": `${size.sku}-CPVC`,
        "size": `${size.sizeInch} Inch / 1mm Thickness`,
        "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "brand": { "@type": "Brand", "name": "Edler Clamp" },
        "material": ["Stainless Steel"],
        "color": "Silver / Polished Steel",
        "countryOfOrigin": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": size.priceCPVC.toString(),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": "2",
            "maxValue": "7",
            "unitCode": "DAY"
          },
          "eligibleQuantity" : {
            "@type" : "QuantitativeValue",
            "unitCode" : "FTK",
            "value" : "1"
          }
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Thickness", "value": "1mm" },
          { "@type": "PropertyValue", "name": "Pipe Type", "value": "CPVC" },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing", "value": size.packingQty.toString() }
        ]
      }))
    ];

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "category": "Metal Clamp, SS Clamp, Stainless Steel Clamp, Pipe Clamp, Clips, Clamps",
      "name": "Metal Clamp | SS Metal Clamp | Stainless Steel Clamp | Stainless Steel Pipe Clamp | SS Pipe Clip",
      "url": "https://jkindustriesrajkot.com/products/metal-clamp",
      "image": [
        "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg"
      ],
      "description": "JK Industries manufactures premium Metal Clamps and SS Metal Clamps with superior corrosion resistance. Our Stainless Steel Clamps, Stainless Steel Pipe Clamps, and SS Pipe Clips are ideal for UPVC and CPVC pipes in industrial, marine, chemical, and food processing applications. Available in 0.5mm and 1mm thickness, sizes 1/2\" to 6\".",
      "sku": "SS-CLAMP-001",
      "mpn": "JK-SS-001",
      "gtin13": "8901234567893",
      "brand": {
        "@type": "Brand",
        "name": "Edler Clamp"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "JK Industries",
        "url": "https://jkindustriesrajkot.com",
        "logo": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "postalCode": "360004",
          "addressCountry": "IN"
        }
      },
      "countryOfOrigin": {
        "@type": "Country",
        "name": "India"
      },
      "alternateName": ["Metal clamp", "SS metal clamp", "stainless steel clamp", "stainless steel pipe clamp", "SS pipe clip", "SS clamp", "metal pipe clamp", "SS pipe clamp", "stainless steel pipe clip"],
      "material": ["SS202 Stainless Steel", "SS304 Marine Grade Available"],
      "color": "Silver / Polished Steel",
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://jkindustriesrajkot.com/products/metal-clamp",
        "priceCurrency": "INR",
        "lowPrice": "1.75",
        "highPrice": "16.50",
        "offerCount": "38",
        "price": "1.75",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "JK Industries"
        },
        "areaServed": [
          { "@type": "Country", "name": "India" },
          { "@type": "City", "name": "Rajkot" },
          { "@type": "State", "name": "Gujarat" },
          { "@type": "AdministrativeArea", "name": "Worldwide" },
          {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "22.25592000",
              "longitude": "70.78272000"
            },
            "geoRadius": "5000"
          }
        ],
        "deliveryLeadTime": {
          "@type": "QuantitativeValue",
          "minValue": "2",
          "maxValue": "7",
          "unitCode": "DAY"
        },
        "eligibleQuantity" : {
          "@type" : "QuantitativeValue",
          "unitCode" : "FTK",
          "value" : "1"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "INR"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "IN"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": "1",
              "maxValue": "2",
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": "2",
              "maxValue": "7",
              "unitCode": "DAY"
            }
          }
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "127",
        "reviewCount": "85"
      },
      "review": this.testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.author },
        "reviewBody": t.quote
      })),
      "isAccessoryOrSparePartFor": { "@type": "Product", "name": "UPVC/CPVC Piping System" },
      "width": {
        "@type": "QuantitativeValue",
        "value": "150",
        "unitCode": "MMT"
      },
      "height": {
        "@type": "QuantitativeValue",
        "value": "1",
        "unitCode": "MMT"
      },
      "weight": {
        "@type": "QuantitativeValue",
        "value": "55",
        "unitCode": "GRM"
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Material", "value": "SS202 Stainless Steel (Marine Grade SS304 Available)" },
        { "@type": "PropertyValue", "name": "Size Range", "value": "1/2\" to 6\" (15mm - 150mm)" },
        { "@type": "PropertyValue", "name": "Thickness Options", "value": "0.5mm and 1mm" },
        { "@type": "PropertyValue", "name": "Pipe Compatibility", "value": "UPVC and CPVC Pipes" },
        { "@type": "PropertyValue", "name": "Temperature Range", "value": "-50°C to 800°C" },
        { "@type": "PropertyValue", "name": "Tensile Strength", "value": "520-720 MPa" },
        { "@type": "PropertyValue", "name": "Surface Finish", "value": "Polished, Matte, or Custom" },
        { "@type": "PropertyValue", "name": "Certification", "value": "ISO 9001:2015, CE Compliant" },
        { "@type": "PropertyValue", "name": "Application Standards", "value": "ASTM A276, AISI 202" },
        { "@type": "PropertyValue", "name": "Product Type", "value": "Stainless Steel Metal Clamp" }
      ],
      "hasVariant": allVariants
    };

    const schemaString = JSON.stringify(schema);
    this.transferState.set(SS_PRODUCT_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setHowToStructuredData() {
    if (this.transferState.hasKey(SS_HOWTO_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SS_HOWTO_SCHEMA, ''));
      return;
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Install Metal Clamps and SS Pipe Clamps",
      "description": "Step-by-step guide to properly install metal clamps and stainless steel pipe clamps for secure pipe mounting. Learn the correct technique for installing SS metal clamps on UPVC and CPVC pipes.",
      "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
      "totalTime": "PT10M",
      "supply": [
        { "@type": "HowToSupply", "name": "Stainless Steel Metal Clamps" },
        { "@type": "HowToSupply", "name": "Mounting Screws or Anchors" }
      ],
      "tool": [
        { "@type": "HowToTool", "name": "Screwdriver or Power Drill" },
        { "@type": "HowToTool", "name": "Measuring Tape" },
        { "@type": "HowToTool", "name": "Pencil for Marking" },
        { "@type": "HowToTool", "name": "4mm Drill Bit (for hard surfaces)" }
      ],
      "step": this.installationSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "image": step.image,
        "url": `https://jkindustriesrajkot.com/products/stainless-steel-clamp#step-${index + 1}`
      }))
    };

    const schemaString = JSON.stringify(howToSchema);
    this.transferState.set(SS_HOWTO_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setItemListStructuredData() {
    if (this.transferState.hasKey(SS_ITEMLIST_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SS_ITEMLIST_SCHEMA, ''));
      return;
    }

    // Build all variants matching hasVariant structure
    const all05mmUPVC = this.productSizes05mm.map((size, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": `${size.sizeInch} Inch SS Metal Clamp 0.5mm UPVC`,
        "description": `Premium ${size.sizeInch} Inch stainless steel metal clamp with 0.5mm thickness for UPVC pipes. Perfect for pipe support applications.`,
        "sku": `${size.sku}-UPVC`,
        "size": `${size.sizeInch} Inch / 0.5mm Thickness`,
        "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "brand": { "@type": "Brand", "name": "Edler Clamp" },
        "material": ["Stainless Steel"],
        "color": "Silver / Polished Steel",
        "countryOfOrigin": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": size.priceUPVC.toString(),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": "2",
            "maxValue": "7",
            "unitCode": "DAY"
          },
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "unitCode": "FTK",
            "value": "1"
          }
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Thickness", "value": "0.5mm" },
          { "@type": "PropertyValue", "name": "Pipe Type", "value": "UPVC" },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing", "value": size.packingQty.toString() }
        ]
      }
    }));

    const all05mmCPVC = this.productSizes05mm.filter(size => size.priceCPVC > 0).map((size, index) => ({
      "@type": "ListItem",
      "position": all05mmUPVC.length + index + 1,
      "item": {
        "@type": "Product",
        "name": `${size.sizeInch} Inch SS Metal Clamp 0.5mm CPVC`,
        "description": `Premium ${size.sizeInch} Inch stainless steel metal clamp with 0.5mm thickness for CPVC pipes. Perfect for pipe support applications.`,
        "sku": `${size.sku}-CPVC`,
        "size": `${size.sizeInch} Inch / 0.5mm Thickness`,
        "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "brand": { "@type": "Brand", "name": "Edler Clamp" },
        "material": ["Stainless Steel"],
        "color": "Silver / Polished Steel",
        "countryOfOrigin": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": size.priceCPVC.toString(),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": "2",
            "maxValue": "7",
            "unitCode": "DAY"
          },
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "unitCode": "FTK",
            "value": "1"
          }
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Thickness", "value": "0.5mm" },
          { "@type": "PropertyValue", "name": "Pipe Type", "value": "CPVC" },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing", "value": size.packingQty.toString() }
        ]
      }
    }));

    const all1mmUPVC = this.productSizes1mm.map((size, index) => ({
      "@type": "ListItem",
      "position": all05mmUPVC.length + all05mmCPVC.length + index + 1,
      "item": {
        "@type": "Product",
        "name": `${size.sizeInch} Inch SS Metal Clamp 1mm UPVC`,
        "description": `Premium ${size.sizeInch} Inch stainless steel metal clamp with 1mm thickness for UPVC pipes. Heavy-duty pipe support.`,
        "sku": `${size.sku}-UPVC`,
        "size": `${size.sizeInch} Inch / 1mm Thickness`,
        "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "brand": { "@type": "Brand", "name": "Edler Clamp" },
        "material": ["Stainless Steel"],
        "color": "Silver / Polished Steel",
        "countryOfOrigin": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": size.priceUPVC.toString(),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": "2",
            "maxValue": "7",
            "unitCode": "DAY"
          },
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "unitCode": "FTK",
            "value": "1"
          }
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Thickness", "value": "1mm" },
          { "@type": "PropertyValue", "name": "Pipe Type", "value": "UPVC" },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing", "value": size.packingQty.toString() }
        ]
      }
    }));

    const all1mmCPVC = this.productSizes1mm.filter(size => size.priceCPVC > 0).map((size, index) => ({
      "@type": "ListItem",
      "position": all05mmUPVC.length + all05mmCPVC.length + all1mmUPVC.length + index + 1,
      "item": {
        "@type": "Product",
        "name": `${size.sizeInch} Inch SS Metal Clamp 1mm CPVC`,
        "description": `Premium ${size.sizeInch} Inch stainless steel metal clamp with 1mm thickness for CPVC pipes. Heavy-duty pipe support.`,
        "sku": `${size.sku}-CPVC`,
        "size": `${size.sizeInch} Inch / 1mm Thickness`,
        "image": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "brand": { "@type": "Brand", "name": "Edler Clamp" },
        "material": ["Stainless Steel"],
        "color": "Silver / Polished Steel",
        "countryOfOrigin": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": size.priceCPVC.toString(),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "deliveryLeadTime": {
            "@type": "QuantitativeValue",
            "minValue": "2",
            "maxValue": "7",
            "unitCode": "DAY"
          },
          "eligibleQuantity": {
            "@type": "QuantitativeValue",
            "unitCode": "FTK",
            "value": "1"
          }
        },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Thickness", "value": "1mm" },
          { "@type": "PropertyValue", "name": "Pipe Type", "value": "CPVC" },
          { "@type": "PropertyValue", "name": "Qty PCS", "value": size.qtyPcs.toString() },
          { "@type": "PropertyValue", "name": "Packing", "value": size.packingQty.toString() }
        ]
      }
    }));

    const allSizes = [...all05mmUPVC, ...all05mmCPVC, ...all1mmUPVC, ...all1mmCPVC];

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Metal Clamp Sizes - Available SS Clamp Variants",
      "description": "Complete range of metal clamps and SS metal clamps available in 0.5mm and 1mm thickness. Stainless steel clamps for UPVC and CPVC pipes in sizes 1/2\" to 6\".",
      "numberOfItems": allSizes.length,
      "itemListElement": allSizes
    };

    const schemaString = JSON.stringify(itemListSchema);
    this.transferState.set(SS_ITEMLIST_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setWebPageStructuredData() {
    if (this.transferState.hasKey(SS_WEBPAGE_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SS_WEBPAGE_SCHEMA, ''));
      return;
    }

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://jkindustriesrajkot.com/products/stainless-steel-clamp#webpage",
      "url": "https://jkindustriesrajkot.com/products/metal-clamp",
      "name": "Metal Clamp | SS Metal Clamp | Stainless Steel Clamp | Stainless Steel Pipe Clamp Manufacturer",
      "description": "India's #1 Manufacturer of Metal Clamps, SS Metal Clamps & Stainless Steel Clamps. Premium SS Pipe Clamps & SS Pipe Clips for UPVC & CPVC Pipes. ISO Certified.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://jkindustriesrajkot.com/#website",
        "url": "https://jkindustriesrajkot.com",
        "name": "JK Industries",
        "description": "Leading manufacturer of metal clamps, SS clamps, and pipe support systems in India",
        "publisher": { "@type": "Organization", "name": "JK Industries" }
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".product-description", ".section-title", ".hero-content h1"]
      },
      "author": { "@type": "Organization", "name": "JK Industries" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://jkindustriesrajkot.com/assets/products/stainless-steel-clamp.jpg",
        "width": "6720",
        "height": "4480",
        "caption": "Metal Clamp - Premium SS Metal Clamp and Stainless Steel Pipe Clamp by JK Industries"
      }
    };

    const schemaString = JSON.stringify(webPageSchema);
    this.transferState.set(SS_WEBPAGE_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setFaqStructuredData() {
    if (this.transferState.hasKey(SS_FAQ_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SS_FAQ_SCHEMA, ''));
      return;
    }

    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": this.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };

    const schemaString = JSON.stringify(faqData);
    this.transferState.set(SS_FAQ_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBreadcrumbStructuredData() {
    if (this.transferState.hasKey(SS_BREADCRUMB_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SS_BREADCRUMB_SCHEMA, ''));
      return;
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://jkindustriesrajkot.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": "https://jkindustriesrajkot.com/products"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Metal Clamp | SS Metal Clamp | Stainless Steel Clamp | Edler Clamp",
          "item": "https://jkindustriesrajkot.com/products/metal-clamp"
        }
      ]
    };

    const schemaString = JSON.stringify(breadcrumbSchema);
    this.transferState.set(SS_BREADCRUMB_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private setBusinessStructuredData() {
    if (this.transferState.hasKey(SS_BUSINESS_SCHEMA)) {
      this.addJsonLd(this.transferState.get(SS_BUSINESS_SCHEMA, ''));
      return;
    }

    const businessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "JK Industries",
      "image": "https://jkindustriesrajkot.com/assets/logo/jk_logo.png",
      "telephone": "+91 9979032430",
      "email": "jkindustries1955@gmail.com",
      "url": "https://jkindustriesrajkot.com",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360004",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "22.25592000",
        "longitude": "70.78272000"
      },
      "department": [
        {
          "@type": "LocalBusiness",
          "name": "Metal Clamp Manufacturing Unit",
          "description": "Premium manufacturing unit for Metal Clamps, SS Metal Clamps, Stainless Steel Clamps, and SS Pipe Clamps",
          "telephone": "+91 9979032430",
          "email": "jkindustries1955@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Radhekrishan Chowk, Sojitra park, Mavdi baypass road",
            "addressLocality": "Rajkot",
            "addressRegion": "Gujarat",
            "postalCode": "360004",
            "addressCountry": "IN"
          }
        }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      "areaServed": [
        { "@type": "City", "name": "Rajkot" },
        { "@type": "Country", "name": "India" },
        { "@type": "State", "name": "Gujarat" },
        { "@type": "State", "name": "Maharashtra" },
        { "@type": "State", "name": "Karnataka" },
        { "@type": "State", "name": "Tamil Nadu" },
        { "@type": "AdministrativeArea", "name": "Worldwide" }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/jk-industries-india/",
        "https://www.instagram.com/jk_industries_1995/"
      ]
    };

    const schemaString = JSON.stringify(businessData);
    this.transferState.set(SS_BUSINESS_SCHEMA, schemaString);
    this.addJsonLd(schemaString);
  }

  private addJsonLd(schema: string) {
    if (!isPlatformBrowser(this.platform)) return;
    
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = schema;
    this.document.head.appendChild(script);
  }

  downloadBrochure() {
    alert('Our technical datasheet for Metal Clamps will be available for download soon!');
  }

  toggleFaq(index: number) {
    this.expandedFaqs[index] = !this.expandedFaqs[index];
    
    for (let i = 0; i < this.expandedFaqs.length; i++) {
      if (i !== index) this.expandedFaqs[i] = false;
    }
  }

  openEnquiryForm() {
    this.showEnquiryForm = true;
    if (isPlatformBrowser(this.platform)) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  closeEnquiryForm(event: any) {
    if (event.target.classList.contains('enquiry-modal') || event.target.classList.contains('close-modal')) {
      this.showEnquiryForm = false;
      if (isPlatformBrowser(this.platform)) {
        this.document.body.style.overflow = 'auto';
      }
    }
  }

  submitEnquiry() {
    console.log('Enquiry submitted:', this.enquiryData);
    alert('Thank you for your enquiry about Metal Clamps. We will contact you shortly.');
    this.showEnquiryForm = false;
    this.enquiryData = { name: '', email: '', phone: '', company: '', quantity: null, message: '' };
    if (isPlatformBrowser(this.platform)) {
      this.document.body.style.overflow = 'auto';
    }
  }
}
