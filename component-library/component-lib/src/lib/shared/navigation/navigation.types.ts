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
  children: NavigationItem[];
}

export interface NavigationItemAccordion extends NavigationItem {
  open: boolean;
}

export interface NavigationItemLink extends NavigationItem {
  href: string;
  anchor: boolean;
}

export interface NavigationItemHeading extends NavigationItem {}
