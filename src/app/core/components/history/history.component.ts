import { Component, OnInit } from '@angular/core';
import { VisitedPagesService } from '../../services';
import { VisitedPage } from '../../services/visitedPagesService/visited-pages.service.service';

@Component({
  selector: 'unievent-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  visitedPages: VisitedPage[] = [];

  constructor(private visitedPagesService: VisitedPagesService) { }

  ngOnInit(): void {
    this.visitedPages = this.visitedPagesService.getVisitedPages();
  }
}
