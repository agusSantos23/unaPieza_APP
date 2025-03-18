import { TestBed } from '@angular/core/testing';

import { ApiUnaPiezaService } from './api-una-pieza.service';

describe('ApiUnaPiezaService', () => {
  let service: ApiUnaPiezaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUnaPiezaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
