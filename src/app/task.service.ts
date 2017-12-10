import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// Task service: gọi các API từ express (routes/Task.js) để thao tác dữ liệu

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  // lấy danh sách task
  getAllTasks() {
    return new Promise((resolve, reject) => {
      this.http.get('/task')          // gọi API
        .map(res => res.json())           // promise khi load response body xong
        .subscribe(res => {
          resolve(res);                   // callback khiload thành công
        }, (err) => {
          reject(err);                    // callback khi lỗi
        });
    });
  }

  // tương tự với thêm xoá sửa...

  showTask(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/task/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveTask(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/task', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateTask(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put('/task/' + id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteTask(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/task/' + id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
