import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { ToastrService } from 'ngx-toastr';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
  title: string;
  constructor(private subjectService: SubjectService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this.subjectService.create(this.title).subscribe(res  => {
      this.router.navigate(['']);
      this.toastr.success(res.msg);
    },
    err => {
        this.toastr.error(err.error.msg)
      }
    );
  }
}
