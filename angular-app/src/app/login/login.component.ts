import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  config: MatSnackBarConfig<any>;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [],
      password: []
    });
  }

  login(): void {
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;

    if (!username || !password) {
      return;
    }

    this.userService.login(username, password).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/']);
      }
    });
  }

  forgotPassword(): void {
    window.open(environment.forgotPasswordUrl, '_blank');
  }
}
