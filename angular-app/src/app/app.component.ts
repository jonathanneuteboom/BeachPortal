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
      icon: 'home',
      isVisible: true
    },
    {
      label: 'Algemene informatie',
      link: '/algemene-informatie',
      icon: 'info',
      isVisible: true
    },
    {
      label: 'Speelrondes',
      link: '/speelrondes',
      icon: 'history',
      isVisible: true
    },
    {
      label: 'Management',
      link: '/management',
      icon: 'admin_panel_settings',
      isVisible: false
    }
  ];

  background = 'primary';
  activeLink = this.links[0];
  loginDialogRef: MatDialogRef<LoginComponent>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') return;

        const link = this.links.find((link) => link.link === event.url);
        this.title = link.label;
      }
    });
    this.title = this.activeLink.label;

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
        link.isVisible = true;
      }
    });
  }

  onScroll(event: any): void {
    const initialOffset = 300;
    const scrollSpeed = 1200;
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
