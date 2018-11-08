<template>
  <el-container class="container">
    <el-header>
      <div class="logo"></div>
      <div class="logout">
        欢迎光临
        <a href="#">退出</a>
      </div>
      <h1 class="title">电商管理系统后台</h1>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
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
