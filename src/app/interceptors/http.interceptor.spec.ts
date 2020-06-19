import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.interceptor';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpService
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpService = TestBed.inject(HttpService);
    expect(interceptor).toBeTruthy();
  });
});
