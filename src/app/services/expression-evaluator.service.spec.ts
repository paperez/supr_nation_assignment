import { TestBed } from '@angular/core/testing';

import { ExpressionEvaluatorService } from './expression-evaluator.service';

describe('ExpressionEvaluatorService', () => {
  let service: ExpressionEvaluatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressionEvaluatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Evaluate expression service', () => {
    expect(service.isExpressionValid('3+2+4')).toBe(true);
    expect(service.isExpressionValid('+2')).toBe(true);
    expect(service.isExpressionValid('-2')).toBe(true);
    expect(service.isExpressionValid('sin(sin(30) + cos(20))')).toBe(true);
    expect(service.isExpressionValid('sin(30) + cos(20)')).toBe(true);
    expect(service.isExpressionValid('sin(30')).toBe(false);
    expect(service.isExpressionValid('3++')).toBe(false);
    expect(service.isExpressionValid('3+')).toBe(false);
  });
});
