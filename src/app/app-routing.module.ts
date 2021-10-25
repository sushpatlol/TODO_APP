import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { ViewTodoComponent } from './view-todo/view-todo.component';

const routes: Routes = [
  {path: '', redirectTo: '/todo/login', pathMatch: 'full'},
  //{path: '', redirectTo: '/todo', pathMatch: 'full'},
  {path: 'todo/login', component: LoginComponent},
  {path:'todo/signup', component: SignupComponent},
  {path: 'todo', component: ListTodoComponent},
  {path: 'todo/addItem', component: AddTodoComponent},
  {path: 'todo/:id', component: ViewTodoComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [AddTodoComponent, ListTodoComponent, ViewTodoComponent, PageNotFoundComponent];
