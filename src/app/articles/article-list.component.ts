import { Component, OnInit, Input } from '@angular/core';

import { Article, ArticleListConfig } from '../shared';
import { ArticleService } from '../shared';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})

export class ArticleListComponent implements OnInit {
  query: ArticleListConfig;
  results: Article[];
  loading: boolean;
  currentPage: number;
  // totalPages: Array<number> = [1];
  totalPages: number;

  constructor(private articleService: ArticleService) { }

  @Input() limit: number;
  @Input() set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  ngOnInit() {
    this.loading = false;
    this.currentPage = 1;
  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.articleService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.results = data.articles;

        // this.totalPages = Array.from(
        //   new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => {
        //     return index + 1;
        //   });
        this.totalPages = 0;
      });
  }

}
