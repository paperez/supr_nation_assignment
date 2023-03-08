import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SuprCalculatorService {
    
    constructor(
        private _http: HttpClient
    ) {
        
    }

    getRandomNum(): Observable<number> {
        return this._http.get<number>('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain& rnd=new')
    }
}