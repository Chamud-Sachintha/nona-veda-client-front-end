import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { QuizResponse } from '../../shared/models/QuizResponse/quiz-response';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuizList() {
    const path = environment.apiUrl + "get-question-list";
    return this.http.post(path, {});
  }

  submitQuestionResponse(quizResponse: QuizResponse) {
    const path = environment.apiUrl + "submit-results";
    return this.http.post(path, quizResponse);
  }
}
