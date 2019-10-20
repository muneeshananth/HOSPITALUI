
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from '../_Services/masterservices';
import { DoctorServices } from '../_Services/doctorservice';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Headers, HttpModule, RequestOptions, Http, Response } from '@angular/http';
import { AlertService } from '../_Services/index';
declare var $: any;
@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
})
export class DoctorComponent implements OnInit {
    checked = false;
    indeterminate = false;
    labelPosition = 'after';
    disabled = false;
    //#region  variable declare
    DoctorForm: FormGroup;
    submitted = false;
    HospitalID: any;
    FirstName: any;
    LastName: any;
    EmailID: any;
    Age: any;
    GenderId: any;
    MobileNumber: any;
    Qualification: any;
    Position: any;
    ProfileImage: any;
    UserID: any;
    DoctorID: any;
    GenderData: any;
    imagePreview: any;
    ImageFileName: any;
    ImageUpload: any;
    UploadImage: any;
    ButtonText: any;
    DoctorProfile: any;
    //#endregion
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private DoctorService: DoctorServices,
        private MasterService: MasterServices,
        private sanitizer: DomSanitizer,
        private http: Http,
        private ng2ImgMax: Ng2ImgMaxService,
        private alertService:AlertService

    ) {

    }

    ngOnInit() {
        this.DoctorProfile = JSON.parse(localStorage.getItem('DoctorProfile'));
        this.UserID = localStorage.getItem('UserID');
        this.HospitalID = localStorage.getItem('HospitalID');
        this.GetGender();
        this.imagePreview = '../assets/images/doctor-1.jpg'
        this.DoctorForm = this.formBuilder.group({
            FirstNameForm: ['', [Validators.required]],
            LastNameForm: ['', Validators.required],
            EmailForm: ['', [Validators.required, Validators.minLength(6), Validators.pattern("")]],
            MobileNumberForm: ['', Validators.required],
            AgeForm: ['', Validators.required],
            GenderForm: ['', Validators.required],
            QualificationForm: ['', [Validators.required, Validators.pattern("")]],
            PositionForm: ['', [Validators.required, Validators.pattern("")]],
            ProfileImageForm: ['']

        });
        if (this.DoctorProfile != null) {
            this.ButtonText = 'Update';
            this.AssignData(this.DoctorProfile);
        }
        else {
            this.ButtonText = 'Save';
        }
    }
    //Get State Master
    GetGender() {
        this.MasterService.GenderFetch(this.GenderId)
            .subscribe(data => {
                if (data != null && data.msg.length > 0) {
                    this.GenderData = data.msg;
                }
            });
    }
    get f() {
        return this.DoctorForm.controls;
    }
    DoctorAdd() {
        this.submitted = true;
        // stop here if form is invalid

        if (this.DoctorForm.invalid) {
            return;
        }
        else {
            if (this.ButtonText == 'Update') {
                var data = {
                    DoctorID: this.DoctorID,
                    HospitalID: this.HospitalID,
                    FirstName: this.FirstName,
                    LastName: this.LastName,
                    EmailID: this.EmailID,
                    Age: this.Age,
                    GenderId: this.GenderId, 
                    MobileNumber: this.MobileNumber,
                    Qualification: this.Qualification,
                    Position: this.Position,
                    ProfileImage: this.UploadImage,
                    ModifiedBy: this.UserID,
                    IsActive: true
                }
                if (this.UploadImage == null) {
                    data.ProfileImage = this.DoctorProfile["ProfileImage"];
                }
                this.DoctorService.DoctorPut(data)
                    .subscribe(data => {
                        if (data == "Success") {
                            this.DoctorForm.reset();
                            this.submitted = false;
                            this.alertService.success(data);
                            $('.alert').css({ 'display': 'block' });
                            setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                            this.router.navigate(['/doctorlist']);
                           
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
                    HospitalID: this.HospitalID,
                    FirstName: this.FirstName,
                    LastName: this.LastName,
                    EmailID: this.EmailID,
                    Age: this.Age,
                    GenderId: this.GenderId,
                    MobileNumber: this.MobileNumber,
                    Qualification: this.Qualification,
                    Position: this.Position,
                    ProfileImage: this.UploadImage,
                    ModifiedBy: this.UserID
                    
                }
                this.DoctorService.AddDoctor(datacreate)
                    .subscribe(data => {
                        if (data == "Success") {
                            this.DoctorForm.reset();
                            this.submitted = false;
                            this.imagePreview = "../src/assets/images/doctor-1.jpg";
                            this.alertService.success(data);
                            $('.alert').css({ 'display': 'block' });
                            setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                            this.router.navigate(['/doctorlist']);
                        }
                    },
                    error => {
                        this.alertService.error(JSON.parse(error._body));
                        $('.alert').css({ 'display': 'block' });
                        setTimeout(function () { $('.alert').css({ "display": "none" }); }, 6000);
                    });
                    
            }
        }


    }
    AssignData(DoctorProfile) {
        this.DoctorID = DoctorProfile.DoctorID;
        this.HospitalID = DoctorProfile.HospitalID;
        this.FirstName = DoctorProfile.FirstName;
        this.LastName = DoctorProfile.LastName;
        this.EmailID = DoctorProfile.EmailID;
        this.Age = DoctorProfile.Age;
        this.GenderId = DoctorProfile.GenderId;
        this.MobileNumber = DoctorProfile.MobileNumber;
        this.Qualification = DoctorProfile.Qualification;
        this.Position = DoctorProfile.Position;
        if (this.DoctorProfile["ProfileImage"] == null) {
            this.imagePreview = '../assets/images/doctor-1.jpg';
        }
        else {
            this.imagePreview = 'data:image/png;base64,' + DoctorProfile["ProfileImage"];
        }


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

    onFileChange(fileInput: any) {
        var fileSize = fileInput.target.files[0].size;
        if (fileSize < 5000000) {
            let image1 = fileInput.target.files[0];
            if (image1 != undefined) {
                if (image1.type == "image/jpeg" || image1.type == "image/jpeg" || image1.type == "image/png") {
                    let reader = new FileReader();
                    ;
                    this.ng2ImgMax.compress([fileInput.target.files[0]], 0.3).subscribe(
                        result => {
                            this.getImagePreview(result);
                        },
                        error => {
                            console.log('ðŸ˜¢ Oh no!', error);
                        }
                    );
                }
                else {
                    this.imagePreview = "../src/assets/images/doctor-1.jpg";
                    this.ImageFileName = "SelectImage";
                    this.ImageUpload = false;
                    // this.alertService.error('Only jpg/jpeg and png files are allowed!', true);
                    // $('.alert').css({ "display": "block" });
                    // setTimeout(function () { $('.alert').css({ "display": "none" }); }, 3000);

                }
            }
        }
        else {
            // this.alertService.error('Image Should not Exist more then 5MB', true);
            // $('.alert').css({ "display": "block" });
            // setTimeout(function () { $('.alert').css({ "display": "none" }); }, 3000);
        }

    }
    getImagePreview(file: File) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(file);
        this.ImageUpload = true;
        reader.onload = (e: any) => {
            this.imagePreview = reader.result;
            var svc = this.imagePreview.replace("data:" + file.type + ";base64,", "");
            this.UploadImage = svc;
            this.ImageFileName = "Select Image";
            this.ImageUpload = true;
        };
    }
}