import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IBannerConfig } from './banner.component';

interface IBannerToggle {
  id: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private bannerSubj = new BehaviorSubject<IBannerConfig>({
    id: ''
  });
  bannerSubjObs$ = this.bannerSubj.asObservable();

  private toggleSubj = new BehaviorSubject<IBannerToggle>({
    id: '',
    value: false
  });
  toggleSubjObs$ = this.toggleSubj.asObservable();

  setBanner = (update: IBannerConfig) => {
    this.bannerSubj.next(update);
  };

  toggleBanner = (id: string, value: boolean) => {
    this.toggleSubj.next({ id, value });
  };
}
