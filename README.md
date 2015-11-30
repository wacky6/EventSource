EventSource
===
A constrained but fast EventEmitter alternative

## Goal
* Emit only one argument
* No event name
* Fast

You are welcomed to help optimize this library

## API
##### EventSource.attach(callback)
add callback to listeners

##### EventSource.detach(callback)
remove callback from listeners


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
