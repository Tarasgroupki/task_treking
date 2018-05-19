import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
   imports: [MatButtonModule,MatFormFieldModule,MatInputModule,MatTableModule,MatExpansionModule,MatSelectModule],
   exports: [MatButtonModule,MatFormFieldModule,MatInputModule,MatTableModule,MatExpansionModule,MatSelectModule]
})

export class MaterialModule { }