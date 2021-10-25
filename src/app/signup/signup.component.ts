import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService, UserCred } from '../todo.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;
  signInSuccess:boolean = false;
  userExists = false;
  userexist = "User already exists. Please log in!";
  signUpSuccess = "Sign Up success. Please log in!";
  constructor(private route:ActivatedRoute, private router:Router ,private _formBuilder:FormBuilder,private _todoService:TodoService) { }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      userid:[null, [Validators.required]],
      userpwd: [null,[Validators.required]]
    });
  }
  onSubmit(){
    let user = new UserCred(this.userForm.value.username, this.userForm.value.userid, this.userForm.value.userpwd);
    if(this._todoService.addUser(user)){
      this.signInSuccess = true;
    }else{
      this.userExists = true;
    }
  }
  navigateToLogin(){
    this.userExists = false;
    this.signInSuccess = false;
    this.router.navigate(["../login"], {relativeTo: this.route});
  }
}
