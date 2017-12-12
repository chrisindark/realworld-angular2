import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Article, ArticleService, UserService } from '../shared';


@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.articleService.get(route.params['slug'])
      .catch((err) => this.router.navigateByUrl('/'));

  }
}
