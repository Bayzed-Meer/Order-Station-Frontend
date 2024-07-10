import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealSummaryComponent } from './meal-summary.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MealSummaryComponent', () => {
    let component: MealSummaryComponent;
    let fixture: ComponentFixture<MealSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MealSummaryComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(MealSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
