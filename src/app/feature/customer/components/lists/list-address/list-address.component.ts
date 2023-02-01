import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/shared/interfaces/address';
import { DisableComponentsService } from '../../../screens/register/services/disable-address.service';

@Component({
  selector: 'list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {

  @Input() addresses: Address[] = [];
  @Output() removeOneAddressFromList = new EventEmitter<number>();
  subscription: Subscription;
  listBlocked: boolean;

  constructor(private disableComponents: DisableComponentsService){}

  ngOnInit(): void {
    this.subscription = this.disableComponents.getAddressDisabled()
      .subscribe({
        next: (value: boolean) => {
          if(value)
            this.listBlocked = true;
          else
            this.listBlocked = false;  
        }
      });
  }

  addressRemoved(id: number): void {
    this.removeOneAddressFromList.emit(id);
  }
}
