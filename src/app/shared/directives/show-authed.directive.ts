import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { UserService } from '../services/user.service';


@Directive({
  selector: '[appShowAuthed]'
})

export class ShowAuthedDirective implements OnInit {
  condition: boolean;

  constructor(
    private userService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated
      .subscribe((isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  @Input('appShowAuthed') set showAuthed(condition: boolean) {
    this.condition = condition;
  }

}
