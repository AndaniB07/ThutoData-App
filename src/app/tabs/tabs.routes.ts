import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { homeOutline, schoolOutline, businessOutline, cashOutline, menuOutline  } from 'ionicons/icons';
import { addIcons } from 'ionicons';

addIcons({
  'home-outline': homeOutline,
  'school-outline': schoolOutline,
  'business-outline': businessOutline,
  'cash-outline': cashOutline,
  'ellipsis-horizontal': menuOutline
});

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'universities',
        loadComponent: () =>
          import('../universities/universities.page').then((m) => m.UniversitiesPage),
      },
      {
        path: 'colleges',
        loadComponent: () =>
          import('../colleges/colleges.page').then((m) => m.CollegesPage),
      },
      {
  path: 'college-details/:id',
  loadComponent: () =>
    import('../details/college-details/college-details.page')
      .then((m) => m.CollegeDetailsPage),
},
      {
        path: 'bursaries',
        loadComponent: () =>
          import('../bursaries/bursaries.page').then((m) => m.BursariesPage),
      },
      {path: 'more',
        loadComponent: () =>
          import('../more/more.page').then((m) => m.MorePage),
      },
      {path: 'profile',
        loadComponent: () =>
          import('../pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'saved-universities',
        loadComponent: () =>
        import('../saved-universities/saved-universities.page')
        .then((m) => m.SavedUniversitiesPage),
      },
      {path: 'saved-courses',
        loadComponent: () =>
        import('../saved-courses/saved-courses.page')
        .then((m) => m.SavedCoursesPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
