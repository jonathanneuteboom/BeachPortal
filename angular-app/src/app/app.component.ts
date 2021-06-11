import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MatDrawer } from '@angular/material/sidenav';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') sidenav: MatDrawer;

  title: string;

  links = [
    {
      label: 'MyBeach',
      link: '/my-beach',
      icon: 'home'
    },
    {
      label: 'Algemene informatie',
      link: '/algemene-informatie',
      icon: 'info'
    },
    {
      label: 'Speelrondes',
      link: '/speelrondes',
      icon: 'history'
    }
  ];

  background = 'primary';
  loginDialogRef: MatDialogRef<LoginComponent>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let link = this.links.find((link) => link.link === event.url);
        link = link ?? this.links[0];
        this.title = link.label;
      }
    });

    this.userService.unauthorized.subscribe((isUnauthorized) => {
      if (this.loginDialogRef) {
        return;
      }

      if (isUnauthorized) {
        const config = new MatDialogConfig();
        config.width = '400px';
        config.disableClose = true;
        this.loginDialogRef = this.dialog.open(LoginComponent, config);

        this.loginDialogRef
          .afterClosed()
          .subscribe(() => window.location.reload());
      }
    });

    this.userService.getCurrentUser().subscribe((user) => {
      if (user.role === 'Admin') {
        const link = this.links.find((link) => link.link === '/management');
        if (link) return;

        this.links.push({
          label: 'Management',
          link: '/management',
          icon: 'admin_panel_settings'
        });
      }
    });
  }

  onScroll(event: any): void {
    const initialOffset = 300;
    const scrollSpeed = 1500;
    const newY =
      initialOffset +
      scrollSpeed * (event.target.scrollTop / event.target.scrollHeight);
    document.body.style.backgroundPositionY = `-${newY}px`;
  }

  selected(link: any): void {
    this.title = link.label;
    this.sidenav.close();
  }
}
