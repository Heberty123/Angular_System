import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientComponent } from './pages/client/client.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'client', component: ClientComponent },
    { path: 'product', component: ProductComponent },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}