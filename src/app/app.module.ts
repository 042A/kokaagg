import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule } from '@angular/forms';

import { StopwatchComponent, MinuteSecondsPipe, ReversePipe } from './app.component';
import { TaskService } from './firestore.service';
import { environment } from '../environments/environment';

import { NbThemeModule } from '@nebular/theme';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbActionsModule, NbInputModule, NbPopoverModule } from '@nebular/theme';
import { NbCardModule, NbProgressBarModule, NbAlertModule, NbButtonModule, NbBadgeModule} from '@nebular/theme';
import { NbStepperModule, NbAccordionModule} from '@nebular/theme';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';







const appRoutes: Routes = [
  { path: '', component: StopwatchComponent },
];

@NgModule({
  declarations: [
    StopwatchComponent,
    MinuteSecondsPipe,
    ReversePipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
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
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  entryComponents: [
  ],
  providers: [NbSidebarService, TaskService],
  bootstrap: [StopwatchComponent]
})
export class AppModule { }

