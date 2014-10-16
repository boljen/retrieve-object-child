var childRetriever = require('./');

describe('retrieve-object-child', function() {

  // Get new object for each test
  var o;
  beforeEach(function() {
    o = {};
  });

  it('Should not accept an invalid object', function() {
    (function() {
      childRetriever('test', 'test');
    }).should.throw(/Object/);
  });

  it('Should not acceptan invalid position', function() {
    (function() {
      childRetriever({}, null);
    }).should.throw(/position argument/);
  });

  describe('insert disabled', function() {

    it('Should return the child', function() {
      var obj = {
        test: {
          ok: {}
        }
      };
      childRetriever(obj, ['test', 'ok']).should.equal(obj.test.ok);
    });

    it('Should return undefined if no child was found', function() {
      var obj = {};
      (childRetriever(obj, ['test', 'ok']) === undefined).should.be.true;
    });

    it('Should return undefined if conflict was detected', function() {
      var obj = {test: 'conflict'};
      (childRetriever(obj, ['test', 'ok']) === undefined).should.be.true;
    });

    it('Should throw if conflict was detected', function() {
      var obj = {test: 'conflict'};
      (function() {
        childRetriever(obj, ['test', 'ok'], false, true);
      }).should.throw(/Conflict/);
    });

  });

  describe('insert enabled', function() {

    it('Should return the child', function() {
      var obj = {
        test: {
          ok: {}
        }
      };
      childRetriever(obj, ['test', 'ok'], true).should.equal(obj.test.ok);
    });

    it('Should build the child if no child was found', function() {
      var obj = {};
      childRetriever(obj, ['test', 'ok'], true).should.equal(obj.test.ok);
    });

    it('Should override the child if conflict was detected', function() {
      var obj = {test: 'ok'};
      var child = childRetriever(obj, ['test', 'ok'], true);
      child.should.eql({});
      obj.should.eql({
        test: {
          ok: {}
        }
      })
    });

    it('Should throw if conflict was detected', function() {
      var obj = {test: 'conflict'};
      (function() {
        childRetriever(obj, ['test', 'ok'], true, true);
      }).should.throw(/Conflict/);
    });
  });



});
