export default {
  data () {
    return {
      roleData: [
        {
          roleName: '',
          roleDesc: ''
        }
      ],
      dialogVisible: false,
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label11: '三级 1-1-2'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      oneId: ''
    }
  },
  created () {
    this.randerRoleList()
    this.treeRoleList()
  },
  methods: {
    // 加载角色列表数据
    async randerRoleList () {
      let res = await this.$axios.get('roles')
      this.roleData = res.data.data
    },
    indexMethod (index) {
      return index
    },
    // 获取全部数据
    async treeRoleList () {
      let res = await this.$axios.get('rights/tree')
      this.treeData = res.data.data
    },
    distribution (res) {
      this.dialogVisible = true
      // 这个res数据获取有问题？？？
      // console.log(res.children)
      // console.log(res.id)

      // this.$refs.tree.setCheckedNodes
      this.oneId = res.id

      let arr = []
      res.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            arr.push(item3.id)
          })
        })
      })

      this.$nextTick(() => {
        if (typeof this.$refs.tree === 'undefined') {
          return
        }
        this.$refs.tree.setCheckedKeys(arr)
      })
    },

    async changeRolsList () {
      let keys1 = this.$refs.tree.getCheckedKeys()
      let keys2 = this.$refs.tree.getHalfCheckedKeys()
      let keys = [...keys1, ...keys2]

      // console.log(keys)

      let res = await this.$axios.post(`roles/${this.oneId}/rights`, {
        rids: keys.join(',')
      })
      if (res.data.meta.status === 200) {
        this.$message({
          message: `分配权限修改成功`,
          type: 'success',
          duration: 1000
        })
        this.dialogVisible = false
        this.randerRoleList()
      }
    }
  }
}
