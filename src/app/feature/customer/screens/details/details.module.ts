import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { MatInputModule } from '@angular/material/input';
import { ListAddressItemModule } from 'src/app/shared/components/list-address-item/list-address-item.module';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddAddressModule } from '../../components/dialogs/add-address/add-address.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ListAddressItemModule,
    AddAddressModule,
    MatSnackBarModule,
  ],
  exports: [
    DetailsComponent
  ],
  providers: []
})
export class DetailsModule { }
