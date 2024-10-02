import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorousalComponentComponent } from './corousal-component.component';

describe('CorousalComponentComponent', () => {
  let component: CorousalComponentComponent;
  let fixture: ComponentFixture<CorousalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorousalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorousalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
