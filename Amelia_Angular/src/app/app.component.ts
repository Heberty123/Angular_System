import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Amelia_Angular';
  showFiller = false;
  opened = true;
  @ViewChild('drawer') drawer_area: ElementRef;

  @HostListener("document:keyup.esc")
  onkeyup() {
    this.opened = false;
  }

  @HostListener('window:keydown.control.m', ['$event']) 
    onKeyDownControlM(e: KeyboardEvent) {
      this.opened = this.opened ? false : true
  }


  closeByClickOut(): void{
    this.opened = false;
  }

}
