
import packageconf from './package.json'

const trustedIPs = ['::ffff:127.0.0.1', '127.0.0.1', '10.170.249.170', '123.56.138.38']
const appName = packageconf.name
const appVersion = packageconf.version
const dbname = 'survey-question'

const mode = {}

mode.production = {
    host: '127.0.0.1',
    port: 6110,
    database: {
        mongo: `localhost/${ dbname }-stag`
    }
}

mode.staging = {
    host: '127.0.0.1',
    port: 6111,
    database: {
        mongo: `localhost/${ dbname }-stag`
    }
}

mode.testing = {
    host: '127.0.0.1',
    port: 6112,
    database: {
        mongo: `localhost/${ dbname }-test`
    }
}

mode.development = {
    host: '127.0.0.1',
    port: 6113,
    database: {
        mongo: `localhost/${ dbname }-dev`
    }
}


export default {
    appName,
    appVersion,
    trustedIPs,
    mode,
    packageconf
}
