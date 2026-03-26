import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-quizzes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-quizzes.component.html',
  styleUrls: ['./manage-quizzes.component.css']
})
export class ManageQuizzesComponent implements OnInit {
  quizzes: any[] = [];

  title: string = '';
  course: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const role = localStorage.getItem('role');

    if (role !== 'admin') {
      alert('Access denied!');
      this.router.navigate(['/login']);
      return;
    }

    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
  }

  addQuiz() {
    if (!this.title || !this.course) {
      alert('Fill all fields');
      return;
    }

    const newQuiz = {
      title: this.title,
      course: this.course
    };

    this.quizzes.push(newQuiz);
    localStorage.setItem('quizzes', JSON.stringify(this.quizzes));

    this.title = '';
    this.course = '';
    this.loadQuizzes();
  }

  deleteQuiz(index: number) {
    if (confirm('Delete this quiz?')) {
      this.quizzes.splice(index, 1);
      localStorage.setItem('quizzes', JSON.stringify(this.quizzes));
      this.loadQuizzes();
    }
  }
}