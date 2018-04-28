import { ErrorStateMatcher } from '@angular/material';
import { FormControl } from '@angular/forms';

export class ErrorMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: null): boolean {
		return !!(control && control.invalid && (control.dirty || control.touched));
	}
}
