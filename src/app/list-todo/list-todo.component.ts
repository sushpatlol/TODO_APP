import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoItem, TodoService } from '../todo.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {
  public todoItems : TodoItem[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private _todoService: TodoService) { }

  ngOnInit(): void {
    this.todoItems = this._todoService.getTodoItems();
  }
  onSelect(item: TodoItem){
    console.log("clicked on ", item.indx);
    this.router.navigate([item.indx],{relativeTo: this.route});
  }
  goToAddPage(){
    this.router.navigate(["./addItem"],{relativeTo: this.route});
  }
  isPresent(item: TodoItem){
    return item!=undefined;
  }
  isEmpty(){
    let res = true;
    for(let x of this.todoItems){
      if(x != undefined){
        res = false;
        break;
      }
    }
    return res;
  }
}
