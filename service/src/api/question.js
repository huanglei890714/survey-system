import model from './../models'

const name = 'questions'
const service = model(name)

const fn = function (app) {
    app.use(`${ global.$g.conf.restUrl }/${ name }`, service)
}

export default fn
