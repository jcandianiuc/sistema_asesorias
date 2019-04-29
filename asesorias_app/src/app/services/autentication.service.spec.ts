import { TestBed } from '@angular/core/testing';

import { AutenticationService } from './autentication.service';

describe('AutenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticationService = TestBed.get(AutenticationService);
    expect(service).toBeTruthy();
  });
});
