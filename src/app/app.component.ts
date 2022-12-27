import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Amelia_Angular';
  showFiller = false;
  opened = true;

  @HostListener("document:keyup.esc")
  onkeyup() {
    this.opened = false;
  }

  @HostListener('window:keydown.control.m', ['$event']) 
    onKeyDownControlM() {
      this.opened = this.opened ? false : true
  }


  closeByClickOut(): void{
    this.opened = false;
  }

}
