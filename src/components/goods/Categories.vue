<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card :body-style="{ padding: '0px' }">
      <el-row>
        <el-col>
          <el-button type="primary" @click="showCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- table数据 -->
      <zk-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
      >
        <!-- 是否有效 -->
        <template v-slot:scope="slotProps">
          <i class="el-icon-error" v-if="slotProps.row.cat_deleted" style="color:red"></i>
          <i class="el-icon-success" v-else style="color:lightgreen"></i>
        </template>
        <!-- 排序 -->
        <template v-slot:order="slotProps">
          <el-tag size="mini" v-if="slotProps.row.cat_level===0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="slotProps.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </zk-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="queryParams.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%">
      <el-form
        :model="addCateForm"
        ref="addCateFormRef"
        :rules="addCateFormRules"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <el-cascader
            :props="{ expandTrigger: 'hover',checkStrictly:'true' }"
            :options="parentCateList"
            v-model="selectedCascader"
            @change="cascaderChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click=" addCateDialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="addCateSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryParams: {
        type: 3,
        pagesize: 5,
        pagenum: 1
      },
      cateList: [
        {
          cat_id: 1,
          cat_name: '大家电',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 3,
              cat_name: '电视',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 6,
                  cat_name: '曲面电视',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 7,
                  cat_name: '海信',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 8,
                  cat_name: '夏普',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 9,
                  cat_name: '创维',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 10,
                  cat_name: 'TCL',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 11,
                  cat_name: 'PPTV',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 12,
                  cat_name: '小米',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 13,
                  cat_name: '长虹',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 14,
                  cat_name: '康佳',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 15,
                  cat_name: '三星',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 16,
                  cat_name: '飞利浦',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 17,
                  cat_name: '索尼',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 18,
                  cat_name: '先锋',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 19,
                  cat_name: '家庭影院',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 20,
                  cat_name: '音响',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 21,
                  cat_name: '盒子',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 1484,
                  cat_name: '啊啊啊',
                  cat_pid: 3,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 4,
              cat_name: '空调',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 23,
                  cat_name: '变频空调',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 24,
                  cat_name: '立柜空调',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 25,
                  cat_name: '挂壁空调',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 27,
                  cat_name: '中央空调',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 28,
                  cat_name: '移动空调',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 29,
                  cat_name: '海尔',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 30,
                  cat_name: '三菱重工',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 31,
                  cat_name: '志高',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 32,
                  cat_name: '奥克斯',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 33,
                  cat_name: '长虹',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 34,
                  cat_name: '科龙',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 35,
                  cat_name: '海信',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 36,
                  cat_name: '惠而浦',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 37,
                  cat_name: '空调清洗',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 38,
                  cat_name: '空调维修',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 39,
                  cat_name: '空调安装',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 40,
                  cat_name: '空调回收',
                  cat_pid: 4,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 26,
              cat_name: '洗衣机',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 42,
                  cat_name: '洗衣机',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 43,
                  cat_name: '滚筒洗衣机',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 44,
                  cat_name: '波轮洗衣机',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 46,
                  cat_name: '大容量洗衣机',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 47,
                  cat_name: '迷你洗衣机',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 48,
                  cat_name: '双缸洗衣机',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 49,
                  cat_name: '干衣机',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 50,
                  cat_name: '洗衣机服务',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 51,
                  cat_name: '西门子',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 53,
                  cat_name: '海尔',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 54,
                  cat_name: '小天鹅',
                  cat_pid: 26,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 45,
              cat_name: '冰箱',
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 56,
                  cat_name: '对开门冰箱',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 58,
                  cat_name: '多门冰箱',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 59,
                  cat_name: '三门冰箱',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 60,
                  cat_name: '十字对开门',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 61,
                  cat_name: '双门冰箱',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 62,
                  cat_name: '冷柜/冰吧',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 63,
                  cat_name: '商用冷柜',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 65,
                  cat_name: '海尔',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 66,
                  cat_name: '西门子',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 67,
                  cat_name: '容声',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 68,
                  cat_name: '美菱',
                  cat_pid: 45,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            }
          ]
        },
        {
          cat_id: 52,
          cat_name: '热门推荐',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 64,
              cat_name: '圣诞狂欢',
              cat_pid: 52,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 73,
                  cat_name: '护肤套装',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 74,
                  cat_name: '面膜',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 76,
                  cat_name: '巧克力',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 77,
                  cat_name: '儿童玩具',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 78,
                  cat_name: '童装童鞋',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 79,
                  cat_name: '平板电脑',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 80,
                  cat_name: '笔记本',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 81,
                  cat_name: '苹果手机',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 82,
                  cat_name: '小米手机',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 83,
                  cat_name: '数码相机',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 84,
                  cat_name: '耳机耳麦',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 85,
                  cat_name: '挂机空调',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 86,
                  cat_name: '空气净化器',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 87,
                  cat_name: '洗衣机',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 88,
                  cat_name: '4K超高清',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 89,
                  cat_name: '洗碗机',
                  cat_pid: 64,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 1008,
              cat_name: '冲锋衣',
              cat_pid: 52,
              cat_level: 2,
              cat_deleted: false
            }
          ]
        },
        {
          cat_id: 70,
          cat_name: '海外购',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 75,
              cat_name: '国际名牌',
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 92,
                  cat_name: 'swisse',
                  cat_pid: 75,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 94,
                  cat_name: '巴黎水',
                  cat_pid: 75,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 95,
                  cat_name: '爱他美',
                  cat_pid: 75,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 97,
                  cat_name: '花王',
                  cat_pid: 75,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 98,
                  cat_name: '戴森',
                  cat_pid: 75,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 99,
                  cat_name: 'ReFa',
                  cat_pid: 75,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 100,
                  cat_name: 'MK',
                  cat_pid: 75,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 93,
              cat_name: '母婴儿童',
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 102,
                  cat_name: '纸尿裤',
                  cat_pid: 93,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 103,
                  cat_name: '营养辅食',
                  cat_pid: 93,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 104,
                  cat_name: '婴儿用品',
                  cat_pid: 93,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 105,
                  cat_name: '婴儿洗护',
                  cat_pid: 93,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 106,
                  cat_name: '童车童床',
                  cat_pid: 93,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 107,
                  cat_name: '儿童玩具',
                  cat_pid: 93,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 108,
                  cat_name: '童装童鞋',
                  cat_pid: 93,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 96,
              cat_name: '美妆',
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 110,
                  cat_name: '面膜',
                  cat_pid: 96,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 111,
                  cat_name: '口红',
                  cat_pid: 96,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 112,
                  cat_name: '彩妆',
                  cat_pid: 96,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 114,
                  cat_name: '护肤套装',
                  cat_pid: 96,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 116,
                  cat_name: '香水香氛',
                  cat_pid: 96,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 117,
                  cat_name: '洁面仪',
                  cat_pid: 96,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 118,
                  cat_name: '卸妆',
                  cat_pid: 96,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 113,
              cat_name: '个护',
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 120,
                  cat_name: '美发护发',
                  cat_pid: 113,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 121,
                  cat_name: '美甲',
                  cat_pid: 113,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 122,
                  cat_name: '口腔护理',
                  cat_pid: 113,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 123,
                  cat_name: '女性护理',
                  cat_pid: 113,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 115,
              cat_name: '营养保健',
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 125,
                  cat_name: '提高免疫',
                  cat_pid: 115,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 126,
                  cat_name: '维生素/矿物质',
                  cat_pid: 115,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 127,
                  cat_name: '美容养颜',
                  cat_pid: 115,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 129,
                  cat_name: '调节三高',
                  cat_pid: 115,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 130,
                  cat_name: '减肥瘦身',
                  cat_pid: 115,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 131,
                  cat_name: '胶原蛋白',
                  cat_pid: 115,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 132,
                  cat_name: '补肾强身',
                  cat_pid: 115,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 134,
                  cat_name: '养生茶饮',
                  cat_pid: 115,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 128,
              cat_name: '食品',
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 136,
                  cat_name: '牛奶乳品',
                  cat_pid: 128,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 137,
                  cat_name: '方便速食',
                  cat_pid: 128,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 138,
                  cat_name: '进口酒水',
                  cat_pid: 128,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 139,
                  cat_name: '进口粮油',
                  cat_pid: 128,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 140,
                  cat_name: '厨房调料',
                  cat_pid: 128,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 133,
              cat_name: '数码家电',
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 142,
                  cat_name: '平板电脑',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 143,
                  cat_name: '笔记本电脑',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 144,
                  cat_name: '手机配件',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 145,
                  cat_name: '音箱音响',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 146,
                  cat_name: '摄影摄像',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 147,
                  cat_name: '智能设备',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 148,
                  cat_name: '剃须刀',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 149,
                  cat_name: '吸尘器',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 150,
                  cat_name: '电饭煲',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 152,
                  cat_name: '电吹风',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 153,
                  cat_name: '咖啡机',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 154,
                  cat_name: '空气净化器',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 155,
                  cat_name: '美容仪',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 156,
                  cat_name: '电动牙刷',
                  cat_pid: 133,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 151,
              cat_name: '服饰箱包',
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 159,
                  cat_name: '潮流女包',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 160,
                  cat_name: '钟表眼镜',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 161,
                  cat_name: '男装',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 162,
                  cat_name: '女装',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 163,
                  cat_name: '配饰',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 164,
                  cat_name: '男鞋',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 165,
                  cat_name: '女鞋',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 166,
                  cat_name: '运动鞋',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 167,
                  cat_name: '功能箱包',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 168,
                  cat_name: '珠宝饰品',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 169,
                  cat_name: '内衣',
                  cat_pid: 151,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 157,
              cat_name: '家居日用',
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 171,
                  cat_name: '生活日用',
                  cat_pid: 157,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 175,
                  cat_name: '餐厨用具',
                  cat_pid: 157,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 177,
                  cat_name: '清洁用品',
                  cat_pid: 157,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 179,
                  cat_name: '安全避孕',
                  cat_pid: 157,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 180,
                  cat_name: '情趣用品',
                  cat_pid: 157,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            }
          ]
        },
        {
          cat_id: 172,
          cat_name: '苏宁房产',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 173,
              cat_name: '苏宁房产',
              cat_pid: 172,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 183,
                  cat_name: '恒大旅游',
                  cat_pid: 173,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 181,
              cat_name: '苏宁置业',
              cat_pid: 172,
              cat_level: 2,
              cat_deleted: false
            }
          ]
        },
        {
          cat_id: 174,
          cat_name: '手机相机',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 178,
              cat_name: '大牌推荐',
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 187,
                  cat_name: '荣耀',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 188,
                  cat_name: '华为',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 189,
                  cat_name: '三星',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 190,
                  cat_name: '魅族',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 191,
                  cat_name: 'OPPO',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 192,
                  cat_name: 'vivo',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 193,
                  cat_name: '努比亚',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 194,
                  cat_name: '美图',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 195,
                  cat_name: '诺基亚',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 196,
                  cat_name: '飞利浦',
                  cat_pid: 178,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 185,
              cat_name: '搞机达人',
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 198,
                  cat_name: '拍照手机',
                  cat_pid: 185,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 200,
                  cat_name: '游戏手机',
                  cat_pid: 185,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 201,
                  cat_name: '好评过万',
                  cat_pid: 185,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 202,
                  cat_name: '全面屏手机',
                  cat_pid: 185,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 203,
                  cat_name: '大屏手机',
                  cat_pid: 185,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 204,
                  cat_name: '老人机',
                  cat_pid: 185,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 205,
                  cat_name: '长续航手机',
                  cat_pid: 185,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 206,
                  cat_name: '指纹手机',
                  cat_pid: 185,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 199,
              cat_name: '手机配件',
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 209,
                  cat_name: '移动电源',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 210,
                  cat_name: '苹果周边',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 212,
                  cat_name: '手机耳机',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 213,
                  cat_name: '充电器',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 214,
                  cat_name: '手机膜',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 215,
                  cat_name: '数据线',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 216,
                  cat_name: '手机存储卡',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 217,
                  cat_name: '手机壳',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 218,
                  cat_name: '自拍杆',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 219,
                  cat_name: '手机支架',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 220,
                  cat_name: '手机U盘',
                  cat_pid: 199,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 207,
              cat_name: '手机服务',
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 222,
                  cat_name: '手机维修',
                  cat_pid: 207,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 224,
                  cat_name: '二手优品',
                  cat_pid: 207,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 211,
              cat_name: '运营商',
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 226,
                  cat_name: '话费充值',
                  cat_pid: 211,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 227,
                  cat_name: '流量订购',
                  cat_pid: 211,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 228,
                  cat_name: '苏宁网厅',
                  cat_pid: 211,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 229,
                  cat_name: '超值靓号',
                  cat_pid: 211,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 223,
              cat_name: '摄影摄像',
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 231,
                  cat_name: '微单相机',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 232,
                  cat_name: '数码相机',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 233,
                  cat_name: '摄像机',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 234,
                  cat_name: '航拍无人机',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 235,
                  cat_name: '镜头',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 236,
                  cat_name: '拍立得',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 237,
                  cat_name: '运动相机',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 238,
                  cat_name: '佳能',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 239,
                  cat_name: '尼康',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 240,
                  cat_name: '索尼',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 241,
                  cat_name: '富士',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 242,
                  cat_name: 'JVC',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 243,
                  cat_name: '宾得',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 244,
                  cat_name: '奥林巴斯',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 245,
                  cat_name: '柯达',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 247,
                  cat_name: '徕卡',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 248,
                  cat_name: '松下',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 249,
                  cat_name: '喜爱',
                  cat_pid: 223,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            },
            {
              cat_id: 246,
              cat_name: '相机配件',
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 251,
                  cat_name: '三脚架',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 252,
                  cat_name: '数据线',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 253,
                  cat_name: '滤镜',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 254,
                  cat_name: '相机存储卡',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 255,
                  cat_name: '闪光灯',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 256,
                  cat_name: '三星',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 257,
                  cat_name: '影棚器材',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 258,
                  cat_name: '国家地理',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 259,
                  cat_name: '腾龙',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 260,
                  cat_name: '适马',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 261,
                  cat_name: '英特迈',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 262,
                  cat_name: '品胜',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 263,
                  cat_name: '百诺',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 264,
                  cat_name: '金士顿',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 265,
                  cat_name: '闪迪',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 266,
                  cat_name: '肯高',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 267,
                  cat_name: '曼富图',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 268,
                  cat_name: '卡色',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 269,
                  cat_name: '神牛',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 272,
                  cat_name: '思锐',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 274,
                  cat_name: '施耐德',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 275,
                  cat_name: '金贝',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 276,
                  cat_name: '飞毛腿',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 277,
                  cat_name: '耐司',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 278,
                  cat_name: '沣标',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 279,
                  cat_name: '迪比科',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 280,
                  cat_name: '斯丹德',
                  cat_pid: 246,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            }
          ]
        }
      ],
      total: 5,
      // table数据的列
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 定义当前列为模版列
          type: 'template',
          // 模版名称 也就是slot里的name
          template: 'scope'
        },
        {
          label: '排序',
          // 定义当前列为模版列
          type: 'template',
          // 模版名称 也就是slot里的name
          template: 'order'
        },
        {
          label: '操作',
          // 定义当前列为模版列
          type: 'template',
          // 模版名称 也就是slot里的name
          template: 'opt'
        }
      ],
      // 添加分类对话框
      addCateDialogVisible: false,
      // 添加分类的表单数据
      addCateForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      // 添加分类的表单校验规则
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 父级分类数据
      parentCateList: [
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              value: 3,
              label: '电视'
            },
            {
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              value: 4,
              label: '空调'
            },
            {
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              value: 26,
              label: '洗衣机'
            },
            {
              cat_pid: 1,
              cat_level: 1,
              cat_deleted: false,
              value: 45,
              label: '冰箱'
            }
          ],
          value: 1,
          label: '大家电'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 52,
              cat_level: 1,
              cat_deleted: false,
              value: 64,
              label: '圣诞狂欢'
            }
          ],
          value: 52,
          label: '热门推荐'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              value: 75,
              label: '国际名牌'
            },
            {
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              value: 93,
              label: '母婴儿童'
            },
            {
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              value: 96,
              label: '美妆'
            },
            {
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              value: 113,
              label: '个护'
            },
            {
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              value: 115,
              label: '营养保健'
            },
            {
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              value: 128,
              label: '食品'
            },
            {
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              value: 133,
              label: '数码家电'
            },
            {
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              value: 151,
              label: '服饰箱包'
            },
            {
              cat_pid: 70,
              cat_level: 1,
              cat_deleted: false,
              value: 157,
              label: '家居日用'
            }
          ],
          value: 70,
          label: '海外购'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 172,
              cat_level: 1,
              cat_deleted: false,
              value: 173,
              label: '苏宁房产'
            }
          ],
          value: 172,
          label: '苏宁房产'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              value: 178,
              label: '大牌推荐'
            },
            {
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              value: 185,
              label: '搞机达人'
            },
            {
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              value: 199,
              label: '手机配件'
            },
            {
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              value: 207,
              label: '手机服务'
            },
            {
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              value: 211,
              label: '运营商'
            },
            {
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              value: 223,
              label: '摄影摄像'
            },
            {
              cat_pid: 174,
              cat_level: 1,
              cat_deleted: false,
              value: 246,
              label: '相机配件'
            }
          ],
          value: 174,
          label: '手机相机'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 270,
              cat_level: 1,
              cat_deleted: false,
              value: 273,
              label: '电脑整机'
            },
            {
              cat_pid: 270,
              cat_level: 1,
              cat_deleted: false,
              value: 283,
              label: '电脑外设'
            },
            {
              cat_pid: 270,
              cat_level: 1,
              cat_deleted: false,
              value: 290,
              label: 'DIY硬件'
            },
            {
              cat_pid: 270,
              cat_level: 1,
              cat_deleted: false,
              value: 298,
              label: '网络设备'
            },
            {
              cat_pid: 270,
              cat_level: 1,
              cat_deleted: false,
              value: 308,
              label: '办公设备'
            },
            {
              cat_pid: 270,
              cat_level: 1,
              cat_deleted: false,
              value: 315,
              label: '文具用品'
            }
          ],
          value: 270,
          label: '电脑办公'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 320,
              cat_level: 1,
              cat_deleted: false,
              value: 325,
              label: '卫浴电器'
            },
            {
              cat_pid: 320,
              cat_level: 1,
              cat_deleted: false,
              value: 332,
              label: '厨房大电'
            },
            {
              cat_pid: 320,
              cat_level: 1,
              cat_deleted: false,
              value: 342,
              label: '净水设备'
            }
          ],
          value: 320,
          label: '厨卫电器'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 351,
              cat_level: 1,
              cat_deleted: false,
              value: 356,
              label: '中外名酒'
            },
            {
              cat_pid: 351,
              cat_level: 1,
              cat_deleted: false,
              value: 360,
              label: '牛奶冲调'
            },
            {
              cat_pid: 351,
              cat_level: 1,
              cat_deleted: false,
              value: 369,
              label: '生鲜蔬果'
            },
            {
              cat_pid: 351,
              cat_level: 1,
              cat_deleted: false,
              value: 377,
              label: '休闲食品'
            },
            {
              cat_pid: 351,
              cat_level: 1,
              cat_deleted: false,
              value: 383,
              label: '粮油干货'
            },
            {
              cat_pid: 351,
              cat_level: 1,
              cat_deleted: false,
              value: 394,
              label: '进口食品'
            },
            {
              cat_pid: 351,
              cat_level: 1,
              cat_deleted: false,
              value: 401,
              label: '方便速食'
            },
            {
              cat_pid: 351,
              cat_level: 1,
              cat_deleted: false,
              value: 403,
              label: '厨房调料'
            }
          ],
          value: 351,
          label: '食品酒水'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 406,
              cat_level: 1,
              cat_deleted: false,
              value: 411,
              label: '生活用纸'
            },
            {
              cat_pid: 406,
              cat_level: 1,
              cat_deleted: false,
              value: 419,
              label: '家庭清洁'
            },
            {
              cat_pid: 406,
              cat_level: 1,
              cat_deleted: false,
              value: 427,
              label: '生活日用'
            },
            {
              cat_pid: 406,
              cat_level: 1,
              cat_deleted: false,
              value: 439,
              label: '家纺布艺'
            },
            {
              cat_pid: 406,
              cat_level: 1,
              cat_deleted: false,
              value: 447,
              label: '宠物生活'
            }
          ],
          value: 406,
          label: '居家生活'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 453,
              cat_level: 1,
              cat_deleted: false,
              value: 458,
              label: '中式厨房'
            },
            {
              cat_pid: 453,
              cat_level: 1,
              cat_deleted: false,
              value: 473,
              label: '西式厨房'
            }
          ],
          value: 453,
          label: '厨房电器'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 483,
              cat_level: 1,
              cat_deleted: false,
              value: 487,
              label: '环境电器'
            },
            {
              cat_pid: 483,
              cat_level: 1,
              cat_deleted: false,
              value: 505,
              label: '家居电器'
            }
          ],
          value: 483,
          label: '生活电器'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 513,
              cat_level: 1,
              cat_deleted: false,
              value: 523,
              label: '理容造型'
            },
            {
              cat_pid: 513,
              cat_level: 1,
              cat_deleted: false,
              value: 526,
              label: '口腔护理'
            },
            {
              cat_pid: 513,
              cat_level: 1,
              cat_deleted: false,
              value: 528,
              label: '健康电器'
            }
          ],
          value: 513,
          label: '个护健康'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 550,
              cat_level: 1,
              cat_deleted: false,
              value: 553,
              label: '锅具'
            },
            {
              cat_pid: 550,
              cat_level: 1,
              cat_deleted: false,
              value: 572,
              label: '刀剪菜板'
            },
            {
              cat_pid: 550,
              cat_level: 1,
              cat_deleted: false,
              value: 577,
              label: '水具酒具'
            }
          ],
          value: 550,
          label: '烹饪厨具'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 589,
              label: '灯具灯饰'
            },
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 599,
              label: '厨房卫浴'
            },
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 616,
              label: '五金电工'
            },
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 638,
              label: '墙地面'
            },
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 645,
              label: '卧室家具'
            },
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 659,
              label: '客厅家具'
            },
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 669,
              label: '书房办公'
            },
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 678,
              label: '餐厅门厅'
            },
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 686,
              label: '定制装修'
            },
            {
              cat_pid: 580,
              cat_level: 1,
              cat_deleted: false,
              value: 696,
              label: '品牌墙'
            }
          ],
          value: 580,
          label: '家装建材'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 710,
              cat_level: 1,
              cat_deleted: false,
              value: 719,
              label: '孕婴奶粉'
            },
            {
              cat_pid: 710,
              cat_level: 1,
              cat_deleted: false,
              value: 721,
              label: '尿裤湿巾'
            },
            {
              cat_pid: 710,
              cat_level: 1,
              cat_deleted: false,
              value: 730,
              label: '营养辅食'
            },
            {
              cat_pid: 710,
              cat_level: 1,
              cat_deleted: false,
              value: 740,
              label: '洗护用品'
            },
            {
              cat_pid: 710,
              cat_level: 1,
              cat_deleted: false,
              value: 760,
              label: '喂养用品'
            },
            {
              cat_pid: 710,
              cat_level: 1,
              cat_deleted: false,
              value: 777,
              label: '儿童玩具'
            },
            {
              cat_pid: 710,
              cat_level: 1,
              cat_deleted: false,
              value: 787,
              label: '童车童床'
            },
            {
              cat_pid: 710,
              cat_level: 1,
              cat_deleted: false,
              value: 801,
              label: '妈妈专区'
            },
            {
              cat_pid: 710,
              cat_level: 1,
              cat_deleted: false,
              value: 818,
              label: '品牌墙'
            }
          ],
          value: 710,
          label: '奶粉尿裤'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 847,
              cat_level: 1,
              cat_deleted: false,
              value: 849,
              label: '精选'
            },
            {
              cat_pid: 847,
              cat_level: 1,
              cat_deleted: false,
              value: 863,
              label: '外套'
            },
            {
              cat_pid: 847,
              cat_level: 1,
              cat_deleted: false,
              value: 871,
              label: '男士内搭'
            },
            {
              cat_pid: 847,
              cat_level: 1,
              cat_deleted: false,
              value: 872,
              label: '男士裤装'
            },
            {
              cat_pid: 847,
              cat_level: 1,
              cat_deleted: false,
              value: 873,
              label: '品牌墙'
            }
          ],
          value: 847,
          label: '男装'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 892,
              cat_level: 1,
              cat_deleted: false,
              value: 897,
              label: '时尚男鞋'
            },
            {
              cat_pid: 892,
              cat_level: 1,
              cat_deleted: false,
              value: 901,
              label: '品牌墙'
            }
          ],
          value: 892,
          label: '男鞋'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 904,
              cat_level: 1,
              cat_deleted: false,
              value: 906,
              label: '精选'
            },
            {
              cat_pid: 904,
              cat_level: 1,
              cat_deleted: false,
              value: 912,
              label: '潮流女装'
            },
            {
              cat_pid: 904,
              cat_level: 1,
              cat_deleted: false,
              value: 927,
              label: '品牌墙'
            }
          ],
          value: 904,
          label: '女装'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 938,
              cat_level: 1,
              cat_deleted: false,
              value: 950,
              label: '时尚女鞋'
            },
            {
              cat_pid: 938,
              cat_level: 1,
              cat_deleted: false,
              value: 952,
              label: '品牌墙'
            }
          ],
          value: 938,
          label: '女鞋'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 954,
              cat_level: 1,
              cat_deleted: false,
              value: 956,
              label: '汽车整车'
            },
            {
              cat_pid: 954,
              cat_level: 1,
              cat_deleted: false,
              value: 958,
              label: '养护配件'
            },
            {
              cat_pid: 954,
              cat_level: 1,
              cat_deleted: false,
              value: 975,
              label: '清洁美容'
            },
            {
              cat_pid: 954,
              cat_level: 1,
              cat_deleted: false,
              value: 977,
              label: '汽车电子'
            },
            {
              cat_pid: 954,
              cat_level: 1,
              cat_deleted: false,
              value: 984,
              label: '汽车装饰'
            }
          ],
          value: 954,
          label: '汽车生活'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1001,
              label: '热门推荐'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1004,
              label: '运动服饰'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1013,
              label: '健身器材'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1027,
              label: '骑行装备'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1031,
              label: '体育休闲'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1047,
              label: '户外鞋服'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1056,
              label: '垂钓用品'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1061,
              label: '运动鞋'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1073,
              label: '户外装备'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1081,
              label: '运动包/配件'
            },
            {
              cat_pid: 1000,
              cat_level: 1,
              cat_deleted: false,
              value: 1084,
              label: '品牌墙'
            }
          ],
          value: 1000,
          label: '运动户外'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1100,
              cat_level: 1,
              cat_deleted: false,
              value: 1103,
              label: '面部护理'
            },
            {
              cat_pid: 1100,
              cat_level: 1,
              cat_deleted: false,
              value: 1109,
              label: '美发护发'
            },
            {
              cat_pid: 1100,
              cat_level: 1,
              cat_deleted: false,
              value: 1111,
              label: '身体护理'
            },
            {
              cat_pid: 1100,
              cat_level: 1,
              cat_deleted: false,
              value: 1132,
              label: '口腔护理'
            },
            {
              cat_pid: 1100,
              cat_level: 1,
              cat_deleted: false,
              value: 1133,
              label: '男士护理'
            },
            {
              cat_pid: 1100,
              cat_level: 1,
              cat_deleted: false,
              value: 1135,
              label: '女性护理'
            },
            {
              cat_pid: 1100,
              cat_level: 1,
              cat_deleted: false,
              value: 1138,
              label: '香水彩妆'
            },
            {
              cat_pid: 1100,
              cat_level: 1,
              cat_deleted: false,
              value: 1151,
              label: '品牌墙'
            }
          ],
          value: 1100,
          label: '美妆洗护'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1157,
              cat_level: 1,
              cat_deleted: false,
              value: 1162,
              label: '文胸'
            },
            {
              cat_pid: 1157,
              cat_level: 1,
              cat_deleted: false,
              value: 1169,
              label: '睡衣'
            },
            {
              cat_pid: 1157,
              cat_level: 1,
              cat_deleted: false,
              value: 1174,
              label: '内裤'
            },
            {
              cat_pid: 1157,
              cat_level: 1,
              cat_deleted: false,
              value: 1187,
              label: '袜子'
            },
            {
              cat_pid: 1157,
              cat_level: 1,
              cat_deleted: false,
              value: 1192,
              label: '保暖内衣'
            },
            {
              cat_pid: 1157,
              cat_level: 1,
              cat_deleted: false,
              value: 1202,
              label: '配饰'
            },
            {
              cat_pid: 1157,
              cat_level: 1,
              cat_deleted: false,
              value: 1208,
              label: '品牌墙'
            }
          ],
          value: 1157,
          label: '内衣配饰'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1218,
              cat_level: 1,
              cat_deleted: false,
              value: 1225,
              label: '婴幼玩具'
            },
            {
              cat_pid: 1218,
              cat_level: 1,
              cat_deleted: false,
              value: 1228,
              label: '户外玩具'
            },
            {
              cat_pid: 1218,
              cat_level: 1,
              cat_deleted: false,
              value: 1231,
              label: 'DIY玩具'
            },
            {
              cat_pid: 1218,
              cat_level: 1,
              cat_deleted: false,
              value: 1246,
              label: '遥控模型玩具'
            },
            {
              cat_pid: 1218,
              cat_level: 1,
              cat_deleted: false,
              value: 1250,
              label: '童装'
            },
            {
              cat_pid: 1218,
              cat_level: 1,
              cat_deleted: false,
              value: 1259,
              label: '童鞋'
            },
            {
              cat_pid: 1218,
              cat_level: 1,
              cat_deleted: false,
              value: 1273,
              label: '宝宝寝居'
            },
            {
              cat_pid: 1218,
              cat_level: 1,
              cat_deleted: false,
              value: 1282,
              label: '品牌墙'
            }
          ],
          value: 1218,
          label: '童装玩具'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1295,
              cat_level: 1,
              cat_deleted: false,
              value: 1301,
              label: '黄金珠宝'
            },
            {
              cat_pid: 1295,
              cat_level: 1,
              cat_deleted: false,
              value: 1311,
              label: '首饰配饰'
            },
            {
              cat_pid: 1295,
              cat_level: 1,
              cat_deleted: false,
              value: 1315,
              label: '邮币'
            },
            {
              cat_pid: 1295,
              cat_level: 1,
              cat_deleted: false,
              value: 1327,
              label: '品牌墙'
            }
          ],
          value: 1295,
          label: '珠宝首饰'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1335,
              cat_level: 1,
              cat_deleted: false,
              value: 1343,
              label: '智能酷玩'
            },
            {
              cat_pid: 1335,
              cat_level: 1,
              cat_deleted: false,
              value: 1350,
              label: '潮流数码'
            },
            {
              cat_pid: 1335,
              cat_level: 1,
              cat_deleted: false,
              value: 1352,
              label: '智能家居'
            },
            {
              cat_pid: 1335,
              cat_level: 1,
              cat_deleted: false,
              value: 1357,
              label: '电子教育'
            },
            {
              cat_pid: 1335,
              cat_level: 1,
              cat_deleted: false,
              value: 1367,
              label: '品牌墙'
            }
          ],
          value: 1335,
          label: '智能设备'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1369,
              cat_level: 1,
              cat_deleted: false,
              value: 1375,
              label: '精品钟表'
            },
            {
              cat_pid: 1369,
              cat_level: 1,
              cat_deleted: false,
              value: 1383,
              label: '眼镜'
            },
            {
              cat_pid: 1369,
              cat_level: 1,
              cat_deleted: false,
              value: 1397,
              label: '品牌墙'
            }
          ],
          value: 1369,
          label: '钟表眼镜'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1402,
              cat_level: 1,
              cat_deleted: false,
              value: 1410,
              label: '功能箱包'
            },
            {
              cat_pid: 1402,
              cat_level: 1,
              cat_deleted: false,
              value: 1419,
              label: '时尚女包'
            },
            {
              cat_pid: 1402,
              cat_level: 1,
              cat_deleted: false,
              value: 1420,
              label: '男包皮具'
            },
            {
              cat_pid: 1402,
              cat_level: 1,
              cat_deleted: false,
              value: 1428,
              label: '品牌墙'
            }
          ],
          value: 1402,
          label: '皮具箱包'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1441,
              cat_level: 1,
              cat_deleted: false,
              value: 1444,
              label: '礼品'
            },
            {
              cat_pid: 1441,
              cat_level: 1,
              cat_deleted: false,
              value: 1455,
              label: '邮币'
            },
            {
              cat_pid: 1441,
              cat_level: 1,
              cat_deleted: false,
              value: 1464,
              label: '乐器'
            }
          ],
          value: 1441,
          label: '邮币乐器'
        },
        {
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_pid: 1480,
              cat_level: 1,
              cat_deleted: false,
              value: 1482,
              label: '热门关键词'
            }
          ],
          value: 1480,
          label: '其他'
        }
      ],
      selectedCascader: ''
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      let { data: res } = await this.$axios.get('categories', {
        params: this.queryParams
      })
      if (res.meta.status !== 200)
        return this.$message.error('请求分类数据失败')
      this.cateList = res.data.result
      this.total = res.data.total
      this.$message.success('请求成功')
    },
    // pagesize变动
    sizeChange(newSize) {
      this.queryParams.pagesize = newSize
      this.getCateList()
    },
    // pagenum改变
    currentChange(newPage) {
      console.log(newPage)
      this.queryParams.pagenum = newPage
      this.getCateList()
    },
    // 添加分类对话框
    showCateDialog() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      let { data: res } = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取失败')
      function handle(item) {
        item.forEach(val => {
          val.value = val.cat_id
          delete val.cat_id
          val.label = val.cat_name
          delete val.cat_name
          if (val.children) {
            handle(val.children)
          }
        })
      }
      handle(res.data)
      console.log(res.data)
      this.parentCateList = res.data
    },
    // 监听级联选择器改变事件
    cascaderChange() {
      if (this.selectedCascader.length > 0) {
        // 父级元素的id
        this.addCateForm.cat_pid = this.selectedCascader[
          this.selectedCascader.length - 1
        ]
        // 自己的等级
        this.addCateForm.cat_level = this.selectedCascader.length
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    addCateSubmit() {
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        let { data: res } = await this.$axios.post(
          'categories',
          this.addCateForm
        )
        if (res.meta.status !== 201) return this.$message.error('提交失败')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  padding: 20px;
}
.zk-table {
  margin-top: 15px;
}
</style>