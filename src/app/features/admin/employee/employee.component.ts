import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeesListComponent } from '../employee/employees-list/employees-list.component';
import { MatInputModule } from '@angular/material/input';
import { EmployeesCardComponent } from './employees-card/employees-card.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../admin.service';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { UserProfile } from '../../models/user-profile.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-employees',
    standalone: true,
    imports: [
        MatFormFieldModule,
        EmployeesListComponent,
        MatInputModule,
        EmployeesCardComponent,
        MatIconModule,
        CommonModule,
    ],
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.scss',
})
export class EmployeesComponent implements OnInit {
    private adminService = inject(AdminService);
    private destroyRef = inject(DestroyRef);
    private dialog = inject(MatDialog);

    filter = '';
    isListView = false;
    employees: UserProfile[] = [];

    ngOnInit(): void {
        this.loadAllEmployees();
    }

    loadAllEmployees(): void {
        this.adminService
            .getAllEmployees()
            .pipe(
                tap((users) => {
                    this.employees = users;
                }),
                catchError((error) => {
                    console.log('Error fetching employees', error);
                    return of([]);
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    handleDeleteUser(user: UserProfile): void {
        this.adminService
            .deleteEmployee(user.id)
            .pipe(
                tap((response) => {
                    this.loadAllEmployees();
                    showMessageDialog(this.dialog, response.message, 'close');
                    console.log('Employee deletion successful');
                }),
                catchError((error) => {
                    console.log('Error deleting employee', error);
                    showMessageDialog(this.dialog, error.error.message, 'close');
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
