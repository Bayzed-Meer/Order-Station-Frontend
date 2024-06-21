import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../models/confirm-dialog-data';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
    dialogRef = inject(MatDialogRef<ConfirmDialogComponent>, { optional: true });
    data: ConfirmDialogData = inject(MAT_DIALOG_DATA);
}
