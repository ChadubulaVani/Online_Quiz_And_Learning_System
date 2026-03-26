import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {
  courses: any[] = [];

  title: string = '';
  category: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const role = localStorage.getItem('role');

    if (role !== 'admin') {
      alert('Access denied!');
      this.router.navigate(['/login']);
      return;
    }

    this.loadCourses();
  }

  loadCourses() {
    this.courses = JSON.parse(localStorage.getItem('courses') || '[]');
  }

  addCourse() {
    if (!this.title || !this.category) {
      alert('Fill all fields');
      return;
    }

    const newCourse = {
      title: this.title,
      category: this.category
    };

    this.courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(this.courses));

    this.title = '';
    this.category = '';
    this.loadCourses();
  }

  deleteCourse(index: number) {
    if (confirm('Delete this course?')) {
      this.courses.splice(index, 1);
      localStorage.setItem('courses', JSON.stringify(this.courses));
      this.loadCourses();
    }
  }
}