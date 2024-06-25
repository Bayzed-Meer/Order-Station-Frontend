import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePictureComponent } from './profile-picture.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProfilePictureComponent', () => {
    let component: ProfilePictureComponent;
    let fixture: ComponentFixture<ProfilePictureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfilePictureComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilePictureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
