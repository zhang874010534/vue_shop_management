<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="注意:只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"></el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类:</span>
          <!-- 级联选择框 -->
          <el-cascader
            :options="cateList"
            v-model="selectedOptions"
            :props="{value:'cat_id',label:'cat_name',children:'children', expandTrigger: 'hover'}"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnNeedForbidden">添加参数</el-button>
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <!-- 索引行 -->
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edti">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnNeedForbidden">添加属性</el-button>
          <!-- 静态属性数据表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <!-- 索引行 -->
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="mini" type="primary" icon="el-icon-edti">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 商品分类数据
      cateList: [],
      selectedOptions: [], //级联选择框的值
      activeName: 'many', //tab默认值
      manyTableData: [], //动态参数
      onlyTableData: [] // 静态参数
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      let { data: res } = await this.$axios.get('categories')
      if (res.meta.status !== 200)
        return this.$message.error('请求分类数据失败')
      this.cateList = res.data
    },
    // 级联选择框改变
    handleChange() {
      this.getParamsData()
    },
    // tab页签点击事件
    handleClick() {
      this.getParamsData()
    },
    // 获取数据
    async getParamsData() {
      if (this.selectedOptions.length !== 3) return
      let { data: res } = await this.$axios.get(
        `categories/${this.cateId}/attributes`,
        {
          params: { sel: this.activeName }
        }
      )
      if (res.meta.status !== 200)
        return this.$message.error('请求分类参数失败')
      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        this.onlyTableData = res.data
      }
    }
  },
  computed: {
    // 如果按钮需要禁用 返回true
    isBtnNeedForbidden() {
      if (this.selectedOptions.length !== 3) {
        return true
      }
      return false
    },
    // 三级分类的id
    cateId() {
      if (this.selectedOptions.length === 3) {
        return this.selectedOptions[2]
      }
      return null
    }
  }
}
</script>
<style lang="less" scoped>
.cat_opt {
  margin-top: 15px;
}
</style>