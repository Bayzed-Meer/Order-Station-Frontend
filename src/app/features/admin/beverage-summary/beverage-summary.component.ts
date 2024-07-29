import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { BeverageSummary } from '../../models/beverage-summary.model';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
    selector: 'app-beverage-summary',
    standalone: true,
    imports: [
        MatCardModule,
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        SpinnerComponent,
    ],
    templateUrl: './beverage-summary.component.html',
    styleUrl: './beverage-summary.component.scss',
})
export class BeverageSummaryComponent implements OnInit, AfterViewInit {
    private adminService = inject(AdminService);
    private dialog = inject(MatDialog);
    private destroyRef = inject(DestroyRef);

    loading = true;

    displayedColumns: string[] = ['date', 'completedOrders', 'cancelledOrders'];

    dataSource: MatTableDataSource<BeverageSummary> = new MatTableDataSource<BeverageSummary>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
        this.adminService
            .getbeverageSummary()
            .pipe(
                tap((summary: BeverageSummary[]) => {
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

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
