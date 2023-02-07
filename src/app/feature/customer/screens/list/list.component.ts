import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  
  @Input() value: number;

  ngOnInit(): void {
    console.log(this.value);
  }

}
