import _ from 'lodash'
import request from './utils/request'

export default class feathers {
    constructor (url, modName, headers = {}) {
        this.options = {}
        this.options.headers = headers
        this.options.url = `${ url }/${ modName }`
    }

    create (data) {
        if (!_.isPlainObject(data)) {
            return Promise.reject(206)
        }
        this.options.method = 'post'
        this.options.body = data
        return request(this.options)
    }

    remove (id, query) {
        this.options.method = 'delete'
        if (!_.isEmpty(id)) {
            this.options.params = { id }
        }
        if (!_.isEmpty(query)) {
            this.options.params = Object.assign({}, query)
        }
        return request(this.options)
    }

    update (id, query, data) {
        if (_.isEmpty(id)) {
            return Promise.reject('id is null!')
        }
        if (_.isEmpty(data)) {
            return Promise.reject('data is null!')
        }
        this.options.method = 'patch'
        this.options.params = {
            id,
            query,
            data
        }
        return request(this.options)
    }

    find (id, query) {
        this.options.method = 'get'
        this.options.params = Object.assign({ id }, query)
        return request(this.options)
    }

    paginate (query = {}) {
        return this.find(undefined, query)
    }

    async all (options = {}, limit = 100) {
        let total = 0
        let idx = 1
        let pages = 2
        let data = []
        const _error = []

        for (; idx <= pages; idx += 1) {
            try {
                const res = await this.paginate({
                    $limit: limit,
                    $skip: (idx - 1) * limit,
                    ...options
                })

                total = res.total
                data = data.concat(res.data.data)

                if (idx === 1) {
                    pages = Math.ceil(total / limit)
                }
            } catch (err) {
                _error.push(err)
            }
        }

        return _error.length > 0
            ? {
                error: _error
            }
            : {
                total,
                data
            }
    }
}
