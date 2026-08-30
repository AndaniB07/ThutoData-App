import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'about-us',
    loadComponent: () => import('./about-us/about-us.page').then( m => m.AboutUsPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'colleges',
    loadComponent: () => import('./colleges/colleges.page').then( m => m.CollegesPage)
  },
  {
    path: 'glossary',
    loadComponent: () => import('./glossary/glossary.page').then( m => m.GlossaryPage)
  },
];
