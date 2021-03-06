import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Comment } from '../models';


@Injectable()
export class ArticleCommentService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug, payload): Observable<Comment> {
    return this.apiService.post(
      `/articles/${slug}/comments`,
      { comment: { body: payload } }
      ).map(data => data.comment);
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/articles/${slug}/comments`)
      .map(data => data.comments);
  }

  remove(commentId, articleSlug) {
    return this.apiService
      .remove(`/articles/${articleSlug}/comments/${commentId}`);
  }

}
