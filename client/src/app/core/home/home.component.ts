import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUserLoggedIn: boolean;
  constructor(public store: Store<any>, public authService: AuthService) { 
    this.authService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    })
   }

  ngOnInit() {
  }


}
