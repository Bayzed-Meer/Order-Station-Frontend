import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesCardComponent } from './employees-card.component';

describe('EmployeesCardComponent', () => {
    let component: EmployeesCardComponent;
    let fixture: ComponentFixture<EmployeesCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmployeesCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployeesCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
