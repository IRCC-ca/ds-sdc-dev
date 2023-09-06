import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LangSwitchService } from '@app/share/lan-switch/lang-switch.service';
import { TranslateService } from '@app/share/templates/parent-template.module';
import { IBannerConfig, ICheckBoxComponentConfig, IMultiCheckboxConfig, IRadioInputComponentConfig, ITabNavConfig } from 'ircc-ds-angular-component-library';

const enum CheckboxTypes {
  single = "single",
  group = "group",
  multi = "multi"
}

@Component({
  selector: 'app-multi-checkbox-doc',
  templateUrl: './multi-checkbox-doc.component.html',
  styleUrls: ['./multi-checkbox-doc.component.scss']
})
export class MultiCheckboxDocComponent implements OnInit {

  formMultiCheckbox: FormGroup = new FormGroup({});

  checkbox_type = CheckboxTypes.single

  constructor(private lang: LangSwitchService, private translate: TranslateService) {}

  multiCheckboxConfig: IMultiCheckboxConfig = {
    id: 'multi_checkbox',
    parent: {
      id: 'parent',
      label: 'Label Text',
      desc: 'Description line of text',
      required: true,
      formGroup: this.formMultiCheckbox,
      inlineLabel: 'Parent Item',
      size: 'small',
    },
    children: [
      {
        id: 'child1',
        formGroup: this.formMultiCheckbox,
        inlineLabel: 'Child Item',
        size: 'small'
      },
      {
        id: 'child2',
        formGroup: this.formMultiCheckbox,
        inlineLabel: 'Child Item',
        size: 'small'
      },
      {
        id: 'child3',
        formGroup: this.formMultiCheckbox,
        inlineLabel: 'Child Item',
        size: 'small'
      }
    ],
    errorMessages: []
  };

  togglesMultiCheckbox: IRadioInputComponentConfig[] = [
    {
      id: 'size',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'General.Size',
      options: [
        {
          text: 'General.Small',
          value: 'Small'
        },
        {
          text: 'General.Large',
          value: 'Large'
        }
      ]
    },
    {
      id: 'required',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'General.Required',
      options: [
        {
          text: 'True'
        },
        {
          text: 'False'
        }
      ]
    },
    {
      id: 'label',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'General.LabelHeading',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    },
    {
      id: 'desc',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'General.Description',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    },
    {
      id: 'hint',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'General.Hint',
      options: [
        {
          text: 'General.TrueLabel',
          value: 'True'
        },
        {
          text: 'General.FalseLabel',
          value: 'False'
        }
      ]
    },
    {
      id: 'error',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'ERROR.errorMessage',
      options: [
        {
          text: 'General.NoneErr',
          value: 'None'
        },
        {
          text: 'General.SingleErr',
          value: 'Single'
        },
        {
          text: 'General.MultipleErr',
          value: 'Multiple'
        }
      ]
    },
  ];

  checkboxesMulti: ICheckBoxComponentConfig[] = [
    {
      id: 'state',
      formGroup: this.formMultiCheckbox,
      size: 'small',
      label: 'General.StateLabel',
      inlineLabel: 'General.DisabledLabel'
    },
  ];

  
  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    size: 'small',
    tab: [
      {
        id: 'single-checkbox',
        title: ' Checkbox '
      },
      {
        id: 'group-checkbox',
        title: 'Checkbox Group'
      },
      {
        id: 'multi-checkbox',
        title: 'Checkbox Parent/Child'
      }
    ]
  };

  bannerConfig: IBannerConfig = {
    id: "banner-disabled-desc",
    type: "info",
    size: "small",
    title:'General.EnabledBannerTitle',
    content: "General.EnabledBannerContent",
    rounded: true
  };

  setCheckboxType(value: any) {
    console.log("Tab name:", value)
    switch(value) {
      case 'single-checkbox':
        console.log("single checkbox  ----");
        this.checkbox_type = CheckboxTypes.single
        break;
      case 'group-checkbox':
        console.log("group checkbox  ----");
        this.checkbox_type = CheckboxTypes.group
        break;
      case 'multi-checkbox':
        console.log("multi checkbox  ----");
        this.checkbox_type = CheckboxTypes.multi
        break
      default:
        console.log("default checkbox  ----");
    }
  }

  listOfConfigItems = ['size', 'required', 'label', 'desc', 'hint', 'error', 'state']

  ngOnInit() {
    this.multiCheckboxConfig.parent.formGroup.addControl(
      this.multiCheckboxConfig.parent.id,
      new FormControl('')
    );

    this.multiCheckboxConfig.children?.forEach((res) => {
      res.formGroup.addControl(
        res.id,
        new FormControl('')
      );
    });


    this.togglesMultiCheckbox.forEach((toggle) => {
      if (toggle.options && toggle.options[1].text) {
        this.formMultiCheckbox.addControl(
          toggle.id,
          new FormControl(toggle.options[1].text)
        );
      }
    });

    this.checkboxesMulti.forEach((checkbox) => {
      this.formMultiCheckbox.addControl(checkbox.id, new FormControl());
    });

    this.formMultiCheckbox.get(this.checkboxesMulti[0].id)
    ?.valueChanges.subscribe((change) => {
      if (change) {
        this.bannerConfig.title='General.DisabledBannerTitle'
        this.bannerConfig.content="General.DisabledBannerContent"
      } else {
        this.bannerConfig.title='General.EnabledBannerTitle'
        this.bannerConfig.content="General.EnabledBannerContent"
      }
    });

    this.formMultiCheckbox.patchValue({
      size: 'Small',
      label: 'True',
      hint: 'False',
      desc: 'True',
      required: 'True',
      error: 'None'
    });

    this.listOfConfigItems.forEach((configItem) => {
      this.formMultiCheckbox.get(configItem)?.valueChanges.subscribe((value : any) => {
        this.parseConfig(configItem, value)
      });
    })
  }

  private parseConfig (type : string, value : any) {
    switch (type) {
      case 'size':
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig,
          parent : {
            ...this.multiCheckboxConfig.parent,
            size: value.toLowerCase(),
          },
        };
        this.multiCheckboxConfig.children?.forEach((res) => {
          res.size = value.toLowerCase()
        })
        break;
      case 'required':
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig,
          parent : {
            ...this.multiCheckboxConfig.parent,
            required: value === 'True',
          },
        };
        break;
      case 'label':
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig,
          parent : {
            ...this.multiCheckboxConfig.parent,
            label: value === 'True' ? 'Label Text' : undefined,
          },
        };
        break;
      case 'desc':
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig,
          parent : {
            ...this.multiCheckboxConfig.parent,
            desc: value === 'True' ? 'Description line of text' : undefined,
          },
        };
        break;
      case 'hint':
        this.multiCheckboxConfig = {
          ...this.multiCheckboxConfig,
          parent : {
            ...this.multiCheckboxConfig.parent,
            helpText: value === 'True' ? 'Hint Text' : undefined,
          },
        };
        break;
      case 'error':
        if (value === 'None') {
          this.multiCheckboxConfig.errorMessages= []
          this.multiCheckboxConfig.parent.formGroup.removeControl(this.multiCheckboxConfig.parent.id);
          this.multiCheckboxConfig.parent.formGroup.addControl(
            this.multiCheckboxConfig.parent.id,
            new FormControl('')
          );
          this.multiCheckboxConfig.children?.forEach((child) => {
            this.formMultiCheckbox.removeControl(child.id);
            this.formMultiCheckbox.addControl(
              child.id,
              new FormControl('')
            );
          })
        }

        else if (value === 'Single') {
          this.multiCheckboxConfig.errorMessages= [{id:'singleError', key: 'required', errorLOV: this.translate.instant('ERROR.singleError') }]
          this.setValidators(this.multiCheckboxConfig.parent.id);
   
          if (!this.formMultiCheckbox.get(this.multiCheckboxConfig.parent.id)?.touched){
            this.formMultiCheckbox.get(this.multiCheckboxConfig.parent.id)?.markAsTouched();
          }
          this.multiCheckboxConfig.children?.forEach((child) => {
            this.setValidators(child.id);
            if(!this.formMultiCheckbox.get(child.id)?.touched) {
              this.formMultiCheckbox.get(child.id)?.markAsTouched();
            }
          });
        }
        else if (value === 'Multiple') {
          this.multiCheckboxConfig.errorMessages= [
            {id:'singleError1', key: 'required', errorLOV: this.translate.instant('ERROR.singleError') },
            {id:'singleError2', key: 'email', errorLOV: this.translate.instant('ERROR.additionalError') },
            {id:'singleError3', key: 'email', errorLOV: this.translate.instant('ERROR.additionalError') }
          ];

          this.setValidators(this.multiCheckboxConfig.parent.id)

          if (!this.formMultiCheckbox.get(this.multiCheckboxConfig.parent.id)?.touched){
            this.formMultiCheckbox.get(this.multiCheckboxConfig.parent.id)?.markAsTouched();
          }

          this.multiCheckboxConfig.children?.forEach((child) => {
            this.setValidators(child.id)
            if(!this.formMultiCheckbox.get(child.id)?.touched) {
              this.formMultiCheckbox.get(child.id)?.markAsTouched();
            }
          });
        }
        break;
      case 'state':
        console.log("State", value)
        if(value !== undefined) {
          this.toggleDisabled(value, this.multiCheckboxConfig.parent.id, this.formMultiCheckbox);
          this.multiCheckboxConfig.children?.forEach((child) => {
            console.log(child.id)
            this.toggleDisabled(value, child.id, this.formMultiCheckbox);
          });
        }
        break;
      default: 
        console.log("Hit default case")
    }
  }

  private setValidators(id : string) {
    this.formMultiCheckbox.removeControl(id);
    this.formMultiCheckbox.addControl(
      id,
      new FormControl('', [Validators.required])
    );
  }

  private toggleDisabled(disabled: boolean, currentConfigId : string, formType : FormGroup) {
    const checkboxControl: AbstractControl | null = formType.get(
      currentConfigId
    );
    console.log("Control-->", checkboxControl?.disabled)
    if (
      (disabled && checkboxControl?.disabled) ||
      (!disabled && checkboxControl?.enabled)
    )
      return;

    if (disabled) {
      console.log('disable')
      checkboxControl?.disable();
    } else {
      console.log('ENABLE')
      checkboxControl?.enable();
    }
  }
}
