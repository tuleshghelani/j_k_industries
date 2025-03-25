import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenMetalClampComponent } from './golden-metal-clamp.component';

describe('GoldenMetalClampComponent', () => {
  let component: GoldenMetalClampComponent;
  let fixture: ComponentFixture<GoldenMetalClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldenMetalClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoldenMetalClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
