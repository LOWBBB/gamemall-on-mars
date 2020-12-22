<template>
  <div class="app-container">
    <el-input v-model="money" placeholder="请输入充值数量" ></el-input>
    <el-button type="primary" size="mini" @click="chargeMoney">
      充值
    </el-button>
  </div>
</template>

<script>
  // 增加游戏
  export default {
    data() {
      return {
        money:'',
        user: {
          "uid": null,
          "scid": "80006",
          "uname": "怡宝",
          "usex": "女",
          "ubirth": 983232000000,
          "umoney": 300,
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
      chargeMoney(){
        console.log("id ---------------"+sessionStorage.getItem("id"))
        var uid = sessionStorage.getItem("id");
        this.axios({
          method: 'POST',
          url: '/userController/user/'+ uid +'/chargeMoney/'+this.money
        }).then(function(resp) {
          console.log(resp)

        })
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
