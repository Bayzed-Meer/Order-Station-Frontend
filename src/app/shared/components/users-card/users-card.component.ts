import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDetails } from '../../models/user-details.model';
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
    @Input() users: UserDetails[] = [];
    @Input() filter = '';
    @Output() editUserEvent = new EventEmitter<UserDetails>();
    @Output() deleteUserEvent = new EventEmitter<UserDetails>();

    constructor(private dialog: MatDialog) {}

    get filteredUsers(): UserDetails[] {
        return this.users.filter(
            (user) =>
                user.username.toLowerCase().includes(this.filter) ||
                user.email.toLowerCase().includes(this.filter),
        );
    }

    editUser(user: UserDetails) {
        this.editUserEvent.emit(user);
    }

    deleteUser(user: UserDetails) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: { message: 'Are you sure you want to delete this user?' },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'delete') {
                this.deleteUserEvent.emit(user);
            }
        });
    }
}
