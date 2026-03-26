import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    this.email = this.email.trim();
    this.password = this.password.trim();

    if (!this.email || !this.password) {
      alert('⚠️ Please enter email and password!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) =>
        u.email.toLowerCase() === this.email.toLowerCase() &&
        u.password === this.password
    );

    if (user) {
      console.log('Logged in user:', user);

      alert(`Welcome back, ${user.name}! ✅`);

      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('role', user.role || 'student');

      if (user.role === 'admin') {
        this.router.navigateByUrl('/admin-dashboard');
      } else {
        this.router.navigateByUrl('/');
      }
    } else {
      alert('❌ Invalid Email or Password');
    }
  }
}