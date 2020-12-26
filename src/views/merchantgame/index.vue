<template>
  <div class="app-container">
    <div align="right">
      <el-button type="success" @click="addgame()">添加游戏</el-button>
    </div>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="游戏ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.gid }}
        </template>
      </el-table-column>
      <el-table-column label="游戏图片" width="115">
        <template slot-scope="scope">
          <div class="demo-image">
            <el-image style="width: 100px; height: 100px" :src="scope.row.gpic"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="游戏名称" width="195">
        <template slot-scope="scope">
          {{ scope.row.gname }}
        </template>
      </el-table-column>
      <el-table-column label="游戏价格" width="95">
        <template slot-scope="scope">
          {{ scope.row.gprice }}
        </template>
      </el-table-column>
      <el-table-column label="游戏类型" width="95">
        <template slot-scope="scope">
          {{ scope.row.gtype }}
        </template>
      </el-table-column>
      <el-table-column label="游戏评分" width="95">
        <template slot-scope="scope">
          {{ scope.row.gsore }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editgame(scope.row.gid)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="delgame(scope.row.gid)">
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
        merchantId:0,
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
        vm.merchantId = sessionStorage.getItem("id");
        this.axios({
          method: 'GET',
          url: '/merchantController/getAllmerchantsGamesPage/'+vm.merchantId+'?currPage=' + vm.listQuery.page + '&pageSize=' + vm.listQuery.limit
        }).then(function(resp) {
          console.log(resp);
          vm.list = resp.data.data;
          // console.log(vm.list)
          vm.total = resp.data.obj.itemCount;
          for (var i = 0; i < vm.list.length; i++) {
            var chagegpic = null;
            // console.log("vm.list[i]======"+vm.list[i].gpic)
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
        vm.merchantId = sessionStorage.getItem("id");
        console.log("merchantgame id -----------" + vm.merchantId)
        this.axios({
          method: 'GET',
          url: '/merchantController/getAllmerchants/'+vm.merchantId
        }).then(function(resp) {
          console.log(resp)
          vm.list = resp.data.data
        })
      },
      editgame(gid) {
        this.$router.push("/editgame/index/" + gid);
      },
      delgame(gid) {
        var vm = this;
        this.axios({
          method: 'POST',
          url: '/gameController/game/delete?gid=' + gid
        }).then(function(resp) {
          vm.$router.push("/example/merchantgame");
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
      addgame() {
        this.$router.push("/addgame/index");
      }
    }
  }
</script>
