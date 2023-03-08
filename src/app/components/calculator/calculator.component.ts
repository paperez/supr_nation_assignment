import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors, AbstractControl, ValidatorFn, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ExpressionEvaluatorService } from 'src/app/services/expression-evaluator/expression-evaluator.service';
import { Constants } from 'src/app/app.constants';
import { IExpressionForm, IExpressionListItem } from 'src/app/model/model';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {

  form: FormGroup<IExpressionForm>;
  result!: Observable<number>;

  expressionList: IExpressionListItem[] = []; 
  filteredExpressionList: IExpressionListItem[] = []; 
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
    this.result = this._expressionEvaluator.expressionEvalObs$;
    this.form.get('expression')?.valueChanges.pipe(
      takeUntil(this._destroy),
    ).subscribe();
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

  addResultToList() {
    this.expressionList.unshift(
      {
        result: this._expressionEvaluator.getResult(),
        expression: this.expression?.value as string,
      }
    );
    this.filteredExpressionList = this.expressionList.slice(0, Constants.MAX_LIST_NUM_ITEMS);
    this.form.get('expression')?.setValue('');
  }

  get expression() {
    return this.form.get('expression');
  }

}
