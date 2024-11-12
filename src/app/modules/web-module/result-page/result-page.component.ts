import { Component, OnInit } from '@angular/core';
import { QuizResponse } from '../../../shared/models/QuizResponse/quiz-response';
import { QuizService } from '../../../services/quiz/quiz.service';
import { ToastrService } from 'ngx-toastr';
import { CorousalComponentComponent } from '../corousal-component/corousal-component.component';
import { KappaContentPageComponent } from '../kappa-content-page/kappa-content-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PittaContentPageComponent } from '../pitta-content-page/pitta-content-page.component';
import { VataContentPageComponent } from '../vata-content-page/vata-content-page.component';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [KappaContentPageComponent, CommonModule, FormsModule, ReactiveFormsModule, PittaContentPageComponent, VataContentPageComponent],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent implements OnInit {

  selectedAnswerList!: any;
  quizLength!: any;
  isVataDominant = true;
  isKaphaDominant = false;
  isPittaDominant = false;

  showVata = false;
  showPitta = false;
  showKappa = false;

  vataAnswerCount = 0;
  pittaAnswerCount = 0;
  kappaAnswerCount = 0;

  vataPercentage = 0;
  pittaPercentage = 0;
  kappaPercentage = 0;

  quizResponseModel = new QuizResponse();

  currentIndex = 0;

  dominantTypes = [
    { name: 'Vata', image: '../../../../assets/images/vata_1.jpg', index: 0 },
    { name: 'Pitta', image: '../../../../assets/images/pitta_2.jpg', index: 1 },
    { name: 'Kapha', image: '../../../../assets/images/kappa_2.jpg', index:2 }
  ];

  dominantTypesRev = [
    { name: 'Kapha', image: '../../../../assets/images/kappa_2.jpg' },
    { name: 'Vata', image: '../../../../assets/images/vata_1.jpg' },
    { name: 'Pitta', image: '../../../../assets/images/pitta_2.jpg' },
  ];

  constructor(private quizService: QuizService, private tostr: ToastrService) {
  }

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

    this.vataPercentage = (this.vataAnswerCount / parseInt(this.quizLength)) * 100;
    this.pittaPercentage = (this.pittaAnswerCount / parseInt(this.quizLength)) * 100;
    this.kappaPercentage = (this.kappaAnswerCount / parseInt(this.quizLength)) * 100;

    let maxValue = Math.max(this.vataPercentage, this.pittaPercentage, this.kappaPercentage);

    if (maxValue === this.vataPercentage) {
        this.isVataDominant = true;
        this.isPittaDominant = false;
        this.isKaphaDominant = false;

        this.showVata = true;
        this.showPitta = false;
        this.showKappa = false;
    } else if (maxValue === this.pittaPercentage) {
        this.isVataDominant = false;
        this.isPittaDominant = true;
        this.isKaphaDominant = false;

        this.showPitta = true;
        this.showKappa = false;
        this.showVata = false;
    } else if (maxValue === this.kappaPercentage) {
      this.isVataDominant = false;
      this.isPittaDominant = false;
      this.isKaphaDominant = true;

      this.showKappa = true;
      this.showPitta = false;
      this.showVata = false;
    }

    if (this.isPittaDominant) {
      if (getBgEl) {
        // getBgEl.style.backgroundImage = 'url("../../../../assets/images/pitta_2.jpg")';
        getBgEl.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../../../assets/images/pitta_2.jpg")';
        getBgEl.style.backgroundSize = 'cover';
        getBgEl.style.backgroundPosition = 'center';

        this.currentIndex = 1;
      }
    } else if (this.isVataDominant) {
      if (getBgEl) {
        // getBgEl.style.backgroundImage = 'url("../../../../assets/images/vata_2.jpg")';
        getBgEl.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../../../assets/images/vata_1.jpg")';
        getBgEl.style.backgroundSize = 'cover';
        getBgEl.style.backgroundPosition = 'center';

        this.currentIndex = 0;
      }
    } else {
      // getBgEl.style.backgroundImage = 'url("../../../../assets/images/kappa_2.jpg")';
      getBgEl.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../../../assets/images/kappa_2.jpg")';
      getBgEl.style.backgroundSize = 'cover';
      getBgEl.style.backgroundPosition = 'center';

      this.currentIndex = 2;
    }

    // this.submitQuizresponse();
  }

  onClickPrevSlide() {
    const getBgEl = document.getElementById("bg");
  
    if (!getBgEl) {
      console.error("Background element not found");
      return;
    }

    if (this.showKappa) {
      this.showKappa = false;
      this.showVata = true;

      this.currentIndex = 0;
    } else if (this.showPitta) {
      this.showPitta = false;
      this.showKappa = true;

      this.currentIndex = 2;
    } else {
      this.showVata = false;
      this.showPitta = true;

      this.currentIndex = 1;
    }

    const currentType = this.dominantTypes[this.currentIndex];
    this.setBackground(getBgEl, currentType.image);

    this.currentIndex = (this.currentIndex + 1) % this.dominantTypes.length;
  }

  onClickNextSlide() {
    const getBgEl = document.getElementById("bg");
  
    if (!getBgEl) {
      console.error("Background element not found");
      return;
    }

    if (this.showKappa) {
      this.showPitta = true;
      this.showKappa = false;

      this.currentIndex = 1;
    } else if (this.showPitta) {
      this.showPitta = false;
      this.showVata = true;

      this.currentIndex = 0;
    } else {
      this.showVata = false;
      this.showKappa = true;

      this.currentIndex = 2;
    }
    
    const currentType = this.dominantTypes[this.currentIndex];
    this.setBackground(getBgEl, currentType.image);

    this.currentIndex = (this.currentIndex + 1) % this.dominantTypes.length;
  }
  
  // Helper method to set the background style
  setBackground(element: HTMLElement, imageUrl: string) {
    element.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${imageUrl}")`;
    element.style.backgroundSize = 'cover';
    element.style.backgroundPosition = 'center';
  }

  submitQuizresponse() {
    this.quizResponseModel.client_id = localStorage.getItem("clientId");
    this.quizResponseModel.vataPercentage = this.vataPercentage.toString();
    this.quizResponseModel.pittaPercentage = this.pittaPercentage.toString();
    this.quizResponseModel.kappaPercentage = this.kappaPercentage.toString();

    this.quizService.submitQuestionResponse(this.quizResponseModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        this.tostr.success("Submit Quiz Response", "Submiting Successfully");
      } else {
        this.tostr.error("Error Submit the Response", resp.message);
      }
    })
  }

}
