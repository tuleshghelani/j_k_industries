import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NailClampComponent } from './nail-clamp.component';

describe('NailClampComponent', () => {
  let component: NailClampComponent;
  let fixture: ComponentFixture<NailClampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NailClampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NailClampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
