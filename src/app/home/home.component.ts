import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ArticleListConfig, TagsService, UserService } from '../shared';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'
  ]
})

export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = 'Home';
  isLoaded: boolean;
  isAuthenticated: boolean;
  listConfig: ArticleListConfig = new ArticleListConfig();
  tags: Array<string> = [];
  tagsLoaded: boolean;

  constructor(
    private title: Title,
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) {
    this.isAuthenticated = false;
  }

  ngOnInit() {
    this.tagsLoaded = false;
    this.isLoaded = false;

    this.userService.isAuthenticated
      .subscribe((authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      });

    this.tagsService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      });
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {
      type: type,
      filters: filters
    };
  }

  searchEvents() {
    console.log('searchTerm');
  }

  ngOnDestroy() {}

}
