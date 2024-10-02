import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PittaContentPageComponent } from './pitta-content-page.component';

describe('PittaContentPageComponent', () => {
  let component: PittaContentPageComponent;
  let fixture: ComponentFixture<PittaContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PittaContentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PittaContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
