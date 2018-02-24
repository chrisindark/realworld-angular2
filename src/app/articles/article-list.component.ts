import { Component, OnInit, Input } from '@angular/core';

import { Article, ArticleListConfig } from '../shared';
import { ArticleService } from '../shared';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})

export class ArticleListComponent implements OnInit {
  loading: boolean;

  query: ArticleListConfig;
  articleObjects: Article[];

  totalCount: number;
  currentPage: number;
  maxVisible: number;

  constructor(private articleService: ArticleService) { }

  @Input() limit: number;
  @Input() set config(config: ArticleListConfig) {
    if (config) {
      // console.log(config);
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  ngOnInit() {
    this.loading = false;
    this.currentPage = 1;
    this.maxVisible = 5;
  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;

    this.articleObjects = [];
    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.articleService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.articleObjects = data.articles;
        this.totalCount = data.count;
      });
  }

}
