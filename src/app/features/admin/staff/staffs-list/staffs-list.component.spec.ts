import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsListComponent } from './staffs-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StaffsListComponent', () => {
    let component: StaffsListComponent;
    let fixture: ComponentFixture<StaffsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StaffsListComponent, NoopAnimationsModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(StaffsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
