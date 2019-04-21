import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  name: string;
  paramName: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService, private subjectService: SubjectService) { 
    this.activatedRoute.params.subscribe(params => {
      this.paramName = params['name'];
      this.name = this.paramName;
    });
   }

  ngOnInit() {
  }
  onSubmit() {
    if (this.paramName === this.name) {
      return this.toastr.error('You have to change the name');
    } else {
      return this.subjectService.edit(this.paramName, this.name).subscribe((res: any) => {
        this.router.navigate(['admin/subject']);
        this.toastr.success(res.msg);
      },
      err => {
        this.toastr.error(err.error.msg);
      }
      );
    }
  }
}
