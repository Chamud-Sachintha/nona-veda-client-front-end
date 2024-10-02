import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCorousalComponent3Component } from './app-corousal-component-3.component';

describe('AppCorousalComponent3Component', () => {
  let component: AppCorousalComponent3Component;
  let fixture: ComponentFixture<AppCorousalComponent3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCorousalComponent3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCorousalComponent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
