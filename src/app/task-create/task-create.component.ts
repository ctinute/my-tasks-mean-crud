import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../task.service';

// Component thêm t// selector: tên selector cho component
// template: giao diện cho component

@Component({
  selector: 'app-task-create',
  template: `
    <div class="container">
      <h1>Add New Task</h1>
      <div class="row">
        <div class="col-md-6">
          <form (ngSubmit)="saveTask()" #taskForm="ngForm">
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
              <button type="submit" class="btn btn-success" [disabled]="!taskForm.form.valid">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class TaskCreateComponent implements OnInit {

  task: any;

  constructor(private _service: TaskService, private router: Router) {
  }

  ngOnInit() {
    // khởi tạo biến
    this.task = {};
  }

  saveTask() {
    // điều chỉnh time format
    this.task.dueTime = this.parseDateString(this.task.dueTime);
    // gọi service
    this._service.saveTask(this.task).then(
      (result) => {
        // lưu thành công -> lấy id task vừa lưu chuyển đến trang chi tiết
        const id = result['_id'];
        this.router.navigate(['/task-details', id]);
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
