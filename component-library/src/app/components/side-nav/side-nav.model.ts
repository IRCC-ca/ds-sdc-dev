export enum ItemType {
  Link = 'link',
  PlainText = 'plain_text'
}

export enum ItemCategory {
  Title = 'title',
  subTitle = 'sub-title',
  slugUrl = 'slug-url'
}

export interface ISideNavDataInterface {
  'text': string, // Translation path for text
  'type': ItemType, // If the nav item is a link or plain text
  'category': ItemCategory, // If the nav item is title, subtitle or slug-url
  'path'?: string // Link for nav item
}
