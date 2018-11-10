<template>
  <div class="main">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="user">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <div>
      <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" plain @click="add">添加用户</el-button>
    </div>
    <!-- 表格 -->
      <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <span >{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="电话"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#409EFF"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button plain type="primary" icon="el-icon-edit" size="small"></el-button>
          <el-button plain type="danger" icon="el-icon-delete" size="small" @click="del(scope.row.id)"></el-button>
          <el-button plain type="success" icon="el-icon-check" size="small">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6]"
        :page-size="pagesize"
        layout="sizes, prev, pager, next, jumper, total"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            userList: [],
            query: '',
            pagenum: 1,
            pagesize: 2,
            total: 0
        }
    },
    methods: {
        // 发送ajax请求并渲染
        getUsers() {
            axios({
                method: 'get',
                params: {
                    query: this.query,
                    pagenum: this.pagenum,
                    pagesize: this.pagesize
                },
                headers: { Authorization: localStorage.getItem('token') },
                url: 'http://localhost:8888/api/private/v1/users'
            })
                .then(data => {
                    console.log(data.data)
                    this.total = data.data.data.total
                    this.userList = data.data.data.users
                })
                .catch(error => {
                    console.log(error)
                })
        },
        // 点击每页条数
        handleSizeChange(val) {
            this.pagesize = val
            this.pagenum = 1
            this.getUsers()
        },
        // 点击换页
        handleCurrentChange(val) {
            this.pagenum = val
            this.getUsers()
        },
        // 删除一条数据
        del(id) {
            axios({
                method: 'delete',
                url: `http://localhost:8888/api/private/v1/users/${id}`,
                headers: { Authorization: localStorage.getItem('token') }
            }).then(data => {
                if (data.data.meta.status === 200) {
                    if (this.userList.length === 1 && this.pagenum > 1) {
                        this.pagenum--
                    }
                    this.getUsers()
                }
            })
        },
        // 查询数据
        search() {
            this.pagenum = 1
            this.getUsers()
        }
        // 添加用户
    },
    created() {
        this.getUsers()
    }
}
</script>

<style scoped>
.el-breadcrumb {
    padding: 10px;
    background-color: #d4dae0;
}
.el-pagination {
    margin-top: 10px;
}
.input-with-select {
    width: 300px;
    margin: 10px 0;
}
</style>
