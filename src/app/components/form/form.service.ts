import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private isFormDisabledSubject: Subject<boolean> = new Subject<boolean>();

  public set isFormDisabled(isDisabled: boolean) {
    this.isFormDisabledSubject.next(isDisabled);
  }

  public get isFormDisabled$(): Observable<boolean> {
    return this.isFormDisabledSubject.asObservable();
  }
}
