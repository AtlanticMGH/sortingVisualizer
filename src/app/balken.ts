import { Component, signal } from '@angular/core';

export class Balken{
  width = 5;
  height;

  setHeight(height: number) {
    this.height.set(height);
  }

  getHight(): number{
    return this.height();
  }

  constructor(height: number) {
    this.height = signal(height);
  }
}
