import { Component, ChangeDetectionStrategy,} from '@angular/core';
import { SubjectService } from 'src/app/core/services/subject.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/core/services/models/IState';
@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminSubjectComponent  {
  subjects;
  displayedColumns: string[] = ['name', 'options'];
  constructor(public subjectService: SubjectService, private toastr: ToastrService, private router: Router, private store: Store<IState>, 
              private route: ActivatedRoute) {
              this.subjects = this.route.snapshot.data['subjects'];
        }
  delete(name) {
    this.subjects = this.subjects.filter(s => s.name !== name);
    this.subjectService.delete(name).subscribe((res: any) => {
      this.toastr.success(res.msg);
    }, err => {
      this.toastr.error(err.error.msg);
    });

}
}
