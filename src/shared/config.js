const wrap = async (fn) => {
    try {
        return await fn()
    } catch (error) {
        console.log(error)
        return false
    }
}
let params = {
    _adList: [],
    _channelList: [],
    _ebus_ip: 'localhost',
    _stockList: [],
    _tran_chan: ['/topic/app'],
    _trig_chan: ['/queue/app'],
    debug: true,
}
let adListUrl, channelListUrl, stockListUrl;
Object.defineProperties(params, {
    adListUrl: {
        configurable: true,
        enumerable: true,
        get () {
            return `http://${params._ebus_ip}/app/rest/media.cgi`
        },
        set (v) {
            adListUrl = v
        }
    },
    channelListUrl: {
        configurable: true,
        enumerable: true,
        get () {
            return `http://${params._ebus_ip}/app/rest/channel.cgi`
        },
        set (v) { channelListUrl = v}
    },
    stockListUrl: {
        configurable: true,
        enumerable: true,
        get () {
            return `http://${params._ebus_ip}/app/rest/stock.cgi`
        },
        set(v){
            stockListUrl = v
        }
    }
})

export default {
    params,
    async setConfig (_config) {
        if (_config) {
            let { ebus_ip, trig_chan, tran_chan, stockListUrl, adListUrl, channelListUrl, debug } = _config
            params.ebus_ip = ebus_ip || params.ebus_ip
            params._trig_chan = trig_chan || params._trig_chan
            params._tran_chan = tran_chan || params._tran_chan
            params.stockListUrl = stockListUrl || params.stockListUrl
            params.adListUrl = adListUrl || params.adListUrl
            params.channelListUrl = channelListUrl || params.channelListUrl
            params.debug = debug || params.debug
        }
        return true
    },
    async getStockList () {
        let self = params
        params._stockList = await wrap(() => fetch(self.stockListUrl + '?' + new Date().valueOf()).then(res => res.json()))
        return params._stockList
    },
    async getAdList () {
        let self = params
        params._adList = await wrap(() => fetch(self.adListUrl + '?' + new Date().valueOf()).then(res => res.json()))
        return params._adList
    },
    async getChannelList () {
        let self = params
        params._channelList = await wrap(() => fetch(self.channelListUrl) + '?' + new Date().valueOf()).then(res => res.json())
        return params._channelList
    }
}
