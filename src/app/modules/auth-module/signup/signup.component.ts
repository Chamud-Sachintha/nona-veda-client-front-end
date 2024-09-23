import { Component, OnInit } from '@angular/core';
import { WebHeaderComponent } from "../../../shared/web-header/web-header.component";
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client/client.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../../../shared/models/Client/client';
import { ToastrService } from 'ngx-toastr';

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

  constructor (private router: Router, private clientService: ClientService, private formBuilder: FormBuilder, private tostr: ToastrService) {}

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
      this.tostr.error("Empty Field Found", "First Name is required.");
    } else if (emailAddress == "") {
      this.tostr.error("Empty Field Found", "Email Address is required.");
    } else if (selectedYear == "") {
      this.tostr.error("Empty Field Found", "Birth year is required.");
    } else if (selectedMonth == "") {
      this.tostr.error("Empty Field Found", "Month is required.");
    } else if (selectedDay == "") {
      this.tostr.error("Empty Field Found", "Day is required.");
    } else if (gender == "") {
      this.tostr.error("Empty Field Found", "Gender is required.");
    } else {
      this.clientInfoModel.firstName = firstName;
      this.clientInfoModel.emailAddress = emailAddress;
      this.clientInfoModel.birthday = selectedYear + "-" + selectedMonth + "-" + selectedDay;
      console.log(this.clientInfoModel.birthday)
      this.clientInfoModel.gender = gender;

      this.clientService.addNewClientInfo(this.clientInfoModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          const dataList = JSON.parse(JSON.stringify(resp));

          console.log(dataList)

          localStorage.setItem("clientId", dataList.data[0].id);
          this.router.navigate(['/app/quiz']);
        } else {
          this.tostr.error("Add New Client Info", resp.message);
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
