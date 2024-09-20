import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent implements OnInit {

  isVataDominant = true;
  isKaphaDominant = false;
  isPittaDominant = false;

  ngOnInit(): void {

    var getBgEl: any = document.getElementById("bg");

    if (this.isPittaDominant) {
      if (getBgEl) {
        getBgEl.style.backgroundImage = 'url("../../../../assets/images/pitta.jpg")';
      }
    } else if (this.isVataDominant) {
      if (getBgEl) {
        getBgEl.style.backgroundImage = 'url("../../../../assets/images/vata.jpg")';
      }
    }
  }

}
