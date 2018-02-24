import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Article, ArticleListConfig } from '../models';


@Injectable()
export class ArticleService {
  constructor(private apiService: ApiService) {
  }

  query(config: ArticleListConfig): Observable<{ articles: Article[], count: number }> {
    let params: HttpParams = new HttpParams();

    Object.keys(config.filters)
      .forEach((key) => {
        params = params.append(key, config.filters[key]);
      });

    return this.apiService
      .get(
        ((config.type === 'feed') ? '/feed' : '') + '/articles/',
        params
      ).map(data => data);
  }

  get(slug): Observable<Article> {
    return this.apiService.get('/articles/' + slug + '/')
      .map(data => data.article);
  }

  remove(slug) {
    return this.apiService.remove('/articles/' + slug + '/');
  }

  save(article): Observable<Article> {
    // If we're updating an existing article
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug + '/',
        { article: article })
        .map(data => data.article);
      // Otherwise, create a new article
    } else {
      return this.apiService.post('/articles/', {article: article})
        .map(data => data.article);
    }
  }

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite/');
  }

  unfavorite(slug): Observable<Article> {
    return this.apiService.remove('/articles/' + slug + '/favorite/');
  }

}
