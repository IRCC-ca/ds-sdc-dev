import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  form = new FormGroup({});
  private formStateSubj = new BehaviorSubject<FormGroup>(this.form);
  formStateObs$ = this.formStateSubj.asObservable();

  updateFormGroup(form: FormGroup) {
    this.form = form;
    console.log(this.form.value, 'SERVICE')
  }

  broadcastFormGroup() {
    this.formStateSubj.next(this.form);
  }
}
