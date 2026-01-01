import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BambooProfileComponent } from './bamboo-profile.component';

describe('BambooProfileComponent', () => {
  let component: BambooProfileComponent;
  let fixture: ComponentFixture<BambooProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BambooProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BambooProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
