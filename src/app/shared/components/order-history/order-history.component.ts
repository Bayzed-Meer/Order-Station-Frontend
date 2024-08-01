import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { BeverageOrder } from '../../../features/models/beverage-order.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../core/auth.service';
import { TimesAgoPipe } from '../../pipes/times-ago.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-order-history',
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
        TimesAgoPipe,
        SpinnerComponent,
        MatInputModule,
    ],
    templateUrl: './order-history.component.html',
    styleUrl: './order-history.component.scss',
})
export class OrderHistoryComponent implements AfterViewInit, OnInit {
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
        this.getOderHistory();
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
                  ];
    }

    getOderHistory(): void {
        this.orderService
            .getOrderHistory()
            .pipe(
                tap((orders: BeverageOrder[]) => {
                    this.dataSource.data = orders;
                    this.loading = false;
                }),
                catchError((error) => {
                    this.loading = false;
                    console.log(error);
                    return of([]);
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
