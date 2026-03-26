import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router) {}

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
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  deleteUser(index: number) {
    if (confirm('Delete this user?')) {
      this.users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.loadUsers();
    }
  }
}