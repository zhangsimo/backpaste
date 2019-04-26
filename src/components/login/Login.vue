<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item label="账号名称" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <!-- <el-button :plain="true" @click="open">打开消息提示</el-button> -->
</template>

<script>
import axios from 'axios'
// /* eslint-disable */
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return
        }
        axios
          .post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            localStorage.setItem('token', res.data.data.token)
            if (res.data.meta.status === 200) {
              this.$router.push('/home')
              this.$message({
                showClose: true,
                message: '登录成功',
                type: 'success',
                duration: 2000
              })
            }
            if (res.data.meta.status === 400) {
              this.$message({
                showClose: true,
                message: '账号或密码错误',
                type: 'error',
                duration: 2000
              })
            }
          })
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-form {
  border: 1px solid #000;
  background-color: #fff;
  padding: 1.875rem /* 30/16 */ 1.25rem /* 20/16 */;
  border-radius: 0.9375rem; /* 15/16 */
}
</style>
