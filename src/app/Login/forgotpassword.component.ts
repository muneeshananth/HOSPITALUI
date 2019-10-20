import {
    Component, ChangeDetectorRef, NgModule, OnInit, Input, forwardRef,
    Output, EventEmitter, AfterViewInit
  } from '@angular/core';
  import { Router } from '@angular/router';
  import { BrowserModule } from '@angular/platform-browser';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { UserServices } from '../_Services/userservices';
 // import { AlertService } from '../_Services/index';
  declare var $: any;
  @Component({
    selector: 'app-forgetpassword',
    templateUrl: './forgotPassword.component.html',
  })
  export class ForgotPasswordComponent implements OnInit {
    //#region Variable declare
    resetForm: FormGroup;
    submitted = false;
    Username: any;
    //#endregion
    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private UserService: UserServices,
     // private AlertService: AlertService
    ) { }
  
    ngOnInit() {
      this.resetForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')])],
      });
    }
    //For Validating The Form
    get f() {
      return this.resetForm.controls;
    }
    forgotPassword() {
      this.submitted = true;
  
      if (this.resetForm.invalid) {
        return;
      }
      else {
        var data = {
          Username: this.Username
        }
        this.UserService.ForgotPassword(data)
          .subscribe(data => {
            if (data.statusText == "OK") {
              window.location.href = '/login';
            }
          }, error => {
            // this.AlertService.error(JSON.parse(error._body));
            // $('.alert').css({ 'display': 'block' });
            // setTimeout(function () { $('.alert').css({ "display": "none" }); }, 3000);
          });
      }
    }
    //redirect to Login Page
    pagechange() {
      this.router.navigate(['/login']);
    }
  }
  