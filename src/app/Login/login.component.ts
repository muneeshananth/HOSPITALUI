
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../_Services/userservices';

declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    //#region  variable declare
    loginForm: FormGroup;
    submitted = false;
    Username: any;
    Password: any;
    loginData: any;
    //#endregion
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private UserService: UserServices,
        ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            emailForm: ['', [Validators.required]],
            passwordForm: ['', Validators.required]
        }); 
    }
    get f() {
        return this.loginForm.controls;
    }
    Login() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        else {
            var data = {
                Username: this.Username,
                Password: this.Password,
            
            }
          
            this.UserService.GetUserLogin(data)
                .subscribe(data => {
                    if (data.statusText == 'OK') {
                        let UserID = data.headers.get('UserId');
                        let RoleID = data.headers.get('RoleId');
                        let Role = data.headers.get('role');
                        let User = data.headers.get('user');
                        let HospitalID = data.headers.get('HospitalId');
                        if(Role == "SuperAdmin") {
                            window.location.href = '/hospitallist';
                            localStorage.setItem('UserID', UserID);
                            localStorage.setItem('RoleID', RoleID);
                            localStorage.setItem('Role', Role);
                            localStorage.setItem('User', User);
                        }
                        else if(Role == "HospitalAdmin") {
                            window.location.href = '/doctorlist';
                            localStorage.setItem('UserID', UserID);
                             localStorage.setItem('RoleID', RoleID);
                            localStorage.setItem('Role', Role);
                            localStorage.setItem('User', User);
                            localStorage.setItem('HospitalID', HospitalID);
                        }
                        else if(Role == "Doctor"){
                            window.location.href = '/patientlist';
                            localStorage.setItem('UserID', UserID);
                             localStorage.setItem('RoleID', RoleID);
                            localStorage.setItem('Role', Role);
                            localStorage.setItem('User', User);
                            localStorage.setItem('HospitalID', HospitalID);
                        }
                       
                        else{
                            return;
                        }
                       
                    }
                    
                }, error => {
                 
                    $('.alert').css({ 'display': 'block' });
                    setTimeout(function () { $('.alert').css({ "display": "none" }); }, 3000);
                });
        }

         }  
        forgotpassword() {
            this.router.navigate(["./forgotPassword"])
        }
       
    }