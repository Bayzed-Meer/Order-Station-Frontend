import { Component } from '@angular/core';
import { MealSummaryComponent } from '../meal-summary/meal-summary.component';
import { BeverageSummaryComponent } from '../beverage-summary/beverage-summary.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: true,
    imports: [MealSummaryComponent, BeverageSummaryComponent, MatIconModule],
})
export class DashboardComponent {}
