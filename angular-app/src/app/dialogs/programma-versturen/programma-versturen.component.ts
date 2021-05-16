import { Component } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-programma-versturen',
  templateUrl: './programma-versturen.component.html',
  styleUrls: ['./programma-versturen.component.scss']
})
export class ProgrammaVersturenComponent {
  isSending = false;

  constructor(
    private emailService: EmailService,
    private dialogRef: MatDialogRef<ProgrammaVersturenComponent>
  ) {}

  versturen(): void {
    this.isSending = true;

    this.emailService.ProgrammaVersturen().subscribe(() => {
      this.dialogRef.close();
    });
  }
}
