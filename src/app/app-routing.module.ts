import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'calculator',
    loadChildren: () =>
      import('./components/calculator/calculator.module').then((x) => x.CalculatorModule),
  },
  {
    path: 'supr-calculator',
    loadChildren: () =>
    import('./components/supr-calculator/supr-calculator.module').then((x) => x.SuprCalculatorModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
