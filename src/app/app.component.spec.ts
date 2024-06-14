import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([
                    {
                        path: 'signup',
                        loadComponent: () =>
                            import('./features/auth/signup/signup.component').then(
                                (m) => m.SignupComponent,
                            ),
                    },
                    {
                        path: 'signin',
                        loadComponent: () =>
                            import('./features/auth/signin/signin.component').then(
                                (m) => m.SigninComponent,
                            ),
                    },
                ]),
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
