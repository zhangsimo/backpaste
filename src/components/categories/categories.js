export default {
  data () {
    return {
      CategoriesLists: [],
      pagenum: 1,
      pagesize: 4,
      dialogCategoriesVisible: false,
      categoriresForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      options: [
        {
          cat_id: 'ziyuan',
          label: '资源',
          children: [
            {
              cat_id: 'axure',
              label: 'Axure Components'
            }
          ]
        }
      ],
      propsCategories: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created () {
    this.heanderCategoriesLists()
    this.addCategoriesList()
  },
  methods: {
    async heanderCategoriesLists () {
      let res = await this.$axios.get('categories', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      // console.log(res)
      this.CategoriesLists = res.data.data.result
    },
    async addCategoriesList () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      this.options = res.data.data
      // console.log(res)
    },
    /* eslint-disable */

    async closeCategoriesVisible() {
      let { cat_name, cat_pid_arr } = this.categoriresForm
      this.dialogCategoriesVisible = false
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name: cat_name,
        cat_level: cat_pid_arr.length
      })
      // console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          message: `创建成功`,
          type: 'success',
          duration: 1000
        })
        this.heanderCategoriesLists()
      }
    },
    openCategories() {
      this.dialogCategoriesVisible = true
    }
  }
}
