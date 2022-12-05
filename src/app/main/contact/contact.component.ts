import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../header/header.service';
import { ContactService } from './contact.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  addContactForm: FormGroup;

  constructor(private headerService: HeaderService, 
    private contactService: ContactService,
    private fBuilder: FormBuilder,
              private notification: MatSnackBar) { 
                this.addContactForm = this.fBuilder.group({
                  name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                  email: ['', [Validators.required, Validators.email]],
                  phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
                  subject: ['', [Validators.required, Validators.minLength(3)]],
                  information: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]]
                });
              }

  ngOnInit(): void {
    this.headerService.setTitle('Contact Us', 'Want to get in touch? We’d love to hear from you. Here’s how to can reach us.');
  }

  addContact() {
    const sendContactData: FormData = new FormData();
    sendContactData.append('name', this.addContactForm.get('name')?.value);
    sendContactData.append('email', this.addContactForm.get('email')?.value);
    sendContactData.append('phone', this.addContactForm.get('phone')?.value);
    sendContactData.append('subject', this.addContactForm.get('subject')?.value);
    sendContactData.append('information', this.addContactForm.get('information')?.value);
    this.contactService.sendContactData(sendContactData)
    .pipe(
      take(1)
    )
    .subscribe( (addStatus) => {
      if(addStatus.success === 'True'){
        this.notification.open(addStatus?.message, 'Ok', {duration: 2500});
      }
      else{
        this.notification.open('Some error occurred. Please try again later.', 'Ok', {duration: 2500});
      }
    });
  }

}
