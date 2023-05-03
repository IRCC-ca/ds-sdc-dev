'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ircc-ds documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/IrccDsAngularBannerModule.html" data-type="entity-link" >IrccDsAngularBannerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IrccDsAngularBannerModule-cad09d77c627f419579bd49ec729cb6c1ae7d02dab4cc50d8ddc7bdcb0f1a9d763901be558e09c00a77123d9a13d47b16bc779e4dea5009e25db06567bfac2f0"' : 'data-target="#xs-components-links-module-IrccDsAngularBannerModule-cad09d77c627f419579bd49ec729cb6c1ae7d02dab4cc50d8ddc7bdcb0f1a9d763901be558e09c00a77123d9a13d47b16bc779e4dea5009e25db06567bfac2f0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IrccDsAngularBannerModule-cad09d77c627f419579bd49ec729cb6c1ae7d02dab4cc50d8ddc7bdcb0f1a9d763901be558e09c00a77123d9a13d47b16bc779e4dea5009e25db06567bfac2f0"' :
                                            'id="xs-components-links-module-IrccDsAngularBannerModule-cad09d77c627f419579bd49ec729cb6c1ae7d02dab4cc50d8ddc7bdcb0f1a9d763901be558e09c00a77123d9a13d47b16bc779e4dea5009e25db06567bfac2f0"' }>
                                            <li class="link">
                                                <a href="components/BannerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BannerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IrccDsAngularComponentsSharedModule.html" data-type="entity-link" >IrccDsAngularComponentsSharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IrccDsAngularComponentsSharedModule-39e675d4625c581e9a6a3328e9a1dc32864a0d9e87f089b8e258120e3b487ea31ea72a0dfe7a2b223dcdfb1af50381b8058d3af8161e746aa00f56708bb2fb1d"' : 'data-target="#xs-components-links-module-IrccDsAngularComponentsSharedModule-39e675d4625c581e9a6a3328e9a1dc32864a0d9e87f089b8e258120e3b487ea31ea72a0dfe7a2b223dcdfb1af50381b8058d3af8161e746aa00f56708bb2fb1d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IrccDsAngularComponentsSharedModule-39e675d4625c581e9a6a3328e9a1dc32864a0d9e87f089b8e258120e3b487ea31ea72a0dfe7a2b223dcdfb1af50381b8058d3af8161e746aa00f56708bb2fb1d"' :
                                            'id="xs-components-links-module-IrccDsAngularComponentsSharedModule-39e675d4625c581e9a6a3328e9a1dc32864a0d9e87f089b8e258120e3b487ea31ea72a0dfe7a2b223dcdfb1af50381b8058d3af8161e746aa00f56708bb2fb1d"' }>
                                            <li class="link">
                                                <a href="components/BreadcrumbComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbLinkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbLinkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FlyoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlyoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FlyoutOptionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FlyoutOptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IconButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IconButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IconComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndicatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IndicatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LabelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProgressIndicatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProgressIndicatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProgressTagsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProgressTagsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IrccDsAngularFormComponentsModule.html" data-type="entity-link" >IrccDsAngularFormComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IrccDsAngularFormComponentsModule-d7fbaff9ff53c0fd3597aa605c09f63d26ba410f095a0297b31722ea7c92904bd68b9b568c83a143107ba78c2959b425e87fcbca66f94115037d8e6021046114"' : 'data-target="#xs-components-links-module-IrccDsAngularFormComponentsModule-d7fbaff9ff53c0fd3597aa605c09f63d26ba410f095a0297b31722ea7c92904bd68b9b568c83a143107ba78c2959b425e87fcbca66f94115037d8e6021046114"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IrccDsAngularFormComponentsModule-d7fbaff9ff53c0fd3597aa605c09f63d26ba410f095a0297b31722ea7c92904bd68b9b568c83a143107ba78c2959b425e87fcbca66f94115037d8e6021046114"' :
                                            'id="xs-components-links-module-IrccDsAngularFormComponentsModule-d7fbaff9ff53c0fd3597aa605c09f63d26ba410f095a0297b31722ea7c92904bd68b9b568c83a143107ba78c2959b425e87fcbca66f94115037d8e6021046114"' }>
                                            <li class="link">
                                                <a href="components/CheckboxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckboxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatePickerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatePickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RadioInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RadioInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextareaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextareaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IrccDsAngularHeaderFooterModule.html" data-type="entity-link" >IrccDsAngularHeaderFooterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IrccDsAngularHeaderFooterModule-5e5184ee5f0b6e46cd9eef62a6303fa55098947447e507525ff93ea3b1262e2616b94f04b3aabbcf68c26453100f5688a3a0a1046ee3c3cfc7f6c4edfc46564d"' : 'data-target="#xs-components-links-module-IrccDsAngularHeaderFooterModule-5e5184ee5f0b6e46cd9eef62a6303fa55098947447e507525ff93ea3b1262e2616b94f04b3aabbcf68c26453100f5688a3a0a1046ee3c3cfc7f6c4edfc46564d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IrccDsAngularHeaderFooterModule-5e5184ee5f0b6e46cd9eef62a6303fa55098947447e507525ff93ea3b1262e2616b94f04b3aabbcf68c26453100f5688a3a0a1046ee3c3cfc7f6c4edfc46564d"' :
                                            'id="xs-components-links-module-IrccDsAngularHeaderFooterModule-5e5184ee5f0b6e46cd9eef62a6303fa55098947447e507525ff93ea3b1262e2616b94f04b3aabbcf68c26453100f5688a3a0a1046ee3c3cfc7f6c4edfc46564d"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HiddenNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HiddenNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LanguageSwitchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LanguageSwitchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IrccDsAngularLegacyOldModule.html" data-type="entity-link" >IrccDsAngularLegacyOldModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IrccDsAngularLegacyOldModule-f414733ccc0bc11f06d4710d8a63b9a8a2ff739fa6722830a4d89013b25ad557ac6784ea2053dd91033cf4f6f80b0474bca85ff39f6d863ad18a99ad843786f4"' : 'data-target="#xs-components-links-module-IrccDsAngularLegacyOldModule-f414733ccc0bc11f06d4710d8a63b9a8a2ff739fa6722830a4d89013b25ad557ac6784ea2053dd91033cf4f6f80b0474bca85ff39f6d863ad18a99ad843786f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IrccDsAngularLegacyOldModule-f414733ccc0bc11f06d4710d8a63b9a8a2ff739fa6722830a4d89013b25ad557ac6784ea2053dd91033cf4f6f80b0474bca85ff39f6d863ad18a99ad843786f4"' :
                                            'id="xs-components-links-module-IrccDsAngularLegacyOldModule-f414733ccc0bc11f06d4710d8a63b9a8a2ff739fa6722830a4d89013b25ad557ac6784ea2053dd91033cf4f6f80b0474bca85ff39f6d863ad18a99ad843786f4"' }>
                                            <li class="link">
                                                <a href="components/AutocompleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutocompleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChipItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChipItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChipListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChipListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SecondaryChipsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecondaryChipsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/accordionContainerComponent.html" data-type="entity-link" >accordionContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/codeViewerComponent.html" data-type="entity-link" >codeViewerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ComponentPreviewComponent.html" data-type="entity-link" >ComponentPreviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoTextSmallComponent.html" data-type="entity-link" >InfoTextSmallComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InteractiveDemoComponent.html" data-type="entity-link" >InteractiveDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/resizableContainerComponent.html" data-type="entity-link" >resizableContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TitleSlugUrlComponent.html" data-type="entity-link" >TitleSlugUrlComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LabelButtonService.html" data-type="entity-link" >LabelButtonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LanguageSwitchButtonService.html" data-type="entity-link" >LanguageSwitchButtonService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAccordionContainerConfig.html" data-type="entity-link" >IAccordionContainerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBannerConfig.html" data-type="entity-link" >IBannerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBreadcrumbConfig.html" data-type="entity-link" >IBreadcrumbConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IButtonConfig.html" data-type="entity-link" >IButtonConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICheckBoxComponentConfig.html" data-type="entity-link" >ICheckBoxComponentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICodeViewerConfig.html" data-type="entity-link" >ICodeViewerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICTAConfig.html" data-type="entity-link" >ICTAConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDatePickerConfig.html" data-type="entity-link" >IDatePickerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDatePickerDropDownConfigs.html" data-type="entity-link" >IDatePickerDropDownConfigs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDatePickerErrorMessages.html" data-type="entity-link" >IDatePickerErrorMessages</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDatePickerUnknownDateToggleConfig.html" data-type="entity-link" >IDatePickerUnknownDateToggleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDropdownConfig.html" data-type="entity-link" >IDropdownConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IErrorComponentConfig.html" data-type="entity-link" >IErrorComponentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IErrorIconConfig.html" data-type="entity-link" >IErrorIconConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFlyoutConfig.html" data-type="entity-link" >IFlyoutConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFlyoutOptionConfig.html" data-type="entity-link" >IFlyoutOptionConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHiddenNavConfig.html" data-type="entity-link" >IHiddenNavConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IIconButtonComponentConfig.html" data-type="entity-link" >IIconButtonComponentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IIconButtonIconConfig.html" data-type="entity-link" >IIconButtonIconConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IIconConfig.html" data-type="entity-link" >IIconConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IIndicatorConfig.html" data-type="entity-link" >IIndicatorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IInputComponentConfig.html" data-type="entity-link" >IInputComponentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILabelConfig.html" data-type="entity-link" >ILabelConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILabelIconConfig.html" data-type="entity-link" >ILabelIconConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILinkComponentConfig.html" data-type="entity-link" >ILinkComponentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOption.html" data-type="entity-link" >IOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProgressIndicatorConfig.html" data-type="entity-link" >IProgressIndicatorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProgressTagsConfig.html" data-type="entity-link" >IProgressTagsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRadioInputComponentConfig.html" data-type="entity-link" >IRadioInputComponentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRadioInputOption.html" data-type="entity-link" >IRadioInputOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchInputButtonConfig.html" data-type="entity-link" >ISearchInputButtonConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchInputConfig.html" data-type="entity-link" >ISearchInputConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISelectConfig.html" data-type="entity-link" >ISelectConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISelectOptionsConfig.html" data-type="entity-link" >ISelectOptionsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISkipLinkConfig.html" data-type="entity-link" >ISkipLinkConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISpinnerConfig.html" data-type="entity-link" >ISpinnerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStepConfig.html" data-type="entity-link" >IStepConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITabConfig.html" data-type="entity-link" >ITabConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITabNavConfig.html" data-type="entity-link" >ITabNavConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITextareaComponentConfig.html" data-type="entity-link" >ITextareaComponentConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/slugTitleURLConfig.html" data-type="entity-link" >slugTitleURLConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});