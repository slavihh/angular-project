import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.css']
})
export class AdminSubjectComponent implements OnInit {
  public subjects: any;
  displayedColumns: string[] = ['name'];
  constructor(public subjectService: SubjectService) {
    
   }

  ngOnInit() {
    this.subjects = this.subjectService.getAllSubjects();
  }


}
