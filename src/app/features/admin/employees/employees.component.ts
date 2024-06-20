import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeesListComponent } from '../employees/employees-list/employees-list.component';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-employees',
    standalone: true,
    imports: [MatFormFieldModule, EmployeesListComponent, MatInputModule],
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
    filter = '';

    applyFilter(event: Event) {
        this.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    }
}
