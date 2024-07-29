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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserProfile } from '../../../features/models/user-profile.model';
import { TitleCasePipe } from '@angular/common';

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
        TitleCasePipe,
    ],
})
export class UsersListComponent implements AfterViewInit, OnChanges {
    private dialog = inject(MatDialog);

    displayedColumns: string[] = [
        'username',
        'id',
        'email',
        'contactNumber',
        'SBU',
        'jobTitle',
        'actions',
    ];
    dataSource: MatTableDataSource<UserProfile> = new MatTableDataSource<UserProfile>();

    @Input() users: UserProfile[] = [];
    @Input() filter = '';
    @Output() deleteUserEvent = new EventEmitter<UserProfile>();

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

    deleteUser(user: UserProfile): void {
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
