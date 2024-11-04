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

  vataAnswerCount = 0;
  pittaAnswerCount = 0;
  kappaAnswerCount = 0;

  vataPercentage = 0;
  pittaPercentage = 0;
  kappaPercentage = 0;

  quizResponseModel = new QuizResponse();

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
    } else if (maxValue === this.pittaPercentage) {
        this.isVataDominant = false;
        this.isPittaDominant = true;
        this.isKaphaDominant = false;
    } else if (maxValue === this.kappaPercentage) {
      this.isVataDominant = false;
      this.isPittaDominant = false;
      this.isKaphaDominant = true;
    }

    if (this.isPittaDominant) {
      if (getBgEl) {
        // getBgEl.style.backgroundImage = 'url("../../../../assets/images/pitta_2.jpg")';
        getBgEl.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../../../assets/images/pitta_2.jpg")';
        getBgEl.style.backgroundSize = 'cover';
        getBgEl.style.backgroundPosition = 'center';
      }
    } else if (this.isVataDominant) {
      if (getBgEl) {
        // getBgEl.style.backgroundImage = 'url("../../../../assets/images/vata_2.jpg")';
        getBgEl.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../../../assets/images/vata_1.jpg")';
        getBgEl.style.backgroundSize = 'cover';
        getBgEl.style.backgroundPosition = 'center';
      }
    } else {
      // getBgEl.style.backgroundImage = 'url("../../../../assets/images/kappa_2.jpg")';
      getBgEl.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../../../assets/images/kappa_2.jpg")';
      getBgEl.style.backgroundSize = 'cover';
      getBgEl.style.backgroundPosition = 'center';
    }

    // this.submitQuizresponse();
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
