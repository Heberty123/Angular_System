import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatStepperModule } from "@angular/material/stepper";
import { AddressesDetailsComponent } from "../../components/addresses-details/addresses-details.component";
import { DependentsComponent } from "../../components/dependents-details/dependents.component";
import { FormCustomerComponent } from "../../components/forms/form-customer/form-customer.component";
import { OrdersComponent } from "../../components/orders/orders.component";
import { PaymentsModule } from "../../components/payments-details/payments.module";
import { DetailsComponent } from "./details.component";
import {MatTabsModule} from '@angular/material/tabs';
import { DetailsRoutingModule } from "./details.routing.module";




@NgModule({
    declarations: [
        DetailsComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatStepperModule,
        PaymentsModule,
        MatProgressSpinnerModule,
        FormCustomerComponent,
        AddressesDetailsComponent,
        DependentsComponent,
        OrdersComponent,
        MatTabsModule, 
        DetailsRoutingModule,
    ],
    exports: [
        DetailsComponent
    ]
})
export class DetailsModule {  }