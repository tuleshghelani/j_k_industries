import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StainlessSteelClampComponent } from './stainless-steel-clamp.component';

describe('StainlessSteelClampComponent', () => {
  let component: StainlessSteelClampComponent;
  let fixture: ComponentFixture<StainlessSteelClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StainlessSteelClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StainlessSteelClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
