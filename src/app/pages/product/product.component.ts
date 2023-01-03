import { Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { InteractionService } from 'src/app/resources/interaction.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  valor: boolean;
  subscription: Subscription;
  @ViewChild('MatTabGroup') tabGroup: MatTabGroup;

  constructor(private interactionService: InteractionService){
  }

  ngOnInit(): void {
    this.subscription = this.interactionService.testeApenas$
      .subscribe(valor => {
        this.valor = valor;
        setTimeout(() => {
          this.tabGroup.realignInkBar();
          }, 200)
      });

  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
