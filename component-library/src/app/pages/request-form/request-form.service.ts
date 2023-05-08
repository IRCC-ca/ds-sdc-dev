import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface IRequestFormDataInterface {
  ['radio-request-type']?: string;
  ['request-title-text-area']?: string;
  ['request-details-text-area']?: string;
  ['use-case-text-area']?: string;
  ['references-text-area']?: string;
  ['radio-request-urgent']?: string;
  ['urgent-details-text-area']?: string;
  ['date-requested-datepicker_yearControl']?: string;
  ['date-requested-datepicker_monthControl']?: string;
  ['date-requested-datepicker_dayControl']?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class RequestFormService {
  private requestFormData = new BehaviorSubject<IRequestFormDataInterface>({});
  requestFormObs = this.requestFormData.asObservable();

  private storageKey: string = 'requestFormData';
  constructor() {}

  setFormData(data: IRequestFormDataInterface) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    this.requestFormData.next(data);
  }

  getFormData(): Observable<IRequestFormDataInterface> {
    return this.requestFormData;
  }

  clearUserSettings() {
    localStorage.removeItem(this.storageKey);
  }

  cleanAll() {
    localStorage.clear();
  }

  private sesClient: SESClient | null = null;

  onModuleInit() {
    this.sesClient = this.createClient();
  }

  createClient(): SESClient {
    return new SESClient({
      region: 'ca-central-1',
      credentials: {
        accessKeyId: '',
        secretAccessKey: ''
      }
    });
  }
  async sendRequestForm(email: string, body: any) {
    //configure the email params and body to send
    const englishEmail = `
      <p>Design System Request</p>
      <p>Form Details: </p>
      <p id="code-en">${body}</p>`;
    const englishEmailPlain = `
                      Design System Request

                      Form Details:
                      
                      ${body}`;

    let mainBody = '';
    let mainBodyPlain = '';
    mainBody = englishEmail;
    mainBodyPlain = englishEmailPlain;

    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
            <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

            <div style="position:absolute; width:740.89px; height:338.75px; left:21.79px; top:97.75px; font-family:'Roboto',sans-serif; font-style:normal; font-weight:normal; font-size:16.7046px;      line-height:19px; color:#000000">
            ${mainBody}
            </div>`
          },
          Text: {
            Charset: 'UTF-8',
            Data: `
                  ${mainBodyPlain}
                  `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Design System Request`
        }
      },
      Source: 'robert.brice@cic.gc.ca'
    };
    //SES SendEmailCommand method stored as a command for our try block
    const command = new SendEmailCommand(params);
    if (!this.sesClient) this.sesClient = this.createClient();

    //uses the send method with our command and sends the email
    try {
      await this.sesClient.send(command);
      console.debug('Email has been sent successfully! :D');
    } catch (error) {
      console.debug('Email was not sent due to the following error: ', error);
    }
  }

  // saveRequestFormData(
  //   requestFormData:
  //     | IRequestFormDataInterface
  //     | null = null
  // ): Observable<void> {
  //   if (requestFormData) {
  //     this.requestFormData = Object.assign(this.requestFormData, requestFormData)
  //   }

  //  return this.someBackendService.saveToDb({
  //      ...this.requestFormData})
  // }
}
