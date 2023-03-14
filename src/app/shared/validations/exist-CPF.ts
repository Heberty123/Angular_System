import { AbstractControl, ValidationErrors } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { CustomerService } from "../resources/customer.service";


export const existCPF = (service: CustomerService, ignoreCPF?: string) => (control: AbstractControl): Observable<ValidationErrors | null> => {


  if(control.value?.length == 14 && !(ignoreCPF === control.value)){
    return service.existByCPF(control.value).pipe(
      map(
        exist => {
          return (exist) ? { "appExistCPF": "O cpf já existe." } : null;
        }
      ));
  }    
  return of (null);
};