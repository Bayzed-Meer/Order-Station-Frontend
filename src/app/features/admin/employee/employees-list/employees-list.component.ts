import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListComponent } from '../../../../shared/components/users-list/users-list.component';
import { UserDetails } from '../../../models/user-details.model';

@Component({
    selector: 'app-employees-list',
    standalone: true,
    imports: [UsersListComponent],
    templateUrl: './employees-list.component.html',
    styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
    @Input() filter = '';
    @Input() users: UserDetails[] = [];
    @Output() deleteUserEvent = new EventEmitter<UserDetails>();
}
