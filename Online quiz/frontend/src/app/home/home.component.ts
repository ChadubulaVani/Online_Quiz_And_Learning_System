import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent {

  constructor(private router: Router) {}

  // FAQ data
  faqs = [
    {
      question: '1. How do I create an account?',
      answer: "Click on the 'Get Started' button, fill in your details, and register in seconds.",
      open: false
    },
    {
      question: '2. Are the quizzes free?',
      answer: "Yes! You can access a wide range of quizzes without any cost. Premium features may be added later.",
      open: false
    },
    {
      question: '3. Can I track my progress?',
      answer: "Absolutely! QuizLearn provides dashboards to monitor your quiz attempts, scores, and improvement over time.",
      open: false
    },
    {
  question: '4. How can I improve my quiz scores?',
  answer: "Practice regularly, review your answers, and focus on weak areas to improve your performance.",
  open: false
}
    {
      question: '5. Can I share quizzes with friends?',
      answer: "Definitely! You can share quizzes via social media or copy links to challenge your friends and peers.",
      open: false
    }
  ];

  toggleFAQ(index: number) {
    this.faqs.forEach((faq, i) => {
      faq.open = i === index ? !faq.open : false;
    });
  }

  // 🔥 PROTECT CATEGORIES CLICK
  goToCategories(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/categories']);
    } else {
      alert('⚠️ Please login first to access Categories.');
      this.router.navigate(['/login']);
    }
  }
}
