import 'css/common.css'
import './category.css'
import Foot from '../../components/Foot'

import url from 'js/api.js'
import axios from 'axios'
import Vue from 'vue'

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    subData: {},
    rankData: {}
  },
  created () {
    this.getTopList()
    this.getSubList(800, 0)
  },
  methods: {
    getTopList () {
      axios.get(url.topList).then(res => {
        this.topLists = res.data.lists
        console.log(res)
      })
      console.log(this.topLists)
    },
    getSubList (id, index) {
      this.topIndex = index
      if (index === 0) {
        axios.get(url.cateRank, {
          id: 0
        }).then(res => {
          console.log(res)
          this.rankData = res.data.data
          console.log(this.rankData)
        })
      } else {
        axios.get(url.subList, {
          id
        }).then(res => {
          this.subData = res.data.data
          console.log(res)
        })
      }
    },
    toSearch (list) {
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  components: {
    Foot
  },
  filters: {
    number (price) {
      let priceStr = '' + price
      if (priceStr.indexOf('.') > -1) {
        let arr = priceStr.split('.')
        return arr[0] + '.' + (arr[1] + '0').substr(0, 2)
      } else {
        return priceStr + '.00'
      }
    }
  }
})
