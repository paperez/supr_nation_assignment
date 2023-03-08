import { FormControl } from '@angular/forms';

export interface IExpressionForm {
    expression: FormControl<string | null>;
    result?: FormControl<number | null>;
}

export interface IExpressionListItem {
    expression: string;
    result: number;
}