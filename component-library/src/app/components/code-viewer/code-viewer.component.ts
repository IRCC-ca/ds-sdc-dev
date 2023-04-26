import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  IButtonConfig,
  ITabNavConfig
} from 'ircc-ds-angular-component-library';
import { SlugifyPipe } from 'src/app/share/pipe-slugify.pipe';

export interface ICodeViewerTab {
  id?: string;
  title: string;
  value?: string;
}

export interface ICodeViewerConfig {
  id: string;
  openAccordion?: boolean;
  tab?: ICodeViewerTab[];
  selected?: string;
}

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
  providers: [SlugifyPipe]
})
export class codeViewerComponent implements OnInit {
  @Input() config: ICodeViewerConfig = {
    id: ''
  };
  @Output() getSelected = new EventEmitter<string>();

  tabconfig: ITabNavConfig = {
    id: 'codeViewerTabs',
    showContent: false
  };
  selectedTab: any = {
    title: ''
  };

  openAccordion: boolean = false;
  minHeightResizeContainer = 150;
  height: number = 150;

  buttonConfigCopy: IButtonConfig = {
    id: 'accordion-button',
    category: 'plain',
    size: 'small',
    ariaLabel: 'Click to copy the code'
  };

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.setupComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.config = changes['config'].currentValue;
      this.setupComponent();
    }
  }

  setupComponent() {
    if (this.config.openAccordion !== undefined) {
      this.openAccordion = this.config.openAccordion;
    }

    if (this.config.selected) {
      this.tabconfig.selected = this.config.selected;
    }

    if (this.config.tab) {
      this.tabconfig.tab = this.config.tab;
    } else {
      this.tabconfig.tab = [];
    }

    if (this.config.tab && this.config.selected) {
      this.selectedTab = this.config.tab.find(
        (tab) => tab.id === this.config.selected
      );
    } else if (this.config.tab) {
      this.selectedTab = this.config.tab[0];
    } else {
      this.selectedTab = {};
    }
  }

  getSelectedTab(selected: any) {
    if (this.config.tab) {
      this.selectedTab = this.config.tab.find(
        (element) => element.id === selected
      );
      this.config.selected = selected;
      this.getSelected.emit(selected);
    }
  }

  getHeight(height: number) {
    this.height = height;
  }
}
