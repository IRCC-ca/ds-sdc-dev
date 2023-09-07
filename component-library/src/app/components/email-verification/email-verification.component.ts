import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  IButtonConfig,
  IInputComponentConfig
} from 'ircc-ds-angular-component-library';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export enum mobileBehaviourType {
  fullWidth = 'fullWidth',
  column = 'column'
}
export interface IEmailVerificationConfig {
  id: string;
}

@Component({
  selector: 'email-verification-container',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class emailVerificationComponent
  implements OnInit, AfterViewInit, AfterContentChecked
{
  @Input() config: IEmailVerificationConfig = {
    id: ''
  };
  form = new FormGroup({});

  status: string = 'start';
  subject = webSocket(
    'wss://7g2z37hj48.execute-api.ca-central-1.amazonaws.com/production'
  );

  emailconfig: IInputComponentConfig = {
    formGroup: this.form,
    id: 'emailconfig',
    label: 'email',
    size: 'small'
  };

  buttonConfig: IButtonConfig = {
    id: 'submit-request-btn',
    category: 'primary',
    size: 'small',
    ariaLabel: ''
  };

  constructor(
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.subject.subscribe({
      next: (msg: any) => {
        // console.log('onmessage - next: ', msg);
        console.log(msg);
        if (msg.message === 'You Have been veried!') {
          this.status = 'verified';
        }

        if (msg.message === 'formSent') {
          this.status = 'done';
        }
      },
      error: (err) => {
        this.reset();
        console.log(err);
      }, // Called if at any point WebSocket API signals some kind of error.
      complete: () => {
        this.reset();
      } // Called when connection is closed (for whatever reason).
    });
    this.status = 'start';

    this.subject.next({
      action: 'onConnectRoute',
      route: 'onConnectRoute'
    });

    this.form.addControl(
      this.emailconfig.id,
      new FormControl('', Validators.required)
    );
  }

  sendSocketMessage() {
    this.subject.next({
      action: 'sendVerificationEmailRoute',
      route: 'sendVerificationEmailRoute',
      email: this.form.get(this.emailconfig.id)?.value
    });
    this.status = 'waiting';
  }

  submitForm() {
    const data = localStorage.getItem('requestFormData');
    this.subject.next({
      action: 'sendFormInfoRoute',
      route: 'sendFormInfoRoute',
      email: data
    });
    this.status = 'sendingEmail';
  }

  reset() {
    this.status = 'start';
  }

  ngAfterViewInit() {}
}
