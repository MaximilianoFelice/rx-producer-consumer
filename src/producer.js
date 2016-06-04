"use strict";

import Rx from 'rx';

class ProducerObservable extends Rx.Observable {
  constructor(fn, amount=1){
    super(fn, amount);
    this.subscribe = (onNext, onError, onComplete) => { 
      try{ 
        for(let i=0; i<amount; i++) fn(onNext);
        onComplete();
       } catch(err) { 
        onError(err) 
      }
    }
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