
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../_Services/userservices';
import { DoctorServices } from '../_Services/doctorservice';

declare var $: any;
@Component({
    selector: 'app-doctor',
    templateUrl: './doctorlist.component.html',
})
export class DoctorlistComponent implements OnInit {
    //#region  variable declare

    DoctorId: any;
    DoctorData: any;
    imagePreview:any;
    //#endregion
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private UserService: UserServices,
        private DoctorService: DoctorServices,
    ) {

    }

    ngOnInit() {
        this.imagePreview = "../src/assets/images/doctor-2.jpg";
        this.GetDoctor();
    }
    GetDoctor() {
        this.DoctorService.DoctorFetch(this.DoctorId)
            .subscribe(data => {
                if (data != null && data.msg.length > 0) {
                    this.DoctorData = data.msg;    
                    console.log(this.DoctorData) 
                }
            });
    }
    profileEdit(data){
    localStorage.setItem('DoctorProfile',JSON.stringify(data));
    this.router.navigate(['/doctor'])
}
doctorNavigation(){
    localStorage.removeItem("DoctorProfile");
    this.router.navigate(['/doctor'])
}
}