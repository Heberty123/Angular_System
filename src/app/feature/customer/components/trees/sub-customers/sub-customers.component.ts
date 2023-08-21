import { Component, Input } from "@angular/core";
import { Customer } from "src/app/shared/interfaces/customer";

@Component({
  selector: 'sub-customers',
  templateUrl: './sub-customers.component.html',
  styleUrls: ['./sub-customers.component.css']
})
export class SubCustomersComponent {

  @Input() data: Customer[];
}
