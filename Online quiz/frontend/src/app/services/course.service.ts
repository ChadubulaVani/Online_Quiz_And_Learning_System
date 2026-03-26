// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:5000/api/courses';

  constructor(private http: HttpClient) {}

  // GET all courses
  getAllCourses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET course by ID
  getCourseById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // GET courses by category
  getCoursesByCategory(categoryId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/category/${categoryId}`);
}


  // POST new course
  createCourse(courseData: any): Observable<any> {
    return this.http.post(this.apiUrl, courseData);
  }
}
