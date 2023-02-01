import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InteractionService } from '../../../screens/list/services/interaction.service';

@Component({
  selector: 'form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css']
})
export class FormTableComponent {
  value = '';
  
  searchOptions = new FormControl('');
  inputName = new FormControl('');
  inputCPF = new FormControl('');

  constructor(private interaction: InteractionService){}

  changeOption(): void {
    this.inputName.setValue('');
    this.inputCPF.setValue('');
    this.interaction.sendValueChanged('');
  }

  inputNameChanged(value: string){
    this.interaction.sendValueChanged(value);
  }

  inputCPFChanged(value: string){
    this.interaction.sendValueChanged(value);
  }
}
