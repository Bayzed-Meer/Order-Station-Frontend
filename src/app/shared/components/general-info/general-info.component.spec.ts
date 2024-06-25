import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoComponent } from './general-info.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('GeneralInfoComponent', () => {
    let component: GeneralInfoComponent;
    let fixture: ComponentFixture<GeneralInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GeneralInfoComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(GeneralInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
