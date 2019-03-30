import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
  constructor(private ngRedux: NgRedux<IAppState>) {
  }
  
}
