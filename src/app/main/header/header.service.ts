import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public title = new BehaviorSubject('Title');
  public subTitle = new BehaviorSubject('subTitle');

  constructor() { }
  setTitle(title: string, subTitle: string) {
    this.title.next(title);
    this.subTitle.next(subTitle);
  }
}
