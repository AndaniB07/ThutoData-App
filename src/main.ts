import { bootstrapApplication } from '@angular/platform-browser';

import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  PreloadAllModules
} from '@angular/router';

import {
  IonicRouteStrategy,
  provideIonicAngular
} from '@ionic/angular';

import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

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
  mailOutline,
  lockClosedOutline,
  arrowBackOutline,
  eyeOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { AuthInterceptor } from './app/services/auth.interceptor';


// =========================================
// IONIC ICONS
// =========================================

addIcons({

  'home-outline': homeOutline,

  'school-outline': schoolOutline,

  'business-outline': businessOutline,

  'cash-outline': cashOutline,

  'ellipsis-horizontal': menuOutline,

  'information-circle-outline': informationCircleOutline,

  'arrow-forward-outline': chevronForwardOutline,

  'log-in-outline': logInOutline,

  'person-add-outline': personAddOutline,

  'book-outline': bookOutline,

  'compass-outline': compassOutline,

  'bulb-outline': bulbOutline,

  'filter-outline': filterOutline,

  'search-outline': searchOutline,

  'mail-outline': mailOutline,

  'lock-closed-outline': lockClosedOutline,

  'arrow-back-outline': arrowBackOutline,

  'eye-outline': eyeOutline

});


// =========================================
// APPLICATION
// =========================================

bootstrapApplication(AppComponent, {

  providers: [

    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },

    provideIonicAngular(),

    provideHttpClient(
      withInterceptorsFromDi()
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    )

  ]

});