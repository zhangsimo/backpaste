<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">left</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">
            电商后台管理系统
          </div></el-col
        >
        <el-col :span="8"
          ><div class="bg-purple">
            36期VIP <a href="javascript:0" @click="clickout">退出</a>
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    clickout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  height: 5rem /* 80/16 */;
  line-height: 60px;
}
.bg-purple-light {
  font-size: 30px;
  text-align: center;
}
.bg-purple {
  text-align: right;
  font-size: 1.5625rem; /* 25/16 */
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  height: 100%;
}
</style>
