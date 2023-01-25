import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { Subscription } from 'rxjs';
import { InteractionService } from 'src/app/resources/interaction.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy{

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
