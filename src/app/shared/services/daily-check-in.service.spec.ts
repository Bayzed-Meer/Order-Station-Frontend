import { TestBed } from '@angular/core/testing';

import { DailyCheckInService } from './daily-check-in.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DailyCheckInService', () => {
    let service: DailyCheckInService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(DailyCheckInService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
