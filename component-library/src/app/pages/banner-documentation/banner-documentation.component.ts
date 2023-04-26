import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBannerConfig, ICTAConfig, IRadioInputComponentConfig, ITabNavConfig } from 'ircc-ds-angular-component-library';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LangSwitchService } from '../../share/lan-switch/lang-switch.service';
import { slugTitleURLConfig, slugTitleURLType } from '@app/components/title-slug-url/title-slug-url.component';

@Component({
  selector: 'app-banner-documentation',
  templateUrl: './banner-documentation.component.html',
  styleUrls: ['./banner-documentation.component.scss']
})
export class BannerDocumentationComponent implements OnInit {
  @ViewChild('banner' , { static: false }) banner!: ElementRef;
  altLangLink = 'bannerDocumentation';

  constructor(
    private translate: TranslateService,
    private lang: LangSwitchService
  ) {}

  form_interactive_banner = new FormGroup({});

  buttonSet = new Set<string>();
  buttonSet2 = new Set<string>(['showPrimaryButtonToggle', 'showSecondaryButtonToggle', 'showPlainButtonToggle', 'showLinkToggle']);
  
  interactiveDemoSlugTitleURLConfig: slugTitleURLConfig = {
    type: slugTitleURLType.primary,
    title: 'Interactive Demo'
  };

  bannerConfig: IBannerConfig = {
    id: 'banner',
    cta: []
  };

  toggles: IRadioInputComponentConfig[] = [
    {
      id: 'showSizeToggle',
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
          text: 'True',
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
      id: 'showPrimaryButtonToggle',
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
      id: 'showPlainButtonToggle',
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
      id: 'showSecondaryButtonToggle',
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

  enableRadio(name : string) {
    this.toggles.forEach(item  => {
      if (item.id === name){
        item.disabled = false;
      }
    })
  }

  bannerClose(event : Event) {
    const bannerContainer = this.banner.nativeElement.querySelector(`#${event}`)
    setTimeout(function () {
      bannerContainer?.classList.remove('noDisplay');
    }, 1000);
  }

  checkCurrentButtonSet() {
    console.log('Buttonset:', this.buttonSet)
    if(this.buttonSet.size >= 2) {
      this.buttonSet2.forEach(x => {
        if(!this.buttonSet.has(x)) {
          console.log('Disable:',x)
          this.disableRadio(x)
        }
      })
    }
    else {
      this.buttonSet2.forEach(x => {
        this.enableRadio(x)
      })
    }
  }

  handleSizeToggle(value : any) {
    this.bannerConfig.size =  (value['showSizeToggle']).toLowerCase()
  }

  handleCloseToggle(value : any) {
    if(value['showCloseToggle'] === 'True') {
      this.bannerConfig.dismissible = true;
    }
    else {
      this.bannerConfig.dismissible = false;
    }
  }

  doNothing() {
    console.log("Do nothing")
  }

  handleTitleToggle(value : any) {
    if(value['showTitleToggle'] === 'True') {
      this.bannerConfig.title='Title text';
    }
    else {
      this.bannerConfig.title = ''
    }
  }

  handleDescToggle(value : any) {
    if(value['showDescToggle'] === 'True') {
      this.bannerConfig.content='Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.';
    }
    else {
      this.bannerConfig.content = '';
    }
  }

  handlePrimaryButtonToggle(value : any) {
    if(value['showPrimaryButtonToggle'] === 'True') {
      this.addItemtoCTAList("Primary")
      this.buttonSet.add('showPrimaryButtonToggle')
      this.checkCurrentButtonSet()
    }
    else {
      this.removeItemFromCTAList("Primary")
      this.buttonSet.delete('showPrimaryButtonToggle')
      this.checkCurrentButtonSet()
    }
  }

  handleSecondaryButtonToggle(value : any) {
    if(value['showSecondaryButtonToggle'] === 'True') {
      this.addItemtoCTAList("Secondary");
      this.buttonSet.add("showSecondaryButtonToggle");
      this.checkCurrentButtonSet()
    }
    else {
      this.removeItemFromCTAList('Secondary');
      this.buttonSet.delete('showSecondaryButtonToggle');
      this.checkCurrentButtonSet()
    }
  }

  handlePlainButtonToggle(value : any) {
    if(value['showPlainButtonToggle'] === 'True') {
      this.addItemtoCTAList("Plain")
      this.buttonSet.add('showPlainButtonToggle')
      this.checkCurrentButtonSet()
    }
    else {
      this.removeItemFromCTAList("Plain")
      this.buttonSet.delete('showPlainButtonToggle')
      this.checkCurrentButtonSet()
    }
  }

  handleLinkToggle(value : any) {
    if(value['showLinkToggle'] === 'True') {
      this.addItemtoCTAList("Link")
      this.buttonSet.add('showLinkToggle')
      this.checkCurrentButtonSet()
    }
    else {
      this.removeItemFromCTAList("Link")
      this.buttonSet.delete('showLinkToggle')
      this.checkCurrentButtonSet()
    }
  }

  track_toggles = {
    'showSizeToggle' : "Large",
    'showCloseToggle' : "False",
    'showTitleToggle' : "False",
    'showDescToggle' : "False",
    'showPrimaryButtonToggle' : "False",
    'showSecondaryButtonToggle' : "False",
    'showPlainButtonToggle' : "False",
    'showLinkToggle' : "False",
  }

  toggle_function = {
    'showSizeToggle' : this.handleSizeToggle,
    'showCloseToggle' : this.handleCloseToggle,
    'showTitleToggle' : this.handleTitleToggle,
    'showDescToggle' : this.handleDescToggle,
    'showPrimaryButtonToggle' : this.handlePrimaryButtonToggle,
    'showSecondaryButtonToggle' : this.handleSecondaryButtonToggle,
    'showPlainButtonToggle' : this.handlePlainButtonToggle,
    'showLinkToggle' : this.handleLinkToggle,
  }


  ngOnInit() {
    this.lang.setAltLangLink(this.altLangLink);
    
    this.toggles.forEach(toggle => {
      if (toggle.options && toggle.options[1].text){
        this.form_interactive_banner.addControl(toggle.id, new FormControl(toggle.options[1].text))
      }
    });

    this.form_interactive_banner.valueChanges.subscribe((value : any) => {
      for (const param in value) {
        if (this.track_toggles[param] === value[param]) continue;
        this.track_toggles[param] = value[param]
        this.toggle_function[param].apply(this, [value])
        // switch(param){
        //   case 'sizeToggle':
        //     console.log("------------------SIZETOGGLE-------------------------------")
        //     this.bannerConfig.size =  (value['sizeToggle']).toLowerCase()
        //     break
        //   case 'showDescToggle':
        //     if(value['showDescToggle'] === 'True') {
        //       this.bannerConfig.content='Description text lorem ipsum dolor sit amet consecteteur adipiscing elit.';
        //     }
        //     else {
        //       this.bannerConfig.content = '';
        //     }
        //     break
        //   case 'showPrimaryToggle':
        //     if(value['showPrimaryToggle'] === 'True') {
        //       this.addItemtoCTAList("Primary")
        //       this.buttonSet.add('showPrimaryToggle')
        //       this.checkCurrentButtonSet()
        //     }
        //     else {
        //       this.removeItemFromCTAList("Primary")
        //       this.buttonSet.delete('showPrimaryToggle')
        //       this.checkCurrentButtonSet()
        //     }
        //     break
        //   case 'showPlainToggle':
        //     if(value['showPlainToggle'] === 'True') {
        //       this.addItemtoCTAList("Plain")
        //       this.buttonSet.add('showPlainToggle')
        //       this.checkCurrentButtonSet()
        //     }
        //     else {
        //       this.removeItemFromCTAList("Plain")
        //       this.buttonSet.delete('showPlainToggle')
        //       this.checkCurrentButtonSet()
        //     }
        //     break
        //   case 'showSecondaryToggle':
        //     if(value['showSecondaryToggle'] === 'True') {
        //       this.addItemtoCTAList("Secondary");
        //       this.buttonSet.add("showSecondaryToggle");
        //       this.checkCurrentButtonSet()
        //     }
        //     else {
        //       this.removeItemFromCTAList('Secondary');
        //       this.buttonSet.delete('showSecondaryToggle');
        //       this.checkCurrentButtonSet()
        //     }
        //     break
        //   case 'showTitleToggle':
        //     if(value['showTitleToggle'] === 'True') {
        //       this.bannerConfig.title='Title text';
        //     }
        //     else {
        //       this.bannerConfig.title = ''
        //     }
        //     break
        //   case 'showCloseToggle':
        //     if(value['showCloseToggle'] === 'True') {
        //       this.bannerConfig.dismissible = true;
        //     }
        //     else {
        //       this.bannerConfig.dismissible = false;
        //     }
        //     break
        //   case 'showLinkToggle':
        //     console.log("------------------SHOWLINKTOGGLE-------------------------------")
        //     if(value['showLinkToggle'] === 'True') {
        //       this.addItemtoCTAList("Link")
        //       this.buttonSet.add('showLinkToggle')
        //       this.checkCurrentButtonSet()
        //     }
        //     else {
        //       this.removeItemFromCTAList("Link")
        //       this.buttonSet.delete('showLinkToggle')
        //       this.checkCurrentButtonSet()
        //     }
        //     break
        //   default:{
        //     console.log("default")
        //   }
        // }
      }
    });
  }
}
