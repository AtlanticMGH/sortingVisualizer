import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Balken } from './balken';
import { Sorting } from './sorting';
import { Random } from './random';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('grafikBase');
  sorting = new Sorting;
  random = new Random;

  bars = signal<Balken[]>([
    for(let a = 0; a<20; a++) {

    }
  ])

  sort() {
    const kopie = [...this.bars()];
    this.sorting.bubbleSort(kopie);
    this.bars.set(kopie);
  }
}
