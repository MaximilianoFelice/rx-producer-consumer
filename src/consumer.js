"use strict";

import Rx from 'rx';

export default class Consumer extends Rx.Observer {
  constructor(onNext, onError, onCompleted){
    super(onNext, onError, onCompleted);
    this.onNext = onNext;
    this.onError = onError;
    this.onCompleted = onCompleted;
  }
}