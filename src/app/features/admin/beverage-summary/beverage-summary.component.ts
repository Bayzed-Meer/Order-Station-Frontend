import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BeverageSummary } from '../../models/beverage-summary.model';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-beverage-summary',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './beverage-summary.component.html',
    styleUrl: './beverage-summary.component.scss',
})
export class BeverageSummaryComponent implements OnInit {
    private adminService = inject(AdminService);

    beverageSummary$!: Observable<BeverageSummary>;

    ngOnInit(): void {
        this.beverageSummary$ = this.adminService.getbeverageSummary();
    }
}
