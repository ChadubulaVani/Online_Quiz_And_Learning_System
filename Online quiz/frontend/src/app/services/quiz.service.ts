import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'https://online-quiz-and-learning-system.onrender.com';

  constructor(private http: HttpClient) {}

  getQuizByCourse(courseId: string, level: string = 'Easy'): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}?level=${level}`);
  }

  submitQuiz(courseId: string, answers: (number | null)[], timeTaken: number, userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, {
      courseId,
      answers,
      timeTaken,
      userId
    });
  }

  getLeaderboard(courseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/leaderboard/${courseId}`);
  }

  getAttemptsByUser(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/history/${userId}`);
  }
}
