import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../task.service';

// Component chi tiết task
// selector: tên selector cho component
// template: giao diện cho component

@Component({
  selector: 'app-task-detail',
  template: `
    <div class="container">
      <a [routerLink]="['/']">Home</a>
      <h1>{{ task.name }}</h1> <!-- binding -->
      <dl class="list">
        <dt>Description</dt>
        <dd>{{ task.description }}</dd>
        <dt>Due Time</dt>
        <dd>{{ task.dueTime }}</dd>
      </dl>
      <div class="row">
        <div class="col-md-12">
          <a [routerLink]="['/task-edit', task._id]" class="btn btn-success">EDIT</a>
          <button class="btn btn-danger" type="button" (click)="deleteTask(task._id)">DELETE</button>
        </div>
      </div>
    </div>
  `
})
export class TaskDetailComponent implements OnInit {

  task: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _service: TaskService) {
  }

  ngOnInit() {
    // khởi tạo biến
    this.task = {};
    // lấy thông tin task khi khởi tạo component
    this.getTaskDetail(this.route.snapshot.params['id']);
  }

  // hàm lấy chi tiết task bằng id
  getTaskDetail(id) {
    // gọi service
    this._service.showTask(id).then(
      (res) => {
        // load thành công -> gán cho task để hiển thị, điều chỉnh time format
        this.task = res;
        this.task.dueTime = new Date(this.task.dueTime).toString();
      },
      (err) => {
        // callback khi lỗi
        console.log(err);
      });
  }

  // hàm xoá task
  deleteTask(id) {
    // gọi service
    this._service.deleteTask(id).then(
      (result) => {
        // delete thành công -> quay về trang danh sách task
        this.router.navigate(['/tasks']);
      },
      (err) => {
        // lỗi -> log
        console.log(err);
      });
  }

}
