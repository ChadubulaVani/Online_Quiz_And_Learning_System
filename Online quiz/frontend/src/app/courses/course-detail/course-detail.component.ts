import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { QuizService } from '../../services/quiz.service';
import { SafeUrlPipe } from '../../safe-url-pipe';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: any;
  courseId!: string;

  quiz: any = null;
  selectedAnswers: (number | null)[] = [];
  result: any = null;

  timer: number = 600; // 10 minutes default
  interval: any;

  selectedLevel: string = 'Easy';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    const courseParam = this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuizByCourse(this.courseId, this.selectedLevel).subscribe({
      next: (res: any) => {
        this.course = res;
        this.courseId = res._id;
        this.loadQuiz();
      },
      error: (err) => console.error('Error fetching course:', err)
    });
  }

  loadQuiz(): void {
    this.quizService.getQuizByCourse(this.courseId).subscribe({
      next: (res: any) => {
        if (res && res.questions && res.questions.length > 0) {
          this.quiz = res;
          this.selectedAnswers = new Array(this.quiz.questions.length).fill(null);
          this.result = null;

          // start timer
          this.startTimer(600);
        } else {
          this.quiz = null;
        }
      },
      error: (err) => {
        console.error('Error loading quiz:', err);
        this.quiz = null;
      }
    });
  }

  startTimer(seconds: number): void {
    clearInterval(this.interval);
    this.timer = seconds;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.submitQuiz();
      }
    }, 1000);
  }

  selectAnswer(questionIndex: number, optionIndex: number): void {
    this.selectedAnswers[questionIndex] = optionIndex;
  }

  onLevelChange(): void {
    clearInterval(this.interval);
    this.loadQuiz();
  }

  submitQuiz(): void {
    if (!this.quiz) return;

    const userId = '66cbbd8123a7b25df98e5678'; // replace with logged-in user

    if (this.selectedAnswers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const timeTaken = 600 - this.timer;
    clearInterval(this.interval);

    this.quizService.submitQuiz(this.courseId, this.selectedAnswers, timeTaken, userId)
      .subscribe({
        next: (res) => {
          this.result = res;
          this.selectedAnswers = res.review.map((r: any) => r.yourAnswer);
        },
        error: (err) => console.error('Error submitting quiz:', err)
      });
  }
}
