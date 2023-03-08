import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SuprCalculatorComponent } from './supr-calculator.component';
import { SuprCalculatorRoutingModule } from './supr-calculator-routing.module';

@NgModule({
  declarations: [
    SuprCalculatorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SuprCalculatorRoutingModule,
  ],
  providers: [],
  exports: [
    SuprCalculatorComponent
  ]
})
export class SuprCalculatorModule { }
