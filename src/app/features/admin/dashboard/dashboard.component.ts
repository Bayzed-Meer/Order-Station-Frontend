import { Component } from '@angular/core';
import { MealSummaryComponent } from '../meal-summary/meal-summary.component';
import { BeverageSummaryComponent } from '../beverage-summary/beverage-summary.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: true,
    imports: [MealSummaryComponent, BeverageSummaryComponent],
})
export class DashboardComponent {}
