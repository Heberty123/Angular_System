import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CustomerComponent } from './feature/customer/customer.component';
import { ProductComponent } from './feature/product/product.component';
import { OrderComponent } from './feature/order/order.component';
import { HomeComponent } from './feature/home/home.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { InventoryControlComponent } from './feature/inventory-control/inventory-control.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent,  },
    { path: 'client', component: CustomerComponent },
    { path: 'product', component: ProductComponent },
    { path: 'order', component: OrderComponent },
    { path: 'inventory-control', component: InventoryControlComponent },
    { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}