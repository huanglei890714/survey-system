
import debug from 'debug'
import error from 'berry-error'
import config from '../config'

const stdout = debug('app:loader')
const stderr = debug('app:loader:error')

const foo = async function () {
    process.on('unhandledRejection', (reason, p) => {
        stderr('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
    })

    const env = process.env.NODE_ENV || 'development'
    const conf = config(env)

    if (!conf) {
        stderr(`[Error] Cannot find configuration about NODE_ENV:${ env }`)
    } else {
        global.$g = {
            conf,
            env
        }

        error.origin(conf.appName)
        error.i18n('cn')

        try {
            /* eslint-disable global-require */
            const db = require('../db')
            /* eslint-enable global-require */

            await db.default()

            /* eslint-disable global-require */
            const app = require('./app')
            /* eslint-enable global-require */

            app.default().listen(conf.port, () => {
                stdout(`Node app is running in \`${ env }\` mode, address: http://${ conf.host }:${ conf.port }`)
            })
        } catch (e) {
            stderr(e, e.stack)
            process.exit(0)
        }
    }
}

foo()
