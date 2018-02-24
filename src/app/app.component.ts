import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from './shared';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // This runs once on application startup.
    this.userService.populate();
  }

  ngOnDestroy() {}

}
