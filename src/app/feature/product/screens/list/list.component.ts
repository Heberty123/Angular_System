import { Component } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  rowClicked(row: Product): void {
    console.log(row);
  }
}
