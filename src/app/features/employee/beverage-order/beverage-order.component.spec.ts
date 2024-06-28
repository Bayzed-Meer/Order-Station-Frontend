import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageOrderComponent } from './beverage-order.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BeverageOrderComponent', () => {
    let component: BeverageOrderComponent;
    let fixture: ComponentFixture<BeverageOrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BeverageOrderComponent, NoopAnimationsModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(BeverageOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
