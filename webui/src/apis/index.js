import Feathers from './feathers'

const modName = [
    'users',
    'wishs'
]

const models = {}

const initialize = function (url) {
    modName.forEach((item) => {
        models[item] = new Feathers(url, item)
    })
}

export default {
    modName,
    initialize,
    models
}
