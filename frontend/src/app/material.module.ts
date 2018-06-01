import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
   imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatExpansionModule, MatSelectModule, MatListModule, MatDatepickerModule, MatNativeDateModule],
   exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatExpansionModule, MatSelectModule, MatListModule, MatDatepickerModule, MatNativeDateModule]
})

export class MaterialModule { }