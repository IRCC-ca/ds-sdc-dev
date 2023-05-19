import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  constructor(private http: HttpClient) { }

  setFormData(data: IRequestFormDataInterface) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    this.requestFormData.next(data);
  }

  getFormData(): Observable<IRequestFormDataInterface> {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.requestFormData.next(JSON.parse(data));
    }
    return this.requestFormObs;
  }

  clearFormData() {
    localStorage.removeItem(this.storageKey);
  }

  cleanAll() {
    localStorage.clear();
  }

  sendRequestForm(email: string, body: any): Observable<IRequestFormDataInterface> {
    console.log("inside sendRequest");

    const params = {
      to: email,
      from: 'robert.brice@cic.gc.ca',
      subject: 'Design System Request',
      text: body,
      html: body,
      headers: {
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Accept"
      }
    };

    return this.http.post('https://y4znrkrrvauyccjgllyspxuwhm0mdqpg.lambda-url.ca-central-1.on.aws/', params)

  }
}
