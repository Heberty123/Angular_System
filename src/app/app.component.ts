import { Component, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InteractionService } from './resources/interaction.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Amelia_Angular';
  showFiller: boolean = false;
  opened: boolean;

  constructor(private interactionService: InteractionService){
    this.opened = this.interactionService.getValor();
  }

  changeOpened(value: boolean): void{
    this.opened = this.interactionService.setValor(value);
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
