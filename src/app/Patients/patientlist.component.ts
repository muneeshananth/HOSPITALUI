
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../_Services/userservices';
import { PatientServices } from '../_Services/patientservice';
import { MatPaginator, MatTableDataSource } from '@angular/material';

declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './patientlist.component.html',
})
export class PatientlistComponent implements OnInit {
    //#region  variable declare
    displayedColumns: string[] = ['PatientName', 'MobileNumber', 'Address', 'Status', 'Action'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    PatientId: any;
    //#endregion
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private UserService: UserServices,
        private PatientService: PatientServices,
    ) { }

    ngOnInit() {
        this.GetPatient();
    }
    GetPatient() {
        this.PatientService.PatientFetch(this.PatientId)
            .subscribe(data => {
                if (data != null && data.msg.length > 0) {
                    this.dataSource = new MatTableDataSource();
                    this.dataSource.data = data.msg;
                    this.dataSource.paginator = this.paginator;
                }
            });
    }
   PatientProfile(data){
        localStorage.setItem('PatientProfile',JSON.stringify(data));
        this.router.navigate(['/patient']);
    }
    patientNavigation(){
        localStorage.removeItem("PatientProfile");
        this.router.navigate(['/patient']);
    }
}