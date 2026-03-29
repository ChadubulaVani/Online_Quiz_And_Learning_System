import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private baseUrl = 'https://online-quiz-and-learning-system.onrender.com/api/users';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  onLogin(): void {
    this.email = this.email.trim();
    this.password = this.password.trim();

    if (!this.email || !this.password) {
      alert('⚠️ Please enter email and password!');
      return;
    }

    this.http.post<any>(`${this.baseUrl}/login`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        alert(`Welcome back, ${res.user.name}! ✅`);

        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('loggedInUser', JSON.stringify(res.user));
        localStorage.setItem('user', JSON.stringify(res.user));

        if (res.user.role === 'admin') {
          this.router.navigateByUrl('/admin-dashboard');
        } else {
          this.router.navigateByUrl('/categories');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert(err.error?.message || '❌ Invalid Email or Password');
      }
    });
  }
}
