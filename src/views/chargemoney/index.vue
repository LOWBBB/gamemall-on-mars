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
        var vm = this;
        console.log("id ---------------"+sessionStorage.getItem("id"))
        var uid = sessionStorage.getItem("id");
        this.axios({
          method: 'POST',
          url: '/userController/user/'+ uid +'/chargeMoney/'+this.money+'?total_amount='+this.money
        }).then(function(resp) {
          var div = document.createElement('div');
          div.innerHTML = resp.data;
          document.body.appendChild(div);
          document.forms.punchout_form.submit();  //执行submit表单提交，让页面重定向，跳转到支付宝页面
          console.log("chargemoney resp")
          console.log(resp)
          if (resp.data.code === 200) {
            vm.$message.success('充值成功!')
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
