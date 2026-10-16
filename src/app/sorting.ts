import { Balken } from './balken';

export class Sorting {
  bubbleSort(arr: Balken[]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].getHight() > arr[j + 1].getHight()) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  }
}
