import { Component, Inject, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
    constructor(
        @Optional() public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    ) {}
}
interface ConfirmDialogData {
    message: string;
}
