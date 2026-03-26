import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CourseComponent implements OnInit {
  courses: any[] = [];
  categoryId!: string;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // Get category ID from URL
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCoursesByCategory(this.categoryId).subscribe({
      next: (res: any) => this.courses = res,
      error: (err) => console.error(err)
    });
  }
}
