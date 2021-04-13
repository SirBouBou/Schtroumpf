import { TestBed } from '@angular/core/testing';

import { SmurfService } from './smurf.service';

describe('SmurfService', () => {
  let service: SmurfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmurfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
