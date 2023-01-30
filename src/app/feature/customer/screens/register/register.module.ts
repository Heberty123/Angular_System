import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule } from '../../components/forms/forms.module';
import { ListsModule } from '../../components/lists/lists.module';
import { DisableComponentsService } from './services/disable-address.service';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ListsModule,
  ],
  exports: [
    RegisterComponent
  ],
  providers: [DisableComponentsService]
})
export class RegisterModule { }
