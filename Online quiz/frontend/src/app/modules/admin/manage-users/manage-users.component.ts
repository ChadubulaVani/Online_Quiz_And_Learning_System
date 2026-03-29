import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  private baseUrl = 'https://online-quiz-and-learning-system.onrender.com/api/users';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const role = localStorage.getItem('role');

    if (role !== 'admin') {
      alert('Access denied!');
      this.router.navigate(['/login']);
      return;
    }

    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        alert('Failed to load users');
      }
    });
  }

  deleteUser(userId: string) {
    if (confirm('Delete this user?')) {
      this.http.delete(`${this.baseUrl}/${userId}`).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user');
        }
      });
    }
  }
}
