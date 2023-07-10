import { Component, Input, isDevMode } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray
} from '@angular/cdk/drag-drop';

export interface IDragDropitem {
  id: string;
  type: string;
}

export interface IDragDropDiv extends IDragDropitem {
  children: Array<IDragDropitem>;
}

@Component({
  selector: 'ircc-cl-lib-drag-drop-container',
  templateUrl: './drag-drop-container.component.html',
  styleUrls: ['drag-drop-container.component.scss']
})
export class dragDropContainerComponent {
  @Input() id = '';

  imageURL = '';
  altImage = '';
  devMode = isDevMode();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });
  }

  setLang(lang: string) {
    if (lang === 'en' || lang === 'en-US') {
    } else {
    }
  }

  components: Array<IDragDropitem> = [
    {
      id: 'hello',
      type: 'IDragDropDiv',
      children: []
    } as IDragDropDiv,
    {
      id: 'GoodBye',
      type: 'IDragDropDiv',
      children: []
    } as IDragDropDiv
  ];

  drop(event: CdkDragDrop<IDragDropitem[]>) {
    console.log(event);
    moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  }

  setIndex = (index: number): number => {
    return (index += 1);
  };
}
