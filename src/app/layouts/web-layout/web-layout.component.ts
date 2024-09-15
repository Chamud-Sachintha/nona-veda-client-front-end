import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-web-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './web-layout.component.html',
  styleUrl: './web-layout.component.css'
})
export class WebLayoutComponent {

}
