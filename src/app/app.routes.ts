import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'signin',
        loadComponent: () =>
            import('./features/auth/signin/signin.component').then((m) => m.SigninComponent),
    },
    {
        path: 'admin/dashboard',
        loadComponent: () =>
            import('./shared/navigation/navigation.component').then((m) => m.NavigationComponent),
        children: [
            {
                path: 'signup',
                loadComponent: () =>
                    import('./features/auth/signup/signup.component').then(
                        (m) => m.SignupComponent,
                    ),
            },
            {
                path: 'reset-password',
                loadComponent: () =>
                    import('./shared/reset-password/reset-password.component').then(
                        (m) => m.ResetPasswordComponent,
                    ),
            },
        ],
    },
];
