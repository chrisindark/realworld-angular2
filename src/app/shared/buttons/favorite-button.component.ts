import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from '../models';
import { ArticleService, UserService } from '../services';


@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html'
})

export class FavoriteButtonComponent {
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private userService: UserService
  ) { }

  @Input() article: Article;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.isSubmitting = false;
          this.router.navigateByUrl('/login');
          return;
        }

        // Favorite the article if it isn't favorited yet
        if (!this.article.favorited) {
          this.articleService.favorite(this.article.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(true);
              }, err => this.isSubmitting = false
            );
          // Otherwise, unfavorite the article
        } else {
          this.articleService.unfavorite(this.article.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.onToggle.emit(false);
              }, err => this.isSubmitting = false
            );
        }

      });
  }

}
