import { Routes } from '@angular/router';

import {
  homeOutline,
  schoolOutline,
  businessOutline,
  cashOutline,
  menuOutline,
  informationCircleOutline,
  chevronForwardOutline,
  logInOutline,
  personAddOutline,
  bookOutline,
  compassOutline,
  bulbOutline,
  filterOutline,
  searchOutline,
  lockClosedOutline,
eyeOutline,
eyeOffOutline,
arrowBackOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { authGuard } from './guards/auth-guard';


addIcons({

  'home-outline': homeOutline,
  'school-outline': schoolOutline,
  'business-outline': businessOutline,
  'cash-outline': cashOutline,
  'ellipsis-horizontal': menuOutline,
  'information-circle-outline':
    informationCircleOutline,
  'arrow-forward-outline':
    chevronForwardOutline,
  'log-in-outline':
    logInOutline,
  'person-add-outline':
    personAddOutline,
  'book-outline':
    bookOutline,
  'compass-outline':
    compassOutline,
  'bulb-outline':
    bulbOutline,
  'filter-outline':
    filterOutline,
  'search-outline':
    searchOutline,
  'lock-closed-outline':
    lockClosedOutline,
  'eye-outline':
    eyeOutline,
  'eye-off-outline':
    eyeOffOutline,
  'arrow-back-outline':
    arrowBackOutline

});


export const routes: Routes = [

  // =========================================
  // MAIN APPLICATION
  // =========================================

  {
    path: '',

    loadChildren: () =>
      import('./tabs/tabs.routes')
        .then(m => m.routes)
  },


  // =========================================
  // LOGIN
  // =========================================

  {
    path: 'login',

    loadComponent: () =>
      import('./pages/login/login.page')
        .then(m => m.LoginPage)
  },


  // =========================================
  // SIGN UP
  // =========================================

  {
    path: 'sign-up',

    loadComponent: () =>
      import('./pages/sign-up/sign-up.page')
        .then(m => m.SignUpPage)
  },


  // =========================================
  // COURSES
  // =========================================
  {
    path: 'courses',
    loadComponent: () => import('./courses/courses.page').then( m => m.CoursesPage)
  },
  {
  path: 'course-details/:id',
  loadComponent: () =>
    import('./details/course-details/course-details.page')
      .then(m => m.CourseDetailsPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },  {
    path: 'aps-calculator',
    loadComponent: () => import('./pages/aps-calculator/aps-calculator.page').then( m => m.ApsCalculatorPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },






];