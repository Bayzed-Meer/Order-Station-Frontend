import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersCardComponent } from '../../../../shared/components/users-card/users-card.component';
import { UserProfile } from '../../../models/user-profile.model';

@Component({
    selector: 'app-employees-card',
    standalone: true,
    imports: [UsersCardComponent],
    templateUrl: './employees-card.component.html',
    styleUrl: './employees-card.component.scss',
})
export class EmployeesCardComponent {
    @Input() filter = '';
    @Input() users: UserProfile[] = [];
    @Output() deleteUserEvent = new EventEmitter<UserProfile>();
}
