import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KappaContentPageComponent } from './kappa-content-page.component';

describe('KappaContentPageComponent', () => {
  let component: KappaContentPageComponent;
  let fixture: ComponentFixture<KappaContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KappaContentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KappaContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
