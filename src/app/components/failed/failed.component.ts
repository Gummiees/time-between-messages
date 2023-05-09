import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
})
export class FailedComponent {
  @Input()
  public errors: string[] = [];

  constructor() {}
}
