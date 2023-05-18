import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CustomerComponent } from './feature/customer/customer.component';
import { ProductComponent } from './feature/product/product.component';
import { OrderComponent } from './feature/order/order.component';

const routes: Routes = [
   /* { path: 'home', component: HomeComponent }, */
    { path: 'client', component: CustomerComponent },
    { path: 'product', component: ProductComponent },
    { path: 'order', component: OrderComponent }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}