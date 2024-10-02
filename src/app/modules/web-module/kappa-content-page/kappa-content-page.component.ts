import { Component, OnInit } from '@angular/core';
import { CorousalComponentComponent } from '../corousal-component/corousal-component.component';

@Component({
  selector: 'app-kappa-content-page',
  standalone: true,
  imports: [CorousalComponentComponent],
  templateUrl: './kappa-content-page.component.html',
  styleUrl: './kappa-content-page.component.css'
})
export class KappaContentPageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }

}
