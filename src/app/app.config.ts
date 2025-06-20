import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes'; // Importar las rutas correctamente

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { WinAuthInterceptor } from './core/Interceptors/winauth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes), // Aquí proporcionamos las rutas correctamente
    provideClientHydration(withEventReplay()),
    provideHttpClient(
     //  withFetch(),
    ),
     {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
    }
  ]
};
