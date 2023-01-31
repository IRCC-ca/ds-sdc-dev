import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';

@Component({
  selector: 'app-mahsa',
  templateUrl: './mahsa.component.html',
  styleUrls: ['./mahsa.component.scss']
})
export class MahsaComponent implements OnInit {

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('QATesting-alt');
  }

}
