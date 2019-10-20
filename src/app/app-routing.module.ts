import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DoctorComponent } from './Doctor/doctor.component';
import { HospitalComponent } from './Hospital/addhospital.component';
import { PatientComponent } from './Patients/addpatient.component';
import { PatientlistComponent } from './Patients/patientlist.component';
import { DoctorlistComponent } from './Doctor/doctorlist.component';
import { ChangePasswordComponent } from './Login/changepassword.component';
import { ForgotPasswordComponent } from './Login/forgotpassword.component';
const routes: Routes = [
    {
    path: '', redirectTo: "/login", pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'login' }
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    data: { title: 'forgotpassword' }
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    data: { title: 'changepassword' }
  },
 
  {
    path: 'doctor',
    component: DoctorComponent,
    data: { title: 'doctor' }
  },
  {
    path: 'hospital',
    component: HospitalComponent,
    data: { title: 'hospital' }
  },
 
  {
    path: 'patient',
    component: PatientComponent,
    data: { title: 'patient' }
  },
  {
    path: 'patientlist',
    component: PatientlistComponent,
    data: { title: 'patientlist' }
  },
  {
    path: 'doctorlist',
    component: DoctorlistComponent,
    data: { title: 'doctorlist' }
  }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
