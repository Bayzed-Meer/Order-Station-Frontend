import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserDetails } from '../../../shared/models/user-details.model';
import { AdminService } from '../admin.service';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StaffsListComponent } from './staffs-list/staffs-list.component';
import { StaffsCardComponent } from './staffs-card/staffs-card.component';

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
    filter = '';
    isListView = false;
    staffs: UserDetails[] = [];

    constructor(
        private adminService: AdminService,
        private destroyRef: DestroyRef,
    ) {}

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
                tap(() => {
                    this.loadAllstaffs();
                    console.log('Staff deletion successful');
                }),
                catchError((error) => {
                    console.log('Error deleting staff', error);
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
