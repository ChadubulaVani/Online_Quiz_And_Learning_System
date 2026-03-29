import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  private baseUrl = 'https://online-quiz-and-learning-system.onrender.com/api/users';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  onRegister() {
    this.name = this.name.trim();
    this.email = this.email.trim();

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('⚠️ Please fill all fields!');
      return;
    }

    if (this.password.length < 6) {
      alert('⚠️ Password must be at least 6 characters long!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('⚠️ Passwords do not match!');
      return;
    }

    this.http.post<any>(`${this.baseUrl}/register`, {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('🎉 Registration successful! Please login.');

        this.name = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Register error:', err);
        alert(err.error?.message || '❌ Registration failed');
      }
    });
  }
}
