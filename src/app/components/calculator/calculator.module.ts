import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator.component';

@NgModule({
  declarations: [
    CalculatorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalculatorRoutingModule,
  ],
  providers: [],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule { }
