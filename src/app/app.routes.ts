import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'signup',
        loadComponent: () =>
            import('./features/auth/signup/signup.component').then((m) => m.SignupComponent),
    },
    {
        path: 'signin',
        loadComponent: () =>
            import('./features/auth/signin/signin.component').then((m) => m.SigninComponent),
    },
];
