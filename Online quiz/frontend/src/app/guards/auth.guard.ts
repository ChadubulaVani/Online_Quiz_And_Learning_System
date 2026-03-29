import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  alert('⚠️ Please login first to access Categories.');
  router.navigate(['/login']);
  return false;
};
