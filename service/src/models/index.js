import mongoose from 'mongoose'
import service from 'feathers-mongoose'
import schemasConf from './schemaConf'

const Schema = mongoose.Schema

const _schema = { //建表
    questions: new Schema(schemasConf.questions),
    users: new Schema(schemasConf.users),
    wishs: new Schema(schemasConf.wishs),
    state_logs: new Schema(schemasConf.state_logs)
}


const _service = function (name) {
    return service({
        Model: mongoose.model(name, _schema[name]),
        lean: true,
        paginate: {
            default: 10,
            max: 100
        }
    })
}

export default _service
