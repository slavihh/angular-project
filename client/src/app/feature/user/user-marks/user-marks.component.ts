import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-marks',
  templateUrl: './user-marks.component.html',
  styleUrls: ['./user-marks.component.css']
})
export class UserMarksComponent implements OnInit {
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
      const name = subject.name;
      this.userMarksAndSubjects.push({subject: subject.name, marks: []})
    }
    this.userSubjects.map(eachSubject => {
      this.userMarks.map(eachMark => {
        const index = this.userMarksAndSubjects;
        const item = this.userMarksAndSubjects.find(i => i.subject === eachSubject.name);
        eachMark.Subject.name === eachSubject.name ?
        item.marks.push(eachMark.mark) : null;
      });
    });
   }

  ngOnInit() {
  }
}
