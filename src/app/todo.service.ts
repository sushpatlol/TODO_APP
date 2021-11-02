
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  userId!: string;
  loggedIn:boolean = false;
  
  userCreds: Map<string, UserCred> = new Map();

  mapItemsToUser: Map<string, TodoItem[]> = new Map();
  todoItems: TodoItem[] = [];
  constructor(private router:Router, private route: ActivatedRoute) { 
  
    let users = localStorage.getItem("users");
    if(users){ 
      let parsedUsers = JSON.parse(users);
      for(let i=0;i<parsedUsers.length;i++){
        this.userCreds.set(parsedUsers[i][0], new UserCred(parsedUsers[i][1].username, parsedUsers[i][1].userid, parsedUsers[i][1].userpwd));
      }
    }
  }

  /*
  Methods related to loading data from localstorage
  */
  loadTodoItems(){
    this.todoItems = [];
    let todos = localStorage.getItem("todos");
    if(todos){
      let todoitemsparsed = JSON.parse(todos);
      for(let i=0;i<todoitemsparsed.length;i++){
        if(todoitemsparsed[i][0] === this.userId){
          for(let j=0;j<todoitemsparsed[i][1].length;j++){
            let t = new TodoItem(todoitemsparsed[i][1][j].name, todoitemsparsed[i][1][j].description, todoitemsparsed[i][1][j].time);
            t.indx = todoitemsparsed[i][1][j].indx;
            this.todoItems.push(t);
          }
        }
      }
    }
  }
  /*
  Methods related to todo item
  .................................... 
  */

  addTodoItem(todoItem: TodoItem){
    todoItem.indx = this.todoItems.length==0?0:this.todoItems[this.todoItems.length-1].indx+1;
    this.todoItems?.push(todoItem);
    this.updateTodosLocalStorage();
  }
  getTodoItems(){
    return this.todoItems;
  }
  getTodoItem(id:number){
    return this.todoItems[id];
  }
  updateTodoItem(item: TodoItem){
    this.todoItems[item.indx] = item;
    this.updateTodosLocalStorage();
  }
  deleteTodoItem(id: number){
    this.todoItems = this.todoItems.filter((todoItem) => todoItem.indx != id);
    
    for(let i=0;i<this.todoItems.length;i++){
        this.todoItems[i].indx = i;
    }
    this.updateTodosLocalStorage();
  }

  /*
  Methods related to login and signup
  ....................................
  */

  isUserPresent(usercred: UserCred){
    return this.userCreds.has(usercred.userid);
  }
  addUser(usercred: UserCred){
    this.userCreds.set(usercred.userid, usercred);
    this.userId = usercred.userid;
    localStorage.setItem("users", JSON.stringify([...this.userCreds]));
  }

  validUser(usercred: UserCred):number{
    if(!this.userCreds.has(usercred.userid))
    return 0;
    if(this.userCreds.get(usercred.userid)?.userpwd !== usercred.userpwd){
      return 1;
    }
    this.loggedIn = true;
    this.userId = usercred.userid;
    this.loadTodoItems();
    
    return 2;
  }
  updateTodosLocalStorage(){
    let todos = localStorage.getItem("todos");
    
    let isPresent = false, i=0, todoitemsparsed = [];
    if(todos){
      todoitemsparsed = JSON.parse(todos);
    }

    for(;i<todoitemsparsed.length;i++){
          if(todoitemsparsed[i][0] === this.userId){
            isPresent = true;
            todoitemsparsed[i][1] = this.todoItems;
          }
    }
    if(!isPresent){
      let data = [this.userId, this.todoItems];
      todoitemsparsed.push(data);
    }
    localStorage.setItem("todos", JSON.stringify([...todoitemsparsed]));
  }

  logout():void{
    this.loggedIn = false;
    this.router.navigate(["../login"],{relativeTo: this.route});
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
export class UserCred{
  username!: string;
  userid!:string;
  userpwd!: string;
  constructor(username: string, userid: string, userpwd: string){
    this.userid = userid;
    this.userpwd = userpwd;
    this.username = username;
  }
}
