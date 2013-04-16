
var chai = require('chai');
chai.should();

var Timer = require('../timer.js');

describe('Timer', function() {
  var tickResolution = 1000;
  var timer = new Timer(tickResolution);
  var driftAmount = 1000;

  describe('given ' + driftAmount + 'ms drift', function() {
    it('should fire the next tick an extra ' + driftAmount + 'ms after the previous tick', function(done) {
      var lastTime = getUsefulTime(tickResolution);
      var ticksToRun = 2;

      timer.every(tickResolution, function() {
        if (timer.ticks() == ticksToRun) {
          timer.drift(driftAmount);
        }
        if (timer.ticks() > ticksToRun) {
          var endTime = getUsefulTime(tickResolution);
          
          // Divide millisecond amounts by the resolution so we don't miss our test because the resolution was too high for the clock
          endTime.should.equal(lastTime + (tickResolution / tickResolution) + Math.floor(driftAmount / tickResolution));
          done();
        }

        lastTime = getUsefulTime(tickResolution);
      });

      timer.start();
    });
  });
});

function getUsefulTime(resolution) {
  var usefulTime = Math.floor((new Date()).getTime() / resolution);
  return usefulTime;
};