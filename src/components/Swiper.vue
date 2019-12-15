<template>
  <swiper :options="swiperOption" class="banner">
    <swiper-slide v-for="(slide, index) in lists" :key="index">
      <img :src="slide.image" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  props: {
    lists: Array
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style>
  .banner{
    height: 100%;
    width: 100%;
    font-size: 20px;
  }
  .swiper-slide{
    height: 100%;
    width: 100%;
  }
  img{
    width: 100%;
    height: 100%;
  }
</style>
