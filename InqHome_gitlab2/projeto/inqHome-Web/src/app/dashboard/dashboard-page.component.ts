import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent implements OnInit {

  loading = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  get usuario() {
    return this.authService.currentUser;
  }

}
