import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { MealSummary } from '../../models/meal-summary.model';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-meal-summary',
    standalone: true,
    imports: [MatCardModule, CommonModule],
    templateUrl: './meal-summary.component.html',
    styleUrl: './meal-summary.component.scss',
})
export class MealSummaryComponent implements OnInit {
    private adminService = inject(AdminService);

    mealSummary$!: Observable<MealSummary>;

    ngOnInit(): void {
        this.mealSummary$ = this.adminService.getMealSummary();
    }
}
