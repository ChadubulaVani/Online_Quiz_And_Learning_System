import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Set logged-in user (after login)
  setUser(user: { id: string; name: string; email: string }) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get logged-in user
  getUser(): { id: string; name: string; email: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Remove user on logout
  logout() {
    localStorage.removeItem('user');
  }
}
