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
        <el-input v-model="user.uname"/>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-input v-model="user.usex"/>
      </el-form-item>
      <el-form-item label="用户生日">
        <el-col :span="11">
          <el-date-picker
            v-model="user.ubirth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.uemail"/>
      </el-form-item>
      <!-- <el-form-item label="用户密码">
        <el-input v-model="user.loginpwd" />
      </el-form-item>
      <el-form-item label="用户支付密码">
        <el-input v-model="user.paypwd" />
      </el-form-item> -->
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
  import request from '../../utils/request'

  export default {
    data() {
      return {
        user: {
          'uid': '',
          'scid': '80006',
          'uname': '怡宝',
          'usex': '女',
          'ubirth': '2020-01-02',
          'umoney': 300,
          'uemail': '123456789@qq.com',
          'utime': '2020-01-02',
          'ustate': '未登录',
          'salt': '',
          'loginpwd': '123',
          'paypwd': '123',
          'isdelete': 0,
          'creatdate': '2020-01-02',
          // "commentdetails": [null],
          // "accountRoles": [null],
        }
        // 上传图片的URL地址
        // uploadURL: 'http://localhost:9090/userController/upload',
      }
    },
    created() {
      this.fetchuserDataById()
    },
    methods: {
      // 上传方法
      // 处理移除图片的操作
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      handleSuccess(file) {
        this.user.gpic = file
      },
      // 处理图片预览效果
      handlePreview(file) {
        console.log(file)
      },
      fetchuserDataById() {
        var uid = this.$route.params.uid
        var vm = this
        this.axios({
          method: 'GET',
          url: '/userController/user/' + uid + '/json'
        }).then(function(resp) {
          console.log(resp)
          vm.user = resp.data.t
        })
      },

      onSubmit() {
        var vm = this
        var params = new URLSearchParams()
        params.append('uid', vm.user.uid)
        params.append('uname', vm.user.uname)
        params.append('usex', vm.user.usex)
        params.append('ubirth', vm.user.ubirth)
        params.append('uemail', vm.user.uemail)
        this.axios({
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          method: 'POST',
          url: '/userController/user/put',
          data: params
        }).then(function(resp) {
          if (resp.data.code == '200') {
            vm.$message({
              message: '修改成功！',
              type: 'success'
            })
            vm.$router.push('/example/users')
          }
          console.log(resp)
          console.log('---==='+vm.user)
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
