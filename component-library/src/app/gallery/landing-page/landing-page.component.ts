import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';

export interface ILibraryNavButtons {
  name: string;
  url: string;
  id?: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private altLang: LanguageSwitchService) { }

  componentsButtons: ILibraryNavButtons[] = [
    {
      name: 'Form Inputs',
      url: 'FormComponents'
    },
    {
      name: 'Header/Footer',
      url: ''
    },
    {
      name: 'Miscellaneous',
      url: ''
    },
    {
      name: 'Dev Test Page',
      url: 'DevTest'
    }
  ]

  ngOnInit() {
    this.altLang.setAltLangLink('LandingPage');
    

    this.createButtonIds();
  }

  createButtonIds() {
    this.componentsButtons.forEach(button => {
      button.id = button.name.replace(/\s/g, "");
    });
  }

}
