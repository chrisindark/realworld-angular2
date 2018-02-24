import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalCount: number;
  @Input() limit: number;
  // @Input() totalPages: number;
  @Input() currentPage: number;
  @Input() maxVisible: number;
  @Output() pageSelected: EventEmitter<number> = new EventEmitter();

  totalPages: number;
  showPages: Array<any> = [];
  start: number;
  end: number;

  constructor() {}

  ngOnInit() {
    this.showPages = [];
    this.start = 1;
    this.end = 1;

    // console.log(this.totalCount);
    // console.log(this.limit);
    // console.log(this.maxVisible);
  }

  ngOnChanges(changes) {
    // console.log(changes);
    if (changes.totalCount && changes.totalCount.currentValue) {
      this.totalPages = Math.ceil(this.totalCount / this.limit);
      this.end = this.maxVisible >= this.totalPages
        ? this.totalPages : this.maxVisible;
    }
  }

  range() {
    this.showPages = [];
    const x = this.currentPage;
    let startPage;
    let endPage;
    if (this.totalPages >= this.maxVisible) {
      startPage = x - (Math.ceil(this.maxVisible / 2) - 1);
      if (this.maxVisible % 2 === 0) {
        endPage = x + (Math.ceil(this.maxVisible / 2));
      } else {
        endPage = x + (Math.ceil(this.maxVisible / 2) - 1);
      }

      if (startPage < 1) {
        endPage = endPage + (1 - startPage);
        startPage = 1;
      } else if (endPage > this.totalPages) {
        startPage = startPage - (endPage - this.totalPages);
        endPage = this.totalPages;
      }
    } else {
      startPage = 1;
      endPage = this.totalPages;
    }

    for (let i = startPage; i <= endPage; ++i) {
      this.showPages.push(i);
    }

    // console.log(this.showPages);
    return this.showPages;
  }

  selectPage(pageNumber) {
    this.pageSelected.emit(pageNumber);
  }

  next() {
    this.currentPage += 1;
    this.selectPage(this.currentPage);
  }

  previous() {
    this.currentPage -= 1;
    this.selectPage(this.currentPage);
  }

  disableNext() {
    return this.currentPage >= this.totalPages;
  }

  disablePrev() {
    return this.currentPage <= 1;
  }

}
