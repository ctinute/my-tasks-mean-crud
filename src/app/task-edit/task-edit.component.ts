import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../task.service';

// Component thêm task
// selector: tên selector cho component
// template: giao diện cho component

@Component({
  selector: 'app-task-edit',
  template: `
    <div class="container">
      <h1>Edit Task</h1>
      <div class="row">
        <div class="col-md-6">
          <form (ngSubmit)="updateTask(task._id)" #taskForm="ngForm">
            <div class="form-group">
              <label for="nm">Name</label>
              <input type="text" class="form-control" [(ngModel)]="task.name" name="nm" required>
            </div>
            <div class="form-group">
              <label for="desc">Description</label>
              <input type="text" class="form-control" [(ngModel)]="task.description" name="desc" required>
            </div>
            <div class="form-group">
              <label for="name">Due time</label>
              <input type="datetime-local" class="form-control" [(ngModel)]="task.dueTime" name="time" required>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-success" [disabled]="!taskForm.form.valid">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class TaskEditComponent implements OnInit {

  task: any;

  constructor(private _service: TaskService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // lấy chi tiết task cũ
    this.task = {};
    this.getTask(this.route.snapshot.params['id']);
  }

  // lấy thông tin task
  getTask(id) {
    // gọi service
    this._service.showTask(id).then(
      (res) => {
        this.task = res;
        this.task.dueTime = this.task.dueTime.toString().substr(0, this.task.dueTime.length - 1);
        console.log(this.task);
      },
      (err) => {
        console.log(err);
      });
  }

  // sửa task
  updateTask(id) {
    this.task.dueTime = this.parseDateString(this.task.dueTime);
    this._service.updateTask(id, this.task).then(
      (result) => {
        // lưu thành công -> lấy id task vừa lưu chuyển đến trang chi tiết
        const tid = result['_id'];
        this.router.navigate(['/task-details', tid]);
      },
      (err) => {
        // lỗi -> log lỗi
        console.log(err);
      });
  }

  // String -> Date
  private parseDateString(date: string): Date {
    date = date.replace('T', '-');
    const parts = date.split('-');
    const timeParts = parts[3].split(':');
    return new Date(+parts[0], +parts[1] - 1, +parts[2], +timeParts[0], +timeParts[1]);
  }

}
