import 'css/common.css'
import './search.css'

import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { InfiniteScroll } from 'mint-ui'
import mixin from '../../modules/js/mixin'
import Velocity from 'velocity-animate'

Vue.use(InfiniteScroll)
Vue.config.productionTip = false

let {keyword, id} = qs.parse(location.search.slice(1))

new Vue({
  el: '.container',
  mixins: [mixin],
  data: {
    keyword,
    searchList: null,
    show: false,
    loading: false,
    loadingAll: false,
    pageNum: 1,
    pageSize: 8,
    timeOutId: 0,
    isShow: false
  },
  created () {
    this.getSearchList()
  },
  methods: {
    getSearchList () {
      if (this.loadingAll) return
      axios.get(url.searchList, {
        id,
        keyword,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.searchList = res.data.lists
        console.log(res)
        if (this.searchList < this.pageSize) {
          this.loadingAll = true
        } else {
          if (!this.searchList) {
            this.searchList = res.data.lists
          } else {
            this.searchList = this.searchList.concat(res.data.lists)
          }
          this.pageNum++
        }
      })
    },
    move () {
      if (document.documentElement.scrollTop > 250) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    toTop () {
      Velocity(document.body, 'scroll', {duration: 500})
    }
  }
})
