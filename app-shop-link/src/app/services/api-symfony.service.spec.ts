import { TestBed } from '@angular/core/testing';

import { ApiSymfonyService } from './api-symfony.service';

describe('ApiSymfonyService', () => {
  let service: ApiSymfonyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSymfonyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
