import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinklerClampComponent } from './sprinkler-clamp.component';

describe('SprinklerClampComponent', () => {
  let component: SprinklerClampComponent;
  let fixture: ComponentFixture<SprinklerClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprinklerClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SprinklerClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
