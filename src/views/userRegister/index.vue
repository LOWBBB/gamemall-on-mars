<template>
  <div class="app-container">
    <el-form ref="user" :model="user" label-width="120px">
      <!-- <el-form-item label="用户头像">
        <el-input id="upimage" v-model="user.gpic" />
        <el-upload :action="uploadURL" :on-preview="handlePreview" list-type="picture" :on-success="handleSuccess">
          <el-button size="small" type="primary" @click="upload()">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="用户名">
        <el-input v-model="user.uname" />
      </el-form-item>
      <el-form-item label="用户性别">
        <el-input v-model="user.usex" />
      </el-form-item>
      <el-form-item label="用户生日">
        <el-col :span="11">
          <el-date-picker v-model="user.ubirth" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.uemail" />
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="user.loginpwd" />
      </el-form-item>
      <el-form-item label="用户支付密码">
        <el-input v-model="user.paypwd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- <el-form-item label="Activity name">
    <el-input v-model="form.name" />
  </el-form-item>
  <el-form-item label="Activity zone">
    <el-select v-model="form.region" placeholder="please select your zone">
      <el-option label="Zone one" value="shanghai" />
      <el-option label="Zone two" value="beijing" />
    </el-select>
  </el-form-item>
  <el-form-item label="Activity time">
    <el-col :span="11">
      <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
    </el-col>
    <el-col :span="2" class="line">-</el-col>
    <el-col :span="11">
      <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
    </el-col>
  </el-form-item>
  <el-form-item label="Instant delivery">
    <el-switch v-model="form.delivery" />
  </el-form-item>
  <el-form-item label="Activity type">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="Online activities" name="type" />
      <el-checkbox label="Promotion activities" name="type" />
      <el-checkbox label="Offline activities" name="type" />
      <el-checkbox label="Simple brand exposure" name="type" />
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="Resources">
    <el-radio-group v-model="form.resource">
      <el-radio label="Sponsor" />
      <el-radio label="Venue" />
    </el-radio-group>
  </el-form-item>
  <el-form-item label="Activity form">
    <el-input v-model="form.desc" type="textarea" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="onCancel">Cancel</el-button>
  </el-form-item> -->
</template>

<script>
  // 增加游戏
  export default {
    data() {
      return {
        user: {
          "uid": null,
          "scid": "",
          "uname": "admin-01",
          "usex": "男",
          "ubirth": 1263660396000,
          "umoney": 0,
          "uemail": "123456789@qq.com",
          "utime": 1561593600000,
          "ustate": "未登录",
          "salt": null,
          "loginpwd": "123",
          "paypwd": "123",
          "isdelete": null,
          "creatdate": null,
          "utp": null,
          "indents": [],
          "commentdetails": [],
          "accountRoles": [],
          "isDelete": null,
          // "createDate": null,
          "locked": null
        },
        uploadURL: 'http://localhost:9090/userController/upload',
      }
    },
    methods: {
      handleSuccess(file) {
        this.user.gpic = file
      },
      // 处理图片预览效果
      handlePreview(file) {
        console.log(file);
      },
      onSubmit() {
        var vm = this;
        this.axios({
          method: 'POST',
          url: '/userController/user/post',
          transformRequest: [function(data) {
            console.log(data)
            data.ubirth = vm.$moment(data.ubirth).format('YYYY-MM-DD');
            data.utime = vm.$moment(new Date()).format('YYYY-MM-DD');
            // data.createDate = vm.$moment(new Date()).format('YYYY-MM-DD');
            data.createdate = vm.$moment(new Date()).format('YYYY-MM-DD');
            console.log("data.createDate" + data.createDate + "    " + data.createdate);
            // console.log(data.gtime)
            // console.log(data)
            return vm.$qs.stringify(data)
          }],
          data: vm.user
        }).then(function(resp) {
          console.log("add resp")
          console.log(resp)
          if (resp.data.code == '444') {
            vm.$message.error('用户名重复!')
          } else if (resp.data.code == '200') {
            vm.$message({
              message: '添加成功！',
              type: 'success'
            });
            vm.$router.push("/example/users");
          }
          // console.log(resp);
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
