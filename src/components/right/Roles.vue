<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- card -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table :data="roleList" border stripe>
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="['tagBottom',i===0?'tagTop':'']"
              v-for="(item1,i) in scope.row.children"
              :key="item1.id"
            >
              <!-- 第一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeTagById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 第二级权限 -->
              <el-col :span="19">
                <el-row v-for="(item2) in item1.children" :key="item2.id" class="flexAlignCenter">
                  <el-col :span="8">
                    <el-tag
                      type="success"
                      closable
                      @close="removeTagById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeTagById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showAssignRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限dialog -->
    <el-dialog title="分配权限" :visible.sync="assignRightDialog" width="50%">
      <el-tree
        :data="rightsList"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer">
        <el-button @click="assignRightDialog = false">取 消</el-button>
        <el-button type="primary" @click="assignRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleList: [
        {
          id: 30,
          roleName: '主管',
          roleDesc: '技术负责人',
          children: [
            {
              id: 101,
              authName: '商品管理',
              path: 'goods',
              children: [
                {
                  id: 104,
                  authName: '商品列表',
                  path: 'goods',
                  children: [
                    {
                      id: 105,
                      authName: '添加商品',
                      path: 'goods'
                    },
                    {
                      id: 116,
                      authName: '商品修改',
                      path: 'goods'
                    },
                    {
                      id: 117,
                      authName: '商品删除',
                      path: 'goods'
                    },
                    {
                      id: 150,
                      authName: '更新商品图片',
                      path: 'goods'
                    }
                  ]
                }
              ]
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
                  children: [
                    {
                      id: 109,
                      authName: '添加订单',
                      path: 'orders'
                    }
                  ]
                }
              ]
            },
            {
              id: 103,
              authName: '权限管理',
              path: 'rights',
              children: [
                {
                  id: 112,
                  authName: '权限列表',
                  path: 'rights',
                  children: [
                    {
                      id: 147,
                      authName: '查看权限',
                      path: 'rights'
                    }
                  ]
                },
                {
                  id: 111,
                  authName: '角色列表',
                  path: 'roles',
                  children: [
                    {
                      id: 129,
                      authName: '添加角色',
                      path: 'roles'
                    },
                    {
                      id: 130,
                      authName: '删除角色',
                      path: 'roles'
                    },
                    {
                      id: 135,
                      authName: '取消角色授权',
                      path: 'roles'
                    },
                    {
                      id: 138,
                      authName: '获取角色列表',
                      path: 'roles'
                    },
                    {
                      id: 139,
                      authName: '获取角色详情',
                      path: 'roles'
                    },
                    {
                      id: 140,
                      authName: '更新角色信息',
                      path: 'roles'
                    },
                    {
                      id: 141,
                      authName: '更新角色权限',
                      path: 'roles'
                    }
                  ]
                }
              ]
            },
            {
              id: 125,
              authName: '用户管理',
              path: 'users',
              children: [
                {
                  id: 110,
                  authName: '用户列表',
                  path: 'users',
                  children: [
                    {
                      id: 131,
                      authName: '添加用户',
                      path: 'users'
                    },
                    {
                      id: 132,
                      authName: '删除用户',
                      path: 'users'
                    },
                    {
                      id: 133,
                      authName: '更新用户',
                      path: 'users'
                    },
                    {
                      id: 136,
                      authName: '获取用户详情',
                      path: 'users'
                    },
                    {
                      id: 137,
                      authName: '分配用户角色',
                      path: 'users'
                    }
                  ]
                }
              ]
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
                  children: [
                    {
                      id: 148,
                      authName: '查看数据',
                      path: 'reports'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 31,
          roleName: '测试角色',
          roleDesc: '测试角色描述',
          children: [
            {
              id: 101,
              authName: '商品管理',
              path: 'goods',
              children: [
                {
                  id: 115,
                  authName: '分类参数',
                  path: 'params',
                  children: [
                    {
                      id: 142,
                      authName: '获取参数列表',
                      path: 'categories'
                    },
                    {
                      id: 143,
                      authName: '创建商品参数',
                      path: 'categories'
                    },
                    {
                      id: 144,
                      authName: '删除商品参数',
                      path: 'categories'
                    }
                  ]
                },
                {
                  id: 121,
                  authName: '商品分类',
                  path: 'categories',
                  children: [
                    {
                      id: 122,
                      authName: '添加分类',
                      path: 'categories'
                    },
                    {
                      id: 123,
                      authName: '删除分类',
                      path: 'categories'
                    },
                    {
                      id: 149,
                      authName: '获取分类详情',
                      path: 'categories'
                    }
                  ]
                },
                {
                  id: 104,
                  authName: '商品列表',
                  path: 'goods',
                  children: [
                    {
                      id: 105,
                      authName: '添加商品',
                      path: 'goods'
                    },
                    {
                      id: 116,
                      authName: '商品修改',
                      path: 'goods'
                    },
                    {
                      id: 117,
                      authName: '商品删除',
                      path: 'goods'
                    }
                  ]
                }
              ]
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
                  children: [
                    {
                      id: 109,
                      authName: '添加订单',
                      path: 'orders'
                    },
                    {
                      id: 154,
                      authName: '订单更新',
                      path: 'orders'
                    },
                    {
                      id: 155,
                      authName: '获取订单详情',
                      path: 'orders'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 34,
          roleName: '测试角色2',
          roleDesc: '测试描述12',
          children: [
            {
              id: 101,
              authName: '商品管理',
              path: 'goods',
              children: [
                {
                  id: 104,
                  authName: '商品列表',
                  path: 'goods',
                  children: [
                    {
                      id: 105,
                      authName: '添加商品',
                      path: 'goods'
                    },
                    {
                      id: 116,
                      authName: '商品修改',
                      path: 'goods'
                    },
                    {
                      id: 117,
                      authName: '商品删除',
                      path: 'goods'
                    }
                  ]
                },
                {
                  id: 115,
                  authName: '分类参数',
                  path: 'params',
                  children: [
                    {
                      id: 142,
                      authName: '获取参数列表',
                      path: 'categories'
                    },
                    {
                      id: 144,
                      authName: '删除商品参数',
                      path: 'categories'
                    }
                  ]
                }
              ]
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
                  children: [
                    {
                      id: 129,
                      authName: '添加角色',
                      path: 'roles'
                    },
                    {
                      id: 130,
                      authName: '删除角色',
                      path: 'roles'
                    },
                    {
                      id: 134,
                      authName: '角色授权',
                      path: 'roles'
                    },
                    {
                      id: 135,
                      authName: '取消角色授权',
                      path: 'roles'
                    },
                    {
                      id: 138,
                      authName: '获取角色列表',
                      path: 'roles'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 39,
          roleName: '大发送到',
          roleDesc: '阿斯蒂芬',
          children: [
            {
              id: 101,
              authName: '商品管理',
              path: 'goods',
              children: [
                {
                  id: 104,
                  authName: '商品列表',
                  path: 'goods',
                  children: [
                    {
                      id: 105,
                      authName: '添加商品',
                      path: 'goods'
                    },
                    {
                      id: 116,
                      authName: '商品修改',
                      path: 'goods'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 40,
          roleName: 'test',
          roleDesc: 'test',
          children: [
            {
              id: 102,
              authName: '订单管理',
              path: 'orders',
              children: [
                {
                  id: 107,
                  authName: '订单列表',
                  path: 'orders',
                  children: [
                    {
                      id: 109,
                      authName: '添加订单',
                      path: 'orders'
                    },
                    {
                      id: 154,
                      authName: '订单更新',
                      path: 'orders'
                    },
                    {
                      id: 155,
                      authName: '获取订单详情',
                      path: 'orders'
                    }
                  ]
                }
              ]
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
                  children: [
                    {
                      id: 148,
                      authName: '查看数据',
                      path: 'reports'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 41,
          roleName: 'dsdf',
          roleDesc: 'sf ',
          children: []
        }
      ],
      assignRightDialog: false,
      rightsList: [
        {
          id: 101,
          authName: '商品管理',
          path: 'goods',
          pid: 0,
          children: [
            {
              id: 104,
              authName: '商品列表',
              path: 'goods',
              pid: 101,
              children: [
                {
                  id: 105,
                  authName: '添加商品',
                  path: 'goods',
                  pid: '104,101'
                },
                {
                  id: 116,
                  authName: '商品修改',
                  path: 'goods',
                  pid: '104,101'
                },
                {
                  id: 117,
                  authName: '商品删除',
                  path: 'goods',
                  pid: '104,101'
                },
                {
                  id: 150,
                  authName: '更新商品图片',
                  path: 'goods',
                  pid: '104,101'
                },
                {
                  id: 151,
                  authName: '更新商品属性',
                  path: 'goods',
                  pid: '104,101'
                },
                {
                  id: 152,
                  authName: '更新商品状态',
                  path: 'goods',
                  pid: '104,101'
                },
                {
                  id: 153,
                  authName: '获取商品详情',
                  path: 'goods',
                  pid: '104,101'
                }
              ]
            },
            {
              id: 115,
              authName: '分类参数',
              path: 'params',
              pid: 101,
              children: [
                {
                  id: 142,
                  authName: '获取参数列表',
                  path: 'categories',
                  pid: '115,101'
                },
                {
                  id: 143,
                  authName: '创建商品参数',
                  path: 'categories',
                  pid: '115,101'
                },
                {
                  id: 144,
                  authName: '删除商品参数',
                  path: 'categories',
                  pid: '115,101'
                }
              ]
            },
            {
              id: 121,
              authName: '商品分类',
              path: 'categories',
              pid: 101,
              children: [
                {
                  id: 122,
                  authName: '添加分类',
                  path: 'categories',
                  pid: '121,101'
                },
                {
                  id: 123,
                  authName: '删除分类',
                  path: 'categories',
                  pid: '121,101'
                },
                {
                  id: 149,
                  authName: '获取分类详情',
                  path: 'categories',
                  pid: '121,101'
                }
              ]
            }
          ]
        },
        {
          id: 102,
          authName: '订单管理',
          path: 'orders',
          pid: 0,
          children: [
            {
              id: 107,
              authName: '订单列表',
              path: 'orders',
              pid: 102,
              children: [
                {
                  id: 109,
                  authName: '添加订单',
                  path: 'orders',
                  pid: '107,102'
                },
                {
                  id: 154,
                  authName: '订单更新',
                  path: 'orders',
                  pid: '107,102'
                },
                {
                  id: 155,
                  authName: '获取订单详情',
                  path: 'orders',
                  pid: '107,102'
                }
              ]
            }
          ]
        },
        {
          id: 103,
          authName: '权限管理',
          path: 'rights',
          pid: 0,
          children: [
            {
              id: 111,
              authName: '角色列表',
              path: 'roles',
              pid: 103,
              children: [
                {
                  id: 129,
                  authName: '添加角色',
                  path: 'roles',
                  pid: '111,103'
                },
                {
                  id: 130,
                  authName: '删除角色',
                  path: 'roles',
                  pid: '111,103'
                },
                {
                  id: 134,
                  authName: '角色授权',
                  path: 'roles',
                  pid: '111,103'
                },
                {
                  id: 135,
                  authName: '取消角色授权',
                  path: 'roles',
                  pid: '111,103'
                },
                {
                  id: 138,
                  authName: '获取角色列表',
                  path: 'roles',
                  pid: '111,103'
                },
                {
                  id: 139,
                  authName: '获取角色详情',
                  path: 'roles',
                  pid: '111,103'
                },
                {
                  id: 140,
                  authName: '更新角色信息',
                  path: 'roles',
                  pid: '111,103'
                },
                {
                  id: 141,
                  authName: '更新角色权限',
                  path: 'roles',
                  pid: '111,103'
                }
              ]
            },
            {
              id: 112,
              authName: '权限列表',
              path: 'rights',
              pid: 103,
              children: [
                {
                  id: 147,
                  authName: '查看权限',
                  path: 'rights',
                  pid: '112,103'
                }
              ]
            }
          ]
        },
        {
          id: 125,
          authName: '用户管理',
          path: 'users',
          pid: 0,
          children: [
            {
              id: 110,
              authName: '用户列表',
              path: 'users',
              pid: 125,
              children: [
                {
                  id: 131,
                  authName: '添加用户',
                  path: 'users',
                  pid: '110,125'
                },
                {
                  id: 132,
                  authName: '删除用户',
                  path: 'users',
                  pid: '110,125'
                },
                {
                  id: 133,
                  authName: '更新用户',
                  path: 'users',
                  pid: '110,125'
                },
                {
                  id: 136,
                  authName: '获取用户详情',
                  path: 'users',
                  pid: '110,125'
                },
                {
                  id: 137,
                  authName: '分配用户角色',
                  path: 'users',
                  pid: '110,125'
                },
                {
                  id: 159,
                  authName: '设置管理状态',
                  path: 'users',
                  pid: '110,125'
                }
              ]
            }
          ]
        },
        {
          id: 145,
          authName: '数据统计',
          path: 'reports',
          pid: 0,
          children: [
            {
              id: 146,
              authName: '数据报表',
              path: 'reports',
              pid: 145,
              children: [
                {
                  id: 148,
                  authName: '查看数据',
                  path: 'reports',
                  pid: '146,145'
                }
              ]
            }
          ]
        }
      ],
      // 树形控件属性绑定对象
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      // 树形控件默认选中的checkbox
      defaultCheckedKeys: [],
      roleId: null
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      var { data: res } = await this.$axios.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取失败')
      this.roleList = res.data
    },
    // 根据id删除tag
    removeTagById(row, rightId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          var { data: res } = await this.$axios.delete(
            `roles/${row.id}/rights/${rightId}`
          )
          if (res.meta.status !== 200) return this.$message.error('删除失败')

          row.children = res.data
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 分配权限
    async showAssignRightDialog(row) {
      // 记录需要修改的角色id
      this.roleId = row.id
      // tree里的内容
      var { data: res } = await this.$axios.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('数据获取失败')
      this.rightsList = res.data
      // tree哪些项被勾选
      this.defaultCheckedKeys = []
      this.getLeafKey(row)
      this.assignRightDialog = true
    },
    getLeafKey(node) {
      if (!node.children) {
        return this.defaultCheckedKeys.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKey(item)
      })
    },
    // 点击授权确认按钮
    async assignRight() {
      var keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      keys = keys.join(',')
      var { data: res } = await this.$axios.post(
        `roles/${this.roleId}/rights`,
        {
          rids: keys
        }
      )
      if (res.meta.status !== 200) return this.$message.error('授权失败')
      this.getRolesList()
      this.$message.success('授权成功')
      this.assignRightDialog = false
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag {
  margin-top: 7px;
}
.tagTop {
  border-top: 1px solid #eee;
}
.tagBottom {
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}
.flexAlignCenter {
  display: flex;
  align-items: center;
}
</style>