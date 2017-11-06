
import debug from 'debug'
import error from 'berry-error'
import feathers from 'feathers'
import rest from 'feathers-rest'
import bodyParser from 'body-parser'
import api from './../api/'


const stdout = debug('app:main')
const stderr = debug('app:main:error')


const foo = function () {
    const $g = global.$g

    const app = feathers()

    // Parse HTTP JSON bodies
    app.use(bodyParser.json({ limit: '1mb' }))
    // Parse URL-encoded params
    app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
    //feathers resr api models注册
    app.configure(rest())

    // Load routers
    stdout('加载路由...')
    api(app)

    app.get('/', (req, res) => {
        res.send('404')
    })

    // Error Handle
    /* eslint-disable no-unused-vars */
    const errorHandler = $g.env === 'production' ? error.errorHandler.simple : error.errorHandler.rich

    app.use(errorHandler(process.env.hostbypm2 === 'true' ? console.error : stderr))
    /* eslint-disable no-unused-vars */


    return app
}


export default foo
