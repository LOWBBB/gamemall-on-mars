<template>
  <div class="app-container">
    <div align="right">
      <el-button type="success" @click="addMerchant()">添加商家</el-button>
    </div>
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="商家ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.mcid }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="用户图片" width="115">
        <template slot-scope="scope">
          <div class="demo-image">
            <el-image style="width: 100px; height: 100px" :src="scope.row.gpic"></el-image>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="商家名称" width="195">
        <template slot-scope="scope">
          {{ scope.row.mname }}
        </template>
      </el-table-column>
      <el-table-column label="商家销量" width="95">
        <template slot-scope="scope">
          {{ scope.row.msold }}
        </template>
      </el-table-column>
      <el-table-column label="商家邮箱" width="195">
        <template slot-scope="scope">
          {{ scope.row.memail }}
        </template>
      </el-table-column>
      <el-table-column label="商家简介" width="95">
        <template slot-scope="scope">
          {{ scope.row.briefInfo }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editMerchant(scope.row.mcid)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="delMerchant(scope.row.mcid)">
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
          url: '/merchantController/merchants/page?currPage=' + vm.listQuery.page + '&pageSize=' + vm.listQuery.limit
        }).then(function(resp) {
          console.log(resp);
          vm.list = resp.data.data;
          console.log(vm.list)
          vm.total = resp.data.obj.itemCount;
        })
      },
      editMerchant(mcid) {
        this.$router.push("/editmerchant/index/" + mcid);
      },
      delMerchant(mcid) {
        var vm = this;
        this.axios({
          method: 'POST',
          url: '/merchantController/merchant/delete?mcid=' + mcid
        }).then(function(resp) {
          vm.$router.push("/example/merchants");
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
      addMerchant() {
        this.$router.push("/addmerchant/index");
      }
    }
  }
</script>
