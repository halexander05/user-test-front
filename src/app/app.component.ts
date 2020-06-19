import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  lang = null;

  constructor(private serviceTranslate: TranslateService) {}

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    if (!this.lang) {
      this.lang = 'es';
      localStorage.setItem('lang', this.lang);
    }
    this.serviceTranslate.setDefaultLang(this.lang);
  }
}
