import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOrdersComponent } from './current-orders.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CurrentOrdersComponent', () => {
    let component: CurrentOrdersComponent;
    let fixture: ComponentFixture<CurrentOrdersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CurrentOrdersComponent, NoopAnimationsModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(CurrentOrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
