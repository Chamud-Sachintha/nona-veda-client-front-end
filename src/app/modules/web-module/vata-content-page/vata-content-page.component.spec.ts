import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VataContentPageComponent } from './vata-content-page.component';

describe('VataContentPageComponent', () => {
  let component: VataContentPageComponent;
  let fixture: ComponentFixture<VataContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VataContentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VataContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
