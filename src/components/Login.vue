<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登录区域 -->
      <el-form ref="form" label-width="0px" class="login_form" :model="form" :rules="loginRules">
        <!-- 帐号 -->
        <el-form-item label prop="username">
          <el-input prefix-icon="el-icon-user" v-model="form.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item label class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      successRes: {
        data: {
          id: 500,
          rid: 0,
          username: 'admin',
          mobile: '12345678',
          email: 'adsfad@qq.com',
          token:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1ODI0Mzk1NzcsImV4cCI6MTU4MjUyNTk3N30.bCkeltLDN0jbwOUB6cfbcOABqzCnttob4D1XvldOZHA'
        },
        meta: {
          msg: '登录成功',
          status: 200
        }
      },
      errorRes: {
        data: null,
        meta: {
          msg: '密码错误',
          status: 400
        }
      }
    }
  },
  methods: {
    // 重置表单
    reset() {
      this.$refs.form.resetFields()
    },
    login() {
      this.$refs.form.validate(async flag => {
        if (!flag) return
        // 这是带服务器的请求
        var { data } = await this.$axios.post('login', this.form)
        // var data
        // if (this.form.username === 'admin' && this.form.password === '123456') {
        //   data = this.successRes
        // } else {
        //   data = this.errorRes
        // }
        if (data.meta.status !== 200) return this.$message.error('登录失败')
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        sessionStorage.setItem('token', data.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}
</style>
