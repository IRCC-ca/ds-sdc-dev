import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SecurityContext,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IErrorPairs } from '../../../shared/interfaces/component-configs';

import { IInputComponentConfig } from '../input/input.component';
import {
  DSSizes,
  IFlyoutConfig,
  IFlyoutOptionConfig
} from '../../../public-api';
import { DomSanitizer } from '@angular/platform-browser';

export interface IAutocompleteComponent {
  id: string;
  label?: string;
  hint?: string;
  desc?: string;
  placeholder?: string;
  size: keyof typeof DSSizes;
  formGroup: FormGroup;
  suggestions: string[];
  required?: boolean;
  errorMessages?: IErrorPairs[];
}

export enum matchType {
  infix = 'infix',
  prefix = 'prefix'
}

@Component({
  selector: 'ircc-cl-lib-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutoCompleteComponent
  implements OnInit, OnChanges, AfterContentChecked
{
  @ViewChild('inputAutocomplete', { static: false }) inputAutocomplete:
    | ElementRef
    | undefined;

  formGroupEmpty: FormGroup = new FormGroup({});

  @Input() config: IAutocompleteComponent = {
    id: 'auto-complete',
    formGroup: this.formGroupEmpty,
    label: 'label',
    hint: 'hint',
    desc: 'desc',
    size: 'small',
    suggestions: []
  };

  matchType?: keyof typeof matchType = 'infix';
  showSuggestions: boolean = false;

  @Input() formGroup = this.formGroupEmpty;

  inputComponent: IInputComponentConfig = {
    ...this.config,
    type: 'autocomplete'
  };

  flyout: IFlyoutConfig = {
    id: 'string',
    options: [],
    type: 'autocomplete',
    size: this.config.size
  };

  constructor(
    private domSanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.inputComponent = {
      ...this.config,
      type: 'autocomplete'
    };

    this.flyout.size = this.config.size;
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    if (this.formGroup !== this.formGroupEmpty) {
      this.config.formGroup = this.formGroup;
    }

    this.inputComponent.id = this.config.id;
    this.inputComponent.formGroup = this.config.formGroup;
    this.inputComponent.label = this.config.label;
    this.inputComponent.hint = this.config.hint;
    this.inputComponent.desc = this.config.desc;
    this.inputComponent.size = this.config.size;
    this.inputComponent.errorMessages = this.config.errorMessages;
    this.inputComponent.placeholder = this.config.placeholder;

    this.flyout.id = `${this.config.id}-flyout`;

    this.flyout.options = this.config.suggestions.map((suggestion) => {
      return {
        value: suggestion,
        clickable: true
      };
    });

    this.config.formGroup
      .get(this.config.id)
      ?.valueChanges.subscribe((data) => {
        if (null || data.length === 0) {
          this.flyout.selected = '';
          this.flyout.options = [];
          this.flyout.options = this.config.suggestions.map((suggestion) => {
            return {
              value: suggestion,
              clickable: true
            };
          });
        } else {
          this.validateInternal(data);
        }
      });

    this.inputComponent = {
      ...this.config,
      type: 'autocomplete'
    };
  }

  spreadFlyoutOption(value: string): IFlyoutOptionConfig {
    return {
      value: value,
      clickable: true
    };
  }

  onFocus(event: any) {
    let timeoutTime = 0;

    if (event === false) {
      timeoutTime = 500;
    }

    setTimeout(() => {
      this.showSuggestions = event;
    }, timeoutTime);
  }

  isSelected(event: any) {
    if (event !== null) {
      let eventString = this.domSanitizer.sanitize(
        SecurityContext.HTML,
        event.replace(/<[^>]*>/g, '')
      );
      this.config.formGroup.get(this.config.id)?.setValue(eventString);
      this.showSuggestions = false;
    }
  }

  validateInternal(data: string) {
    this.flyout.options = [];

    let eventString = this.domSanitizer.sanitize(
      SecurityContext.HTML,
      data.replace(/<[^>]*>/g, '')
    );

    let re: RegExp;

    if (this.matchType === 'infix') {
      const infixMatching = new RegExp(`${data}`);
      re = new RegExp(`${infixMatching.source}`, 'i');
    } else {
      const paragraphStart = new RegExp(`^${data}`);
      const whitespaceStart = new RegExp(`\\s+\\b${data}[a-zA-Z]*`);
      re = new RegExp(
        `${paragraphStart.source}|${whitespaceStart.source}`,
        'i'
      );
    }

    this.flyout.selected = data;

    this.flyout.options = this.config.suggestions
      .filter((suggestion) => suggestion.search(re) >= 0)
      .map((suggestion) => {
        return {
          value: suggestion,
          clickable: true
        };
      });

    if (this.flyout.options.length === 0) {
      this.flyout.options = [
        {
          value: 'No options found',
          clickable: false
        }
      ];
    }
  }
}
