import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PivotalProjectEffects } from './state/pivotal-project/pivotal-project.effects';
import { pivotalProjectReducer } from './state/pivotal-project/pivotal-project.reducer';
import { PivotalStoriesEffects } from './state/pivotal-stories/pivotal-project.effects';
import { pivotalStoriesReducer } from './state/pivotal-stories/pivotal-stories.reducer';
import { SettingsEffects } from './state/settings/settings.effects';
import { settingsReducer } from './state/settings/settings.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SettingsDialogComponent,
    KanbanBoardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      settings: settingsReducer,
      pivotalProject: pivotalProjectReducer,
      pivotalStories: pivotalStoriesReducer,
    }),
    EffectsModule.forRoot([
      SettingsEffects,
      PivotalProjectEffects,
      PivotalStoriesEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
