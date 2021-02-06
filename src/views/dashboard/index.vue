<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎 {{ name }} ！ 您的余额为：{{ umoney }} 元</div>
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
  </el-table>
  <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return{
      umoney: '1',
      uid: '',
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
    this.fetchuserDataByName()
  },
  methods: {
    fetchuserDataByName() {
      var vm = this
      var uname = this.name
      this.axios({
        method: 'GET',
        url: '/userController/user/' + uname + '/uname'
      }).then(function(resp) {
        console.log(resp)
        vm.umoney = resp.data.t.umoney
        vm.uid = resp.data.t.uid
        console.log('vm fetchuserDataByName-------------'+vm.uid)
        vm.getList(vm.uid)

      })

    },
    //分页
    getList(uid) {
      var vm = this;
      console.log('vm-------------'+uid)
      var gpic = '';
      this.axios({
        method: 'GET',
        url: '/userController/getAllGamesByUid/'+ uid +'?currPage=' + vm.listQuery.page + '&pageSize=' + vm.listQuery.limit
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

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
