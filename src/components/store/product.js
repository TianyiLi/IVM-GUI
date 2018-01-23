import config from "../../shared/config";

let product = {
    list: [],
    async renewList() {
        let list = await config.getStockList()
        let self = this
        list.forEach(ele => {
            self.list[ele.id] = Object.assign({}, ele)
        })
    },
    getList() {
        return this.list
    }
}

export default product