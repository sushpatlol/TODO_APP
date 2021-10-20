import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TodoItem, TodoService } from '../todo.service';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss', '../add-todo/add-todo.component.scss']
})
export class ViewTodoComponent implements OnInit {
  public todoItemId! : number;
  public todoItem!: TodoItem;
  public userForm!: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder,private _todoService: TodoService) { }

  ngOnInit(): void {
    console.log(this.todoItem);
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if(id!=null){
        this.todoItemId = parseInt(id);
        console.log(this.todoItemId);
        this.todoItem = this._todoService.getTodoItem(this.todoItemId);
      }
    });
    this.userForm = this._formBuilder.group({
      todoName: [this.todoItem?.name,[Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      todoDescription: [this.todoItem?.description,[Validators.required]],
      todoTime: [this.todoItem?.time]
    });
  }
  updateTodoItem(){
    let updatedTodoItem = new TodoItem(this.userForm.value.todoName, this.userForm.value.todoDescription, this.userForm.value.todoTime);
    updatedTodoItem.indx = this.todoItem.indx;
    this._todoService.updateTodoItem(updatedTodoItem);
    this.router.navigate(["../"],{relativeTo: this.route});
  }
  deleteTodoItem(){
    this._todoService.deleteTodoItem(this.todoItemId);
    this.router.navigate(["../"],{relativeTo: this.route});
  }
  isFormChanged(){
    return this.userForm.value.todoName !== this.todoItem.name || this.userForm.value.todoDescription !== this.todoItem.description ||
    this.userForm.value.todoTime !== this.todoItem.time;
  }
}
