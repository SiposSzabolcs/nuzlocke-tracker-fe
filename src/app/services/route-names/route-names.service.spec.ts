import { TestBed } from '@angular/core/testing';

import { RouteNamesService } from './route-names.service';

describe('RouteNamesService', () => {
  let service: RouteNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
