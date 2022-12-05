import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { ConsultantsListDatatype } from '../admin/admin-consultants/admin-consultants.component';
import { HeaderService } from '../header/header.service';
import { ConsultantService } from './consultant.service';

export interface ConsultantListDatatype {
  id: string;
  name: string;
  email: string;
  phone: string;
  // state: string;
  address: string;
}

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {
  
  currDiv: string = 'B';
  displayedColumns: string[];
  consultantDatasource: MatTableDataSource<ConsultantsListDatatype>;
  addConsultantForm: FormGroup;
  stateList: FormGroup;
  states=[ "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry"]

  constructor(private headerService: HeaderService,
              private consultantsService: ConsultantService,
              private fBuilder: FormBuilder,
              private notification: MatSnackBar) { 

    this.displayedColumns = ['name', 'phone', 'address'];
    this.consultantDatasource = new MatTableDataSource<ConsultantsListDatatype>();
    this.addConsultantForm = this.fBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      // subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      experience: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]]
    });
    this.stateList=this.fBuilder.group({state: ['']})
  }

  ngOnInit(): void {
    this.headerService.setTitle('Consultant', '');
    this.getConsultants();
  }

  ShowDiv(divVal: string) {
    this.currDiv = divVal;
    console.log(this.currDiv)
  }

  addConsultant() {
    const addConsultantData: FormData = new FormData();
    addConsultantData.append('name', this.addConsultantForm.get('name')?.value);
    addConsultantData.append('email', this.addConsultantForm.get('email')?.value);
    addConsultantData.append('phone', this.addConsultantForm.get('phone')?.value);
    // addConsultantData.append('subject', this.addConsultantForm.get('subject')?.value);
    addConsultantData.append('address', this.addConsultantForm.get('address')?.value);
    addConsultantData.append('experience', this.addConsultantForm.get('experience')?.value);
    this.consultantsService.addConsultant(addConsultantData)
    .pipe(
      take(1)
    )
    .subscribe( (addStatus) => {
      if(addStatus.success === 'True'){
        this.notification.open('Consultant added successfully', 'Ok', {duration: 2500});
      }
      else{
        this.notification.open('Some error occurred. Please try again later.', 'Ok', {duration: 2500});
      }
    });
  }
  
  getConsultants(): void {

    this.consultantsService.getConsultantList()
    .pipe(
      take(1)
    )
    .subscribe( (consultantData) => {
        if(consultantData.success === 'true'){
          this.consultantDatasource.data = consultantData.data;
          console.log(consultantData, "A")
        }
        else{
          // this.notificaton.open('Some Error Occurred');
          console.log(consultantData, "B")
        }
    });
   }

   applyFilter(filterValue: string) {
    console.log(filterValue);
    this.consultantDatasource.filter = filterValue.trim().toLowerCase();

    if (this.consultantDatasource.paginator) {
      this.consultantDatasource.paginator.firstPage();
    }
  }

}
