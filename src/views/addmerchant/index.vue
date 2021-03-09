<template>
  <div class="app-container">
    <el-form ref="merchant" :model="merchant" label-width="120px">
      <!-- <el-form-item label="用户头像">
        <el-input id="upimage" v-model="user.gpic" />
        <el-upload :action="uploadURL" :on-preview="handlePreview" list-type="picture" :on-success="handleSuccess">
          <el-button size="small" type="primary" @click="upload()">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="商家名称">
        <el-input v-model="merchant.mname" />
      </el-form-item>
      <el-form-item label="商家邮箱">
        <el-input v-model="merchant.memail" />
      </el-form-item>

      <el-form-item label="用户密码">
        <el-input v-model="merchant.password" />
      </el-form-item>
      <el-form-item label="商家简介">
        <el-input v-model="merchant.briefInfo" />
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
  export default {
    data() {
      return {
        merchant: {
          "mcid": null,
          "managerid": "",
          "mname": "",
          "msold": "",
          "memail": "",
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
          url: '/merchantController/merchant/add',
          transformRequest: [function(data) {
            console.log(data)
            // console.log(data.gtime)
            // console.log(data)
            return vm.$qs.stringify(data)
          }],
          data: vm.merchant
        }).then(function(resp) {
          console.log("add  resp")
          console.log(resp)
          if (resp.data.code == '444') {
            vm.$message.error('商家名重复!')
          } else if (resp.data.code == '200') {
            vm.$message({
              message: '添加成功！',
              type: 'success'
            });
            vm.$router.push("/example/merchants");
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
