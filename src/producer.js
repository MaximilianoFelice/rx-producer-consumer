"use strict";

import Rx from 'rx';

export default class Producer extends Rx.Observable {
  constructor(fn){
    super(fn);
    this.fn = fn;
  }

  static create(fn) {
    return new this(fn);
  }

  wrapFunction(fn, subs){ return value => {fn(value); subs.unsubscribe()} }

  subscribe(onNext, onError, onCompleted) {
    const subj = Rx.Subject();
    const subs = subj.subscribe(onNext, onError, onCompleted);
    this.fn(subj.onNext, subj.onError, subj.onCompleted);
    return subs;
  }
}