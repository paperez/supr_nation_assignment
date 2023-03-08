import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Calculator form', () => {
    it('should be invalid when not correct input set', () => {
      component.form.get('expression')?.setValue('3++');
      expect(component.form.get('expression')?.errors).toEqual({ invalidExpression: true });
      expect(component.form.valid).toBeFalsy();
      component.form.get('expression')?.setValue('cos(30');
      expect(component.form.get('expression')?.errors).toBeTruthy();
      expect(component.form.valid).toBeFalsy();
    });

    it('should be valid when correct input set', () => {
      component.form.get('expression')?.setValue('3+3');
      expect(component.form.get('expression')?.errors).toBeFalsy();
      expect(component.form.valid).toBeTruthy();
      component.form.get('expression')?.setValue('cos(30)');
      expect(component.form.get('expression')?.errors).toBeFalsy();
      expect(component.form.valid).toBeTruthy();
    });

  });

});
