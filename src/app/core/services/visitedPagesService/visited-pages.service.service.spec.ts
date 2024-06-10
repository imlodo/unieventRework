import { TestBed } from '@angular/core/testing';

import { VisitedPagesServiceService } from './visited-pages.service.service';

describe('VisitedPagesServiceTsService', () => {
  let service: VisitedPagesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitedPagesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
