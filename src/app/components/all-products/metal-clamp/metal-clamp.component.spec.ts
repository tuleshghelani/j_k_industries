import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalClampComponent } from './metal-clamp.component';

describe('MetalClampComponent', () => {
  let component: MetalClampComponent;
  let fixture: ComponentFixture<MetalClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetalClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetalClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
