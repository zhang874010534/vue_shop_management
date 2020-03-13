<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- card -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.pay_status==='1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template v-slot="scope">{{scope.row.create_time*1000| dataFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-Button type="primary" icon="el-icon-edit" size="mini"></el-Button>
            <el-Button type="success" icon="el-icon-location" size="mini" @click="process"></el-Button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 物流进度 -->
    <el-dialog title="物流进度" :visible.sync="logisticsProcessVisible" width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in processInfo"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
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
      orderList: [
        {
          order_id: 68,
          user_id: 1,
          order_number: 'itcast-g7kmck725jaujgdts',
          order_price: 40,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512535620,
          update_time: 1512535620
        },
        {
          order_id: 67,
          user_id: 1,
          order_number: 'itcast-g7kmck71vjaujfgoi',
          order_price: 20,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512533560,
          update_time: 1512533560
        },
        {
          order_id: 66,
          user_id: 1,
          order_number: 'itcast-g7kmck71jjaujer6a',
          order_price: 20,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512533527,
          update_time: 1512533527
        },
        {
          order_id: 65,
          user_id: 1,
          order_number: 'itcast-g7kmck6rwjauin92y',
          order_price: 20,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512532244,
          update_time: 1512532244
        },
        {
          order_id: 64,
          user_id: 1,
          order_number: 'itcast-g7kmck6rmjauimx8v',
          order_price: 20,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512532229,
          update_time: 1512532229
        },
        {
          order_id: 63,
          user_id: 1,
          order_number: 'itcast-g7kmck6rgjauimnw4',
          order_price: 20,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512532216,
          update_time: 1512532216
        },
        {
          order_id: 62,
          user_id: 1,
          order_number: 'itcast-g7kmck6qujauim7bv',
          order_price: 20,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512532195,
          update_time: 1512532195
        },
        {
          order_id: 61,
          user_id: 1,
          order_number: 'itcast-g7kmck6qhjauil5g2',
          order_price: 20,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512532146,
          update_time: 1512532146
        },
        {
          order_id: 60,
          user_id: 1,
          order_number: 'itcast-g7kmck6pmjauijtk5',
          order_price: 20,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512532084,
          update_time: 1512532084
        },
        {
          order_id: 59,
          user_id: 1,
          order_number: 'itcast-g7kmck6ovjauigciz',
          order_price: 20,
          order_pay: '0',
          is_send: '否',
          trade_no: '',
          order_fapiao_title: '个人',
          order_fapiao_company: '',
          order_fapiao_content: '',
          consignee_addr: '',
          pay_status: '0',
          create_time: 1512531922,
          update_time: 1512531922
        }
      ],
      processInfo: [
        {
          time: '2020-03-13 00:30:48',
          ftime: '2020-03-13 00:30:48',
          context: '货物已完成分拣，离开【广州黄埔分拣中心】',
          location: ''
        },
        {
          time: '2020-03-12 22:23:38',
          ftime: '2020-03-12 22:23:38',
          context: '货物已完成分拣，离开【佛山高赞中转场】',
          location: ''
        },
        {
          time: '2020-03-12 22:06:25',
          ftime: '2020-03-12 22:06:25',
          context: '货物已到达【佛山高赞中转场】',
          location: ''
        },
        {
          time: '2020-03-12 19:28:52',
          ftime: '2020-03-12 19:28:52',
          context:
            '尊敬的用户您好，受全国道路交通影响，部分快递可能会延迟派送，我们正在全力为您服务，请您耐心等待;',
          location: ''
        },
        {
          time: '2020-03-12 19:28:49',
          ftime: '2020-03-12 19:28:49',
          context: '货物已交付京东物流',
          location: ''
        },
        {
          time: '2020-03-12 19:28:49',
          ftime: '2020-03-12 19:28:49',
          context: '配送员黎华坚已经揽收完成',
          location: ''
        },
        {
          time: '2020-03-12 14:18:33',
          ftime: '2020-03-12 14:18:33',
          context: '揽收任务已分配给卢智能,配送员电话13690785401',
          location: ''
        }
      ],
      logisticsProcessVisible: false
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      let { data: res } = await this.$axios.get('orders', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('请求失败')
      this.total = res.data.total
      this.orderList = res.data.goods
    },
    // 物流进度
    async process() {
      this.logisticsProcessVisible = true
      let { data: res } = await this.$axios.get('/kuaidi/804909574412544580')
      this.processInfo = res.data
    }
  }
}
</script>
<style lang="less" scoped>
</style>