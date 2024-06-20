import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesListComponent } from './employees-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EmployeesListComponent', () => {
    let component: EmployeesListComponent;
    let fixture: ComponentFixture<EmployeesListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmployeesListComponent, NoopAnimationsModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployeesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
