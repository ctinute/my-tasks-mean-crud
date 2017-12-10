import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TaskService } from './task.service';
import { TaskComponent } from './task/task.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import {Task} from 'protractor/built/taskScheduler';

const appRoutes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskComponent },
  { path: 'task-details/:id', component: TaskDetailComponent },
  { path: 'task-create', component: TaskCreateComponent },
  { path: 'task-edit/:id', component: TaskEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskDetailComponent,
    TaskCreateComponent,
    TaskEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TaskService,
              {provide: LocationStrategy, useClass: HashLocationStrategy}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
