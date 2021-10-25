import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService, UserCred } from '../todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder, private _todoservice: TodoService) { }
  loginForm!: FormGroup;
  isValidUser = false;
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      userid: [null,[Validators.required]],
      userpwd: [null,[Validators.required]]
    });
  }
  onSubmit(){
    let t = new UserCred('',
      this.loginForm.value.userid, 
       this.loginForm.value.userpwd);
    this.isValidUser = this._todoservice.validUser(t);
    if(this.isValidUser)
      this.router.navigate(["../"],{relativeTo:this.route});

  }
  signUp(){
    this.router.navigate(["../signup"],{relativeTo:this.route});
  }
}
