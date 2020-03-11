<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <el-steps :space="200" :active="active-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- 垂直tabs -->
      <el-form
        :model="addGoodsFormModel"
        ref="addGoodsFormRef"
        :rules="addGoodsFormRules"
        label-width="100px"
        label-position="top"
      >
        <el-tabs v-model="active" tab-position="left">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsFormModel.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addGoodsFormModel.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoodsFormModel.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_weight">
              <el-input v-model="addGoodsFormModel.goods_number" type="number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              list-type="picture"
              :headers="uploadHeaders"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor
              ref="myQuillEditor"
              v-model="addGoodsFormModel.goods_introduce"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
            <el-button type="primary">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisibile" width="60%">
      <img :src="this.previewUrl" alt class="previewImg" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      addGoodsFormModel: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        pics: [],
        // 商品的详情描述
        goods_introduce:''
      },
      addGoodsFormRules: {
        goods_name: [
          {
            required: true,
            message: '请填写商品名称',
            trigger: 'blur'
          }
        ],
        goods_price: [
          {
            required: true,
            message: '请填写商品价格',
            trigger: 'blur'
          }
        ],
        goods_weight: [
          {
            required: true,
            message: '请填写商品重量',
            trigger: 'blur'
          }
        ],
        goods_number: [
          {
            required: true,
            message: '请填写商品数量',
            trigger: 'blur'
          }
        ]
      },
      // 上传请求头
      uploadHeaders: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 预览图片地址
      previewUrl: '',
      // 预览dialog 是否显示
      previewVisibile: false
    }
  },
  methods: {
    // 图片预览
    handlePreview(file) {
      this.previewUrl = file.response.data.url
      this.previewVisibile = true
    },
    // 图片移除
    handleRemove(file) {
      let pic = file.response.data.tmp_path
      this.addGoodsFormModel.pics.some((item, i) => {
        console.log(item.pic)
        if (item.pic == pic) {
          this.addGoodsFormModel.pics.splice(i, 1)
          return true
        }
      })
      console.log(this.addGoodsFormModel.pics)
    },
    uploadSuccess(res) {
      let obj = {
        pic: res.data.tmp_path
      }
      this.addGoodsFormModel.pics.push(obj)
    }
  }
}
</script>
<style lang="less" scoped>
.el-tabs {
  margin-top: 15px;
}
.previewImg {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 60%;
}
.el-button{
  margin-top: 15px
}
</style>