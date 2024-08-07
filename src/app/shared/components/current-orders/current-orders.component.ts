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
import { TitleCasePipe } from '@angular/common';
import { BeverageOrder } from '../../../features/models/beverage-order.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../core/auth.service';
import { TimesAgoPipe } from '../../pipes/times-ago.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatInputModule } from '@angular/material/input';

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
        TitleCasePipe,
        TimesAgoPipe,
        SpinnerComponent,
        MatInputModule,
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
    loading = true;

    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<BeverageOrder> = new MatTableDataSource<BeverageOrder>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
        this.checkRole();
        this.setUpTableColumn();
        this.getOrders();
        this.initializeOrderUpdates();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

    setUpTableColumn(): void {
        this.displayedColumns =
            this.role !== 'employee'
                ? [
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
                  ]
                : [
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
    }

    getOrders(): void {
        this.orderService
            .getCurrentOrders()
            .pipe(
                tap((orders: BeverageOrder[]) => {
                    this.dataSource.data = orders;
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

    initializeOrderUpdates(): void {
        this.orderService
            .getOrderUpdates()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.getOrders();
            });
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
                confirmButtonLabel: 'Yes',
                cancelButtonLabel: 'No',
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
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
