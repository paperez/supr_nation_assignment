import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors, AbstractControl, ValidatorFn, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil, take } from 'rxjs';
import { ExpressionEvaluatorService } from 'src/app/services/expression-evaluator/expression-evaluator.service';
import { IExpressionForm, IExpressionListItem } from 'src/app/model/model';
import { SuprCalculatorService } from './supr-calculator.service';
@Component({
  selector: 'app-supr-calculator',
  templateUrl: './supr-calculator.component.html',
  styleUrls: ['./supr-calculator.component.scss']
})
export class SuprCalculatorComponent implements OnInit, OnDestroy {

  form: FormGroup<IExpressionForm>;
  result!: Observable<number>;;

  expressionList: IExpressionListItem[] = []; 
  filteredExpressionList: IExpressionListItem[] = []; 
  private _destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _fb: FormBuilder,
    private _expressionEvaluatorSrv: ExpressionEvaluatorService,
    private _suprCalculatorSrv: SuprCalculatorService,
  ) {
    this.form = this._fb.group<IExpressionForm>({
      expression: this._fb.control<string>('', {
        validators: [
          this.mathExpressionValidator()
        ]
      }),
      result: this._fb.control<number>(0),
    })

  }

  evaluateExpression() {
    this.form.get('result')?.setValue(this._expressionEvaluatorSrv.getResult());
    this.form.get('expression')?.setValue('');
  }

  ngOnInit() {
    this.result = this._expressionEvaluatorSrv.expressionEvalObs$;
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.unsubscribe();
  }

  mathExpressionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this._expressionEvaluatorSrv.isExpressionValid(control.value) ? null : { invalidExpression: true };
    }
  }

  getRandomNumber() {
    this._suprCalculatorSrv.getRandomNum().pipe(
      take(1),
    ).subscribe(
      (num) => {
        const currentValue = this.form.get('expression')?.value as string;
        this.form.get('expression')?.setValue(currentValue+num);
      }
    );
  }

  buttonClick(text: string) {
    const currentValue = this.form.get('expression')?.value as string;
    this.form.get('expression')?.setValue(currentValue+text);
  }

}
