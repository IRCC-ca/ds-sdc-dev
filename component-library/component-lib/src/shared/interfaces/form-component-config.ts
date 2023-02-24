import { FormGroup } from "@angular/forms";

export interface FormComponentConfig {
  formGroup: FormGroup;
  id: string; //used for identifying the component everywhere and should NEVER be missing
}
