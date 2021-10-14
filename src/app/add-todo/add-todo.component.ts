import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoItem, TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  public userForm!: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder,private _todoService: TodoService) { }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      todoName: [null,[Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      todoDescription: [null, [Validators.required]],
      todoTime: [null, [Validators.required]]
    })
  }
  onSubmit(){
    let todoitem = new TodoItem(this.userForm.value.todoName, this.userForm.value.todoDescription, this.userForm.value.todoTime);
    this._todoService.addTodoItem(todoitem);
    this.router.navigate(["../"],{relativeTo: this.route});
  }
}
