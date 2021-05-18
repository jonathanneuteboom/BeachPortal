import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() data: any;

  isSpinnerEnabled = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.unauthorized.subscribe(
      () => (this.isSpinnerEnabled = false)
    );
  }
}
