import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {Producer} from '../src/pc';
import Rx from 'rx';

describe('Producer-Consumer', function() {

  chai.use(chaiAsPromised)

  it('should be able to produce values', function () {
    const prod = Producer.create(onNext => onNext(1));
    const prom = new Promise(resolve => prod.consume().subscribe(x => resolve(x))) 
    return chai.expect(prom).to.eventually.equal(1);
  });

  it('should complete consumption after getting to its limit', function () {
    const prod = Producer.create(onNext => onNext(1));
    const prom = new Promise(resolve => prod.consume().subscribe(x => x, () => _, () => resolve()))
    return chai.expect(prom).to.be.fulfilled;
  });

  it('should call onError if an error is thrown', function () {
    const prod = Producer.create(onNext => {throw "foo"});
    const prom = new Promise(resolve => prod.consume().subscribe(x => x, err => resolve(err), () => _))
    return chai.expect(prom).to.eventually.equal("foo");
  });

  it('should be able to produce for multiple consumers', function(){
    const numberGenerator = (function* () {
          yield 1;
          yield 2;
          yield 3;
        })()
    const prod = Producer.create(onNext => onNext(numberGenerator.next().value));
    const prom1 = new Promise(resolve => prod.consume(2).bufferWithCount(2).subscribe(x => resolve(x)) )
    const prom2 = new Promise(resolve => prod.consume(1).bufferWithCount(1).subscribe(x => resolve(x)) )
    return Promise.all([
      chai.expect(prom1).to.eventually.deep.equal([1, 2]),
      chai.expect(prom2).to.eventually.deep.equal([3])
    ])  
  })

});
