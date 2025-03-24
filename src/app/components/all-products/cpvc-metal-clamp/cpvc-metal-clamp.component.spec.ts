import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPVCMetalClampComponent } from './cpvc-metal-clamp.component';

describe('CPVCMetalClampComponent', () => {
  let component: CPVCMetalClampComponent;
  let fixture: ComponentFixture<CPVCMetalClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CPVCMetalClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CPVCMetalClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
