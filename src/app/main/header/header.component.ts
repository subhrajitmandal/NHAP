import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = '';
  subTitle='';

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.title.subscribe(title => {
      this.title = title;
    });
    this.headerService.subTitle.subscribe(subTitle => {
      this.subTitle = subTitle;
    });
  }

}
