<template>
  <div>
    <el-button type="success" @click="goGoodsAdd">添加商品</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价值" width="180"></el-table-column>
      <el-table-column prop="goods_number" label="商品数量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.heanderGoods()
  },
  methods: {
    async heanderGoods () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      console.log(res)
      this.tableData = res.data.data.goods
    },
    goGoodsAdd () {
      this.$router.push({ path: '/goods-add' })
    }
  }
}
</script>

<style>
</style>
