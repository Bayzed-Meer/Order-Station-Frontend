import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersCardComponent } from '../../../../shared/components/users-card/users-card.component';
import { UserDetails } from '../../../../shared/models/user-details.model';

@Component({
    selector: 'app-staffs-card',
    standalone: true,
    imports: [UsersCardComponent],
    templateUrl: './staffs-card.component.html',
    styleUrl: './staffs-card.component.scss',
})
export class StaffsCardComponent {
    @Input() filter = '';
    @Input() users: UserDetails[] = [];
    @Output() editUserEvent = new EventEmitter<UserDetails>();
    @Output() deleteUserEvent = new EventEmitter<UserDetails>();
}
