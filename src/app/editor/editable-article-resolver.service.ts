import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/empty';

import { Article, ArticleService, UserService } from '../shared';


@Injectable()
export class EditableArticleResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private userService: UserService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.articleService.get(route.params['slug'])
      .pipe(map(
        article => {
          if (this.userService.getCurrentUser().username === article['author']['username']) {
            return article;
          } else {
            this.router.navigateByUrl('/');
            return Observable.empty();
          }
        }
      ))
      .catch((err) => {
        this.router.navigateByUrl('/');
        return Observable.empty();
      });
  }
}
