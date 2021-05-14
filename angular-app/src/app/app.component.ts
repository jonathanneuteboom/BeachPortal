import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BeachPortal';
  links = [
    {
      label: 'Management',
      link: 'management'
    },
    {
      label: 'MyBeach',
      link: 'my-beach'
    },
    {
      label: 'Speelrondes',
      link: 'speelrondes'
    },
    {
      label: 'Algemene informatie',
      link: 'algemene-informatie'
    }
  ];

  background = 'primary';
  activeLink = this.links[0];

  constructor(userService: UserService, dialog: MatDialog) {
    userService.unauthorized.subscribe((isUnauthorized) => {
      if (isUnauthorized) {
        const config = new MatDialogConfig();
        config.width = '400px';
        const dialogRef = dialog.open(LoginComponent, config);

        dialogRef.afterClosed().subscribe(() => window.location.reload());
      }
    });
  }
}
