import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerWrapperComponent } from './components/mat-datepicker-wrapper/mat-datepicker-wrapper.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


// Registrando o locale
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserListComponent,
    MatDatepickerWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Definindo a linguagem padrão
  ],
  exports: [
    MatDatepickerWrapperComponent,
    UserFormComponent,
    UserListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
