import { Component, OnInit } from '@angular/core';
import { WebHeaderComponent } from '../../../shared/web-header/web-header.component';
import { QuizService } from '../../../services/quiz/quiz.service';
import { Quiz } from '../../../shared/models/Quiz/quiz';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MobileHeaderComponent } from '../../../shared/mobile-header/mobile-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WebHeaderComponent, CommonModule, MobileHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  quizModelList: Quiz[] = [];
  selectedQuestion: Quiz[] = [];
  selectedAnswersList: any[] = [];
  currentQuestion = 0;

  anserIndexSelected = 0;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    const savedAnswers = JSON.parse(localStorage.getItem("resultSet") || "[]");
    this.selectedAnswersList = savedAnswers;

    this.getAllQuizList();
  }

  isSelected(answerIndex: number): boolean {
    return this.selectedAnswersList[this.currentQuestion] === answerIndex;
  }

  // onSelectOption(answerIndex: any) {

  //   this.anserIndexSelected = answerIndex;

  //   // Save the answer for the current question in the array
  //   this.selectedAnswersList[this.currentQuestion] = answerIndex;

  //   // Save to localStorage after every selection
  //   localStorage.setItem("resultSet", JSON.stringify(this.selectedAnswersList));
  //   localStorage.setItem("quizLength", (this.currentQuestion + 1).toString());

  //   this.selectedQuestion = [];
  //   this.currentQuestion += 1;

  //   if (this.quizModelList.length >= this.currentQuestion) {
  //     if (this.quizModelList.length > this.currentQuestion) {
  //       this.selectedQuestion.push(this.quizModelList[this.currentQuestion]);
  //       // Restore selected answer for this question if exists
  //       const savedAnswers = JSON.parse(localStorage.getItem("resultSet") || "[]");
  //       this.anserIndexSelected = savedAnswers[this.currentQuestion] || 0;
  //     }
  //   }

  //   if (this.selectedAnswersList.filter(a => a !== undefined).length === this.quizModelList.length) {
  //     this.router.navigate(['/app/results']);
  //   }

  // }

  onSelectOption(answerIndex: any) {
    this.anserIndexSelected = answerIndex;

    // Save the answer for the current question in the array
    this.selectedAnswersList[this.currentQuestion] = answerIndex;

    // Save to localStorage after every selection
    localStorage.setItem("resultSet", JSON.stringify(this.selectedAnswersList));
    localStorage.setItem("quizLength", (this.currentQuestion + 1).toString());

    this.selectedQuestion = [];
    this.currentQuestion += 1;

    if (this.quizModelList.length >= this.currentQuestion) {
      if (this.quizModelList.length > this.currentQuestion) {
        this.selectedQuestion.push(this.quizModelList[this.currentQuestion]);

        // Restore selected answer for this question if exists
        const savedAnswers = JSON.parse(localStorage.getItem("resultSet") || "[]");
        this.anserIndexSelected = savedAnswers[this.currentQuestion] || 0;
      }
    }

    // ✅ Check if all answers are selected (final question answered)
    if (this.selectedAnswersList.filter(a => a !== undefined).length === this.quizModelList.length) {
      var tmpResults = localStorage.getItem("resultSet");
      localStorage.removeItem("resultSet") // ✅ Clear localStorage here
      localStorage.setItem("tmpResults", tmpResults ? tmpResults : "[]");
      this.router.navigate(['/app/results']);
    }
  }


  onClickPrevButton() {
    this.selectedQuestion = [];
    this.currentQuestion -= 1;
    this.selectedQuestion.push(this.quizModelList[this.currentQuestion]);
    // Restore selected answer for this question if exists
    const savedAnswers = JSON.parse(localStorage.getItem("resultSet") || "[]");
    this.anserIndexSelected = savedAnswers[this.currentQuestion] || 0;
  }

  getAllQuizList() {
    this.quizService.getQuizList().subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        dataList.data[0].forEach((el: any) => {
          this.quizModelList.push(el);
        })

        this.selectedQuestion.push(this.quizModelList[this.currentQuestion]);
      }
    })
  }

}
