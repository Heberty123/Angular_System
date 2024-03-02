import {
  Component,
  OnInit,
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
import { TableEntitiesComponent } from 'src/app/shared/components/tables/table-entities/table-entities.component';
import { Payment } from 'src/app/shared/interfaces/payment';
import { PaymentService } from 'src/app/shared/resources/payment.service';

@Component({
  selector: 'form-field-custom-control-example',
  templateUrl: 'home.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    TableEntitiesComponent
  ],
  providers: []
})
export class HomeComponent implements OnInit {

  paymentsToday: Payment[] = [];

  constructor(private _paymentService: PaymentService){}

  ngOnInit(): void {
    this._paymentService.findAllToday()
      .subscribe({
        next: (value: Payment[]) => 
          this.paymentsToday = value
      })
  }

}