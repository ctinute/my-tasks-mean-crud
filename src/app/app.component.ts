import { Component } from '@angular/core';

// app-root component
// chứa router để di chuyên giữa các component được khai báo trong RouterModule

@Component({
  selector: 'app-root',                 // selector
  templateUrl: './app.component.html',  // giao diện
  styleUrls: ['./app.component.css']    // css style
})
export class AppComponent {
  title = 'app';
}
