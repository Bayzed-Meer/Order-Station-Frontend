import { Routes } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
    {
        path: 'signin',
        loadComponent: () =>
            import('./features/auth/signin/signin.component').then((m) => m.SigninComponent),
    },
    {
        path: 'admin-dashboard',
        loadComponent: () =>
            import('./shared/components/navigation/navigation.component').then(
                (m) => m.NavigationComponent,
            ),
        canActivate: [() => inject(AuthService).isLoggedIn()],
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then(
                        (m) => m.DashboardComponent,
                    ),
            },
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
                    import('./shared/components/reset-password/reset-password.component').then(
                        (m) => m.ResetPasswordComponent,
                    ),
            },
            {
                path: 'employee',
                loadComponent: () =>
                    import('./features/admin/employee/employee.component').then(
                        (m) => m.EmployeesComponent,
                    ),
            },
        ],
    },
];
