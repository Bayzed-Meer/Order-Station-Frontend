import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageSummaryComponent } from './beverage-summary.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BeverageSummaryComponent', () => {
    let component: BeverageSummaryComponent;
    let fixture: ComponentFixture<BeverageSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BeverageSummaryComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(BeverageSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
