import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoItem, TodoService } from '../todo.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  public userForm!: FormGroup;
  public isAdded = false;
  public added = "Todo Item Added!!";
  faExclamationCircle=faExclamationCircle;
  showNameError:boolean;showDescError:boolean;showTimeError:boolean;
  constructor(private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder,private _todoService: TodoService) { 
    this.showDescError = false;
    this.showNameError = false;
    this.showTimeError = false;
  }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      todoName: [null,[Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      todoDescription: [null, [Validators.required]],
      todoTime: [null, [Validators.required]]
    })
  }
  isLoggedIn(){
    if(this._todoService.loggedIn)
    return true;
    this.router.navigate(["../login"],{relativeTo: this.route});
    return false;
  }
  onSubmit(){
    let todoitem = new TodoItem(this.userForm.value.todoName, this.userForm.value.todoDescription, this.userForm.value.todoTime);
    this._todoService.addTodoItem(todoitem);
    this.isAdded = true;
    
  }
  navigateTolist(){
    this.isAdded = false;
    this.router.navigate(["../"],{relativeTo: this.route});
  }
}
