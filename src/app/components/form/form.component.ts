import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnDestroy {
  public form: FormGroup = new FormGroup({});
  public textControl: FormControl<string | null> = new FormControl<
    string | null
  >(null, [Validators.required]);

  @Output()
  public calculate: EventEmitter<string> = new EventEmitter();

  private subscription?: Subscription;

  constructor(private formService: FormService) {
    this.setForm();
    this.listenToFormDisabled();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public async onSubmit() {
    if (this.form.valid) {
      this.calculate.emit(this.textControl.value ?? '');
    }
  }

  private listenToFormDisabled() {
    this.subscription = this.formService.isFormDisabled$.subscribe(
      (isDisabled) => {
        if (isDisabled) {
          this.form.disable();
        } else {
          this.form.enable();
        }
      }
    );
  }

  private setForm() {
    this.form = new FormGroup({
      text: this.textControl,
    });
  }
}
