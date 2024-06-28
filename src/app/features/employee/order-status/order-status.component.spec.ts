import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusComponent } from './order-status.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OrderStatusComponent', () => {
    let component: OrderStatusComponent;
    let fixture: ComponentFixture<OrderStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderStatusComponent, NoopAnimationsModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
