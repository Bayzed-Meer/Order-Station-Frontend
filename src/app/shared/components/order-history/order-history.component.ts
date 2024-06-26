import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { BeverageOrder } from '../../../features/models/beverage-order.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../core/auth.service';

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
        CommonModule,
    ],
    templateUrl: './order-history.component.html',
    styleUrl: './order-history.component.scss',
})
export class OrderHistoryComponent implements AfterViewInit, OnInit {
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
    ];
    dataSource: MatTableDataSource<BeverageOrder> = new MatTableDataSource<BeverageOrder>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
        this.checkRole();
        this.getOderHistory();
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

    getOderHistory(): void {
        this.orderService
            .getOrderHistory()
            .pipe(
                tap((orders: BeverageOrder[]) => {
                    this.dataSource.data = orders;
                }),
                catchError((error) => {
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
