import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-user-marks',
  templateUrl: './admin-user-marks.component.html',
  styleUrls: ['./admin-user-marks.component.css']
})
export class AdminUserMarksComponent{
  userMarks;
  userEmail;
  userSubjects;
  userMarksAndSubjects = [];
  displayedColumns: string[] = ['subject', 'mark'];
  constructor(private route: ActivatedRoute) { 
    this.userMarks = route.snapshot.data['userMarks'];
    this.userSubjects = route.snapshot.data['userSubjects'];
    this.route.params.subscribe(params => {
      this.userEmail = params['email'];
    });
    for (const subject of this.userSubjects) {
      this.userMarksAndSubjects.push({subject: subject.name, marks: []})
    }
    this.userSubjects.map(eachSubject => {
      this.userMarks.map(eachMark => {
        const item = this.userMarksAndSubjects.find(i => i.subject === eachSubject.name);
        eachMark.Subject.name === eachSubject.name ?
        item.marks.push(eachMark.mark) : null;
      });
    });
   }
}
