
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalServices } from '../_Services/hospitalservice';
import { MasterServices } from '../_Services/masterservices';
import { AlertService } from '../_Services/index';
declare var $: any;
@Component({
    selector: 'app-login',
    templateUrl: './addhospital.component.html',
})
export class HospitalComponent implements OnInit {
    //#region  variable declare
    hospitalForm: FormGroup;
    submitted = false;
    UserID: any;
    HospitalName: string;
    Branch: any;
    Address: any;
    AlternativeAddress: any;
    EmailID: any;
    MobileNumber: any;
    State: any;
    DistrictId: any;
    PinCode; any;
    DistrictData: any;
    StateData: any;
    StateId: any;
    GenderData: any;
    BloodGroupData: any;
    BloodGroupId: any;
    GenderId: any;
    HospitalProfile: any;
    ButtonText: any;
    HospitalID: any;
    //#endregion
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private HospitalService: HospitalServices,
        private MasterService: MasterServices,
        private alertService: AlertService

    ) { }

    ngOnInit() {
        this.GetState()
        this.HospitalProfile = JSON.parse(localStorage.getItem('HospitalProfile'));
        this.UserID = localStorage.getItem('UserID');
        //this.refreshData()
        this.hospitalForm = this.formBuilder.group({
            hospitalnameForm: ['', [Validators.required]],
            branchForm: ['', Validators.required],
            addressForm: ['', [Validators.required, Validators.minLength(6), Validators.pattern("")]],
            alternativeaddressForm: ['', [Validators.minLength(6), Validators.pattern('')]],
            emailForm: ['', [Validators.required, Validators.pattern(''), Validators.minLength(7)]],
            phonenumberForm: ['', Validators.required],
            pincodeForm: ['', [Validators.required, Validators.minLength(3)]],
            stateForm: ['', Validators.required],
            districtForm: ['', Validators.required]
        });
        if (this.HospitalProfile != null) {
            this.ButtonText = 'Update';
            this.AssignData(this.HospitalProfile);
            this.GetDistrict(this.StateId);
        }
        else {
            this.ButtonText = 'Save';
        }
    }
    // refreshData() {
    //     var UserID = localStorage.getItem('UserID');
    //     if (UserID != null) {
    //     } else {
    //         this.router.navigate(['/login']);
    //     }
    //     this
    // }
    get f() {
        return this.hospitalForm.controls;
    }
    hospitaladd() {
        this.submitted = true;
        // stop here if form is invalid

        if (this.hospitalForm.invalid) {
            return;
        }
        if (this.ButtonText == 'Update') {
            var data = {
                HospitalID: this.HospitalID,
                HospitalName: this.HospitalName,
                Branch: this.Branch,
                Address: this.Address,
                AlternativeAddress: this.AlternativeAddress,
                EmailID: this.EmailID,
                MobileNumber: this.MobileNumber,
                PinCode: this.PinCode,
                StateId: this.StateId,
                DistrictId: this.DistrictId,
                ModifiedBy: this.UserID
            }
            this.HospitalService.HospitalPut(data)
                .subscribe(data => {
                    if (data == "Success") {
                        this.hospitalForm.reset();
                        this.submitted = false;
                        this.alertService.success(data);
                        $('.alert').css({ 'display': 'block' });
                        setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                        this.router.navigate(['/hospitallist']);
                    }
                },
                    error => {
                        this.alertService.error(JSON.parse(error._body));
                        $('.alert').css({ 'display': 'block' });
                        setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                    });
        }
        else {
            var datacreate = {
                HospitalName: this.HospitalName,
                Branch: this.Branch,
                Address: this.Address,
                AlternativeAddress: this.AlternativeAddress,
                EmailID: this.EmailID,
                MobileNumber: this.MobileNumber,
                PinCode: this.PinCode,
                StateId: this.StateId,
                DistrictId: this.DistrictId,
                ModifiedBy: this.UserID
            }
            this.HospitalService.addhospital(datacreate)
                .subscribe(data => {
                    if (data == "Success") {
                        this.hospitalForm.reset();
                        this.submitted = false;
                        this.alertService.success(data);
                        $('.alert').css({ 'display': 'block' });
                        setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                        this.router.navigate(['/hospitallist']);
                    }

                }, error => {
                    this.alertService.error(JSON.parse(error._body));
                    $('.alert').css({ 'display': 'block' });
                    setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                });

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
    Bloodgroupmaster() {
        this.MasterService.BloodGroupFetch(this.BloodGroupId)
            .subscribe(data => {
                if (data != null && data.msg.length > 0) {
                    this.BloodGroupData = (data.msg);
                }
            });
    }
    GenderMaster() {
        this.MasterService.GenderFetch(this.GenderId)
            .subscribe(data => {
                if (data != null && data.msg.length > 0) {
                    this.GenderData = (data.msg);
                }
            });
    }

    clearform() {
        this.hospitalForm.reset();
        this.submitted = false;
        this.router.navigate(['/hospitallist'])
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
    AssignData(HospitalProfile) {
        this.HospitalName = HospitalProfile.HospitalName;
        this.Branch = HospitalProfile.Branch;
        this.Address = HospitalProfile.Address;
        this.AlternativeAddress = HospitalProfile.Alternativeaddress;
        this.EmailID = HospitalProfile.EmailID;
        this.MobileNumber = HospitalProfile.MobileNumber
        this.PinCode = HospitalProfile.PinCode;
        this.StateId = HospitalProfile.StateId;
        this.DistrictId = HospitalProfile.DistrictId;
        this.HospitalID = HospitalProfile.HospitalID;

    }
}