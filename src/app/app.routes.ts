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
  searchOutline
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
    searchOutline

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




];