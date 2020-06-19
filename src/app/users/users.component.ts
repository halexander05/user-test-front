import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userEmail = null;
  userName = null;

  constructor(private serviceAuth: AuthService) { }

  ngOnInit(): void {
    const userData = this.serviceAuth.getUserDataSession();
    this.userName = userData.username;
    this.userEmail = userData.email;
  }

}
