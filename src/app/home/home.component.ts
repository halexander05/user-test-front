import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private serviceAuth: AuthService) {}

  ngOnInit(): void {}

  isAuthenticated() {
    return this.serviceAuth.isAuthenticated();
  }
}
