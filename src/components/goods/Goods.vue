<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框和添加按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="toAddGoods">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table 数据列表 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="160px">
          <template v-slot="scope">
            {{scope.row.add_time | dataFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:10
      },
      //  商品列表
      goodsList:[],
      total:0
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    async getGoodList(){
      let {data:res} = await this.$axios.get('goods',{
        params:this.queryInfo
      })
      if(res.meta.status!==200) return this.$message.error('请求商品列表失败')
      this.goodsList=res.data.goods
      this.total=res.data.total
    },
    // 跳转到添加商品页面
    toAddGoods(){
      this.$router.push('goods/add')
    }
  },
}
</script>