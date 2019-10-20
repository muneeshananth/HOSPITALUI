import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User';
  Role:string;
  User:string;
  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
  
  }
  logout(){

  }
  changeOfRoutes() {
   
   
  }
}