import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService, UserCred } from '../todo.service';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  faExclamationCircle = faExclamationCircle;
  userForm!: FormGroup;
  signInSuccess:boolean;userExists:boolean;pwdmismatch:boolean;
  userexist:string;signUpSuccess:string;pwdMismatch:string;
  showNameError:boolean;showEmailError:boolean;showPwdError:boolean;showRpwdError:boolean;

  constructor(private route:ActivatedRoute, private router:Router ,private _formBuilder:FormBuilder,private _todoService:TodoService) { 
    this.showNameError=false;
    this.showEmailError=false;
    this.showPwdError=false;
    this.showRpwdError=false;
    this.signInSuccess = false;
    this.userExists = false;
    this.pwdmismatch = false;
    this.userexist = "User already exists. Please log in!";
    this.signUpSuccess = "Sign Up success. Please log in!";
    this.pwdMismatch = "Passwords does not match!!";
  }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      userid:[null, [Validators.required]],
      userpwd: [null,[Validators.required]],
      ruserpwd: [null,[Validators.required]]
    });
  }
  onSubmit(){
    let user = new UserCred(this.userForm.value.username, this.userForm.value.userid, this.userForm.value.userpwd);
    if(this._todoService.isUserPresent(user)){
      this.userExists = true;
    }else{
      if(this.userForm.value.userpwd !== this.userForm.value.ruserpwd){
        this.pwdmismatch = true;
      }else{
        this._todoService.addUser(user);
        this.signInSuccess = true;
      }
    }
  }
  navigateToSelf(){
    this.pwdmismatch = false;
    this.userForm.controls['userpwd'].reset();
    this.userForm.controls['ruserpwd'].reset();
 
    //this.router.navigate([""], {relativeTo: this.route});
  }
  navigateToLogin(){
    this.userExists = false;
    this.signInSuccess = false;
    this.router.navigate(["../login"], {relativeTo: this.route});
  }
}
