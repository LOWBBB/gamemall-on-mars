<template>
  <div class="app-container">
    <el-form ref="game" :model="game" label-width="120px">
      <el-form-item label="游戏名称">
        <el-input v-model="game.gname" />
      </el-form-item>
      <el-form-item label="游戏图片">
        <img :src="tempgpic" width="200px" height="200px">
        <el-input id="upimage" v-model="game.gpic" type="hidden" />
        <el-upload :action="uploadURL" :on-preview="handlePreview" list-type="picture" :on-success="handleSuccess">
          <el-button size="small" type="primary" @click="upload()">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="游戏价格">
        <el-input v-model="game.gprice" />
      </el-form-item>
      <el-form-item label="商家id">
        <el-input v-model="game.mcid" />
      </el-form-item>
      <el-form-item label="游戏类型">
        <el-input v-model="game.gtype" />
      </el-form-item>
      <el-form-item label="游戏上架时间">
        <el-col :span="11">
          <el-date-picker v-model="game.gtime" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="游戏评分">
        <el-input v-model="game.gsore" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
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
        vm.$router.push('/mall/goodsList')
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
