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
  wrongPassword = "Wrong Password!";
  wrongUser = "User does not exist!";
  wrongPwd = false;
  wrongUsr = false;
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
    let code = this._todoservice.validUser(t);
    this.isValidUser = code === 2;
    if(this.isValidUser){
      this.wrongPwd = false;
      this.wrongUsr = false;
      this.router.navigate(["../"],{relativeTo:this.route});
    }
    else{
      if(code === 0)this.wrongUsr = true;
      else this.wrongPwd = true;
    }
  }
  signUp(){
    this.router.navigate(["../signup"],{relativeTo:this.route});
  }
  togglePwd(){
    this.loginForm.reset();
    this.wrongPwd = !this.wrongPwd;
  }
  toggleUsr(){
    this.loginForm.reset();
    this.wrongUsr = !this.wrongUsr;
  }
}
