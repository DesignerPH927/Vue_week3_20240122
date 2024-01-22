
// 步驟：
// 1. 設計layout
// 2. 驗證及抓遠端資料 v
// 3. 渲染資料至畫面上 v
// 4. 設計modal視窗 v
// 5. 設計新增modal 內容 v
// 6. 設計 刪除modal 內容 v
// 7. 將 input 使用雙向綁訂 v-model v
// 8. 執行新增資料及編輯資料 v
// 9. 製作多圖區




let productModal = null;
let delProductModal = null;

const app = Vue.createApp({
  data () {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'vuejs2024',
      remoteData: [],
      isNew: false, // 區分新、舊資料
      tempProduct: {
        imagesUrl: []
      }
    }
  },
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)zack0118\s*\=\s*([^;]*).*$)|^.*$/,
  "$1",);
      axios.defaults.headers.common['Authorization'] = token;

      axios.post(`${this.apiUrl}/api/user/check`)
        .then((res) => {
          // console.log("已驗證", res);
          this.getProducts()
        })
        .catch((err) => {
          alert("未驗證", err.response.data.message);
        })
    },
    getProducts () {
      axios(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
        .then((res) => {
          // console.log("已取得", res);
          this.remoteData = res.data.products
        })
        .catch((err) => {
          alert("未取得", err.response.data.message);
        })
    },
    openModal(isNew, item) {
      // console.log(isNew, item)
      if (isNew === "new") {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true;
        productModal.show()
      }else if (isNew === 'edit') {
        this.tempProduct = { ...item }
        this.isNew = false;
        productModal.show()
      }else if (isNew === 'delete') {
        this.tempProduct = { ...item }
        delProductModal.show()
      }
    },
    updateProduct () {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`
      let http = 'post'

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
        http = 'put'
      }

      axios[http]( url, { data: this.tempProduct } )
        .then((res) => {
          productModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          alert("未更動",err.response.data.message);
        })
    },
    delProduct (product) {
      const id = product.id
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`)
        .then((res) => {
          delProductModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    logout () {
      axios.post(`${this.apiUrl}/api/user/check`)
        .then((res) => {
          alert("已登出", res)
          window.location = "index.html"
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted() {
    this.checkAdmin()
    productModal = new bootstrap.Modal(document.getElementById('pModal'), {
      keyboard: false,
      backdrop: false
    })
    delProductModal = new bootstrap.Modal(document.getElementById('delPModal'), {
      keyboard: false,
      backdrop: false
    })   
  },
})

app.mount('#app')