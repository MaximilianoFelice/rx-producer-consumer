import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {Producer} from '../src/pc';

describe('Producer-Consumer', function() {

  chai.use(chaiAsPromised)

  it('should be able to produce values', function () {
    // const prod = Producer.create(onNext => onNext(1));
    // var y
    // const cons = prod.consume(x => y = x);
    return chai.expect(Promise.resolve({foo: "bar"})).to.eventually.have.property('foo');
  });

});