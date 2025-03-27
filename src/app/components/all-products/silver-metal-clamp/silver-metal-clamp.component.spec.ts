import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverMetalClampComponent } from './silver-metal-clamp.component';

describe('SilverMetalClampComponent', () => {
  let component: SilverMetalClampComponent;
  let fixture: ComponentFixture<SilverMetalClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilverMetalClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SilverMetalClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
