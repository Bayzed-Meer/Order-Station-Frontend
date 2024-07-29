import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogData } from '../../models/message-dialog-data';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-message-dialog',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatIconModule],
    templateUrl: './message-dialog.component.html',
    styleUrl: './message-dialog.component.scss',
})
export class MessageDialogComponent {
    ddialogRef = inject(MatDialogRef<MessageDialogComponent>, { optional: true });
    data: MessageDialogData = inject(MAT_DIALOG_DATA);
}
