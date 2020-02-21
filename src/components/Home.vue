<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <!--左侧menu -->
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleMenu">|||</div>
        <!-- 菜单栏 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="collapse"
          :collapse-transition="false"
          :default-active="this.$route.path.split('/')[2]"
          router
        >
          <el-submenu :index="item.id.toString()" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 中间main -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 中间main -->
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      res: {
        data: [
          {
            id: 125,
            authName: '用户管理',
            path: 'users',
            children: [
              {
                id: 110,
                authName: '用户列表',
                path: 'users',
                children: [],
                order: null
              }
            ],
            order: 1
          },
          {
            id: 103,
            authName: '权限管理',
            path: 'rights',
            children: [
              {
                id: 111,
                authName: '角色列表',
                path: 'roles',
                children: [],
                order: null
              },
              {
                id: 112,
                authName: '权限列表',
                path: 'rights',
                children: [],
                order: null
              }
            ],
            order: 2
          },
          {
            id: 101,
            authName: '商品管理',
            path: 'goods',
            children: [
              {
                id: 104,
                authName: '商品列表',
                path: 'goods',
                children: [],
                order: 1
              },
              {
                id: 115,
                authName: '分类参数',
                path: 'params',
                children: [],
                order: 2
              },
              {
                id: 121,
                authName: '商品分类',
                path: 'categories',
                children: [],
                order: 3
              }
            ],
            order: 3
          },
          {
            id: 102,
            authName: '订单管理',
            path: 'orders',
            children: [
              {
                id: 107,
                authName: '订单列表',
                path: 'orders',
                children: [],
                order: null
              }
            ],
            order: 4
          },
          {
            id: 145,
            authName: '数据统计',
            path: 'reports',
            children: [
              {
                id: 146,
                authName: '数据报表',
                path: 'reports',
                children: [],
                order: null
              }
            ],
            order: 5
          }
        ],
        meta: {
          msg: '获取菜单列表成功',
          status: 200
        }
      },
      iconList: {
        125: 'el-icon-user-solid',
        103: 'el-icon-coin',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-claim',
        145: 'el-icon-s-data'
      },
      collapse: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logOut() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      // 带服务器的请求
      // var { data: res } = await this.$axios.get('menus')
      var res = this.res
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)

      this.menuList = res.data
    },
    toggleMenu() {
      this.collapse = !this.collapse
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  padding-left: 0px;
  > div {
    display: flex;
    align-items: center;
  }
  img {
    width: 60px;
  }
}
.el-aside {
  background-color: #333744;
  transition: all 0.5s;
  .toggle-button {
    background-color: #4a5064;
    text-align: center;
    line-height: 24px;
    color: #fff;
    letter-spacing: 0.2em;
    font-size: 12px;
    cursor: pointer;
  }
  .el-menu {
    border-right: 0px;
  }
}

.el-main {
  background-color: #eaedf1;
}
.el-submenu {
  i {
    margin-right: 10px;
  }
}
</style>
