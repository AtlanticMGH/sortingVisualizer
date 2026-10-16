import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Balken } from './balken';
import { Sorting } from './sorting';
import { Random } from './random';
import { Time } from './time';

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
  time = new Time;


  bars = signal<Balken[]>([])


  create_bars(){
    const neu: Balken[] = [];
    for(let i = 0; i<100; i++) {
      neu.push(new Balken(this.random.getRandomBetween(10, 300)));
    }
    this.bars.set(neu);
  }

  sort() {
    const kopie = [...this.bars()];
    this.sorting.bubbleSort(kopie);
    this.bars.set(kopie);
  }

  async sortStep() {
    const kopie = [...this.bars()];
    for (let i = 0; i < kopie.length; i++) {
      for (let j = 0; j < kopie.length - i - 1; j++) {
        this.sorting.bubbleSortStep(kopie, j);
        this.bars.set([...kopie]);
        await this.time.sleep(10);
      }
    }
  }
}
