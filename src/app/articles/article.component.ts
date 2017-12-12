import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Article, ArticleService,
  Comment, ArticleCommentService,
  User, UserService
} from '../shared';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})

export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private commentService: ArticleCommentService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;

        // Load the comments on this article
        this.populateComments();
      }
    );

    // Load the current user's data
    this.userService.currentUser
      .subscribe((userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.article.author.username);
      });
  }

  populateComments() {
    this.commentService.getAll(this.article.slug)
      .subscribe(comments => this.comments = comments);
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articleService.remove(this.article.slug)
      .subscribe(success => {
          this.router.navigateByUrl('/');
        });
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;
    this.commentService
      .add(this.article.slug, commentBody)
      .subscribe(comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
        }, errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
        });
  }

  onDeleteComment(comment) {
    this.commentService.remove(comment.id, this.article.slug)
      .subscribe(success => {
          this.comments = this.comments.filter((item) => item !== comment);
        });
  }

}
