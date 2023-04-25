import { Component, OnInit } from '@angular/core';
import { IBannerConfig, ICTAConfig, IRadioInputComponentConfig, ITabNavConfig } from 'ircc-ds-angular-component-library';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';

@Component({
  selector: 'app-banner-documentation',
  templateUrl: './banner-documentation.component.html',
  styleUrls: ['./banner-documentation.component.scss']
})
export class BannerDocumentationComponent implements OnInit {

  altLangLink = 'bannerDocumentation';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  form_interactive_banner = new FormGroup({});

  buttonSet = new Set<string>();
  buttonSet2 = new Set<string>(['Primary', 'Secondary', 'Plain', 'Link']);
  
  bannerConfig: IBannerConfig = {
    id: 'banner',
    // title: 'Title text',
    // dismissible: true,
    // content: 'Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.',
    cta: [
    //   {
    //     text: 'Primary',
    //     type: 'button',
    //     btnConfig: {
    //       id: 'cta1',
    //       category: 'primary'
    //     }
    //   },
    //   {
    //     text: 'Secondary',
    //     type: 'button',
    //     btnConfig: {
    //       id: 'cta1',
    //       category: 'secondary'
    //     }
    //   },
    //   {
    //     text: 'Plain',
    //     type: 'button',
    //     btnConfig: {
    //       id: 'ctaPlain',
    //       category: 'plain'
    //     }
    //   },
    //   {
    //     text: 'Link',
    //     type: 'link',
    //   }
    ]
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'sizeToggle',
      formGroup: this.form_interactive_banner,
      label: 'Size',
      options: [
        {
          text: 'Small'
        },
        {
          text: 'Large'
        }
      ]
    },
    {
      id: 'showCloseToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show close',
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
      id: 'showTitleToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show title',
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
      id: 'showDescToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show description',
      options: [
        {
          text: 'True',
        },
        {
          text: 'False'
        }
      ]
    },
    {
      id: 'showPrimaryToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show primary button',
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
      id: 'showPlainToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show plain button',
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
      id: 'showSecondaryToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show secondary button',
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
      id: 'showLinkToggle',
      formGroup: this.form_interactive_banner,
      label: 'Show link',
      options: [
        {
          text: 'True'
        },
        {
          text: 'False'
        }
      ]
    },

  ]

  demoTabsConfig: ITabNavConfig = {
    id: 'demoTabs',
    tab: [
      {
        id: 'info',
        title: 'Info',
      },
      {
        id: 'warning',
        title: 'Warning'
      },
      {
        id: 'critical',
        title: 'Critical'
      },
      {
        id: 'success',
        title: 'Success'
      },
      {
        id: 'generic',
        title: 'Generic',
      }
    ]
  };

  setBannerType(value : any) {
    if(value === "info") {
      this.bannerConfig.type = 'info'
    }
    else if(value === "warning") {
      this.bannerConfig.type = 'warning'
    }
    else if(value === "success") {
      this.bannerConfig.type = 'success'
    }
    else if(value === "generic") {
      this.bannerConfig.type = 'generic'
    }
    else if(value === "critical") {
      this.bannerConfig.type = 'critical'
    }
  }

  addItemtoCTAList(text : string){

    const plainExample : ICTAConfig = {
      text: 'Plain',
      type: 'button',
      btnConfig: {
        id: 'ctaPlain',
        category: 'plain'
      }
    }

    const secondaryExample : ICTAConfig = {
      text: 'Secondary',
      type: 'button',
      btnConfig: {
        id: 'ctaSecondary',
        category: 'secondary'
      }
    }

    const primaryExample  : ICTAConfig = {
      text: 'Primary',
      type: 'button',
      btnConfig: {
        id: 'ctaPrimary',
        category: 'primary'
      }
    }

    const linkExample : ICTAConfig = {
      text: 'Link',
      type: 'link',
    }

    const indexOfObject : any = this.bannerConfig?.cta?.findIndex((object) => {
      return object.text === text;
    });
    
    if (indexOfObject == -1) {
      if(text === "Primary") this.bannerConfig?.cta?.push(primaryExample);
      else if(text === "Secondary") this.bannerConfig?.cta?.push(secondaryExample);
      else if(text === "Plain") this.bannerConfig?.cta?.push(plainExample);
      else if(text === "Link") this.bannerConfig?.cta?.push(linkExample);
    }
  }

  removeItemFromCTAList(text : string){
    const indexOfObject : any = this.bannerConfig?.cta?.findIndex((object) => {
      return object.text === text;
    });
    
    if (indexOfObject !== -1) {
      this.bannerConfig?.cta?.splice(indexOfObject, 1);
    }
  }

  disableRadio(name : string) {
    this.toggles.forEach(item  => {
      if (item.id === name){
        item.disabled = true;
      }
    })
  }

  // checkCurrentButtonSet() {}

  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    
    this.toggles.forEach(toggle => {
      // console.log("toggle:=", toggle)
      if (toggle.options && toggle.options[1].text){
        this.form_interactive_banner.addControl(toggle.id, new FormControl(toggle.options[1].text))
      }
      
      // if(this.bannerConfig?.cta && this.bannerConfig?.cta?.length <= 2) {

      // } else {

      // }
    });
    console.log("--------------------->:", this.bannerConfig?.cta?.length)

    // if(this.bannerConfig?.cta && this.bannerConfig?.cta?.length === 1) {
    //   // this.disableRadio('showSecondaryToggle')
    // }


  
    this.form_interactive_banner.valueChanges.subscribe((value : any) => {
      //0 1 2 3
      console.log("Size of button set->", this.buttonSet.size)
      console.log("Value", value)

      if(this.buttonSet.size >= 2 && this.buttonSet2.has(value)) {
        this.disableRadio('showSecondaryToggle')
        //{primary, plain}
        
      }
      
      for (const param in value) {
        switch(param){
          case 'sizeToggle':
            this.bannerConfig.size =  (value['sizeToggle']).toLowerCase()
            break
            case 'showDescToggle':
              console.log("showDescToggle ->", value['showDescToggle'])
              if(value['showDescToggle'] === 'True') {
                this.bannerConfig.content='Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.';
              }
              else {
                this.bannerConfig.content = '';
              }
              break
            case 'showPrimaryToggle':
              // value['showPrimaryToggle'].options.disabled = true
              if(value['showPrimaryToggle'] === 'True') {
                this.addItemtoCTAList("Primary")
                this.buttonSet.add('Primary')
              }
              else {
                this.removeItemFromCTAList("Primary")
                this.buttonSet.delete('Primary')
              }
              break
            case 'showPlainToggle':
              if(value['showPlainToggle'] === 'True') {
                this.addItemtoCTAList("Plain")
                this.buttonSet.add('Plain')
              }
              else {
                this.removeItemFromCTAList("Plain")
                this.buttonSet.delete('Plain')
              }
              break
            case 'showSecondaryToggle':
              if(value['showSecondaryToggle'] === 'True') {
                this.addItemtoCTAList("Secondary");
                this.buttonSet.add("Secondary");
              }
              else {
                this.removeItemFromCTAList('Secondary');
                this.buttonSet.delete('Secondary');
              }
              break
            case 'showTitleToggle':
              if(value['showTitleToggle'] === 'True') {
                this.bannerConfig.title='Title text';
              }
              else {
                this.bannerConfig.title = ''
              }
              break
            case 'showCloseToggle':
              if(value['showCloseToggle'] === 'True') {
                this.bannerConfig.dismissible = true;
              }
              else {
                this.bannerConfig.dismissible = false;
              }
              break
            case 'showLinkToggle':
              if(value['showLinkToggle'] === 'True') {
                this.addItemtoCTAList("Link")
                this.buttonSet.add('Link')
              }
              else {
                this.removeItemFromCTAList("Link")
                this.buttonSet.delete('Link')
              }
              break
          default:{
            console.log("default")
          }
        }
      }

      if(this.buttonSet.size >= 2) {
        this.disableRadio('showSecondaryToggle')
        //{primary, plain}
        
      }
    });
  }
}
