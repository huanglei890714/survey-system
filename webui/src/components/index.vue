<template>
  <div class="wrap">
     <div class="header">
        <el-button type="success" class="wish" size="large" @click="showPostDialog">我要许愿</el-button>
    </div>
    <div class="container">
        <div class="draggable" v-for="(item, i) in list" :data-content="i+=1" :style="styleDraggable[item._id]" @click="dragsChange(item._id)">
             <img :src="require('./../assets/note.png')" alt="">
             <p>{{ item.wish }}</p>
             <span class="footer">
                Wish: <i>{{ item.name }}</i>
             </span>
        </div>
    </div>

    <div class="line"></div>

    <div id="dialog">
        <el-dialog title="我的愿望" :visible.sync="dialogTableVisible" label-width="80px" >
            <div id="form">
            <el-form :model="form" :rules="rulesForm" ref="form" >
                <el-form-item label="愿望类别" prop="type">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="婚姻" name="type"></el-checkbox>
                    <el-checkbox label="事业" name="type"></el-checkbox>
                    <el-checkbox label="爱情" name="type"></el-checkbox>
                    <el-checkbox label="梦想" name="type"></el-checkbox>
                </el-checkbox-group>
                </el-form-item>
                <el-form-item label="愿望" prop="wish">
                <el-input type="textarea" v-model="form.wish"></el-input>
                </el-form-item>
                <el-form-item label="署名" prop="name">
                <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="愿望心情">
                <el-radio-group v-model="form.mood">
                    <el-radio label=":smile">微笑</el-radio>
                    <el-radio label=":cry">哭泣</el-radio>
                </el-radio-group>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="postWish">发布创建</el-button>
                <el-button @click="showPostDialog(false)" >取消</el-button>
                </el-form-item>
            </el-form>
            </div>
        </el-dialog>
    </div>
  </div>
</template>

<style>
.header .wish {
    margin: 50px 50px 0;
}
.container {
  padding: 10px;
  border: 2px solid #F90;
  height: 600px;
}

.draggable {
  width: 220px;
  height: 220px;
  border-radius: 10px;
  margin: 0 10px 10px 0;
  float: left;
  position: absolute;
}
.draggable img{
      width: 100%;
}
.draggable p{
    padding: 50px 30px;
    position: absolute;
    top: 0;
    left: 0;
    color: red;
    transform: rotate(-10deg);
}
.draggable .footer{
    position: absolute;
    left: 140px;
    bottom: 70px;
    color: green;
    transform: rotate(-10deg);
}
.draggable:after{ /* 伪元素插入内容 */
    content: attr(data-content);
    position: absolute;
    top: 26px;
    left: 3px;
    height: 30px;
    width: 20px;
    background-color:purple;
    transform: rotate(-10deg);
    color: orchid;
}

.draggable.is-pointer-down {
  background: #09F;
  z-index: 2; /* above other draggies */
}
.draggable.is-dragging { opacity: 0.7; }

.line{
    position: absolute;
    right: -20px;
    bottom: -115px;
    height: 240px;
    width: 600px;
    background-image: url(./../assets/decoration1.png);
    -webkit-background-size: contain;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
.line:after{
    content: '愿望墙';
    position: absolute;
    white-space: nowrap;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    font-size: 40px;
    background-image: url(./../assets/textbg.png);
    font-weight: bold;
    background-position: 50px 0;
    animation: test 20s linear infinite;
}
@keyframes test
{
    from {
        background-position: 0 bottom;
    }
    to {
        background-position: right 0;
    }
}
</style>

<script>
  import Draggabilly from 'draggabilly'

  export default {
      data () {
          return {
              title: '愿望墙',
              dialogTableVisible: false,
              currDrag: 1,
              styleDraggable: {
                  top: `${ 70 + Math.round(Math.random() * (470 - 70)) }px;`,
                  left: `${ 2 + Math.round(Math.random() * (780 - 2)) }px`,
                  'z-index': 1
              },
              form: {
                  name: '',
                  wish: '',
                  type: [],
                  mood: ''
              },
              rulesForm: {
                  wish: [
                      { required: true, message: '愿望留下!', trigger: 'blur' }
                  ],
                  type: [
                      { type: 'array', required: true, message: '请选择你的愿望属性吧，至少选择一个喔!', trigger: 'change' }
                  ],
                  name: [
                      { required: true, message: '请留下你的freestyle！', trigger: 'blur' }
                  ],
                  mood: [
                      { type: 'array', required: true, message: '今天你微笑了吗！', trigger: 'change' }
                  ]
              },
              list: []
          }
      },
      methods: {
          showPostDialog (state = true) {
              this.dialogTableVisible = state
          },
          async getWishs () {
              const res = await this.$apis.wishs.paginate()
              this.list = res.data.data
              const draggableElems = document.querySelectorAll('.draggable')
              // array of Draggabillies
              const draggies = []
              // init Draggabillies
              for (let i = 0, len = draggableElems.length; i < len; i += 1) {
                  const draggableElem = draggableElems[i]
                  const draggie = new Draggabilly(draggableElem, {
                      containment: true
                  })
                  draggies.push(draggie)
              }
          },
          async postWish () {
              let c = false
              this.$refs['form'].validate((valid) => {
                  if (valid) {
                      c = true
                  } else {
                      return false
                  }
              })
              if (c) {
                  const res = await this.$apis.wishs.create(this.form)
                  if (res) {
                      this.dialogTableVisible = false
                      this.getWishs()
                  }
              }
          },
          dragTab () {
              const draggableElems = document.querySelectorAll('.draggable')
              // array of Draggabillies
              const draggies = []
              // init Draggabillies
              const len = draggableElems.length
              for (let i = 0; i < len; i += 1) {
                  var draggableElem = draggableElems[i]
                  var draggie = new Draggabilly(draggableElem, {
                      containment: true
                  })
                  draggies.push(draggie)
              }
          },
          dragsChange (id) {
              this.currDrag += 1
              this.styleDraggable[id]['z-index'] = this.currDrag
              console.log(this.styleDraggable[id])
          },
          init () {
              this.getWishs()

              setTimeout(this.dragTab, 3000)
          }
      },
      watch: {
          list (data) {
              if (data.length > 0) {
                  for (const item of data) {
                      this.styleDraggable[item._id] = {
                          top: `${ 70 + Math.round(Math.random() * (470 - 70)) }px`,
                          left: `${ 2 + Math.round(Math.random() * (780 - 2)) }px`,
                          'z-index': 1
                      }
                  }
                  // console.log(this.styleDraggable)
              }
          }
      },
      mounted () {
          this.init()
      }
  }
</script>
