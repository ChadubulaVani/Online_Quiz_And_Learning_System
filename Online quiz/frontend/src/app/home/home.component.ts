// home.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent {
  // Array of FAQ questions & answers
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
      question: '4. Can I get certificates?',
      answer: "Yes, once you complete quizzes and courses successfully, you can earn certificates to showcase your skills.",
      open: false
    },
    {
      question: '5. Can I share quizzes with friends?',
      answer: "Definitely! You can share quizzes via social media or copy links to challenge your friends and peers.",
      open: false
    }
  ];

  toggleFAQ(index: number) {
    // toggle clicked, close others
    this.faqs.forEach((faq, i) => {
      faq.open = i === index ? !faq.open : false;
    });
  }
}
