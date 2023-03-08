import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionEvaluatorComponent } from './expression-evaluator.component';

describe('ExpressionEvaluatorComponent', () => {
  let component: ExpressionEvaluatorComponent;
  let fixture: ComponentFixture<ExpressionEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionEvaluatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressionEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Arithmetic Expression Evaluation - double result', () => {
    expect(component.isExpressionValid('3+2+4')).toBe(true);
    expect(component.isExpressionValid('+2')).toBe(true);
    expect(component.isExpressionValid('-2')).toBe(true);
    expect(component.isExpressionValid('sin(sin(30) + cos(20))')).toBe(true);
    expect(component.isExpressionValid('sin(30) + cos(20)')).toBe(true);
    expect(component.isExpressionValid('sin(30')).toBe(false);
    expect(component.isExpressionValid('3++')).toBe(false);
    expect(component.isExpressionValid('3+')).toBe(false);
});
});
