import { Component, OnInit } from '@angular/core';
import { CorousalComponentComponent } from '../corousal-component/corousal-component.component';
import { AppCorousalComponent2Component } from '../app-corousal-component-2/app-corousal-component-2.component';

@Component({
  selector: 'app-pitta-content-page',
  standalone: true,
  imports: [AppCorousalComponent2Component],
  templateUrl: './pitta-content-page.component.html',
  styleUrl: './pitta-content-page.component.css'
})
export class PittaContentPageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
