import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtmtConnectionPipeComponent } from './ptmt-connection-pipe.component';

describe('PtmtConnectionPipeComponent', () => {
  let component: PtmtConnectionPipeComponent;
  let fixture: ComponentFixture<PtmtConnectionPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtmtConnectionPipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PtmtConnectionPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
