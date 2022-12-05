import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title='Welcome to NH Access Permission';
  shortTitle='Best platform to get end to end services related to Access permission. You can test site feasibility, learn and get help from our counsultants for all your process needs.';
  
  constructor() { }

  ngOnInit(): void {
  }


}
