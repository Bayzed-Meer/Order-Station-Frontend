import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { MealSummary } from '../../models/meal-summary.model';
import { catchError, of, tap } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-meal-summary',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        SpinnerComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatButtonModule,
        MatInputModule,
    ],
    providers: [provideNativeDateAdapter(), DatePipe],
    templateUrl: './meal-summary.component.html',
    styleUrl: './meal-summary.component.scss',
})
export class MealSummaryComponent implements OnInit, AfterViewInit {
    private adminService = inject(AdminService);
    private dialog = inject(MatDialog);
    private destroyRef = inject(DestroyRef);
    private datePipe = inject(DatePipe);

    loading = false;

    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });

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
        this.initializeForm();
        this.fetchMealSummary();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    initializeForm(): void {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6);

        this.range.setValue({
            start: sevenDaysAgo,
            end: today,
        });
    }

    fetchMealSummary(): void {
        const startDate = this.range.get('start')?.value;

        const endDate = this.range.get('end')?.value;
        if (startDate && endDate) {
            this.loading = true;
            this.adminService
                .getMealSummary(startDate, endDate)
                .pipe(
                    tap((summary: MealSummary[]) => {
                        summary.forEach((item) => {
                            item.date = this.datePipe.transform(
                                new Date(item.date),
                                'd MMMM, yyyy',
                            )!;
                        });
                        this.dataSource.data = summary;
                        this.loading = false;
                    }),
                    catchError((error) => {
                        showMessageDialog(this.dialog, error.error.message, 'close');
                        console.log(error);
                        this.loading = false;
                        return of([]);
                    }),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
