
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientServices } from '../_Services/patientservice';
import { MasterServices } from '../_Services/masterservices';
import { AlertService } from '../_Services/index';
declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './addpatient.component.html',
})
export class PatientComponent implements OnInit {
    //#region  variable declare
    patientForm: FormGroup;
    submitted = false;
    Name: any;
    Age: any;
    Gender: any;
    MaritalStatus: any;
    BloodgroupId; any;
    Address: any;
    AlternativeAddress: any;
    MobileNumber: any;
    StateId: any;
    DistrictId: any;
    PinCode: any;
    UserID: any;
    GenderData: any;
    GenderId: any;
    StateData: any;
    DistrictData: any;
    BloodGroupData: any;
    BloodGroupId: any;
    DoctorID: any;
    FirstName: any;
    LastName: any;
    PatientProfile: any;
    ButtonText: any;
    PatientID: any;
    //#endregion
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private PatientService: PatientServices,
        private MasterService: MasterServices,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.UserID = localStorage.getItem('UserID');
        this.DoctorID = localStorage.getItem('DoctorID');
        this.PatientProfile = JSON.parse(localStorage.getItem('PatientProfile'));
        this.GetState();
        this.GetBloodGroup();
        this.GetGender();
        this.patientForm = this.formBuilder.group({
            FirstNameForm: ['', [Validators.required]],
            LastNameForm: ['', [Validators.required]],
            MobileNumberForm: ['', [Validators.required]],
            AgeForm: ['', [Validators.required]],
            GenderForm: ['', [Validators.required]],
            BloodGroupForm: ['', [Validators.required]],
            MaritalStatusForm: ['', [Validators.required]],
            AddressForm: ['', [Validators.required, Validators.minLength(6), Validators.pattern("")]],
            AlternativeaddressForm: ['', [Validators.minLength(6), Validators.pattern("")]],
            StateForm: ['', [Validators.required]],
            DistrictForm: ['', [Validators.required]],
            PincodeForm: ['', [Validators.required]],
        });
        if (this.PatientProfile != null) {
            this.ButtonText = 'Update';
            this.AssignData(this.PatientProfile);
            this.GetDistrict(this.StateId);
        }
        else {
            this.ButtonText = 'Save';
        }
    }
    get f() {
        return this.patientForm.controls;
    }
    PatientCreate() {
        this.submitted = true;
        if (this.patientForm.invalid) {
            return;
        }
        else {
            if (this.ButtonText = 'Update') {
                var data = {
                    PatientID: this.PatientID,
                    FirstName: this.FirstName,
                    LastName: this.LastName,
                    MobileNumber: this.MobileNumber,
                    Age: this.Age,
                    GenderId: this.GenderId,
                    MaritalStatus: this.MaritalStatus,
                    BloodGroupId: this.BloodGroupId,
                    PermanentAddress: this.Address,
                    AlternativeAddress: this.AlternativeAddress,
                    StateId: this.StateId,
                    DistrictId: this.DistrictId,
                    PinCode: this.PinCode,
                    ModifiedBy: this.UserID,
                    DoctorID: this.DoctorID,
                }
                this.PatientService.PatientPut(data)
                    .subscribe(
                        data => {
                            if (data == "Success") {
                                this.patientForm.reset();
                                this.submitted = false;
                                this.alertService.success(data);
                                $('.alert').css({ 'display': 'block' });
                                setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                                this.router.navigate(['/patientlist']);
                            }
                        },
                        error => {
                            this.alertService.error(JSON.parse(error._body));
                            $('.alert').css({ 'display': 'block' });
                            setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                        }
                    )
            }
            else {
                var datacreate = {
                    FirstName: this.FirstName,
                    LastName: this.LastName,
                    MobileNumber: this.MobileNumber,
                    Age: this.Age,
                    GenderId: this.GenderId,
                    MaritalStatus: this.MaritalStatus,
                    BloodgroupId: this.BloodgroupId,
                    PermanentAddress: this.Address,
                    AlternativeAddress: this.AlternativeAddress,
                    StateId: this.StateId,
                    DistrictId: this.DistrictId,
                    PinCode: this.PinCode,
                    ModifiedBy: this.UserID,
                    DoctorID: this.DoctorID,
                }
                this.PatientService.addpatient(datacreate)
                    .subscribe(
                        data => {
                            if (data == "Success") {
                                this.patientForm.reset();
                                this.submitted = false;
                                this.alertService.success(data);
                                $('.alert').css({ 'display': 'block' });
                                setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                                this.router.navigate(['/patientlist']);
                            }
                        },
                        error => {
                            this.alertService.error(JSON.parse(error._body));
                            $('.alert').css({ 'display': 'block' });
                            setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                        }
                    )
            }
        }
    }



    //Get State Master
    GetState() {
        this.MasterService.StateFetch(this.StateId)
            .subscribe(data => {
                if (data != null && data.msg.length > 0) {
                    this.StateData = data.msg;
                }
            });
    }
    //Get State District Data Using State Id

    GetDistrict(StateId: any) {
        this.MasterService.DistrictFetch(StateId, "District")
            .subscribe(data => {
                if (data != null && data.msg.length > 0) {
                    this.DistrictData = data.msg;
                }
            });
    }
    GetBloodGroup() {
        this.MasterService.BloodGroupFetch(this.BloodGroupId)
            .subscribe(data => {
                if (data != null && data.msg.length > 0) {
                    this.BloodGroupData = (data.msg);
                }
            });
    }
    GetGender() {
        this.MasterService.GenderFetch(this.GenderId)
            .subscribe(data => {
                if (data != null && data.msg.length > 0) {
                    this.GenderData = (data.msg);
                }
            });
    }
    //ALLOW ONLY NUMBERS
    onlyDecimalNumberKey(event) {
        var charCode = (event.which) ? event.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
    OnlyCharacter(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 123) && (charCode < 38 || charCode > 47) && (charCode != 32) && (charCode < 191 || charCode > 191) && (charCode < 218 || charCode > 219))
            return false;
        return true;
    }
    //End Region

    AssignData(PatientProfile) {
        this.FirstName = PatientProfile.FirstName;
        this.LastName = PatientProfile.LastName;
        this.MobileNumber = PatientProfile.MobileNumber;
        this.Age = PatientProfile.Age;
        this.GenderId = PatientProfile.GenderId;
        if(PatientProfile.MaritalStatus==false){
            this.MaritalStatus =0
        }
        else{
            this.MaritalStatus =1
        }
       
        this.BloodGroupId = PatientProfile.BloodGroupId;
        this.Address = PatientProfile.PermanentAddress;
        this.AlternativeAddress = PatientProfile.PermanentAddress;
        this.StateId = PatientProfile.StateId;
        this.DistrictId = PatientProfile.DistrictId;
        this.PinCode = PatientProfile.PinCode;
        this.UserID = PatientProfile.UserID;
        this.DoctorID = PatientProfile.DoctorID;
    }
    cancelPatient() {
        this.patientForm.reset();
        this.submitted = false;
        this.router.navigate(['/patientlist']);


    }
}