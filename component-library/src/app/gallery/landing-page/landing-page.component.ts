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
      name: 'BUTTONS.FormInputs',
      url: 'FormComponents'
    },
    {
      name: 'BUTTONS.HeaderFooter',
      url: 'HeaderFooter'
    },
    {
      name: 'BUTTONS.Miscellaneous',
      url: 'Miscellaneous'
    },
    {
      name: 'BUTTONS.DevTestPage',
      url: 'DevTest'
    },
    {
      name: 'BUTTONS.QATesting',
      url: 'QATesting'
    }
  ]

  ngOnInit() {
    this.altLang.setAltLangLink('LandingPage-alt');
    

    this.createButtonIds();
  }

  createButtonIds() {
    this.componentsButtons.forEach(button => {
      button.id = button.name.replace(/\s/g, "");
    });
  }

}
