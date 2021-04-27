export function queryServiceDropList() {
    return new Promise(function (resolve, reject) {
        var url = '/center/service/dropList'
        return _api.get(url).then(
            (res) => {
                return resolve(res);
            },
            (err) => {
                return reject(err);
            }
        );
    });
}

export function greyStrategies() {
    return [
        { name: '指定值', value: 1 },
        { name: '随机策略', value: 2 },
        { name: 'Hash策略', value: 3 }
    ]
}

export function queryResources(param){
    return new Promise(function (resolve, reject) {
        var url = '/center/resource/pager'
        return _api.get(url,param).then(
            (res) => {
                return resolve(res);
            },
            (err) => {
                return reject(err);
            }
        );
    });
}

export function queryInstances(param){
    return new Promise(function (resolve, reject) {
        var url = '/center/resource/instance/pager'
        return _api.get(url,param).then(
            (res) => {
                return resolve(res);
            },
            (err) => {
                return reject(err);
            }
        );
    });
}

export function queryInstanceSwitches(param){
    return new Promise(function (resolve, reject) {
        var url = '/center/resource/instance/switch/pager'
        return _api.post(url,param).then(
            (res) => {
                return resolve(res);
            },
            (err) => {
                return reject(err);
            }
        );
    });
}