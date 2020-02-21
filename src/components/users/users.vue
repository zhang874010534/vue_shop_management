<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 搜索和添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- table列表 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-tooltip :content="scope.row.mg_state?'特二神':'电电狗'" placement="top">
              <!-- active-value改变的值就是v-model绑定的这个值active-value="100"
              inactive-value="0"-->
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-tooltip>
            <!-- 这个也就是userList里每一项的mg_state -->
            {{scope.row.mg_state}}
          </template>
        </el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      userList: [],
      res: {
        data: {
          total: 4,
          pagenum: 1,
          users: [
            {
              id: 500,
              role_name: '超级管理员',
              username: 'admin',
              create_time: 1486720211,
              mobile: '12345678',
              email: 'adsfad@qq.com',
              mg_state: true
            },
            {
              id: 502,
              role_name: '测试角色2',
              username: 'linken',
              create_time: 1486720211,
              mobile: '1213213123',
              email: 'asdf@qq.com',
              mg_state: false
            },
            {
              id: 508,
              role_name: '主管',
              username: 'asdf1',
              create_time: 1511853015,
              mobile: '123123',
              email: 'adfsa@qq.com',
              mg_state: true
            },
            {
              id: 509,
              role_name: 'test',
              username: 'asdf123',
              create_time: 1511853353,
              mobile: '1111',
              email: 'asdf@qq.com',
              mg_state: false
            }
          ]
        },
        meta: {
          msg: '获取管理员列表成功',
          status: 200
        }
      },
      total: 0,
      value: '100'
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      // var { data: res } = await this.$axios.get('users', {
      //   params: this.params
      // })
      var res = this.res
      this.userList = res.data.users
      this.total = res.data.total
    }
  }
}
</script>
<style lang="less" scoped>
</style>
