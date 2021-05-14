import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { UserService } from '../services/user.service';

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
    private snackbar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private teamService: TeamService
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
      this.snackbar.open('Supply credentials', 'ERROR', this.config);
      return;
    }

    this.userService.login(username, password).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackbar.open(error.error.message, 'ERROR', this.config);
      }
    });
  }
}
