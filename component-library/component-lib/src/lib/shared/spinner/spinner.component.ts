import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DSFullSizes, DSOrientations } from '../../../public-api';

export enum SpinnerType {
  active = 'active',
  success = 'success',
  critical = 'critical'
};
export interface ISpinnerConfig {
  id: string,
  type?: keyof typeof SpinnerType,
  size?: keyof typeof DSFullSizes,
  orientation?: keyof typeof DSOrientations,
}
@Component({
  selector: 'lib-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {

  label: string = 'Label';
  desc: string = 'Description';

  @Input() config: ISpinnerConfig = {
    id: '',
  };
  @Input() id = '';
  @Input() type?: keyof typeof SpinnerType | SpinnerType;
  @Input() size?: keyof typeof DSFullSizes | DSFullSizes;
  @Input() orientation?: keyof typeof DSOrientations | DSOrientations;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    if (!this.config.orientation) this.config.orientation = 'horizontal';
    if (!this.config.size) this.config.size = 'large';
    
    if (this.id) this.config.id = this.id;
    if (this.type) this.config.type = this.type;
    if (this.size) this.config.size = this.size;
    if (this.orientation) this.config.orientation = this.orientation;
  };
  
  ngAfterViewInit() {
    this.removeVertical();
  };

  removeVertical() {
    if (this.config.size !== 'large' && this.config.orientation === 'vertical') {
      let id = document.getElementById(this.config?.id);
      id?.classList.replace('vertical', 'horizontal');
    }
  };

}