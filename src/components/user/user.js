// import axios from 'axios'
export default {
  data () {
    return {
      value3: '',
      input3: '',
      total: 0,
      pagenum: 1,
      tableData: [
        {
          username: '',
          email: '',
          mobile: '',
          status: '',
          oper: ''
        }
      ],
      dialogAddUserVisible: false,
      AddUserform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '写入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      // 修改用户表单

      dialogChangeFormVisible: false,
      changeForm: {
        username: '',
        mobile: '',
        email: '',
        role_id: 0,
        id: ''
      },
      // 分配角色表单
      dialogRolsVisible: false,
      rolsForm: {
        username: '',
        rid: '',
        id: ''
      },
      rolsList: []
    }
  },
  created () {
    this.handermsg()
    this.allotRols()
  },
  methods: {
    async handermsg (pagenum = 1, query) {
      let ajax = await this.$axios.get('users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      })
      this.tableData = ajax.data.data.users
      this.total = ajax.data.data.total
      this.pagenum = ajax.data.data.pagenum
    },
    changepage (currentPage) {
      this.handermsg(currentPage, this.input3)
    },
    querylist () {
      this.handermsg(1, this.input3)
    },
    // 添加用户
    AddUser () {
      this.$refs.AddUserform.validate(async valid => {
        if (!valid) {
          return
        }
        const res = await this.$axios.post('users', this.AddUserform)
        if (res.data.meta.status === 201) {
          this.$message({
            message: '添加用户成功',
            type: 'success',
            duration: 1500
          })
          this.handermsg()
          this.dialogAddUserVisible = false
        }
        // this.$refs.AddUserform.resetFields()
      })
    },
    // 点击打开添加用户界面
    AddUserLiset () {
      this.dialogAddUserVisible = true
    },
    // 更改用户状态
    async changeSwitchType (res) {
      let ajax = await this.$axios.put(`users/${res.id}/state/${res.mg_state}`)
      if (ajax.data.meta.status === 200) {
        this.$message({
          message: '更改状态成功',
          type: 'success',
          duration: 1000
        })
      }
    },
    // 删除单个信息
    async deleUserList (id) {
      this.$confirm('是否删除此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await this.$axios.delete(`users/${id}`)
        if (res.data.meta.status === 200) {
          this.$message({
            message: `删除成功`,
            type: 'success',
            duration: 1000
          })
          this.handermsg()
        }
      })
    },
    // 修改用户信息
    changeUserMessage (res) {
      console.log(res)
      let { username, email, mobile, id } = res
      this.dialogChangeFormVisible = true
      // this.changeForm = res
      this.changeForm.username = username
      this.changeForm.email = email
      this.changeForm.mobile = mobile
      this.changeForm.id = id
    },
    closeChangeFormVisible () {
      let { email, mobile, id } = this.changeForm
      this.$refs.ChangeFormVisible.validate(async valid => {
        if (!valid) {
          return
        }
        let ajax = await this.$axios.put(`users/${id}`, {
          email,
          mobile
        })
        if (ajax.data.meta.status === 200) {
          this.$message({
            message: '修改用户信息成功',
            type: 'success',
            duration: 1500
          })
          this.dialogChangeFormVisible = false
          this.handermsg(this.pagenum)
        }
      })
    },

    // 分配角色
    async allotRols () {
      let res = await this.$axios.get('roles')
      this.rolsList = res.data.data
    },

    async taggerAllotRols (row) {
      // console.log(row)

      let { id, username } = row
      this.dialogRolsVisible = true

      let res = await this.$axios.get(`users/${id}`)
      // console.log(res)
      this.rolsForm.username = username
      this.rolsForm.id = id
      this.rolsForm.rid = res.data.data.rid === -1 ? '' : res.data.data.rid
    },
    async closeRolsForm () {
      this.dialogRolsVisible = false
      let res = await this.$axios.put(`users/${this.rolsForm.id}/role`, {
        rid: this.rolsForm.rid
      })
      if (res.data.meta.status === 200) {
        this.$message({
          message: `设置角色成功`,
          type: 'success',
          duration: 1000
        })
      }
    }
  }
}
