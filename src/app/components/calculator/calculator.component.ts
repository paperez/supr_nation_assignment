import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { degreesToRadians } from '../../app.utils';
import { Constants } from '../../app.constants';

interface IExpressionForm {
  expression: FormControl<string | null>;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {

  form: FormGroup<IExpressionForm>;
  result: number = 0;
  private _destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group<IExpressionForm>( {
      expression: this._fb.control<string>(''),
    })

  }
  ngOnInit() {
    this.form.get('expression')?.valueChanges.pipe(
      tap(c => console.log(c)),
      takeUntil(this._destroy),
    ).subscribe();
  }

  ngOnDestroy(): void {
      this._destroy.next(true);
      this._destroy.unsubscribe();
  }

}
