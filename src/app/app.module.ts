import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StopwatchComponent, MinuteSecondsPipe } from './app.component';
import { NbThemeModule } from '@nebular/theme';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbActionsModule, NbInputModule, NbPopoverModule } from '@nebular/theme';
import { NbCardModule, NbProgressBarModule, NbAlertModule, NbButtonModule, NbBadgeModule} from '@nebular/theme';
import { NbStepperModule, NbAccordionModule} from '@nebular/theme';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const appRoutes: Routes = [
  { path: '', component: StopwatchComponent },
];

@NgModule({
  declarations: [
    StopwatchComponent,
    MinuteSecondsPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule,
    NbActionsModule,
    NbCardModule,
    NbProgressBarModule,
    NbAlertModule,
    NbButtonModule,
    NbBadgeModule,
    NbInputModule,
    NbStepperModule,
    NbPopoverModule,
    NbAccordionModule,
    AngularFontAwesomeModule
  ],
  entryComponents: [
  ],
  providers: [NbSidebarService, MinuteSecondsPipe],
  bootstrap: [StopwatchComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
