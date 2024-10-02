import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCorousalComponent2Component } from './app-corousal-component-2.component';

describe('AppCorousalComponent2Component', () => {
  let component: AppCorousalComponent2Component;
  let fixture: ComponentFixture<AppCorousalComponent2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCorousalComponent2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppCorousalComponent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
