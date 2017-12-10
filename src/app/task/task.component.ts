import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';

// Component danh  task
// selector: tên selector cho component
// template: giao diện cho component

@Component({
  selector: 'app-taks',
  template: `
    <div class="container">
      <h1>Task list
        <a [routerLink]="['/task-create']" class="btn btn-default btn-lg">
          <i class="material-icons">add</i>
        </a>
      </h1>
      <table class="table table-hover">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Due time</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <!-- loop hiển thi danh sách task -->
        <tr *ngFor="let task of tasks">
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.dueTime }}</td>
          <td><a [routerLink]="['/task-details', task._id]">Show Details</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TaskComponent implements OnInit {

  tasks: any;

  constructor(private _service: TaskService) {
  }

  ngOnInit() {
    // lấy danh sách khi component được khởi tạo
    this.getTaskList();
  }

  getTaskList() {
    // gọi service
    this._service.getAllTasks().then(
      (res) => {
        // lấy danh sách thành công
        // gán cho tasks để hiển thị
        this.tasks = res;
        // điều chỉnh format thời gian
        for (let i = 0; i < this.tasks.length; i++) {
          this.tasks[i].dueTime = new Date(this.tasks[i].dueTime).toString();
        }
      },
      (err) => {
        // lỗi -> log lỗi
        console.log(err);
      });
  }
}
