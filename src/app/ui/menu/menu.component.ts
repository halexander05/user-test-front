import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { MessagesService } from '../../providers/messages.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  lang = null;

  constructor(
    private router: Router,
    private serviceAuth: AuthService,
    private serviceMessages: MessagesService,
    private serviceTranslate: TranslateService
  ) {}

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    this.lang = lang === 'es' ? false : true;
  }
  
  changeLanguage(event) {
    const lang = !event.checked ? 'es' : 'en';
    localStorage.setItem('lang', lang);
    this.setLanguage(lang);
  }

  isAuthenticated() {
    return this.serviceAuth.isAuthenticated();
  }

  logout() {
    const isLogout = this.serviceAuth.logoutUser();
    if (isLogout) {
      this.serviceMessages.info('Bye. :)');
      this.router.navigate(['/']);
    }
  }

  private setLanguage(lang: string) {
    this.serviceTranslate.use(lang);
  }
}
