<template>
  <div class="right">
      <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/user' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table
      :data="rightList"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            rightList: [
                {
                    authName: '',
                    level: '',
                    path: ''
                }
            ]
        }
    },
    methods: {
        async getList() {
            let res = await this.axios.get('rights/list')
            let {
                meta: { status },
                data
            } = res
            if (status === 200) {
                this.rightList = data
            }
        }
    },
    created() {
        this.getList()
    }
}
</script>

<style>
</style>
