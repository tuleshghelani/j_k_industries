import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpvcDoubleNailClampComponent } from './upvc-double-nail-clamp.component';

describe('UpvcDoubleNailClampComponent', () => {
  let component: UpvcDoubleNailClampComponent;
  let fixture: ComponentFixture<UpvcDoubleNailClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpvcDoubleNailClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpvcDoubleNailClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
