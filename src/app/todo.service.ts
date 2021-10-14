import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoItems: TodoItem[] = [];
  constructor() { }

  addTodoItem(todoItem: TodoItem){
    todoItem.indx = this.todoItems.length;
    this.todoItems.push(todoItem);
    console.log("adding "+this.todoItems);
  }
  getTodoItems(){
    return this.todoItems;
  }
  getTodoItem(id:number){
    return this.todoItems[id];
  }
  updateTodoItem(item: TodoItem){
    this.todoItems[item.indx] = item;
  }
  deleteTodoItem(id: number){
    delete this.todoItems[id];
  }
}
export class TodoItem{
  name!:string;
  description!:string;
  time!:Date;
  indx!:number;
  constructor(name:string, description:string, time:Date){
    this.name = name;
    this.description = description;
    this.time = time;
  }
}
