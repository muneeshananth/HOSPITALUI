import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../_Services/userservices';
import { MustMatch } from './changepassword';
//import { AlertService } from '../_Services/index';
  declare var $: any;
  @Component({
    selector: 'app-changePassword',
    templateUrl: './changePassword.component.html',
  })
  export class ChangePasswordComponent implements OnInit {
    ChangePasswordForm: FormGroup;
    submitted = false;
    //#region Varibles Declare
    public id: string;
    public email: string;
    public ConfirmPassword: string;
    public NewPassword: string;
    public retype: any;
    public CurrentPassword: boolean;
    UserName: any;
    //#endregion
  
    constructor(private router: Router,
      private formBuilder: FormBuilder,
      private UserService: UserServices,
      //private AlertService: AlertService
    ) { }
  
    ngOnInit() {
     // this.refreshData();
     // this.UserName = localStorage.getItem('User');
      this.ChangePasswordForm = this.formBuilder.group({
        currentpassword: ['', [Validators.required, Validators.minLength(3),]],
        newpassword: ['', [Validators.required, Validators.minLength(6)]],
        VerifyPassword: ['', Validators.required]
      }, {
        validator: MustMatch('newpassword', 'VerifyPassword'),
  
    });
    }
    // refreshData() {
    //   var Authorization = localStorage.getItem('Token');
    //   if (Authorization != null) {
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    // }
    get f() { return this.ChangePasswordForm.controls; }
    Changepassword() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.ChangePasswordForm.invalid) {
        return;
      }
      else {
        var data = {
          currentpassword: this.CurrentPassword,
          NewPassword: this.NewPassword,
          ConfirmPassword: this.ConfirmPassword,
          UserName: localStorage.getItem('User'),
          UserID:localStorage.getItem('UserID')
        }
        this.UserService.changepassword(data)
          .subscribe(data => {
            debugger;
            if (data == 'Success') {
              this.submitted = false;
              window.location.href = '/login';
              localStorage.removeItem('Token');
              localStorage.removeItem('Role');
              localStorage.removeItem('User');
              localStorage.removeItem('SchoolID');
            }
  
          }, error => {
            // this.AlertService.error(JSON.parse(error._body));
            // $('.alert').css({ 'display': 'block' });
            // setTimeout(function () { $('.alert').css({ "display": "none" }); }, 3000);
          }
          )
      }
  
    }
    login(){
      this.router.navigate(['/dashboard']);
    }
    
  }
  