
import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'


mongoose.Promise = global.Promise

const foo = function () {
    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb://${ global.$g.conf.database.mongo }`)
        const db = mongoose.connection

        autoIncrement.initialize(db)

        db.on('error', (err) => {
            reject(new Error(`Connect to mongodb error: ${ err }`))
        })

        db.once('open', () => {
            resolve('Connect to mongodb successful.')
        })
    })
}


export default foo
