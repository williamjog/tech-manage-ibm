import { User } from 'src/interfaces/user.interface';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserListComponent,
    UserFormComponent
  ]
})
export class UserModule { }
