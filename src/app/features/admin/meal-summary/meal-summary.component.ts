import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { MealSummary } from '../../models/meal-summary.model';
import { catchError, of, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-meal-summary',
    standalone: true,
    imports: [
        MatCardModule,
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
    ],
    templateUrl: './meal-summary.component.html',
    styleUrl: './meal-summary.component.scss',
})
export class MealSummaryComponent implements OnInit, AfterViewInit {
    private adminService = inject(AdminService);
    private dialog = inject(MatDialog);
    private destroyRef = inject(DestroyRef);

    dataSource: MatTableDataSource<MealSummary> = new MatTableDataSource<MealSummary>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = [
        'date',
        'mirpurDietCount',
        'mirpurRegularCount',
        'mohakhaliDietCount',
        'mohakhaliRegularCount',
        'totalDiet',
        'totalRegular',
        'total',
    ];

    ngOnInit(): void {
        this.adminService
            .getMealSummary()
            .pipe(
                tap((summary: MealSummary[]) => {
                    this.dataSource.data = summary;
                }),
                catchError((error) => {
                    showMessageDialog(this.dialog, error.error.message, 'close');
                    console.log(error);
                    return of([]);
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
