import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerWrapperComponent } from './mat-datepicker-wrapper/mat-datepicker-wrapper.component';



@NgModule({
  declarations: [
    MatDatepickerWrapperComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  exports: [
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerWrapperComponent
  ]
})
export class SharedModule { }
