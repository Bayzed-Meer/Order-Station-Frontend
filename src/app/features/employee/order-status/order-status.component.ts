import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { BeverageOrder } from '../../models/beverage-order.model';
import { OrderService } from '../../services/order.service';
import { catchError, of, tap } from 'rxjs';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-order-status',
    standalone: true,
    imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        ConfirmDialogComponent,
        DatePipe,
        TitleCasePipe,
        CommonModule,
    ],
    templateUrl: './order-status.component.html',
    styleUrl: './order-status.component.scss',
})
export class OrderStatusComponent implements AfterViewInit, OnInit {
    private dialog = inject(MatDialog);
    private orderService = inject(OrderService);
    private destroyRef = inject(DestroyRef);

    displayedColumns: string[] = [
        'teaQuantity',
        'teaAmount',
        'coffeeQuantity',
        'coffeeAmount',
        'notes',
        'roomNumber',
        'createdAt',
        'orderStatus',
        'actions',
    ];
    dataSource: MatTableDataSource<BeverageOrder> = new MatTableDataSource<BeverageOrder>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
        this.getOrders();
    }

    getOrders(): void {
        this.orderService
            .getOrders()
            .pipe(
                tap((orders: BeverageOrder[]) => {
                    this.dataSource.data = orders;
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

    deleteOrder(id: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                message: 'Are you sure you want to delete this order?',
                confirmButtonLabel: 'Delete',
                cancelButtonLabel: 'Close',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirm') {
                this.orderService
                    .deleteOrder(id)
                    .pipe(
                        tap((response) => {
                            this.getOrders();
                            showMessageDialog(this.dialog, response.message, 'close');
                        }),
                        catchError((error) => {
                            showMessageDialog(this.dialog, error.error.message, 'close');
                            console.log(error);
                            return of(error);
                        }),
                        takeUntilDestroyed(this.destroyRef),
                    )
                    .subscribe();
            }
        });
    }
}
