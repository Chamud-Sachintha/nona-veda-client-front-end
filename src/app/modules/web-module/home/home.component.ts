import { Component, OnInit } from '@angular/core';
import { WebHeaderComponent } from '../../../shared/web-header/web-header.component';
import { QuizService } from '../../../services/quiz/quiz.service';
import { Quiz } from '../../../shared/models/Quiz/quiz';
import { CommonModule } from '@angular/common';

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
  currentQuestion = 1;

  constructor (private quizService: QuizService) {}

  ngOnInit(): void {
    this.getAllQuizList();
  }

  onSelectOption() {
    if (this.quizModelList.length > this.currentQuestion) {
      this.currentQuestion += 1;
    }
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
