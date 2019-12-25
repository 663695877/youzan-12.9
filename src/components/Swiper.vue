<template>
  <div></div>
</template>

<script>

export default {
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      }
    }
  },
  props: {
    lists: Array
  },
  components: {

  }
}
</script>

<style>
  .slider-wrapper {
    width: 100%;
    height: 180px;
    font-size: 40px;
    background: red;
    z-index: 999;
  }
  .swiper-img{
    width: 100%;
    height: 10px;
    background: red;
  }
  .img-item {
    width: 100%;
    height: 10px;
    z-index: 99999;
  }
</style>
