import model from './../models'

const name = 'wishs'
const service = model(name)

const fn = function (app) {
    app.use(`${ global.$g.conf.restUrl }/${ name }`, service)
    //app.service(name).find()
}

export default fn
