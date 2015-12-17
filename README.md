EventSource
===
A constrained but fast EventEmitter alternative

## Goal
* No event name
* Fast for one-or-two listeners

You are welcomed to help optimize this library

## Usage
```JavaScript
let es = new EventSource()
let callback = (arg)=>console.log(arg)
es.attach( callback )
es.emit('hello world')   // es.emit === callback
```

You can chain `attach`, `detach` together. But not `emit`

## API
##### EventSource.attach(callback)
Add callback to listeners

##### EventSource.detach(callback)
Remove callback from listeners

##### EventSource.emit(arguments)
Emit event, calls all listeners  
If there is only one listener, this method is the listener itself


## Internals
If there is only one listener, `this.emit` directly set as listener  
If there is more than one listener, they are stored in an Array, then called in a for-loop in `this.emit()`


## Benchmark

```
node benchmark-EventSource.js
```

My result:

```Text
EE @1: 300ms
ES @1: 106ms
EE @3: 712ms
ES @3: 401ms
EE @10: 1390ms
ES @10: 1034ms
```

## LICENSE
MIT
