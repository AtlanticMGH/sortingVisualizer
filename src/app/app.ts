import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Balken } from './balken';
import { bubbleSort } from './bubbleSort';
import { quickSort } from './quickSort';
import { Random } from './random';
import { Time } from './time';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('grafikBase');
  bubbleSort = new bubbleSort;
  random = new Random;
  time = new Time;
  quickSort = new quickSort;

  sorting_running = signal(false);

  bars = signal<Balken[]>([])
  steps = signal(0);

  isStepping = signal(false);

  toggleStepping() {
    this.isStepping.update(v => !v);
  }

  ngOnInit() {
    this.create_bars();
  }

  create_bars(){
    const neu: Balken[] = [];
    for(let i = 0; i<100; i++) {
      neu.push(new Balken(this.random.getRandomBetween(10, 300)));
    }
    this.bars.set(neu);
  }

  sort() {
    const kopie = [...this.bars()];
    this.bubbleSort.bubbleSort(kopie);
    this.bars.set(kopie);
  }

  resetSteps() {
    this.steps.set(0)
  }

  addStep() {
    this.steps.set(this.steps()+1)
  }

  async bubbleSortStep() {
    if (this.sorting_running()) return;
    this.sorting_running.set(true);
    try {
      this.resetSteps();
      const kopie = [...this.bars()];
      for (let i = 0; i < kopie.length; i++) {
        for (let j = 0; j < kopie.length - i - 1; j++) {
          this.bubbleSort.bubbleSortStep(kopie, j);
          this.bars.set([...kopie]);
          this.addStep();
          await this.time.sleep(10);
        }
      }
    } finally {
      this.sorting_running.set(false);
    }
  }

  async quickSortNormal() {
    if (this.sorting_running()) return;
    this.sorting_running.set(true);
    try {
      this.resetSteps()
      const kopie = [...this.bars()];
      await this.quickSort.quickSortStep(kopie, async (arr) => {
        this.bars.set([...arr]);
        this.addStep();
        await this.time.sleep(10);
      });
    } finally {
      this.sorting_running.set(false);
    }
  }

  async quickSortStep() {
    const kopie = [...this.bars()];
    await this.quickSort.quickSortStep(kopie, async (arr) => {
      this.bars.set([...arr]);
      this.addStep();
    });
  }

  async runQuickSort() {
    if (this.isStepping()) {
      this.quickSortNormal()
    } else {
      await this.quickSortStep();
    }
  }

}
