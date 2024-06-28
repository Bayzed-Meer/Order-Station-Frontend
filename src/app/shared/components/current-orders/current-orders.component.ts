import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { catchError, of, tap } from 'rxjs';
import { showMessageDialog } from '../../../shared/utils/dialog-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { BeverageOrder } from '../../../features/models/beverage-order.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../core/auth.service';

@Component({
    selector: 'app-current-orders',
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
    templateUrl: './current-orders.component.html',
    styleUrl: './current-orders.component.scss',
})
export class CurrentOrdersComponent implements AfterViewInit, OnInit {
    private dialog = inject(MatDialog);
    private orderService = inject(OrderService);
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);

    role = '';

    displayedColumns: string[] = [
        'username',
        'id',
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
        this.checkRole();
        this.getOrders();
    }

    checkRole(): void {
        this.authService
            .getRole()
            .pipe(
                tap((role) => (this.role = role)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    getOrders(): void {
        this.orderService
            .getCurrentOrders()
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

    approveOrder(id: string): void {
        this.orderService
            .aprroveOrder(id)
            .pipe(
                tap(() => {
                    this.getOrders();
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

    completeOrder(id: string): void {
        this.orderService
            .completeOrder(id)
            .pipe(
                tap(() => {
                    this.getOrders();
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

    cancelOrder(id: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                message: 'Are you sure you want to cancel this order?',
                confirmButtonLabel: 'Cancel',
                cancelButtonLabel: 'Close',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirm') {
                this.orderService
                    .cancelOrder(id, this.role)
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
