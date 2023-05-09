import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export type FormResult = {
  username: string;
  search: string;
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  public form: FormGroup = new FormGroup({});
  public usernameControl: FormControl<string | null> = new FormControl<
    string | null
  >(null, [Validators.required]);
  public searchControl: FormControl<string | null> = new FormControl<
    string | null
  >(null, [Validators.required]);
  public error = false;

  @Input()
  public set formResults(results: FormResult | undefined) {
    if (results) {
      this.form.patchValue(results);
    } else {
      this.form.reset();
    }
  }

  @Output()
  public search: EventEmitter<FormResult> = new EventEmitter();

  constructor() {
    this.setForm();
  }

  public async onSubmit() {
    if (this.form.valid) {
      this.search.emit({
        username: this.form.controls.username.value,
        search: this.form.controls.search.value,
      });
    } else {
      this.error = true;
    }
  }

  private setForm() {
    this.form = new FormGroup({
      search: this.searchControl,
      username: this.usernameControl,
    });
  }
}
