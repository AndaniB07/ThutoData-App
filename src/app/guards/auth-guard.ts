import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth);
  const router = inject(Router);

  // Check whether the user is logged in
  if (auth.isLoggedIn()) {
    return true;
  }

  // User is not logged in
  // Send them to the login page
  return router.createUrlTree(['/login']);
};