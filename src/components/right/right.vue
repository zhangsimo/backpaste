<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="等级">
        <template slot-scope="scope">
          <el-row>
            <el-col v-if="scope.row.level == 0">一级</el-col>
            <el-col v-else-if="scope.row.level == 1">二级</el-col>
            <!-- eslint-disable-next-line -->
            <el-col v-else="scope.row.level == 2">三级</el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          authName: '2016-05-02',
          path: '王小虎',
          level: '1'
        }
      ]
    }
  },
  created () {
    this.randerRightsList()
  },
  methods: {
    async randerRightsList () {
      let res = await this.$axios.get('rights/list')
      this.tableData = res.data.data
    },
    indexMethod (index) {
      return index
    }
  }
}
</script>

<style>
</style>
