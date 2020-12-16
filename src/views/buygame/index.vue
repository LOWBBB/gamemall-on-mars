<template>
  <div class="app-container">
    <el-form ref="game" :model="game" label-width="120px">
      <el-form-item label="游戏名称" >
        <div class="gameText">{{game.gname}}</div>
      </el-form-item>
      <el-form-item label="游戏图片">
        <img :src="tempgpic" width="200px" height="200px">
        <el-input id="upimage" v-model="game.gpic" type="hidden" :disabled="true"/>
      </el-form-item>
      <el-form-item label="游戏价格">
        <div class="gameText">{{game.gprice}}元</div>
      </el-form-item>
      <el-form-item label="游戏类型">
        <div class="gameText">{{game.gtype}}</div>
      </el-form-item>
      <el-form-item label="游戏上架时间">
        <el-col :span="11">
          <div class="gameText">{{game.gtime}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="游戏评分">
        <div class="gameText">{{game.gsore}}</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认购买</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      game: {
        'gid': '',
        'mcid': '',
        'gname': '',
        'gprice': null,
        'gtype': '',
        'gvideo': null,
        'gtime': null,
        'purchase': null,
        'gsore': '',
        'gtp': null,
        'gpic': null
      },
      // 上传图片的URL地址
      uploadURL: 'http://localhost:9090/gameController/file/upload',
      tempgpic: ''// 临时接收 gpic的值 这样就不会在修改提交后改变数据库的值
    }
  },
  created() {
    this.fetchGameDataById()
  },
  methods: {

    // 上传方法
    // 处理移除图片的操作
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    handleSuccess(file) {
      this.tempgpic = file
      this.game.gpic = file
    },
    // 处理图片预览效果
    handlePreview(file) {
      console.log(file)
    },
    fetchGameDataById() {
      var gid = this.$route.params.gid
      var vm = this
      this.axios({
        method: 'GET',
        url: '/gameController/game?gid=' + gid
      }).then(function(resp) {
        console.log(resp)
        vm.game = resp.data.t
        vm.tempgpic = resp.data.t.gpic
      })
    },

    onSubmit() {
      var vm = this
      this.axios({
        method: 'POST',
        url: '/gameController/game/update',
        transformRequest: [function(data) {
          console.log(data)
          // console.log(data.gtime)
          data.gtime = vm.$moment(data.gtime).format('YYYY-MM-DD')
          // console.log(data.gtime)
          // console.log(data)
          return vm.$qs.stringify(data)
        }],
        data: vm.game
      }).then(function(resp) {
        vm.$message.success('修改成功!')
        console.log(resp)
        vm.$router.push('/example/games')
      })
    }
  }
}
</script>

<style>
.line {
  text-align: center;
}
.app-container .gameText{
  font-family:"Microsoft" !important;
  font-size:30px !important;
  color: black;
}
</style>
