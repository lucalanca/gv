/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GithubEffectsService } from './github-effects.service';

describe('Service: GithubEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubEffectsService]
    });
  });

  it('should ...', inject([GithubEffectsService], (service: GithubEffectsService) => {
    expect(service).toBeTruthy();
  }));
});
