import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserDetails } from '../../../features/employee/models/user-details.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-users-card',
    standalone: true,
    imports: [MatCardModule, MatIconModule, MatButtonModule, ConfirmDialogComponent],
    templateUrl: './users-card.component.html',
    styleUrl: './users-card.component.scss',
})
export class UsersCardComponent {
    private dialog = inject(MatDialog);
    @Input() users: UserDetails[] = [];
    @Input() filter = '';
    @Output() editUserEvent = new EventEmitter<UserDetails>();
    @Output() deleteUserEvent = new EventEmitter<UserDetails>();

    get filteredUsers(): UserDetails[] {
        return this.users.filter(
            (user) =>
                user.username.toLowerCase().includes(this.filter) ||
                user.email.toLowerCase().includes(this.filter),
        );
    }

    editUser(user: UserDetails): void {
        this.editUserEvent.emit(user);
    }

    deleteUser(user: UserDetails): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                message: 'Are you sure you want to delete this user?',
                confirmButtonLabel: 'Delete',
                cancelButtonLabel: 'Cancel',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirm') {
                this.deleteUserEvent.emit(user);
            }
        });
    }
}
