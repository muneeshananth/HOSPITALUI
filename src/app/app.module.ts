import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppConfig } from './_AppConfig/appconfig';
import { UserServices } from './_Services/userservices';
import { HospitalServices } from './_Services/hospitalservice';
import { MasterServices } from './_Services/masterservices';
import { DoctorServices } from './_Services/doctorservice';
import { PatientServices } from './_Services/patientservice';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Http, HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DoctorComponent } from './Doctor/doctor.component';
import { DoctorlistComponent } from './Doctor/doctorlist.component';
import { HospitalComponent } from './Hospital/addhospital.component';
import { PatientComponent } from './Patients/addpatient.component';
import { PatientlistComponent } from './Patients/patientlist.component';
import { ChangePasswordComponent } from './Login/changepassword.component';
import { ForgotPasswordComponent } from './Login/forgotpassword.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AlertService } from './_Services/index';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorComponent,
    DoctorlistComponent,
    HospitalComponent,
    PatientComponent,
    PatientlistComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ///table



 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    Ng2ImgMaxModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [
    AppConfig,
    UserServices,
    MasterServices,
    HospitalServices,
    DoctorServices,
    PatientServices,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
