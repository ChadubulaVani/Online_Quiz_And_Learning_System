import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/modules/auth/login/login.component';
import { RegisterComponent } from './app/modules/auth/register/register.component';
import { CourseComponent } from './app/courses/courses.component';
import { CourseDetailComponent } from './app/courses/course-detail/course-detail.component';
import { CategoriesComponent } from './app/pages/categories/categories.component';
import { AdminDashboardComponent } from './app/modules/admin/admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './app/modules/admin/manage-users/manage-users.component';
import { ManageCoursesComponent } from './app/modules/admin/manage-courses/manage-courses.component';
import { ManageQuizzesComponent } from './app/modules/admin/manage-quizzes/manage-quizzes.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },

      // ✅ Admin
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'manage-courses', component: ManageCoursesComponent },
      { path: 'manage-quizzes', component: ManageQuizzesComponent },

      // ✅ Categories
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/:id', component: CourseComponent },

      // ✅ Courses
      { path: 'courses', component: CourseComponent },
      { path: 'courses/:id', component: CourseDetailComponent },

      { path: '**', redirectTo: '' }
    ]),
    provideHttpClient()
  ]
})
.catch(err => console.error(err));