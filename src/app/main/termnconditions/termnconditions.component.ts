import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-termnconditions',
  templateUrl: './termnconditions.component.html',
  styleUrls: ['./termnconditions.component.scss']
})
export class TermnconditionsComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setTitle('Term & Conditions', '');
  }

}
