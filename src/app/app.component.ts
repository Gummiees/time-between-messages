import { Component } from '@angular/core';
import * as moment from 'moment';
import { FormResult } from './components/form/form.component';

export type Results = {
  diff: number;
  line: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public loading = false;
  public hasErrors: boolean = false;
  public errors: string[] = [];
  public results: Results[] = [];
  public formResults?: FormResult;

  private maxTimeInSeconds = 60;

  public onSearch(formResult: FormResult) {
    this.formResults = formResult;
    this.hasErrors = false;
    this.setLoading();
    this.errors = this.linesWithErrors(formResult.search);
    if (this.errors.length || !this.usernameIsFound(formResult)) {
      this.hasErrors = true;
      return;
    }
    this.results = this.calculateResults(formResult);
  }

  private usernameIsFound(formResult: FormResult): boolean {
    return formResult.search.includes(formResult.username);
  }

  private linesWithErrors(text: string): string[] {
    const errors: string[] = [];
    this.getLines(text).forEach((line) => {
      if (!this.isLineCorrect(line)) {
        errors.push(line);
      }
    });
    return errors;
  }

  private getLines(text: string): string[] {
    return text.split('\\n');
  }

  private isLineCorrect(line: string): boolean {
    return line.at(0) === '(';
  }

  private getLineTimeStamp(line: string): Date {
    const i = line.indexOf(')');
    const substr = line.substring(1, i - 4);
    return moment(substr, 'HH:mm:ss').toDate();
  }

  private lineIsFromUsername(line: string, username: string): boolean {
    return line.includes(username);
  }

  private getTimeStamps(lines: string[]): Date[] {
    const timeStamps: Date[] = [];
    lines.forEach((line) => {
      const timeStamp = this.getLineTimeStamp(line);
      timeStamps.push(timeStamp);
    });
    return timeStamps;
  }

  private calculateResults(formResult: FormResult): Results[] {
    const lines: string[] = formResult.search.split('\n');
    const timeStamps: Date[] = this.getTimeStamps(lines);

    const results: Results[] = [];

    for (let i = 1; i < timeStamps.length; i++) {
      if (!this.lineIsFromUsername(lines[i], formResult.username)) {
        continue;
      }
      const initTimeStamp = moment(timeStamps[i - 1]);
      const laterTimeStamp = moment(timeStamps[i]);

      const diff = laterTimeStamp.diff(initTimeStamp);
      if (diff > this.maxTimeInSeconds * 1000) {
        results.push({ diff: diff, line: lines[i] });
      }
    }
    return results;
  }

  public onClean() {
    this.results = [];
    this.formResults = undefined;
  }

  private setLoading() {
    this.loading = true;
    const awaitingTime = this.randomIntFromInterval(1000, 3000);
    setTimeout(() => {
      this.loading = false;
    }, awaitingTime);
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
