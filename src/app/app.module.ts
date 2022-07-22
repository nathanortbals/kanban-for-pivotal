import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
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
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { KanbanBoardColumnComponent } from './components/kanban-board-column/kanban-board-column.component';
import { KanbanBoardStoryComponent } from './components/kanban-board-story/kanban-board-story.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { StoryDialogComponent } from './components/story-dialog/story-dialog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SnakeToCamelCaseInterceptor } from './interceptors/snake-to-camel-case.interceptor';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { EstimatePipe } from './pipes/estimate.pipe';
import { PivotalPeopleEffects } from './state/pivotal-people/pivotal-people.effects';
import { pivotalPeopleReducer } from './state/pivotal-people/pivotal-people.reducer';
import { PivotalProjectEffects } from './state/pivotal-project/pivotal-project.effects';
import { pivotalProjectReducer } from './state/pivotal-project/pivotal-project.reducer';
import { PivotalStoriesEffects } from './state/pivotal-stories/pivotal-stories.effects';
import { pivotalStoriesReducer } from './state/pivotal-stories/pivotal-stories.reducer';
import { SettingsEffects } from './state/settings/settings.effects';
import { settingsReducer } from './state/settings/settings.reducer';
import { GetStartedPageComponent } from './components/get-started-page/get-started-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SettingsDialogComponent,
    KanbanBoardComponent,
    KanbanBoardColumnComponent,
    CapitalizePipe,
    KanbanBoardStoryComponent,
    EstimatePipe,
    StoryDialogComponent,
    GetStartedPageComponent,
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
    DragDropModule,
    MatRippleModule,
    MarkdownModule.forRoot(),
    StoreModule.forRoot({
      settings: settingsReducer,
      pivotalProject: pivotalProjectReducer,
      pivotalStories: pivotalStoriesReducer,
      pivotalPeople: pivotalPeopleReducer,
    }),
    EffectsModule.forRoot([
      SettingsEffects,
      PivotalProjectEffects,
      PivotalStoriesEffects,
      PivotalPeopleEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SnakeToCamelCaseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
