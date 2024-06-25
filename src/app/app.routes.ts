import { Routes } from '@angular/router';
import { AuthService } from './core/auth.service';
import { inject } from '@angular/core';
import { SigninComponent } from './core/auth/signin/signin.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { ProfileComponent } from './shared/components/profile/profile.component';

export const routes: Routes = [
    {
        path: 'signin',
        component: SigninComponent,
    },
    {
        path: 'dashboard',
        component: NavigationComponent,
        canActivate: [() => inject(AuthService).isLoggedIn()],
        children: [
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full',
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'admin-dashboard',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then(
                        (m) => m.DashboardComponent,
                    ),
            },
            {
                path: 'signup',
                loadComponent: () =>
                    import('./core/auth/signup/signup.component').then((m) => m.SignupComponent),
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
            {
                path: 'staff',
                loadComponent: () =>
                    import('./features/admin/staff/staff.component').then((m) => m.StaffComponent),
            },
        ],
    },
];
