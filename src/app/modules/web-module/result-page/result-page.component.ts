import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent implements OnInit {

  selectedAnswerList!: any;
  quizLength!: any;
  isVataDominant = true;
  isKaphaDominant = false;
  isPittaDominant = false;

  vataAnswerCount = 0;
  pittaAnswerCount = 0;
  kappaAnswerCount = 0;

  ngOnInit(): void {

    this.selectedAnswerList = localStorage.getItem("resultSet");
    this.quizLength = localStorage.getItem("quizLength");
    var getBgEl: any = document.getElementById("bg");

    const formatedAnswersList = JSON.parse(this.selectedAnswerList);

    formatedAnswersList.forEach((el: any) => {
      if (el === 1) {
        this.vataAnswerCount += 1;
      } else if (el === 2) {
        this.pittaAnswerCount += 1;
      } else {
        this.kappaAnswerCount += 1;
      }
    })

    var vataPercentage = (this.vataAnswerCount / parseInt(this.quizLength)) * 100;
    var pittaPercentage = (this.pittaAnswerCount / parseInt(this.quizLength)) * 100;
    var kappaPercentage = (this.kappaAnswerCount / parseInt(this.quizLength)) * 100;

    let maxValue = Math.max(vataPercentage, pittaPercentage, kappaPercentage);

    console.log(this.vataAnswerCount);
    console.log(this.pittaAnswerCount);
    console.log(this.kappaAnswerCount);

    console.log(vataPercentage);
    console.log(pittaPercentage);
    console.log(kappaPercentage);

    if (maxValue === vataPercentage) {
        this.isVataDominant = true;
        this.isPittaDominant = false;
        this.isKaphaDominant = false;
    } else if (maxValue === pittaPercentage) {
        this.isVataDominant = false;
        this.isPittaDominant = true;
        this.isKaphaDominant = false;
    } else if (maxValue === kappaPercentage) {
      this.isVataDominant = false;
      this.isPittaDominant = false;
      this.isKaphaDominant = true;
    }

    if (this.isPittaDominant) {
      if (getBgEl) {
        getBgEl.style.backgroundImage = 'url("../../../../assets/images/pitta.jpg")';
      }
    } else if (this.isVataDominant) {
      if (getBgEl) {
        getBgEl.style.backgroundImage = 'url("../../../../assets/images/vata.jpg")';
      }
    } else {
      console.log("jjj");
      getBgEl.style.backgroundImage = 'url("../../../../assets/images/kappa.jpg")';
    }
  }

}
