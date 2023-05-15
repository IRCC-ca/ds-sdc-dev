import { DSSizes } from '../../../shared/constants/jl-components.constants';

export enum NavigationItemType {
  accordion = 'accordion',
  heading = 'heading',
  link = 'link'
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  type: keyof typeof NavigationItemType;
  size?: keyof typeof DSSizes;
  children: NavigationItem[];
}

export interface NavigationItemAccordion extends NavigationItem {
  open: boolean;
}

export interface NavigationItemLink extends NavigationItem {
  icon: string;
  href: string;
  anchor: boolean;
}

export interface NavigationItemHeading extends NavigationItem {
  icon: string;
}
