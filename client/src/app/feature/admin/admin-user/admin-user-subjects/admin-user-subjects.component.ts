import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-admin-user-subjects',
  templateUrl: './admin-user-subjects.component.html',
  styleUrls: ['./admin-user-subjects.component.css']
})
export class AdminUserSubjectsComponent implements OnInit {
  userSubjects;
  userEmail;
  displayedColumns: string[] = ['subject'];
  constructor(private route: ActivatedRoute) { 
    this.userSubjects = route.snapshot.data['userSubjects'];
    route.params.subscribe(params => {
      this.userEmail = params['email'];
    })
  }

  ngOnInit() {
  }

}
