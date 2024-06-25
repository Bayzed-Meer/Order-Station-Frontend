import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserDetails } from '../../employee/models/user-details.model';
import { AdminService } from '../admin.service';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StaffsListComponent } from './staffs-list/staffs-list.component';
import { StaffsCardComponent } from './staffs-card/staffs-card.component';
import { MatDialog } from '@angular/material/dialog';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';

@Component({
    selector: 'app-staff',
    standalone: true,
    imports: [
        MatFormFieldModule,
        StaffsListComponent,
        MatInputModule,
        StaffsCardComponent,
        MatIconModule,
    ],
    templateUrl: './staff.component.html',
    styleUrl: './staff.component.scss',
})
export class StaffComponent implements OnInit {
    private adminService = inject(AdminService);
    private destroyRef = inject(DestroyRef);
    private dialog = inject(MatDialog);

    filter = '';
    isListView = false;
    staffs: UserDetails[] = [];

    ngOnInit(): void {
        this.loadAllstaffs();
    }

    loadAllstaffs(): void {
        this.adminService
            .getAllStaffs()
            .pipe(
                tap((users) => (this.staffs = users)),
                catchError((error) => {
                    console.log('Error fetching staffs', error);
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
            .deleteStaff(user.id)
            .pipe(
                tap((response) => {
                    this.loadAllstaffs();
                    showMessageDialog(this.dialog, response.message, 'close');

                    console.log('Staff deletion successful');
                }),
                catchError((error) => {
                    console.log('Error deleting staff', error);
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
