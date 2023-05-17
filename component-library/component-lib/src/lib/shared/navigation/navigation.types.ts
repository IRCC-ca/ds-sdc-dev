import { DSSizes } from '../../../shared/constants/jl-components.constants';
import { IndicatorStatus, IndicatorType } from '../indicator/indicator.component';

export interface INavigationConfig {
  id: string;
  label?: string;
  iconLeading?: string;
  iconTrailing?: string;
  size: keyof typeof DSSizes;
  navigationConfig?: Array<NavigationItem>;
}

export enum NavigationItemType {
  accordion = 'accordion',
  heading = 'heading',
  link = 'link'
}

export enum NavigationStatus {
  notStarted = 'notStarted',
  inProgress = 'inProgress',
  complete = 'complete',
  locked = 'locked'
}

export interface NavigationIndicator {
  status: keyof typeof IndicatorStatus;
  icon: string;
  label?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  type: keyof typeof NavigationItemType;
  size?: keyof typeof DSSizes;
  children: NavigationItem[];
  indicator?: NavigationIndicator;
  border?: boolean;
}

export interface NavigationItemAccordion extends NavigationItem {
  open: boolean;
}

export interface NavigationItemLink extends NavigationItem {
  icon?: string;
  trailingIcon?: string;
  href: string;
  external?: boolean;
  anchor?: string;
}

export interface NavigationItemHeading extends NavigationItem {
  icon: string;
}
