import { Component } from '@angular/core';
import { WebHeaderComponent } from "../../../shared/web-header/web-header.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [WebHeaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

}
