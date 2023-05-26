import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OverviewService {
  constructor(private http: HttpClient) {}

  private dataResponse = new BehaviorSubject<any>({});

  dataResponseObs$ = this.dataResponse.asObservable();

  getData(url: string, body: any) {
    this.http.post<any>(url, body).subscribe({
      next: (data) => {
        this.dataResponse.next(data.event.body);
      },
      error: (error) => {
        this.dataResponse.next(`There was an error!: ${error}`);
      }
    });
  }
}
