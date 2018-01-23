const wrap = async (fn) => {
    try {
        return await fn()
    } catch (error) {
        console.log(error)
        return false
    }
}

export default {
    _adList: [],
    _channelList: [],
    _ebus_ip:'localhost',
    _stockList: [],
    _tran_chan: ['/topic/app'],
    _trig_chan: ['/queue/app'],
    debug: true,
    adListUrl: `http://${this._ebus_ip}/app/rest/media.cgi`,
    channelListUrl: `http://${this._ebus_ip}/app/rest/channel.cgi`,
    stockListUrl: `http://${this._ebus_ip}/app/rest/stock.cgi`,
    async setConfig(_config) {
        if (_config) {
            let { ebus_ip, trig_chan, tran_chan, stockListUrl, adListUrl, channelListUrl, debug } = _config
            this.ebus_ip = ebus_ip || this.ebus_ip
            this._trig_chan = trig_chan || this._trig_chan
            this._tran_chan = tran_chan || this._tran_chan
            this.stockListUrl = stockListUrl || this.stockListUrl
            this.adListUrl = adListUrl || this.adListUrl
            this.channelListUrl = channelListUrl || this.channelListUrl
            this.debug = debug || this.debug
        }
        return true
    },
    async getStockList() {
        let self = this
        this._stockList = await wrap(() => fetch(self.stockListUrl + '?' + new Date().valueOf()).then(res => res.json()))
        return this._stockList
    },
    async getAdList() {
        let self = this
        this._adList = await wrap(() => fetch(self.adListUrl + '?' + new Date().valueOf()).then(res => res.json()))
        return this._adList
    },
    async getChannelList() {
        let self = this
        this._channelList = await wrap(() => fetch(self.channelListUrl) + '?' + new Date().valueOf()).then(res => res.json())
        return this._channelList
    }
}
