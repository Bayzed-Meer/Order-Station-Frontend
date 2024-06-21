import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsCardComponent } from './staffs-card.component';

describe('StaffsCardComponent', () => {
    let component: StaffsCardComponent;
    let fixture: ComponentFixture<StaffsCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StaffsCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(StaffsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
