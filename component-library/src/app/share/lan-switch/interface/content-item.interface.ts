export interface ContentItem {
  title: string;
  description: string;
  number?: number;
}

export enum doDontTypes {
  do = 'do',
  dont = 'dont'
}

export interface doAndDontObject {
  doImgPath: string;
  doImgAlt: string;
  doImgDescription: string;
  dontImgPath: string;
  dontImgAlt: string;
  dontImgDescription: string;
}

export interface guideLinesContentType 
  {
    title: string;
    description: string;
    doAndDontObjectArray: doAndDontObject[]
  }

