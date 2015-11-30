'use strict'

let EventEmitter  = require('events').EventEmitter
let EventSource   = require('./EventSource')

let numOfOp     = 10000000
let numOfHeatup = 100000
let start;
let name;

function Start(_name) {
    name  = _name
    start = new Date().getTime()
}

function Stop() {
    let finish = new Date().getTime()
    console.log(name+": "+(finish-start)+"ms")
}

function Test(numEv) {
    let ee = new EventEmitter()
    let es = new EventSource()
    let se = 0
    let ss = 0
    for (let i=0; i!=numEv; ++i)
        ee.on('event', function(v){se=v})
    for (let i=0; i!=numEv; ++i)
        es.attach(function(v){ss=v})

    // heatup for v8 Optimizer
    for (let i=0; i!=numOfHeatup; ++i)
        ee.emit('event', i)
    for (let i=0; i!=numOfHeatup; ++i)
        es.emit(i)

    // Actual test
    Start('EE @'+numEv)
    for (let i=0; i!=numOfOp; ++i)
        ee.emit('event', i)
    Stop()

    Start('ES @'+numEv)
    for (let i=0; i!=numOfOp; ++i)
        es.emit(i)
    Stop()
}

Test(1)
Test(3)
Test(10)
