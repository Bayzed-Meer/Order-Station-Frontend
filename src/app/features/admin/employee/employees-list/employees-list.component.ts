import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListComponent } from '../../../../shared/components/users-list/users-list.component';
import { UserProfile } from '../../../models/user-profile.model';

@Component({
    selector: 'app-employees-list',
    standalone: true,
    imports: [UsersListComponent],
    templateUrl: './employees-list.component.html',
    styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
    @Input() filter = '';
    @Input() users: UserProfile[] = [];
    @Output() deleteUserEvent = new EventEmitter<UserProfile>();
}
