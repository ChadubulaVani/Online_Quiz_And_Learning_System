import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  adminName: string = 'Admin';

  stats = [
    { title: 'Total Users', value: '120' },
    { title: 'Courses', value: '18' },
    { title: 'Quizzes', value: '42' },
    { title: 'Categories', value: '10' }
  ];

  // ✅ UPDATED HERE
  quickActions = [
    {
      title: 'Manage Users',
      desc: 'View and manage all registered users',
      route: '/manage-users'
    },
    {
      title: 'Manage Courses',
      desc: 'Add, edit and organize courses',
      route: '/manage-courses'
    },
    {
      title: 'Manage Quizzes',
      desc: 'Create and update quizzes easily',
      route: '/manage-quizzes'
    },
    {
      title: 'Manage Categories',
      desc: 'Handle learning categories neatly',
      route: '/categories'
    }
  ];

  recentActivities = [
    'New course added successfully',
    'Quiz updated by admin',
    'New student registered',
    'Category modified recently'
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const role = localStorage.getItem('role');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (role !== 'admin') {
      alert('Access denied! Admin only.');
      this.router.navigate(['/login']);
      return;
    }

    this.adminName = loggedInUser?.name || 'Admin';
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('role');
    alert('Logged out successfully');
    this.router.navigate(['/login']);
  }
}