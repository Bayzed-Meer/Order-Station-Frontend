import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';
import { MessageDialogData } from '../models/message-dialog-data';

export function showMessageDialog(dialog: MatDialog, message: string, buttonLabel: string) {
    const dialogData: MessageDialogData = {
        message,
        buttonLabel,
    };

    dialog.open(MessageDialogComponent, {
        data: dialogData,
    });
}
