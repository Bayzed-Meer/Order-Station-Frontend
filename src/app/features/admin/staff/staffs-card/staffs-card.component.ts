import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersCardComponent } from '../../../../shared/components/users-card/users-card.component';
import { UserProfile } from '../../../models/user-profile.model';

@Component({
    selector: 'app-staffs-card',
    standalone: true,
    imports: [UsersCardComponent],
    templateUrl: './staffs-card.component.html',
    styleUrl: './staffs-card.component.scss',
})
export class StaffsCardComponent {
    @Input() filter = '';
    @Input() users: UserProfile[] = [];
    @Output() deleteUserEvent = new EventEmitter<UserProfile>();
}
