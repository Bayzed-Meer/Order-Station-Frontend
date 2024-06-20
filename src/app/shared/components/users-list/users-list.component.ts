import {
    AfterViewInit,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserDetails } from '../../models/user-details.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    standalone: true,
    imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule],
})
export class UsersListComponent implements AfterViewInit, OnChanges {
    displayedColumns: string[] = ['username', 'email', 'actions'];
    dataSource: MatTableDataSource<UserDetails> = new MatTableDataSource<UserDetails>();

    @Input() users: UserDetails[] = [];
    @Input() filter = '';
    @Output() editUserEvent = new EventEmitter<UserDetails>();
    @Output() deleteUserEvent = new EventEmitter<UserDetails>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private dialog: MatDialog) {}

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

    editUser(user: UserDetails) {
        this.editUserEvent.emit(user);
    }

    deleteUser(user: UserDetails) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: { message: 'Are you sure you want to delete this user?' },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'delete') {
                this.deleteUserEvent.emit(user);
            }
        });
    }
}

interface ConfirmDialogData {
    message: string;
}

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    template: `
        <h2 mat-dialog-title>Confirm</h2>
        <mat-dialog-content>{{ data.message }}</mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button [mat-dialog-close]="'cancel'" cdkFocusInitial>Cancel</button>
            <button mat-button [mat-dialog-close]="'delete'">Delete</button>
        </mat-dialog-actions>
    `,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class ConfirmDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    ) {}
}
