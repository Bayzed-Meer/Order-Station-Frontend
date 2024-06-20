import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { UsersListComponent } from '../../../../shared/components/users-list/users-list.component';
import { UserDetails } from '../../../../shared/models/user-details.model';
import { AdminService } from '../../admin.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';

@Component({
    selector: 'app-employees-list',
    standalone: true,
    imports: [UsersListComponent],
    templateUrl: './employees-list.component.html',
    styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent implements OnInit {
    employees: UserDetails[] = [];
    @Input() filter = '';

    constructor(
        private adminService: AdminService,
        private destroyRef: DestroyRef,
    ) {}

    ngOnInit(): void {
        this.loadAllEmployees();
    }

    loadAllEmployees(): void {
        this.adminService
            .getAllEmployees()
            .pipe(
                tap((users) => (this.employees = users)),
                catchError((error) => {
                    console.log('Error fetching employees', error);
                    return of([]);
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    handleEditUser(user: UserDetails): void {
        console.log('Editing user:', user);
    }

    handleDeleteUser(user: UserDetails): void {
        this.adminService
            .deleteEmployee(user.id)
            .pipe(
                tap(() => {
                    this.loadAllEmployees();
                    console.log('Employee deletion successful');
                }),
                catchError((error) => {
                    console.log('Error deleting employee', error);
                    return of(null);
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }
}
