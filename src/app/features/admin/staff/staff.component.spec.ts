import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffComponent } from './staff.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StaffComponent', () => {
    let component: StaffComponent;
    let fixture: ComponentFixture<StaffComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StaffComponent, NoopAnimationsModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(StaffComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
