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
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="params.query"
            clearable
            @clear="getUserList"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchGetUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
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
              <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope)"></el-switch>
            </el-tooltip>
            <!-- 这个也就是userList里每一项的mg_state -->
            {{scope.row.mg_state}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[1,2,5,10]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <!-- 添加用户表单区域 -->
      <el-form :model="addUserForm" :rules="userRules" ref="addRuleForm" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [
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
      ],
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
      total: 4,
      value: '100',
      dialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'number', message: '请输入11位的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      var { data: res } = await this.$axios.get('users', {
        params: this.params
      })

      // var res = this.res
      this.userList = res.data.users
      this.total = res.data.total
      console.log(res.data)
    },
    // 页码大小变动
    handleSizeChange(val) {
      this.params.pagesize = val
      this.getUserList()
    },
    // 当前页变动
    handleCurrentChange(val) {
      this.params.pagenum = val
      this.getUserList()
    },
    // switch按钮change
    async userStateChange(userInfo) {
      var { data: res } = await this.$axios.put(
        `users/${userInfo.row.id}/state/${userInfo.row.mg_state}`
      )
      if (res.meta.status !== 200) {
        userInfo.row.mg_state = !userInfo.row.mg_state
        return this.$message.error('更新状态失败')
      }
      this.$message({
        type: 'success',
        message: '更新状态成功'
      })
    },
    searchGetUserList() {
      this.params.pagenum = 1
      this.getUserList()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
