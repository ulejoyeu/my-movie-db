import { TestBed } from '@angular/core/testing';

import { MyMovieDbService } from './my-movie-db.service';

describe('MyMovieDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyMovieDbService = TestBed.get(MyMovieDbService);
    expect(service).toBeTruthy();
  });
});
