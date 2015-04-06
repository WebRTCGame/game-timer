# game-timer
HTML5 Framerate Independent Javascript Game Timer. 

It works with requestAnimationFrame but it's not dependant on it for timing.  So instead of incrementing something every frame i.e. x++; which won't be incremented consistently if you have varying framerates as they are dependant on many factors.  A persons hardware, other resources being utilized, the complexity of your update/render loop, etc. all factor into your eventual frames per second.  There's no way I've found to guarantee 60fps.  With this timer the fps don't matter as much and can vary.

The timer object itself is very simple still, with a very simple api.  As the complexity grows the chance for the timer itself to impact performance grows as well.  That is something I want to avoid.

The index.html is a simple render/update loop with requestAnimationFrame, including a little stub to generate the delta time and frames per second.

View the timer.js source to see the internals, it's not complicated.

V 0.0.2

Added callbacks and a tick event.

They are both illustrated in the index.html