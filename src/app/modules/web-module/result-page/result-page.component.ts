import { Component, OnInit } from '@angular/core';
import { QuizResponse } from '../../../shared/models/QuizResponse/quiz-response';
import { QuizService } from '../../../services/quiz/quiz.service';
import { ToastrService } from 'ngx-toastr';

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

  vataPercentage = 0;
  pittaPercentage = 0;
  kappaPercentage = 0;

  quizResponseModel = new QuizResponse();

  constructor(private quizService: QuizService, private tostr: ToastrService) {}

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
        getBgEl.style.backgroundImage = 'url("../../../../assets/images/pitta.jpg")';
      }
    } else if (this.isVataDominant) {
      if (getBgEl) {
        getBgEl.style.backgroundImage = 'url("../../../../assets/images/vata.jpg")';
      }
    } else {
      getBgEl.style.backgroundImage = 'url("../../../../assets/images/kappa.jpg")';
    }

    this.submitQuizresponse();
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
