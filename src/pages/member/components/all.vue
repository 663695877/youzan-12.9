<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item"
        @click="toEdit(list)"
        v-for="(list, index) in lists"
        :key="index"
        :class="{'address-item-default': list.isDefault}">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a href="" class="address-edit">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link :to="{name: 'form', query: {type: 'add'}}" class="btn btn-blue js-no-webview-block js-add-address-btn">
            新增地址
      </router-link>
    </div>
  </div>
</template>

<script>
// import Address from 'js/addressService.js'
import {mapState} from 'vuex'

export default {
  // data () {
  //   return {
  //     lists: null
  //   }
  // },
  computed: {
    // lists () {
    //   return this.$store.state.lists
    // }
    ...mapState(['lists'])
  },
  created () {
    // Address.list().then(res => {
    //   this.lists = res.data.lists
    //   console.log('lists', this.lists)
    // })
    if (!this.lists) {
      this.$store.dispatch('getLists')
    }
  },
  methods: {
    toEdit (list) {
      this.$router.push({path: '/address/form',
        query: {
          type: 'edit',
          instance: list
        }
      })
    }
  }
}
</script>

<style>
  @import './address_base.css';
  @import './address.css';
</style>
