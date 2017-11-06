import question from './question'
import user from './user'
import wishs from './wishs'

const fn = function (app) {
    app.use((req, res, next) => {
        delete req.query.__nocache
        next()
    })

    question(app)
    user(app)
    wishs(app)
}

export default fn

