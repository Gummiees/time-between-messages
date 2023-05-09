import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { Results } from 'src/app/app.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent {
  @Input()
  public results?: Results[];
  @Output()
  public clean: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  public onClean() {
    this.clean.emit();
  }

  public parseDiff(diff: number): string {
    const tempTime = moment.duration(diff);
    return `${tempTime.minutes()}m ${tempTime.seconds()}s`;
  }
}
