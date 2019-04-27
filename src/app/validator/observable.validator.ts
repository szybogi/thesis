import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer, of, combineLatest, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, switchMap, debounceTime, tap, withLatestFrom, share, finalize, mergeMap, takeLast } from 'rxjs/operators';

/**
 * Generic async validator creator for observables
 * @param observable a funcion which returns an observable based on the control
 * @param resolver a function which resolves the result of the observable
 * @param debounce time, prevents server stress
 */
export function validateObservable<T>(
	observable: (control: T) => Observable<T>,
	resolver: (result: T) => ValidationErrors | undefined,
	debounce: number = 500,
	condition: boolean = true
): AsyncValidatorFn {
	console.log('created subs');
	const subject = new ReplaySubject<T>(1);
	const errors$ = subject.asObservable().pipe(
		debounceTime(debounce),
		tap(error => console.log('afterdeb : ' + error)),
		switchMap(t => observable(t)),
		tap(error => console.log(error)),
		// share(),
		finalize(() => console.log('finalized'))
	);
	return (ctrl: AbstractControl): Observable<ValidationErrors | undefined> => {
		subject.next(ctrl.value);
		console.log('ctrl.value: ' + ctrl.value);
		return errors$;
	};
}

/*

condition
			? timer(debounce).pipe(
					withLatestFrom(observable(ctrl)),
					tap(a => console.log('asdasd: ' + a)),
					map(([a, b]) => b),
					map(resolver)
			  )
			: of(undefined);*/
