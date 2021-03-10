<template>
  <div class="goods-list-container">
    <vab-query-form>
      <vab-query-form-right-panel :span="24">
        <el-form ref="form" :model="queryForm" :inline="true" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="游戏名称" />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" native-type="submit" @click="handleQuery">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in list" :key="index" :xs="24" :sm="8" :md="8" :lg="8" :xl="6">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" >
          <el-tooltip placement="top">
            <div slot="content">{{ item.gtype }}</div>
            <el-button @click="buyGame(item)">{{ item.gname }}</el-button>
          </el-tooltip>
          <div class="goods-list-card-body">
            <div class="goods-list-tag-group">
              <el-tag v-if="item.isRecommend" hit type="success">推荐</el-tag>
              <el-tag v-if="item.status === 0" hit type="danger">缺货</el-tag>
            </div>
            <div class="demo-image" @click="buyGame(item)">
              <el-image style="width: 100px; height: 100px" :src="item.gpic" />
            </div>
            <div class="goods-list-title">{{ item.title }}</div>
            <div class="goods-list-description">{{ item.description }}</div>
            <div class="goods-list-price">
              <span @click="buyGame(item)">¥ {{ item.gprice }} 元</span>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="buyGame(item)">
                购买
              </el-button>
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryForm.pageNo"
      :limit.sync="queryForm.pageSize"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'Goods',
  components: {
    Pagination
  },
  data() {
    return {
      userId: '',
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        title: ''
      },
      list: null,
      listLoading: true,
      url: '', // require("../../../assets/images/英雄联盟.jpg"),
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      elementLoadingText: '正在加载...'
    }
  },
  created() {
    // this.fetchData();
    this.getList()
  },
  methods: {
    handleQuery() {
      this.queryForm.pageNo = 1
      this.fetchData()
    },
    // 分页
    getList() {
      var vm = this
      this.axios({
        method: 'GET',
        url: '/gameController/games/page?currPage=' + vm.queryForm.pageNo + '&pageSize=' + vm.queryForm.pageSize
      }).then(function(resp) {
        console.log(resp)
        vm.list = resp.data.data
        // console.log(vm.list)
        vm.total = resp.data.obj.itemCount
        for (var i = 0; i < vm.list.length; i++) {
          var chagegpic = null
          // console.log("vm.list[i]======"+vm.list[i].gpic)
          if (vm.list[i].gpic != null && vm.list[i].gpic !== '') {
            chagegpic = vm.list[i].gpic
            vm.userId = sessionStorage.getItem('userId')
            console.log('赋值成功' + chagegpic)
            console.log(vm.list[i].gpic + '   ' + vm.list.length)
          }
        }
        // vm.url = require(gpic);
      })
    },
    fetchData() {
      var vm = this
      var gname = "null";
      if (vm.queryForm.title.length > 0){
        gname = vm.queryForm.title
      }
      this.axios({
        method: 'GET',
        url: '/gameController/search/'+ gname +'/'+vm.queryForm.pageNo+'/'+vm.queryForm.pageSize
      }).then(function(resp) {
        console.log('fetchData ---------' + resp.data.length)
        console.log(resp.data)
        if (gname != "null"){
          vm.total = resp.data.length
        }
        vm.list = resp.data
      })
    },
    // 购买游戏
    buyGame(item) {
      // 1.进入改游戏购买页面 2.拿到userId
      var vm = this
      vm.userId = sessionStorage.getItem("id")
      console.log('userId -----------' + sessionStorage.getItem("id"))

      console.log('item -----------' + item.gid)
      this.$router.push("/buygame/index/" + item.gid);
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-list-container {
  .goods-list-card-body {
    position: relative;
    text-align: center;
    cursor: pointer;

    .goods-list-tag-group {
      position: absolute;
      top: 10px;
      right: 5px;
      z-index: 9;
    }

    .goods-list-image-group {
      height: 400px;
      overflow: hidden;

      .goods-list-image {
        width: 100%;
        height: 400px;
        transition: all ease-in-out 0.3s;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .goods-list-title {
      margin: 8px 0;
      font-size: 16px;
      font-weight: bold;
    }

    .goods-list-description {
      font-size: 14px;
      color: #808695;
    }

    .goods-list-price {
      margin: 8px 0;
      font-size: 14px;

      s {
        color: #c5c8ce;
      }
    }
  }
}
</style>
