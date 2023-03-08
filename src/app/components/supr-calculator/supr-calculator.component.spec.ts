import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuprCalculatorComponent } from './supr-calculator.component';

describe('SuprCalculatorComponent', () => {
  let component: SuprCalculatorComponent;
  let fixture: ComponentFixture<SuprCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuprCalculatorComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuprCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
