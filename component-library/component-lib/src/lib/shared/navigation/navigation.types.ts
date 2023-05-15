import { DSSizes } from '../../../shared/constants/jl-components.constants';
import { IndicatorStatus, IndicatorType } from '../indicator/indicator.component';

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
