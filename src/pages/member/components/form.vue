<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option :value="province.value" v-for="province in addressData.list" :key="province.value">{{province.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="city.value" v-for="city in cityList" :key="city.value">{{city.label}}</option>
            </select>
            <select class="js-county-selector" v-model="districtValue">
              <option value="-1">选择地区</option>
              <option :value="district.value" v-for="district in districtList" :key="district.value">{{district.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" value="" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="add">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" @click="remove" v-show="type=='edit'">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" @click="setDefault" v-show="type==='edit'">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>

<script>
import Address from 'js/addressService.js'

export default {
  computed: {
    lists () {
      return this.$store.state.lists
    }
  },
  data () {
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      id: '',
      type: '',
      instance: '',
      addressData: require('js/address.json'),
      cityList: null,
      districtList: null
    }
  },
  created () {
    let query = this.$route.query
    this.type = query.type
    this.instance = query.instance

    if (this.type === 'edit') {
      let ad = this.instance
      this.provinceValue = parseInt(ad.provinceValue)
      this.name = ad.name
      this.tel = ad.tel
      this.address = ad.address
      this.id = ad.id
    }
  },
  methods: {
    add () {
      let {name, tel, provinceValue, cityValue, districtValue, address} = this
      let data = {name, tel, provinceValue, cityValue, districtValue, address}
      if (this.type === 'add') {
        // Address.add(data).then(res => {
        //   this.$router.back()
        // })
        this.$store.dispatch('addAction', data)
        console.log(this.lists)
      }
      if (this.type === 'edit') {
        data.id = this.id
        // Address.update(data).then(res => {
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('updateAction', data)
      }
    },
    remove () {
      if (window.confirm('确认删除?')) {
        // Address.remove(this.id).then(res => {
        //   this.$router.back()
        // })
        this.$store.dispatch('removeAction', this.id)
      }
    },
    setDefault () {
      // Address.setDefault(this.id).then(res => {
      //   this.$router.back()
      // })
      this.$store.dispatch('setDefaultAction', this.id)
    }
  },
  watch: {
    provinceValue (val) {
      if (val === -1) return
      let list = this.addressData.list
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.cityList = list[index].children
      console.log(this.cityList)
      this.cityValue = -1
      this.districtValue = -1

      if (this.type === 'edit') {
        this.cityValue = parseInt(this.instance.cityValue)
      }
    },
    cityValue (val) {
      if (val === -1) return
      let list = this.cityList
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.districtList = list[index].children
      this.districtValue = -1

      if (this.type === 'edit') {
        this.districtValue = parseInt(this.instance.districtValue)
      }
    },
    lists: {
      handler () {
        this.$router.back()
      },
      deep: true
    }
  }
}
</script>
