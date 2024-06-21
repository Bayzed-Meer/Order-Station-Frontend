import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeesListComponent } from '../employee/employees-list/employees-list.component';
import { MatInputModule } from '@angular/material/input';
import { EmployeesCardComponent } from './employees-card/employees-card.component';
import { MatIconModule } from '@angular/material/icon';
import { UserDetails } from '../../../shared/models/user-details.model';
import { AdminService } from '../admin.service';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-employees',
    standalone: true,
    imports: [
        MatFormFieldModule,
        EmployeesListComponent,
        MatInputModule,
        EmployeesCardComponent,
        MatIconModule,
    ],
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.scss',
})
export class EmployeesComponent implements OnInit {
    private adminService = inject(AdminService);
    private destroyRef = inject(DestroyRef);

    filter = '';
    isListView = false;
    employees: UserDetails[] = [];

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

    applyFilter(event: Event) {
        this.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    }

    toggleView() {
        this.isListView = !this.isListView;
    }
}
