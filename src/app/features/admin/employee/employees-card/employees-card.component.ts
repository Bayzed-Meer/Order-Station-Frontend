import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersCardComponent } from '../../../../shared/components/users-card/users-card.component';
import { UserDetails } from '../../../../shared/models/user-details.model';

@Component({
    selector: 'app-employees-card',
    standalone: true,
    imports: [UsersCardComponent],
    templateUrl: './employees-card.component.html',
    styleUrl: './employees-card.component.scss',
})
export class EmployeesCardComponent {
    @Input() filter = '';
    @Input() users: UserDetails[] = [];
    @Output() editUserEvent = new EventEmitter<UserDetails>();
    @Output() deleteUserEvent = new EventEmitter<UserDetails>();
}
