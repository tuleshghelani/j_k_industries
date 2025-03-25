import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepClampComponent } from './step-clamp.component';

describe('StepClampComponent', () => {
  let component: StepClampComponent;
  let fixture: ComponentFixture<StepClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
