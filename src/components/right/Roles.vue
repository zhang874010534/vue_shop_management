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
      roleList: [],
      assignRightDialog: false,
      rightsList: [],
      // 树形控件属性绑定对象
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      // 树形控件默认选中的checkbox
      defaultCheckedKeys: [],
      roleId:null
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
      this.roleId=row.id
      // tree里的内容
      var { data: res } = await this.$axios.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('数据获取失败')
      this.rightsList = res.data
      // tree哪些项被勾选
      this.defaultCheckedKeys=[]
      this.getLeafKey(row)
      this.assignRightDialog = true
    },
    getLeafKey(node) {
      if(!node.children){
        return this.defaultCheckedKeys.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKey(item)
      })
    },
    // 点击授权确认按钮
    async assignRight(){
      var keys=[
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      keys=keys.join(',')
      var {data:res}= await this.$axios.post(`roles/${this.roleId}/rights`,{
        rids:keys
      })
      if(res.meta.status!==200)return this.$message.error('授权失败')
      this.getRolesList()
      this.$message.success('授权成功')
      this.assignRightDialog=false
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