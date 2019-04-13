import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { getIsAuth } from 'src/app/+store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn;
  constructor(public store: Store<any>, public authService: AuthService) { 
    this.isUserLoggedIn = store.select(getIsAuth);
   }

  ngOnInit() {
  }


}
