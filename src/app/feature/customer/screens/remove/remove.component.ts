import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {

  @Input() value: number;

  ngOnInit(): void {
    console.log(this.value);
  }
}
