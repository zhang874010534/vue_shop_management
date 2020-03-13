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
          <template v-slot="scope">{{scope.row.add_time | dataFormat}}</template>
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
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      //  商品列表
      goodsList: [
        {
          goods_id: 926,
          cat_id: null,
          goods_name:
            '【海外购自营】黎珐(ReFa) MTG日本 CARAT铂金微电流瘦脸瘦身提拉紧致V脸美容仪 【保税仓发货】',
          goods_price: 1399,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514345477,
          upd_time: 1514345477,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        },
        {
          goods_id: 925,
          cat_id: null,
          goods_name:
            '卡奇莱德汽车车载空气净化器负离子除甲醛PM2.5除烟异味车用氧吧双涡轮出风（红色）',
          goods_price: 168,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514259452,
          upd_time: 1514259452,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        },
        {
          goods_id: 924,
          cat_id: null,
          goods_name:
            '沿途（yantu）车载充电器车充一拖二usb转接口手机智能头多功能汽车点烟器',
          goods_price: 0,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514259448,
          upd_time: 1514259448,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        },
        {
          goods_id: 923,
          cat_id: null,
          goods_name: '车载冰箱7.5L 冷暖两用汽车冰箱半导体12V迷你电冰箱升级款',
          goods_price: 149,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514259445,
          upd_time: 1514259445,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        },
        {
          goods_id: 922,
          cat_id: null,
          goods_name:
            '神行者电子狗 神行者L70电子狗测速 测速雷达 流动测速 多种警示路段提醒',
          goods_price: 98,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514259442,
          upd_time: 1514259442,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        },
        {
          goods_id: 921,
          cat_id: null,
          goods_name:
            '360行车记录仪尊享升级版 J501C 安霸A12 高清夜视 WIFI连接 智能管理 机卡套装 黑色(存储卡品牌随机)',
          goods_price: 359,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514259438,
          upd_time: 1514259438,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        },
        {
          goods_id: 920,
          cat_id: null,
          goods_name:
            '淘尔杰汽车专用伸缩蜡拖 除尘车掸子擦车拖把 洗车蜡刷清洁工具用品',
          goods_price: 39,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514259435,
          upd_time: 1514259435,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        },
        {
          goods_id: 919,
          cat_id: null,
          goods_name:
            '保赐利(botny) 防雾剂汽车用长效雾清车窗挡风玻璃浴室去雾剂除雾剂玻璃清洁剂 B-2113',
          goods_price: 0,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514259432,
          upd_time: 1514259432,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        },
        {
          goods_id: 918,
          cat_id: null,
          goods_name:
            '龟牌硬壳蜡新汽车防护划痕去污上光抛光养护漆固体洗车打蜡腊正品',
          goods_price: 49,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514259429,
          upd_time: 1514259429,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        },
        {
          goods_id: 917,
          cat_id: null,
          goods_name:
            '点缤汽车车漆划痕修复补漆笔漆面修复油漆修补套装珠光珍珠白色点漆笔--单支补漆笔',
          goods_price: 14,
          goods_number: 100,
          goods_weight: 100,
          goods_state: 0,
          add_time: 1514259426,
          upd_time: 1514259426,
          hot_mumber: 0,
          is_promote: false,
          cat_one_id: null,
          cat_two_id: null,
          cat_three_id: null
        }
      ],
      total: 0
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    async getGoodList() {
      let { data: res } = await this.$axios.get('goods', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200)
        return this.$message.error('请求商品列表失败')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    // 跳转到添加商品页面
    toAddGoods() {
      this.$router.push('goods/add')
    }
  }
}
</script>