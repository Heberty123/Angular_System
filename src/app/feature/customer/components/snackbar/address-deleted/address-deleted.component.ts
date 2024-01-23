import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-deleted',
  templateUrl: './address-deleted.component.html',
  styleUrls: ['./address-deleted.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class AddressDeletedComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
