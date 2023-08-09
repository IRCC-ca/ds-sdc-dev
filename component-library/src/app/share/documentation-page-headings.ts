import {
  slugAnchorType,
  slugTitleURLConfig
} from '@app/components/title-slug-url/title-slug-url.component';

interface headingConfigs {
  interactiveDemoSlugConfig: slugTitleURLConfig;
  typesSlugConfig: slugTitleURLConfig;
  configurationSlugConfig: slugTitleURLConfig;
  configurationMainSlugConfig: slugTitleURLConfig;
  configurationSubSlugConfig: slugTitleURLConfig;
  guidelineSlugConfig: slugTitleURLConfig;
  anatomySlugConfig: slugTitleURLConfig;
  specsSlugConfig: slugTitleURLConfig;
  contentGuideSlugConfig: slugTitleURLConfig;
  figmaSlugConfig: slugTitleURLConfig;
  accessibilitySlugConfig: slugTitleURLConfig;
  researchSlugConfig: slugTitleURLConfig;
}
export const docPageheadingConfig: headingConfigs = {
  interactiveDemoSlugConfig: {
    title: 'General.InteractiveDemo',
    anchorType: slugAnchorType.primary
  },

  typesSlugConfig: {
    title: 'General.TypesHeading',
    anchorType: slugAnchorType.primary
  },

  configurationSlugConfig: {
    title: 'General.ConfigurationsHeading',
    anchorType: slugAnchorType.primary
  },

  configurationMainSlugConfig: {
    title: 'General.ConfigurationsMain',
    anchorType: slugAnchorType.primary
  },

  configurationSubSlugConfig: {
    title: 'General.ConfigurationsSub',
    anchorType: slugAnchorType.primary
  },

  guidelineSlugConfig: {
    title: 'General.DesignGuidelinesHeading',
    anchorType: slugAnchorType.primary
  },

  anatomySlugConfig: {
    title: 'General.AnatomyHeading',
    anchorType: slugAnchorType.primary
  },

  specsSlugConfig: {
    title: 'General.SpecsHeading',
    anchorType: slugAnchorType.primary
  },

  contentGuideSlugConfig: {
    title: 'General.ContentGuidelinesHeading',
    anchorType: slugAnchorType.primary
  },

  figmaSlugConfig: {
    title: 'General.FigmaHeading',
    anchorType: slugAnchorType.primary
  },

  accessibilitySlugConfig: {
    title: 'General.AccessibilityHeading',
    anchorType: slugAnchorType.primary
  },

  researchSlugConfig: {
    title: 'General.ResearchHeading',
    anchorType: slugAnchorType.primary
  }
};
