import axios from 'axios'

export default function (options) {
    return axios({
        method: options.method,
        headers: options.headers,
        url: options.url,
        params: Object.assign({
            __nocache: +new Date()
        }, options.params),
        data: options.body,
        timeout: 1000
    })
}
