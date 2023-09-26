import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');
export const LOGGER_URL = new InjectionToken<string>('LOGGER_URL');

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class ArzgaCoreModule {
  static forRoot(apiUrl?: string, loggerUrl?: string): ModuleWithProviders<ArzgaCoreModule> {
    return {
      ngModule: ArzgaCoreModule,
      providers: [
        {provide: API_URL, useValue: apiUrl},
        {provide: LOGGER_URL, useValue: loggerUrl},
      ]
    };
  }
}
