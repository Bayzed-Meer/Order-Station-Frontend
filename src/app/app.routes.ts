import { Routes } from '@angular/router';
import { AuthService } from './core/auth.service';
import { inject } from '@angular/core';
import { SigninComponent } from './core/auth/signin/signin.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { ProfileComponent } from './features/employee/profile/profile.component';

export const routes: Routes = [
    {
        path: 'signin',
        component: SigninComponent,
    },
    {
        path: 'admin',
        component: NavigationComponent,
        canActivate: [() => inject(AuthService).isLoggedIn()],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
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
    {
        path: 'employee',
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
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/admin/dashboard/dashboard.component').then(
                        (m) => m.DashboardComponent,
                    ),
            },
            {
                path: 'daily-check-in',
                loadComponent: () =>
                    import('./features/employee/daily-check-in/daily-check-in.component').then(
                        (m) => m.DailyCheckInComponent,
                    ),
            },
            {
                path: 'beverage-order',
                loadComponent: () =>
                    import('./features/employee/beverage-order/beverage-order.component').then(
                        (m) => m.BeverageOrderComponent,
                    ),
            },
            {
                path: 'order-status',
                loadComponent: () =>
                    import('./features/employee/order-status/order-status.component').then(
                        (m) => m.OrderStatusComponent,
                    ),
            },
            {
                path: 'reset-password',
                loadComponent: () =>
                    import('./shared/components/reset-password/reset-password.component').then(
                        (m) => m.ResetPasswordComponent,
                    ),
            },
        ],
    },
];
