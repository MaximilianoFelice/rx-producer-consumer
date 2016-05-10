import {assert} from 'chai';
import {Producer} from '../src/pc';

describe('Producer-Consumer', function() {

  it('should be able to produce values', function () {
    const prod = Producer.create(subject => subject.onNext(1));
  });

});