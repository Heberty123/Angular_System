import {
  Component,
  forwardRef
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'form-field-custom-control-example',
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: []
})
export class HomeComponent {
  customErrorMessages = {
    required: 'This field is required',
    pattern: 'Invalid format',
    min: 'teste',
  };

  form: FormGroup = new FormGroup({
    tel: new FormControl('tesr', [Validators.required, Validators.min(6)]),
  });
  constructor(){

  }

  submit(): void {
    console.log(this.form.get('tel')?.value)
  }
}