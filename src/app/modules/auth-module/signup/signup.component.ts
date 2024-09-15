import { Component, OnInit } from '@angular/core';
import { WebHeaderComponent } from "../../../shared/web-header/web-header.component";
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client/client.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../../../shared/models/Client/client';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [WebHeaderComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  addNewClientInfoForm!: FormGroup;
  clientInfoModel = new Client();

  constructor (private router: Router, private clientService: ClientService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initAddNewClientInfoForm();
  }

  onSubmitNewClientInfo() {
    const firstName = this.addNewClientInfoForm.controls['firstName'].value;
    const emailAddress = this.addNewClientInfoForm.controls['emailAddress'].value;
    const selectedYear = this.addNewClientInfoForm.controls['selectedYear'].value;
    const selectedMonth = this.addNewClientInfoForm.controls['selectedMonth'].value;
    const selectedDay = this.addNewClientInfoForm.controls['selectedDay'].value;
    const gender = this.addNewClientInfoForm.controls['gender'].value;

    if (firstName == "") {

    } else if (emailAddress == "") {

    } else if (selectedYear == "") {

    } else if (selectedMonth == "") {

    } else if (selectedDay == "") {

    } else if (gender == "") {

    } else {
      this.clientInfoModel.firstName = firstName;
      this.clientInfoModel.emailAddress = emailAddress;
      this.clientInfoModel.birthday = selectedYear + "-" + selectedMonth + "-" + selectedDay;
      console.log(this.clientInfoModel.birthday)
      this.clientInfoModel.gender = gender;

      this.clientService.addNewClientInfo(this.clientInfoModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.router.navigate(['/app/quiz']);
        } else {

        }
      })
    }
  }

  initAddNewClientInfoForm() {
    this.addNewClientInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      selectedYear: ['', Validators.required],
      selectedMonth: ['', Validators.required],
      selectedDay: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  onClickContinue() {
    
  }

}
