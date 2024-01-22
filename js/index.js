

const app = Vue.createApp({
  data () {
    return {
      login: {
        username: '',
        password: '',
      },
      apiUrl: 'https://vue3-course-api.hexschool.io/v2'
    }
  },
  methods: {
    loginAdmin () {
      if (this.login.username === '' || this.login.password === '') {
        alert('不可以空白唷')
        return
      }
      axios.post(`${this.apiUrl}/admin/signin`, this.login)
        .then((res) => {
          alert("已登入", res);
          const {token, expired} = res.data
          // console.log(token, expired);
          document.cookie = `zack0118=${token}; expires=${new Date(expired)};`;
          window.location = 'products.html'
        })
        .catch((err) => {
          alert("未登入", err.response);
        })
    },
    resetAdmin () {
      this.login.username = ''
      this.login.password = ''
    }
  }
})

app.mount('#app')