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
  // ABOUT US
  // =========================================

  {
    path: 'about-us',

    loadComponent: () =>
      import('./about-us/about-us.page')
        .then(m => m.AboutUsPage)
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
  // COLLEGES
  // =========================================

  {
    path: 'colleges',

    loadComponent: () =>
      import('./colleges/colleges.page')
        .then(m => m.CollegesPage)
  },


  // =========================================
  // GLOSSARY
  // =========================================

  {
    path: 'glossary',

    loadComponent: () =>
      import('./glossary/glossary.page')
        .then(m => m.GlossaryPage)
  },


  // =========================================
  // MORE
  // =========================================

  {
    path: 'more',

    loadComponent: () =>
      import('./more/more.page')
        .then(m => m.MorePage)
  },


  // =========================================
  // PROFILE
  // =========================================

  {
    path: 'profile',

    canActivate: [
      authGuard
    ],

    loadComponent: () =>
      import('./pages/profile/profile.page')
        .then(m => m.ProfilePage)
  },


  // =========================================
  // UNIVERSITY DETAILS
  // =========================================

  {
    path: 'university-details/:id',

    loadComponent: () =>
      import(
        './details/university-details/university-details.page'
      )
      .then(
        m => m.UniversityDetailsPage
      )
  },

  // =========================================
  // BURSARY DETAILS
  // =========================================

  {
    path: 'bursary-details',

    loadComponent: () =>
      import(
        './details/bursary-details/bursary-details.page'
      )
      .then(
        m => m.BursaryDetailsPage
      )
  },
  {
    path: 'saved-universities',
    loadComponent: () => import('./saved-universities/saved-universities.page').then( m => m.SavedUniversitiesPage)
  },
  {
    path: 'saved-courses',
    loadComponent: () => import('./saved-courses/saved-courses.page').then( m => m.SavedCoursesPage)
  }

];