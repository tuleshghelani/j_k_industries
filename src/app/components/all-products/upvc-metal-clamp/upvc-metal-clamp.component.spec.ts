import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UPVCMetalClampComponent } from './upvc-metal-clamp.component';

describe('UPVCMetalClampComponent', () => {
  let component: UPVCMetalClampComponent;
  let fixture: ComponentFixture<UPVCMetalClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UPVCMetalClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UPVCMetalClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
