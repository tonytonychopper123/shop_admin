<template>
<div class="roles">
    <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/user' }">权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 添加角色按钮 -->
  <div class="add">
    <el-button type="success" style="margin: 10px 0" plain>添加角色</el-button>
  </div>
  <!-- 表格 -->
  <el-table
    :data="rolesList"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <!-- 如果没数据显示暂无数据 -->
        <el-row v-show="scope.row.children.length === 0">
          暂无数据
        </el-row>
        <el-row v-for="lev1 in scope.row.children" :key="lev1.id">
          <el-col :span="4">
            <el-tag
              @close="del(lev1.id , scope.row)"
              closable
              :disable-transitions="false">
              {{lev1.authName}}
            </el-tag>
          </el-col>
          <el-col :span="20">
            <el-row class="lev2" v-for="lev2 in lev1.children" :key="lev2.id">
              <el-col :span="4">
                <el-tag
                  @close="del(lev2.id , scope.row)"
                  closable
                  type="success"
                  :disable-transitions="false">
                  {{lev2.authName}}
                </el-tag>
              </el-col>
              <el-col :span="20">
                <el-tag
                  class="tag"
                  closable
                  @close="del(lev3.id , scope.row)"
                  v-for="lev3 in lev2.children"
                  :key="lev3.id"
                  type="warning"
                  :disable-transitions="false">
                  {{lev3.authName}}
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column type="index"></el-table-column>
    <el-table-column
      label="角色名称"
      width="180"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="描述"
      width="180"
      prop="roleDesc">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button plain type="primary" icon="el-icon-edit" size="small"></el-button>
        <el-button plain type="danger" icon="el-icon-delete" size="small"></el-button>
        <el-button plain type="success" icon="el-icon-check" size="small" @click="showRight(scope.row)">分配角色</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 弹出对话框 -->
  <el-dialog title="编辑角色" :visible.sync="dialogRoleVisible" @close="cancel">
    <!-- 树形结构 -->
    <el-tree
      ref="tree"
      :data="rightList"
      show-checkbox
      node-key="id"
      default-expand-all
      :props="defaultProps">
    </el-tree>
    <!-- 按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogRoleVisible = false">取 消</el-button>
      <el-button type="primary" @click="allot">确定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
export default {
    data() {
        return {
            // 角色列表
            rolesList: [
                {
                    roleName: '',
                    roleDesc: ''
                }
            ],
            // id集合
            ids: [],
            // 正在编辑的角色id
            roleid: '',
            // 权限列表
            rightList: [],
            dialogRoleVisible: false,
            // 树形结构的属性
            defaultProps: {
                children: 'children',
                label: 'authName'
            }
        }
    },
    methods: {
        async getList() {
            let res = await this.axios.get('roles')
            let {
                data,
                meta: { status }
            } = res
            if (status === 200) {
                this.rolesList = data
            }
        },
        // 打开分配角色对话框,查询所有权限数据
        async showRight(role) {
            // 将编辑的角色的角色id赋值给全局的roleid
            this.roleid = role.id
            this.dialogRoleVisible = true
            let res = await this.axios.get('rights/tree')
            let {
                data,
                meta: { status }
            } = res
            if (status === 200) {
                this.rightList = data
                // 遍历role数据获得角色拥有权限的id
                role.children.forEach(v => {
                    v.children.forEach(v1 => {
                        v1.children.forEach(v2 => {
                            this.ids.push(v2.id)
                        })
                    })
                })
                this.$refs.tree.setCheckedKeys(this.ids)
            }
        },
        // 编辑权限后发送数据
        async allot() {
            // 获取全局的roleid,即当前编辑的角色的id
            // 获得选中和半选中的选中项的id
            let rids = [
                ...this.$refs.tree.getCheckedKeys(),
                ...this.$refs.tree.getHalfCheckedKeys()
            ].join()
            let res = await this.axios.post(`roles/${this.roleid}/rights`, {
                rids
            })
            let {
                meta: { status }
            } = res
            if (status === 200) {
                this.$message.success('恭喜,编辑成功')
                this.dialogRoleVisible = false
                this.getList()
            }
        },
        // 删除tag
        async del(id, role) {
            let res = await this.axios.delete(`roles/${role.id}/rights/${id}`)
            let {
                data,
                meta: { status }
            } = res
            if (status === 200) {
                this.$message.success('删除权限成功')
                role.children = data
            }
        },
        // 关闭对话框的时候清空ids数组
        cancel() {
            this.dialogRoleVisible = false
            this.ids = []
        }
    },
    created() {
        this.getList()
    }
}
</script>

<style lang="less" scoped>
.lev2 {
    margin-bottom: 10px;
}
.tag {
    margin-right: 10px;
    margin-bottom: 5px;
}
</style>
