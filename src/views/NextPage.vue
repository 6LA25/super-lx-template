<template>
  <div>next-page</div>
  <div><button @click="handleCount">state++</button></div>
  <div>state from store {{ count }}</div>
  <van-button type="primary">主要按钮</van-button>

</template>

<script>
import { ref, computed, watch, getCurrentInstance } from 'vue'
import {
  getAdvertInfo,
} from '/@/assets/services/index.js'

export default {
  name: 'next-page',
  setup() {
    const { ctx } = getCurrentInstance()
    const handleCount = () => {
      ctx.$store.state.count++
    }
    const count = computed(() => ctx.$store.state.count)
    return {
      handleCount,
      count,
    }
  },
  mounted() {
    getAdvertInfo({ positionCode: 49 })
      .then((res) => {
        console.log(res, 'res')
      })
      .catch((err) => {})
  },
  methods: {},
}
</script>

<style lang="scss" scoped>

</style>