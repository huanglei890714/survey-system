
import env from '../../.env'


const foo = function (mode) {
    if (!env.mode[mode]) {
        return null
    }

    const conf = {
        appName: env.appName,
        appVersion: env.appVersion,
        restUrl: '/api/v1',
        trustedIPs: env.trustedIPs || [],
        ...env.mode[mode]
    }

    return conf
}


export default foo
