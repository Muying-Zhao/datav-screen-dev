import request from '../utils/request'

export function screenData() {
    return request({
        url: '/screen/data',
        method: 'get'
    })
}