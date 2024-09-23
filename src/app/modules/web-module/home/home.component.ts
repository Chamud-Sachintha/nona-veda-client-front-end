import { Component, OnInit } from '@angular/core';
import { WebHeaderComponent } from '../../../shared/web-header/web-header.component';
import { QuizService } from '../../../services/quiz/quiz.service';
import { Quiz } from '../../../shared/models/Quiz/quiz';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WebHeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  quizModelList: Quiz[] = [];
  selectedQuestion: Quiz[] = [];
  selectedAnswersList: any[] = [];
  currentQuestion = 1;

  constructor (private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.getAllQuizList();
  }

  onSelectOption(answerIndex: any) {
    this.selectedQuestion = [];

    if (this.quizModelList.length >= this.currentQuestion) {

      if (this.quizModelList.length > this.currentQuestion) {
        this.selectedQuestion.push(this.quizModelList[this.currentQuestion]);
      }

      this.currentQuestion += 1;
      this.selectedAnswersList.push(answerIndex);
    }

    if (this.selectedAnswersList.length === this.quizModelList.length) {
      localStorage.setItem("resultSet", JSON.stringify(this.selectedAnswersList));
      localStorage.setItem("quizLength", this.currentQuestion.toString());
      this.router.navigate(['/app/results'])
    }
  }
  
  getAllQuizList() {
    this.quizService.getQuizList().subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        dataList.data[0].forEach((el: any) => {
          this.quizModelList.push(el);
        })

        this.selectedQuestion.push(this.quizModelList[0]);
      }
    })
  }

}
