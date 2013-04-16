![Timer.js 
Logo](https://github.com/fschaefer/Timer.js/raw/master/misc/Timer.js.png)

# What is it?

Timer.js is a periodic timer for Node.js and the browser.

## Overview

### Creating a Timer

A new Timer is created with either the new operator:

    var timer = new Timer(resolution);

or the factory method:

    var timer = Timer(resolution);

Where `resolution` is the tick rate of the timer. If `resolution` is omitted it 
defaults to `1000` milliseconds. `resolution` can be either an integer in 
milliseconds or a string describing the resolution such as `'2 seconds'` or `'3 
hours, 20 minutes'`.

### Binding and unbinding events to the Timer with `bind()` and `unbind()`

Events can be bound to the timer with the `bind(when, callback)` method:

    timer.bind(1000 * 3, function () {}); // fire event after 3 seconds

`when` can also be a string describing the moment on that the event should  be 
fired:

    timer.bind('3 seconds', function () {});

wherein `when` the event is fired is limited through the timer `resolution`.

For unbinding `unbind(callback)` can be used.

### Binding shortcuts `every()` and `after()`

`every(when, callback)` is just an alias for `bind(when, callback)`, to make 
code more readable:

    timer.every('2 seconds', function () {});

`after(when, callback)` is also binds an callback to the timer, but unbinds it 
automatically after the event is fired:

    timer.after('5 seconds', function () {});

### Instance methods

`timer.start()` start the timer.

`timer.stop()` stop the timer.

`timer.reset()` stops the timer and resets the tick count.

`timer.clear()` resets the timer and ubinds all event listeners.

`timer.ticks()` returns the tick count since start.

`timer.resolution()` returns the timer resolution in milliseconds.

`timer.running()` indicates if the timer is running.

`timer.drift(driftAmount)` Adds `driftAmount` milliseconds to the next event call. This should allow rudimentary syncing between different clocks.

### Usage example

    var timer = new Timer('100 milliseconds');
    
    timer.every('6 seconds', function () {
        console.log('timer event every 6 seconds');
    });
    
    timer.every('1 minute, 20 seconds', function () {
        console.log('timer event every 1 minute, 20 seconds');
    });
    
    timer.start();

### Valid time strings units

`millisecond(s)`, `ms`, `second(s)`, `sec(s)`, `s`, `minute(s)`, `min(s)`, `m`, 
`hour(s)`, `hr(s)`, `h`, `day(s)`, `d`
