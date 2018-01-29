import webstomp from 'webstomp-client'
import Vue from 'vue'
import config from './config'

const _ebus = new Vue()
let stomp;


export const ebus = {
    async connect() {
        let self = this
        stomp = webstomp.client(`ws://${config.params._ebus_ip}:61614/stomp`, { debug: config.params.debug })
        stomp.connect('user', 'password', () => {
            _ebus.$emit('ready')
            console.log('connected')
            config.params._tran_chan.forEach(ele => {
                stomp.subscribe(ele, msg => {
                    if (msg.body === '') return
                    let _arg = JSON.parse(msg.body)
                    _ebus.$emit(_arg.e, _arg)
                })
            })
            setInterval(()=>{
                stomp.send('/topic/heartbeat', '{}')
            }, 20*1000)
        })
    },
    on(events, cb) {
        return _ebus.$on(events, cb)
    },
    once(events, cb) {
        return _ebus.$once(events, cb)
    },
    emit(events, ...arg) {
        return _ebus.$emit(events, ...arg)
    },
    send(data) {
        data = typeof data === 'object' ? JSON.stringify(data) : data
        config.params._trig_chan.forEach(ele=>{
            stomp.send(ele, data)
        })
    }
}

export default ebus