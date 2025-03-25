import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpvcConcealedValveComponent } from './cpvc-concealed-valve.component';

describe('CpvcConcealedValveComponent', () => {
  let component: CpvcConcealedValveComponent;
  let fixture: ComponentFixture<CpvcConcealedValveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpvcConcealedValveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CpvcConcealedValveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
