import { Routes } from '@angular/router';
import { AuthService } from './core/auth.service';
import { inject } from '@angular/core';
import { SigninComponent } from './core/auth/signin/signin.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { ProfileComponent } from './shared/components/profile/profile.component';

const sharedRoutes: Routes = [
    {
        path: 'reset-password',
        loadComponent: () =>
            import('./shared/components/reset-password/reset-password.component').then(
                (m) => m.ResetPasswordComponent,
            ),
    },
    {
        path: 'current-orders',
        loadComponent: () =>
            import('./shared/components/current-orders/current-orders.component').then(
                (m) => m.CurrentOrdersComponent,
            ),
    },
    {
        path: 'order-history',
        loadComponent: () =>
            import('./shared/components/order-history/order-history.component').then(
                (m) => m.OrderHistoryComponent,
            ),
    },
];

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
            ...sharedRoutes,
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
                path: 'all-employees',
                loadComponent: () =>
                    import('./features/admin/employee/employee.component').then(
                        (m) => m.EmployeesComponent,
                    ),
            },
            {
                path: 'all-staffs',
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
            ...sharedRoutes,
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
                path: 'daily-check-in',
                loadComponent: () =>
                    import('./shared/components/daily-check-in/daily-check-in.component').then(
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
        ],
    },
    {
        path: 'staff',
        component: NavigationComponent,
        canActivate: [() => inject(AuthService).isLoggedIn()],
        children: [
            ...sharedRoutes,
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
                path: 'daily-check-in',
                loadComponent: () =>
                    import('./shared/components/daily-check-in/daily-check-in.component').then(
                        (m) => m.DailyCheckInComponent,
                    ),
            },
        ],
    },
];
