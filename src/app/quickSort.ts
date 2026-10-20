import { Balken } from './balken';

export class quickSort {

  partition(arr: Balken[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1
    for (let j = low; j < high; j++) {
      if (arr[j].getHight() <= pivot.getHight()) {
        i += 1;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  doQuickSort(arr: Balken[], low: number, high: number) {
    if (low < high) {
      let pi = this.partition(arr, low, high);
      this.doQuickSort(arr, low, pi - 1);
      this.doQuickSort(arr, pi + 1, high);
    }
  }

  quickSort(arr: Balken[]) {
    this.doQuickSort(arr, 0, arr.length);
  }

  async partitionStep(
    arr: Balken[], low: number, high: number,
    onSwap: (arr: Balken[]) => Promise<void>
  ): Promise<number> {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j].getHight() <= pivot.getHight()) {
        i += 1;
        await this.swapStep(arr, i, j, onSwap);
      }
    }
    await this.swapStep(arr, i + 1, high, onSwap);
    return i + 1;
  }

  async doQuickSortStep(
    arr: Balken[], low: number, high: number,
    onSwap: (arr: Balken[]) => Promise<void>
  ) {
    if (low < high) {
      const pi = await this.partitionStep(arr, low, high, onSwap);
      await this.doQuickSortStep(arr, low, pi - 1, onSwap);
      await this.doQuickSortStep(arr, pi + 1, high, onSwap);
    }
  }

  async quickSortStep(arr: Balken[], onSwap: (arr: Balken[]) => Promise<void>) {
    await this.doQuickSortStep(arr, 0, arr.length - 1, onSwap);
  }

  private async swapStep(
    arr: Balken[], a: number, b: number,
    onSwap: (arr: Balken[]) => Promise<void>
  ) {
    if (a === b) return;
    [arr[a], arr[b]] = [arr[b], arr[a]];
    await onSwap(arr);
  }
}
