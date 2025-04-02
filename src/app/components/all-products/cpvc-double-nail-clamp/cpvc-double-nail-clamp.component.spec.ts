import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpvcDoubleNailClampComponent } from './cpvc-double-nail-clamp.component';

describe('CpvcDoubleNailClampComponent', () => {
  let component: CpvcDoubleNailClampComponent;
  let fixture: ComponentFixture<CpvcDoubleNailClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpvcDoubleNailClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CpvcDoubleNailClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
