const schemas = {
    questions: { //题库
        name: String, //问题
        answers: Array, //答案
        created_at: Date, //创建时间
        type: String //题目类别
    },
    users: { //用户
        phone: Number,
        ip: String,
        address: String,
        answers: Array,
        created_at: Date
    },
    wishs: {
        type: Array, //可多选
        wish: String,
        name: String,
        mood: String,
        created_at: {
            type: Date,
            default: Date.now
        }
    },
    state_logs: {
        dec: String,
        user: Number,
        created_at: Date
    }
}

export default schemas
