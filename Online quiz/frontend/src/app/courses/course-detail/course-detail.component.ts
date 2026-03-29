import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class CourseDetailComponent implements OnInit, OnDestroy {
  course: any = null;
  courseId: string = '';

  quiz: any = null;
  selectedAnswers: (number | null)[] = [];
  result: any = null;

  timer: number = 600;
  interval: any;

  correctAnswers: number = 0;
  totalQuestions: number = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    const courseParam = this.route.snapshot.paramMap.get('id');

    if (!courseParam) {
      console.error('Course ID not found in route');
      return;
    }

    this.courseId = courseParam;

    this.courseService.getCourseById(this.courseId).subscribe({
      next: (res: any) => {
        this.course = res;
        this.loadQuiz();
      },
      error: (err: any) => {
        console.error('Error fetching course:', err);
      }
    });
  }

  loadQuiz(): void {
    this.quizService.getQuizByCourse(this.courseId).subscribe({
      next: (res: any) => {
        if (res && res.questions && res.questions.length > 0) {
          this.quiz = res;
          this.totalQuestions = this.quiz.questions.length;
          this.selectedAnswers = new Array(this.totalQuestions).fill(null);
          this.result = null;
          this.correctAnswers = 0;
          this.startTimer(600);
        } else {
          this.quiz = null;
          this.totalQuestions = 0;
          this.selectedAnswers = [];
          this.result = null;
          this.correctAnswers = 0;
          clearInterval(this.interval);
        }
      },
      error: (err: any) => {
        console.error('Error loading quiz:', err);
        this.quiz = null;
        this.totalQuestions = 0;
        this.selectedAnswers = [];
        this.result = null;
        this.correctAnswers = 0;
        clearInterval(this.interval);
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
        clearInterval(this.interval);
        this.submitQuiz();
      }
    }, 1000);
  }

  selectAnswer(questionIndex: number, optionIndex: number): void {
    this.selectedAnswers[questionIndex] = optionIndex;
  }

  submitQuiz(): void {
    if (!this.quiz || !this.quiz.questions?.length) {
      return;
    }

    const userId = '66cbbd8123a7b25df98e5678';

    if (this.selectedAnswers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const timeTaken = Math.max(0, 600 - this.timer);
    clearInterval(this.interval);

    let correct = 0;

    this.quiz.questions.forEach((question: any, index: number) => {
      if (this.selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });

    this.correctAnswers = correct;
    this.totalQuestions = this.quiz.questions.length;

    this.quizService
      .submitQuiz(
        this.courseId,
        this.selectedAnswers,
        timeTaken,
        userId
      )
      .subscribe({
        next: (res: any) => {
          this.result = res;

          if (res?.review?.length) {
            this.selectedAnswers = res.review.map((r: any) => r.yourAnswer);
          }

          if (typeof res?.score === 'number' && typeof res?.total === 'number') {
            this.correctAnswers = res.score;
            this.totalQuestions = res.total;
          }
        },
        error: (err: any) => {
          console.error('Error submitting quiz:', err);
        }
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
