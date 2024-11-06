import { Component, OnInit } from '@angular/core';
import { AppCorousalComponent3Component } from "../app-corousal-component-3/app-corousal-component-3.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-vata-content-page',
  standalone: true,
  imports: [AppCorousalComponent3Component, FooterComponent],
  templateUrl: './vata-content-page.component.html',
  styleUrl: './vata-content-page.component.css'
})
export class VataContentPageComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }

}
