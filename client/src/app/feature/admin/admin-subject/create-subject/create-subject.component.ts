import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { ToastrService } from 'ngx-toastr';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
  name: string;
  constructor(private subjectService: SubjectService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    return this.subjectService.create(this.name).subscribe(data => {
      this.toastr.success(data.msg);
      this.router.navigate(['admin/subject']);
    },
    err => {
      this.toastr.error(err.error.msg);
    }
    )
  }
}
