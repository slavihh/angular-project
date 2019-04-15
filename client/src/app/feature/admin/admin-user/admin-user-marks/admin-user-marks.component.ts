import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-user-marks',
  templateUrl: './admin-user-marks.component.html',
  styleUrls: ['./admin-user-marks.component.css']
})
export class AdminUserMarksComponent implements OnInit {
  userMarks;
  userEmail;
  userSubjects;
  displayedColumns: string[] = ['subject', 'mark', 'options'];
  constructor(private route: ActivatedRoute) { 
    this.userMarks = route.snapshot.data['userMarks'];
    this.userSubjects = route.snapshot.data['userSubjects'];
    route.params.subscribe(params => {
      this.userEmail = params['email'];
    });
    console.log(this.userEmail, this.userSubjects);
   }

  ngOnInit() {
  }

  delete(name) {

  }
}
