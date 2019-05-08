<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="../../assets/logo.png" alt />
        </el-col>
        <el-col :span="8">
          <h1 class="title">电商后端控制系统</h1>
        </el-col>
        <el-col :span="8">
          <p class="out">
            36期VIP控制权
            <a href="JavaScript:0" @click="leaveOut">退出</a>
          </p>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧导航栏 -->
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            v-for="item1 of LeftRightsList"
            :index="item1.id + ''"
            :key="item1.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item1.authName }}</span>
            </template>
            <el-menu-item
              v-for="item2 of item1.children"
              :key="item2.id"
              :index="'/' + item2.path"
              >{{ item2.authName }}</el-menu-item
            >
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理权限</span>
            </template>
            <el-menu-item index="/play">角色列表</el-menu-item>
            <el-menu-item index="/right">权限列表</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      LeftRightsList: []
    }
  },
  created () {
    this.headerLeftRights()
  },
  methods: {
    leaveOut () {
      this.$confirm('你确定退出么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    async headerLeftRights () {
      let res = await this.$axios.get('menus')
      // console.log(res)
      this.LeftRightsList = res.data.data
    }
  }
}
</script>

<style lang="less">
.el-header {
  background-color: #b3c0d1;
  .title {
    font-size: 30px;
    line-height: 58px;
    text-align: center;
    color: #fff;
  }
  .out {
    text-align: right;
    line-height: 58px;
    font-size: 20px;
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #e9eef3;
}

.el-container {
  height: 100%;
}
</style>
