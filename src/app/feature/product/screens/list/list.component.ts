import { Component, EventEmitter, Output } from '@angular/core';
import { SimpleProduct } from 'src/app/shared/interfaces/simpleProduct';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Output() rowClicked: EventEmitter<SimpleProduct> = new EventEmitter<SimpleProduct>();
}
