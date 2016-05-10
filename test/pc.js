import {assert} from 'chai';
import magic from '../src/pc';

describe('Test', function() {
  describe('pc', function () {
    it('should use function', function () {
      assert.equal("Hola", magic());
    });
  });
});