"use strict";

import Rx from 'rx';
import Consumer from './consumer';

class ProducerObservable extends Rx.Observable {
  constructor(fn, amount=1){
    super(fn, amount);
    this.subscribe = (onNext, onError, onSubscribe) => { for(let i=0; i<amount; i++) fn(onNext, onError, onSubscribe) }
  }
}

export default class Producer {
  constructor(fn){
    this.fn = fn;
  }

  static create(fn) {
    return new Producer(fn);
  }

  consume(amount=1){
    return new ProducerObservable(this.fn, amount);
  }
}