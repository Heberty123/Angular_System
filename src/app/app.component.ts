import { Component, HostListener } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Amelia_Angular';
  showFiller: boolean = false;
  opened: boolean;

  constructor(){}

  changeOpened(value: boolean): void{
    this.opened = value;
  }

  @HostListener("document:keyup.esc")
  onkeyup() {
    this.changeOpened(false);
  }

  @HostListener('window:keydown.control.m') 
    onKeyDownControlM() {
      this.changeOpened(this.opened ? false : true);
  }

}
