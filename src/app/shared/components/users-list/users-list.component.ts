import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
    inject,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserDetails } from '../../models/user-details.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    standalone: true,
    imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        ConfirmDialogComponent,
    ],
})
export class UsersListComponent implements AfterViewInit, OnChanges {
    private dialog = inject(MatDialog);

    displayedColumns: string[] = ['username', 'id', 'email', 'actions'];
    dataSource: MatTableDataSource<UserDetails> = new MatTableDataSource<UserDetails>();

    @Input() users: UserDetails[] = [];
    @Input() filter = '';
    @Output() editUserEvent = new EventEmitter<UserDetails>();
    @Output() deleteUserEvent = new EventEmitter<UserDetails>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['users']) {
            this.dataSource.data = this.users;
        }
        if (changes['filter']) {
            this.applyFilter();
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter() {
        this.dataSource.filter = this.filter;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editUser(user: UserDetails): void {
        this.editUserEvent.emit(user);
    }

    deleteUser(user: UserDetails): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                message: 'Are you sure you want to delete this user?',
                confirmButtonLabel: 'Delete',
                cancelButtonLabel: 'Cancel',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirm') {
                this.deleteUserEvent.emit(user);
            }
        });
    }
}
