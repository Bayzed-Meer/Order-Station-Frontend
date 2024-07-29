import {
    Component,
    EventEmitter,
    Input,
    Output,
    SimpleChanges,
    inject,
    OnChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../features/models/user-profile.model';
import { environment } from '../../../../environments/environment';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
    selector: 'app-users-card',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        ConfirmDialogComponent,
        CommonModule,
        SpinnerComponent,
    ],
    templateUrl: './users-card.component.html',
    styleUrl: './users-card.component.scss',
})
export class UsersCardComponent implements OnChanges {
    private dialog = inject(MatDialog);
    @Input() users: UserProfile[] = [];
    @Input() filter = '';
    @Output() deleteUserEvent = new EventEmitter<UserProfile>();

    apiUrl = environment.apiUrl;
    loading = true;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['users']) {
            this.loading = !this.users || this.users.length === 0;
        }
    }

    get filteredUsers(): UserProfile[] {
        return this.users.filter(
            (user) =>
                user.username.toLowerCase().includes(this.filter) ||
                user.email.toLowerCase().includes(this.filter) ||
                user.id.toLowerCase().includes(this.filter) ||
                user.contactNumber.toLowerCase().includes(this.filter) ||
                user.SBU.toLowerCase().includes(this.filter) ||
                user.jobTitle.toLowerCase().includes(this.filter),
        );
    }

    deleteUser(user: UserProfile): void {
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
