import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListComponent } from '../../../../shared/components/users-list/users-list.component';
import { UserDetails } from '../../../models/user-details.model';

@Component({
    selector: 'app-staffs-list',
    standalone: true,
    imports: [UsersListComponent],
    templateUrl: './staffs-list.component.html',
    styleUrl: './staffs-list.component.scss',
})
export class StaffsListComponent {
    @Input() filter = '';
    @Input() users: UserDetails[] = [];
    @Output() deleteUserEvent = new EventEmitter<UserDetails>();
}
