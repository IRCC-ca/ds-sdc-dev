import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';

@Component({
  selector: 'app-mike',
  templateUrl: './mike.component.html',
  styleUrls: ['./mike.component.scss']
})
export class MikeComponent implements OnInit {

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('QATesting-alt');
  }

}
