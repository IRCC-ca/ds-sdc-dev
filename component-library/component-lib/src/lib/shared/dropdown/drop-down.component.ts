import { Component, Input, OnInit } from '@angular/core';
import { DSSizes } from "../../../shared/constants/jl-components.constants";
import { ButtonCategories } from '../button/button.component';
import { IIconButtonIconConfig } from '../icon-button/icon-button.component';
import { IFlyoutConfig } from '../flyout/flyout.component';
import { TranslateService } from '@ngx-translate/core';
export interface IDropdownConfig {
  id: string;
  label?: string;
  size?: keyof typeof DSSizes;
  category?: keyof typeof ButtonCategories;
  placeholderText?: string;
  disabled?: boolean;
  icon?: IIconButtonIconConfig;
  flyout?: IFlyoutConfig;
}
export const DROPDOWN_EN = 'Dropdown'
export const DROPDOWN_FR = 'Menu Deroulant'
@Component({
  selector: 'ircc-cl-lib-dropdown',
  templateUrl: './drop-down.component.html'
})
export class DropdownComponent implements OnInit {
  constructor(private translate: TranslateService) { }

  @Input() config: IDropdownConfig = {
    id: ''
  };

  @Input() id: string = '';
  @Input() size?: keyof typeof DSSizes;
  @Input() label?: string = '';
  @Input() placeholderText?: string = '';
  @Input() disabled?: boolean;
  @Input() category?: keyof typeof ButtonCategories;

  btnAriaLabel = ''
  showPlaceholder: boolean = false;
  selected: boolean = false;

  flyoutConfig: IFlyoutConfig = {
    id: this.config.id + '_flyout',
    options: [{
      value: 'Options empty'
    }]
  }

  ngOnInit() {
    if (this.id !== '') this.config.id = this.id;
    if (this.size) this.config.size = this.size;
    if (this.label !== '') this.config.label = this.label;
    if (this.placeholderText !== '')
      this.config.placeholderText = this.placeholderText;
    if (this.disabled !== undefined) this.config.disabled = this.disabled;
    this.category === undefined
      ? undefined
      : (this.config.category = this.category);

    if (!this.config.category) this.config.category = ButtonCategories.primary;

    if (!this.config.label || this.config.label.trim().length == 0) {
      if (!this.config.placeholderText) {
        this.config.placeholderText = 'Default';
      }
      this.showPlaceholder = true;
    }

    if (this.config.flyout) this.flyoutConfig = this.config.flyout;

    this.setLang(this.translate.currentLang);
    this.translate.onLangChange.subscribe((change) => {
      this.setLang(change.lang);
    });
  }

    /**
  * setLang(lang: string) if a function which accepts a string value.
  * This value currently needs to be 'en' or 'en-US' to trigger English translations otherwise
  * french translations will be triggered.
  */
    setLang(lang: string) {
      if (lang === 'en' || lang === 'en-US') {
        this.btnAriaLabel = DROPDOWN_EN
      } else {
        this.btnAriaLabel = DROPDOWN_FR
      }
    }

  selectedOption(e: Event) {
    //if it receives it's event info it selects the index - if not closes flyout
    if (e) {
      this.showPlaceholder = false;
      this.config.label = e.toString();
      this.selected = !this.selected;
      this.clearFlyoutFocus(); //clear the flyout focus if the flyout is closed.
    } else {
      this.toggleFlyout(false);
    }
  }

  /**
   * function receives a truthy value which determines wether it closes or opens,
   * but also looks for FocusEvent to check if flyout is being interacted with
   * @param status
   * @param e
   */
  toggleFlyout(status: boolean, e?: FocusEvent) {
    let target = e?.relatedTarget as HTMLElement;
    if (!target?.id.includes(this.config.id) || !e) {
      this.selected = status;
      !status && this.clearFlyoutFocus(); //clear the flyout focus if the flyout is closed.
    }
  }

  /**
   * Clear the flyout active state
   */
  clearFlyoutFocus() {
    if (this.config?.flyout?.options) {
      this.config.flyout.options.forEach(i => {
        i.active = false;
      });
    }
  }
}
