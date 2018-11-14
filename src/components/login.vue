<template>
<el-form ref="form" :model="form" status-icon label-width="80px" class="login" :rules="rules" hide-required-asterisk>
  <img src="../../static/IMG_3339.jpg" alt="">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">登陆</el-button>
    <el-button @click="reForm">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 6,
                        message: '长度在 3 到 6 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 6,
                        message: '长度在 6 到 12 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        login() {
            this.$refs.form.validate(flag => {
                if (flag) {
                    axios({
                        method: 'post',
                        url: 'http://localhost:8888/api/private/v1/login',
                        data: {
                            username: this.form.username,
                            password: this.form.password
                        }
                    }).then(res => {
                        if (res.meta.status === 200) {
                            this.$message.success(res.meta.msg)
                            localStorage.setItem('token', res.data.token)
                            this.$router.push('/home')
                        } else {
                            this.$message.error(res.meta.msg)
                        }
                    })
                } else {
                    return false
                }
            })
        },
        reForm() {
            this.$refs.form.resetFields()
        }
    }
}
</script>

<style scoped lang="less">
.login {
    width: 400px;
    background-color: #fff;
    padding: 70px 15px 40px 0;
    border-radius: 20px;
    margin: 200px auto;
    position: relative;

    button:nth-child(2) {
        margin-left: 70px;
    }

    img {
        position: absolute;
        width: 100px;
        height: 100px;
        left: 50%;
        transform: translate(-50%);
        top: -60px;
        border-radius: 50%;
    }
}
</style>
