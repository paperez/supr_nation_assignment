import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors, AbstractControl, ValidatorFn, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil, map } from 'rxjs';
import { ExpressionEvaluatorService } from 'src/app/services/expression-evaluator/expression-evaluator.service';

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
    private _expressionEvaluator: ExpressionEvaluatorService,
  ) {
    this.form = this._fb.group<IExpressionForm>({
      expression: this._fb.control<string>('', {
        validators: [
          this.mathExpressionValidator()
        ]
      }),
    })

  }

  ngOnInit() {
    this.form.get('expression')?.valueChanges.pipe(
      map(s => this._expressionEvaluator.evaluateMathExpression(s as string)),
      takeUntil(this._destroy),
    ).subscribe(res => (this.result = res));
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.unsubscribe();
  }

  mathExpressionValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      return this._expressionEvaluator.isExpressionValid(control.value) ? null : { invalidExpression: true };
    }
  }



  get expression() {
    return this.form.get('expression');
  }

}
