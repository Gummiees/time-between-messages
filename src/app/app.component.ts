import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public loading = false;
  public failed = false;
  public results?: string;

  private maxTimeInSeconds = 60;

  public onCalculate(text: string) {
    this.failed = false;
    this.showResults(text);
  }

  private showResults(results: string) {
    const awaitingTime = this.randomIntFromInterval(500, 3000);
    this.loading = true;
    setTimeout(() => {
      this.results = results;
      this.loading = false;
    }, awaitingTime);
  }

  public onClean() {
    this.results = undefined;
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
