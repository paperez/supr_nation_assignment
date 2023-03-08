import { Injectable } from '@angular/core';
import { Constants } from '../../app.constants';
import { degreesToRadians } from '../../app.utils';

@Injectable({
  providedIn: 'root'
})
export class ExpressionEvaluatorService {

  private _expressionStr: string = '';
  private _position = -1;
  private _character: string = '';

  constructor() { }

  isExpressionValid(expression: string) {
    return this.evaluateMathExpression(expression) !== Constants.INVALID_NUMBER;
  }

  evaluateMathExpression(expression: string): number {
      return this._evaluate(expression, false);
  }

  private _evaluate(expression: string, resultIsInteger: boolean): number {
      this._expressionStr = expression;
      this._position = -1;
      const result = this._parse();
      return resultIsInteger ? Math.round(result) : result;
  }

  private _nextChar() {
      this._character = (++this._position < this._expressionStr.length) ? this._expressionStr.charAt(this._position) : '';
  }

  private _eatChar(charToEat: string): boolean {
      while (this._character === ' ') {
          this._nextChar();
      }
      if (this._character === charToEat) {
          this._nextChar();
          return true;
      }
      return false;
  }

  private _parse(): number {
      this._nextChar();
      const x = this._parseExpression();
      if(x === Constants.INVALID_NUMBER) {
        return x;
      }
      if (this._position < this._expressionStr.length) {
          return Constants.INVALID_NUMBER;
      }
      return x;
  }

  private _parseExpression(): number {
      let x = this._parseTerm();
      if(x === Constants.INVALID_NUMBER) {
        return x;
      }
      for (; ; ) {
          let term;
          if (this._eatChar('+')) {  // addition
              term = this._parseTerm();
              if(term === Constants.INVALID_NUMBER) {
                return term;
              }
              x += term;
          } else if (this._eatChar('-')) {  // subtraction
              term = this._parseTerm();
              if(term === Constants.INVALID_NUMBER) {
                return term;
              }
              x -= term;
          } else {
              return x;
          }
      }
  }

  private _parseTerm(): number {
      let x = this._parseFactor();
      if(x === Constants.INVALID_NUMBER) {
        return x;
      }
      for (; ;) {
          if (this._eatChar('*')) {
              x *= this._parseFactor();
          } else if (this._eatChar('/')) {
              x /= this._parseFactor();
          } else {
              return x;
          }
      }
  }

  private _parseFactor(): number {
      if (this._eatChar('+')) {  // unary plus
          return this._parseFactor();
      }
      if (this._eatChar('-')) { // unary minus
          return -this._parseFactor();
      }
      let x;
      const startPos = this._position;
      if (this._eatChar('(')) { // parentheses
          x = this._parseExpression();
          if (!this._eatChar(')')) {
            return Constants.INVALID_NUMBER;
          };
      } else if ((this._character >= '0' && this._character <= '9') || this._character === '.') { // numbers
          while ((this._character >= '0' && this._character <= '9') || this._character === '.') {
              this._nextChar();
          }
          x = parseFloat(this._expressionStr.substring(startPos, this._position));
      } else if (this._character >= 'a' && this._character <= 'z') { // functions
          while (this._character >= 'a' && this._character <= 'z') {
              this._nextChar();
          }
          const func = this._expressionStr.substring(startPos, this._position);
          x = this._parseFactor();
          if(x === Constants.INVALID_NUMBER) {
            return x;
          } else if (func === 'sin') {
              x = Math.sin(degreesToRadians(x));
          } else if (func === 'cos') {
              x = Math.cos(degreesToRadians(x));
          } else if (func === 'tan') {
              x = Math.tan(degreesToRadians(x));
          } else {
              return Constants.INVALID_NUMBER;
          }
      } else {
          return Constants.INVALID_NUMBER;
      }
      
      return x;
  }


}
