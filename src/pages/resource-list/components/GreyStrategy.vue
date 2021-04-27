<template>
  <div>
    <el-form :model="greyDrawer.data"  ref="myForm" label-width="80px">
      <el-form-item>
        <el-form-item label="资源名称">
          {{ greyDrawer.data.resource }}
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-form-item label="EL表达式">
          {{ greyDrawer.data.el }}
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-form-item label="灰度策略">
          <el-select
            v-model="greyDrawer.data.greyStrategy"
            placeholder="请选择灰度策略"
          >
            <el-option
              v-for="item in greyStrategyDropList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-form-item label="灰度值" prop="grayValue">
          <el-input
            v-model="greyDrawer.data.greyValue"
            require="true"
          ></el-input>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-form-item label="   ">
          <el-button type="primary" @click="onSubmit(this)">确认修改</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.m-ellipsis {
  　　width: 120;
  　　overflow: hidden;
  　　display: -webkit-box;
  　　-webkit-box-orient: vertical;
  　　-webkit-line-clamp: 2;
}
</style>

<script>
import { greyStrategies } from './service'

export default {
  methods: {
    onSubmit() {

      var requestBody = this.greyDrawer.data
      requestBody.resourceId = requestBody.id
      if (requestBody.greyValue.length>255) {
        this.$message({
          message: '灰度值不能超过255个字符',
          type: 'warning'
        })
        return;
      }
      if (!requestBody.greyValue) {
        this.$message({
          message: '灰度值不能为空',
          type: 'warning'
        })
        return;
      }
      if (requestBody.greyStrategy == 2 || requestBody.greyStrategy == 3) {
        parseInt(requestBody.greyValue)
        var greyValue = parseInt(requestBody.greyValue)
        var isValid = !Number.isNaN(greyValue)
        if (isValid) {
          isValid = greyValue >= 0 && greyValue <= 1000
        }
        if (!isValid) {
          this.$message({
            message: '随机和hash策略 灰度值只能在0-1000之间',
            type: 'warning'
          })  
          return
        }
      }
      requestBody.greyValue
      this.$confirm('确定要修改灰度策略吗？')
        .then(_ => {
          _api.post('/center/resource/setting', requestBody).then(
            res => {
              if (res.error.code != 200) {
                this.$message({
                  message: res.error.msg,
                  type: 'warning'
                })
                return
              }
              this.greyDrawer.show = false
            },
            err => {
              this.$message({
                message: res.error.msg,
                type: 'error'
              })
              this.greyDrawer.show = false
              return
            }
          )
        })
        .catch(_ => {
          console.log(requestBody)
        })
    }
  },
  watch: {
    resource: {
      handler: function (newVal, oldVal) {
        this.greyDrawer = newVal
      },
      immediate: true
    }
  },
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      greyDrawer: null,
      instanceList: null,
      greyStrategyDropList: ''
    }
  },
  mounted() {
    this.greyStrategyDropList = greyStrategies()
  }
}
</script>