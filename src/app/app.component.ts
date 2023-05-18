import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ControlBarcodeReaderService } from './services/control-barcode-reader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Amelia_Angular';
  showFiller: boolean = false;
  opened: boolean;
  barcode: string = '';
  private subscription: Subscription;
  private isThereComponentBarcodeReader?: boolean;
  private lastKeypressTime = 0;
  private maxKeypressDelay = 100; 

  constructor(private controlBarcodeService: ControlBarcodeReaderService) { }

  ngOnInit(): void {
    this.subscription =
      this.controlBarcodeService.isThereComponentReader()
        .subscribe({
          next: (value: boolean) =>
            this.isThereComponentBarcodeReader = value
        });

  }

  changeOpened(value: boolean): void {
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

  @HostListener('window:keypress', ['$event'])
  handleBarcodeEvent(event: KeyboardEvent) {
    if (!(event.target instanceof HTMLInputElement)) {
      const now = new Date().getTime();

      // events must come fast enough to separate from manual input
      if (now - this.lastKeypressTime > this.maxKeypressDelay) 
        this.barcode = '';

      this.lastKeypressTime = now;

      if (event.key !== 'Enter') 
        this.barcode += event.key;
      else {
        if(this.barcode.length > 10){
          if (this.isThereComponentBarcodeReader) {
            this.controlBarcodeService.setBarcodeValue(this.barcode);
          }
          else {
            console.log('Scanned barcode:', this.barcode);
          }
        }
        this.barcode = '';
      }
    }
  }
}
