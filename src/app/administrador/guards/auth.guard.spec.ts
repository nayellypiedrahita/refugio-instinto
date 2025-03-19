import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('authGuardGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
