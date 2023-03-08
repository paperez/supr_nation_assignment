import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuprCalculatorComponent } from './supr-calculator.component';


const routes: Routes = [
  {
    path: '',
    component: SuprCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuprCalculatorRoutingModule { }
