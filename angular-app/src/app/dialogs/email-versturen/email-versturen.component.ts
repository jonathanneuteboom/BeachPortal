import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-versturen',
  templateUrl: './email-versturen.component.html',
  styleUrls: ['./email-versturen.component.scss']
})
export class EmailVersturenComponent {
  isSending = false;

  constructor(private dialogRef: MatDialogRef<EmailVersturenComponent>) {}

  versturen(): void {
    this.isSending = true;

    this.dialogRef.close(true);
  }
}
