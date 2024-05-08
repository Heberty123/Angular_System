import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Subject } from 'rxjs';
import { CustomerService } from 'src/app/shared/resources/customer.service';


@Component({
  selector: 'form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  providers: [
    provideNgxMask()
  ],
})
export class FormCustomerComponent implements OnInit, OnDestroy {
  destroySubject = new Subject<void>();
  @Input() formGroup: FormGroup;
  private regexCPF: string = "^([0-9]{3}\.){2}[0-9]{3}-[0-9]{2}$";

  constructor(private _service: CustomerService){}

  ngOnInit(): void {
    this.formGroup.addControl('id', new FormControl(null))
    this.formGroup.addControl('name', new FormControl(null, [Validators.required]))
    this.formGroup.addControl('cpf', new FormControl(null, [Validators.required, Validators.pattern(this.regexCPF)]))
  }

  get name() {
    return this.formGroup?.get('name');
  }

  get cpf(){
    return this.formGroup?.get('cpf');
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
