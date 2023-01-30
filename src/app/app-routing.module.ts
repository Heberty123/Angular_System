import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CustomerComponent } from './feature/customer/customer.component';

const routes: Routes = [
   /* { path: 'home', component: HomeComponent }, */
    { path: 'client', component: CustomerComponent },
   /* { path: 'product', component: ProductComponent }, */
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}