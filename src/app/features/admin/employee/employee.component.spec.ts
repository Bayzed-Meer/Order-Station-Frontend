import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employee.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EmployeesComponent', () => {
    let component: EmployeesComponent;
    let fixture: ComponentFixture<EmployeesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmployeesComponent, NoopAnimationsModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployeesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
