<template>
  <div class="app-container">
    <div align="right">
      <el-button type="success" @click="adduser()">添加用户</el-button>
    </div>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.uid }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="用户图片" width="115">
        <template slot-scope="scope">
          <div class="demo-image">
            <el-image style="width: 100px; height: 100px" :src="scope.row.gpic"></el-image>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="用户姓名" width="195">
        <template slot-scope="scope">
          {{ scope.row.uname }}
        </template>
      </el-table-column>
      <el-table-column label="用户性别" width="95">
        <template slot-scope="scope">
          {{ scope.row.usex }}
        </template>
      </el-table-column>
      <el-table-column label="用户生日" width="195">
        <template slot-scope="scope">
          {{ scope.row.ubirth }}
        </template>
      </el-table-column>
      <el-table-column label="用户余额" width="95">
        <template slot-scope="scope">
          {{ scope.row.umoney }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edituser(scope.row.uid)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="deluser(scope.row.uid)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
    data() {
      return {
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        list: '',
        url: '',
        listLoading: true,
      }
    },
    created() {
      // this.fetchData()
      this.getList()
    },
    methods: {
      //分页
      getList() {
        var vm = this;
        var gpic = '';
        this.axios({
          method: 'GET',
          url: '/userController/users/page/json?currPage=' + vm.listQuery.page + '&pageSize=' + vm.listQuery.limit
        }).then(function(resp) {
          console.log(resp);
          vm.list = resp.data.data;
          console.log(vm.list)
          vm.total = resp.data.obj.itemCount;
          for (var i = 0; i < vm.list.length; i++) {
            var chagegpic = null;
            // console.log("vm.list[i]======"+vm.list[i].gpic)
            // 日期格式转换
            if(vm.list[i].ubirth != null){
              vm.list[i].ubirth = vm.$moment(vm.list[i].ubirth).format("YYYY-MM-DD hh:mm:ss");
            }
            console.log("vm.list[i].ubirth======"+vm.list[i].ubirth)
            // 图片的路径设置
            if (vm.list[i].gpic != null && vm.list[i].gpic != '') {
              chagegpic = vm.list[i].gpic
              // console.log("赋值成功" + chagegpic);
              // console.log(vm.list[i].gpic + "   " + vm.list.length)
            }
          }
          // vm.url = require(gpic);
        })
      },
      fetchData() {
        var vm = this;
        this.axios({
          method: 'GET',
          url: '/userController/users'
        }).then(function(resp) {
          console.log(resp)
          vm.list = resp.data.data
        })
      },
      edituser(uid) {
        this.$router.push("/edituser/index/" + uid);
      },
      deluser(uid) {
        var vm = this;
        this.axios({
          method: 'POST',
          url: '/userController/user/delete?uid=' + uid
        }).then(function(resp) {
          vm.$router.push("/example/users");
          console.log(resp)
          if (resp.status == 200) {
            vm.$message({
              message: '删除成功',
              type: 'success'
            });
          }
          vm.getList()
        }).catch(function(error) {
          vm.$message.error('删除失败')
        })
      },
      adduser() {
        this.$router.push("/adduser/index");
      }
    }
  }
</script>
