<template>
  <div class="app-container">
    <el-form ref="game" :model="game" label-width="120px">
      <el-form-item label="游戏名称">
        <el-input v-model="game.gname" />
      </el-form-item>
      <el-form-item label="游戏图片">
        <img :src="tempgpic" width="200px" height="200px">
        <el-input id="upimage" v-model="game.gpic" />
        <el-upload :action="uploadURL" :on-preview="handlePreview"  list-type="picture" :on-success="handleSuccess">
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
          "gid": "",
          "mcid": "",
          "gname": "德州扑克",
          "gprice": "50",
          "gtype": "棋牌",
          "gvideo": null,
          "gtime": 1264409600000,
          "purchase": 100004,
          "gsore": "97",
          "gtp": null,
          "gpic": null,
        },
        uploadURL: 'http://localhost:9090/gameController/file/upload',
        tempgpic: ''// 临时接收 gpic的值 这样就不会在修改提交后改变数据库的值
      }
    },
    methods: {
      handleSuccess(file) {
        this.tempgpic = file
        this.game.gpic = file
      },
      // 处理图片预览效果
      handlePreview(file) {
        console.log(file);
      },
      onSubmit() {
        var vm = this;
        this.axios({
          method: 'POST',
          url: '/gameController/game/add',
          transformRequest: [function (data) {
            // console.log(data.gtime)
            data.gtime = vm.$moment(data.gtime).format('YYYY-MM-DD');
            // console.log(data.gtime)
            // console.log(data)
            return vm.$qs.stringify(data)
          }],
          data: vm.game
        }).then(function(resp){
          vm.$message.success('添加成功!')
          // console.log(resp);
          vm.$router.push("/example/games");
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
