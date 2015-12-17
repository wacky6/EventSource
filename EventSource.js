'use strict'

class EventSource {
    constructor() {
        this.listener = null
        this.emit = ()=>undefined
    }

    attach(listener) {
        if (this.listener === null) {
            this.listener = this.emit = listener
        }else if (typeof this.listener === 'function') {
            this.listener = [this.listener, listener]
            this.emit = emitN
        }else{
            this.listener.push(listener)
        }
        return this
    }

    detach(listener) {
        if (this.listener === null) {
            ;  // nop
        }else if (typeof this.listener==='function' && this.listener===listener) {
            this.listener = null
            this.emit = ()=>undefined
        }else{
            let pos = -1
            for (let i=this.listener.length; --i > 0; ) {
                if (this.listener[i]===listener) {
                    pos = i;
                    break;
                }
            }
            this.listener.splice(pos, 1)
            if (this.listener.length===1)
                this.emit = this.listener = this.listener[0]
        }
        return this
    }
}

function emitN(arg) {
    let i, len = this.listener.length
    for (let i=0; i!==len; ++i)
        this.listener[i].apply(this, arguments)
}

module.exports = EventSource
