<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <div class="logo"></div>
      <div class="logout">
        欢迎光临
        <a href="#" @click.prevent="logout">退出</a>
      </div>
      <h1 class="title">电商管理系统后台</h1>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
         <el-menu
            default-active="1-2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            unique-opened
            router
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
                <el-menu-item index="home/user">用户列表</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
               <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/roles">角色列表</el-menu-item>
              <el-menu-item index="/right">权限列表</el-menu-item>
            </el-submenu>

            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>

            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>

            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">数据统计</span>
            </el-menu-item>
          </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$confirm('确定要推出吗?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('退出成功!')
                    localStorage.removeItem('token')
                    this.$router.push('/login')
                })
                .catch(() => {
                    this.$message.error('取消退出!')
                })
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    .el-header {
        background-color: #b3c1cd;
        height: 60px;
    }
    .el-aside {
        background-color: #545c64;
        .el-menu-item {
            width: 200px;
        }
        .el-submenu {
            width: 200px;
        }
    }
    .el-main {
        background-color: #eaeef1;
    }
    .logo {
        width: 180px;
        height: 70px;
        background: url('../assets/logo.png');
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        float: left;
    }
    .logout {
        float: right;
        width: 200px;
        font-weight: bold;
        color: #000;
        line-height: 60px;
        a {
            color: darkorange;
        }
    }
    .title {
        overflow: hidden;
        line-height: 60px;
        color: #fff;
        font-size: 28px;
        text-align: center;
    }
}
</style>
