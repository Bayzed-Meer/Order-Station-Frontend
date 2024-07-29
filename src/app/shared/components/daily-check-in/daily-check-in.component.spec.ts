import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCheckInComponent } from './daily-check-in.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DailyCheckInComponent', () => {
    let component: DailyCheckInComponent;
    let fixture: ComponentFixture<DailyCheckInComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DailyCheckInComponent, NoopAnimationsModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(DailyCheckInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
