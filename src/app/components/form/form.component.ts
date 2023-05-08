import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  public form: FormGroup = new FormGroup({});
  public textControl: FormControl<string | null> = new FormControl<
    string | null
  >(null, [Validators.required]);
  public error = false;

  @Output()
  public calculate: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.setForm();
  }

  public async onSubmit() {
    if (this.form.valid) {
      this.calculate.emit(this.textControl.value ?? '');
    } else {
      this.error = true;
    }
  }

  private setForm() {
    this.form = new FormGroup({
      text: this.textControl,
    });
  }
}
