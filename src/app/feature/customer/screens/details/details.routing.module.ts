import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddressesDetailsComponent } from "../../components/addresses-details/addresses-details.component";
import { DependentsComponent } from "../../components/dependents-details/dependents.component";
import { PaymentsComponent } from "../../components/payments-details/payments.component";
import { OrdersComponent } from "../../components/orders/orders.component";
import { DetailsComponent } from "./details.component";


const routes: Routes = [
    {
        path: '', component: DetailsComponent, 
        children: [
            {path: 'addresses', component: AddressesDetailsComponent, data: { animationState: 'New' }},
            {path: 'dependents', component: DependentsComponent, data: { animationState: 'List' }},
            {path: 'payments', component: PaymentsComponent/*, data: { animationState: 'Id' }*/},
            {path: 'orders', component: OrdersComponent/*, data: { animationState: 'Id' }*/},
            {path: '', redirectTo: '.addresses', pathMatch: 'full' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DetailsRoutingModule {}