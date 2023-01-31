import { Component, OnInit } from '@angular/core';
import { LanguageSwitchService } from '@app/@shared/language-switch/language-switch.service';
import { ILibraryNavButtons } from '../landing-page/landing-page.component';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent implements OnInit {

  componentsButtons: ILibraryNavButtons[] = [
    {
      name: 'Kris',
      url: 'kris'
    },
    {
      name: 'Mahsa',
      url: 'mahsa'
    },
    {
      name: 'Naseer',
      url: 'naseer'
    },
    {
      name: 'Michael',
      url: 'michael'
    },
    {
      name: 'Mike',
      url: 'mike'
    }
  ]

  constructor(private altLang: LanguageSwitchService) { }

  ngOnInit() {
    this.altLang.setAltLangLink('QATesting-alt');

    this.componentsButtons.sort( compare );
  }

}

function compare( a: ILibraryNavButtons, b: ILibraryNavButtons ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}
