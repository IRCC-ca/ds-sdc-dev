import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { ILibraryNavButtons, INavButtonComponentConfig } from '../nav-buttons/nav-buttons.component';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent implements OnInit {

  navConfig: INavButtonComponentConfig = {
    id: 'qa_page_buttons',
    baseUrlKey: 'ROUTES.QATesting',
    buttons: [
      {
        name: 'Kris',
        url: 'kris',
        category: 'secondary'
      },
      {
        name: 'Mahsa',
        url: 'mahsa',
        category: 'secondary'
      },
      {
        name: 'Naseer',
        url: 'naseer',
        category: 'secondary'
      },
      { //testing routing bug, needs to be removed afterwards
        name: 'Naseer2',
        url: 'naseer2',
        category: 'plain'
      },
      {
        name: 'Michael',
        url: 'michael',
        category: 'secondary'
      },
      {
        name: 'Mike',
        url: 'mike',
        category: 'secondary'
      },
      {
        name: 'Home',
        url: 'LandingPage',
        baseUrlOverride: 'BUTTONS.HomeURLOverride'
      }
    ]
  };

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('QATesting-alt');

    this.navConfig.buttons.sort(compare);
  }

}

function compare(a: ILibraryNavButtons, b: ILibraryNavButtons) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
