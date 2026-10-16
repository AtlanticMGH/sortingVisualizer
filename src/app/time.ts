export class Time {
  sleep(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
