import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent {
  @Input()
  public results?: string;
  @Output()
  public clean: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  public onClean() {
    this.clean.emit();
  }
}
