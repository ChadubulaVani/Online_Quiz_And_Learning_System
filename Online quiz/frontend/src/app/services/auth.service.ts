import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setUser(user: { id: string; name: string; email: string; role: string }) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): { id: string; name: string; email: string; role: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
