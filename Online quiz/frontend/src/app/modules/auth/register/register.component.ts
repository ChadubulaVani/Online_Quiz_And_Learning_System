import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

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

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find(
      (u: any) => u.email.toLowerCase() === this.email.toLowerCase()
    );

    if (existingUser) {
      alert('⚠️ Email already registered!');
      return;
    }

    // ✅ Added role here
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'admin' // default role
    };

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    alert('🎉 Registration successful! Please login.');

    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';

    this.router.navigate(['/login']);
  }
}