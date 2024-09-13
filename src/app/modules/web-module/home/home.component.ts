import { Component } from '@angular/core';
import { WebHeaderComponent } from '../../../shared/web-header/web-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WebHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
