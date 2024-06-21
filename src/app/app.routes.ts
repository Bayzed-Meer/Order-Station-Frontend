import { Routes } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { inject } from '@angular/core';
import { SigninComponent } from './features/auth/signin/signin.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';

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
                redirectTo: 'admin-dashboard',
                pathMatch: 'full',
            },
            {
                path: 'admin-dashboard',
                component: DashboardComponent,
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
            {
                path: 'staff',
                loadComponent: () =>
                    import('./features/admin/staff/staff.component').then((m) => m.StaffComponent),
            },
        ],
    },
];
