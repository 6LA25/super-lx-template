<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <div class="demo-box">
    <div class="count-box">{{ count }}</div>
    <div class="count-box">{{ state.count }}</div>
    <div><input type="text" v-model="state.name" />{{ state.name }}</div>
    <div><input type="text" v-model="author" />{{ author }}</div>
    <div>num1:{{ num1 }};plusOne{{ plusOne }}</div>
    <div>num2:{{ num2 }};comNum2:{{ comNum2 }}</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  readonly,
  watchEffect,
  watch,
} from 'vue'

export default defineComponent({
  props: {
    msg: String,
  },
  data() {
    return {
      num2: 2,
    }
  },
  setup(props) {
    console.log(props.msg)
    let num1 = 0
    const count = ref(2)
    const plusOne = computed(() => {
      return num1 + 'xxx'
    })
    const state = reactive({
      count,
      name: '',
    })
    const book = reactive({
      author: 'Vue Team',
      year: '2020',
      title: 'Vue 3 Guide',
      description: 'You are reading this book right now ;)',
      price: 'free',
    })
    let { author, title } = toRefs(book)
    watch(
      () => state.name,
      (name, prevName) => {
        console.log(name, prevName)
      }
    )
    watch(
      [count, () => state.name],
      ([a, b],[na, nb]) => {
        console.log(a,b)
        console.log(na,nb)
      }
    )
    return {
      count,
      state,
      author,
      plusOne,
      num1,
    }
  },
  computed: {
    comNum2() {
      return this.num2
    },
  },
  mounted() {
    const stop = watchEffect(() => {
      console.log('count', this.count)
      if (this.count >= 10) {
        clearInterval(couter)
        stop()
      }
    })

    const couter = setInterval(() => {
      this.count++
      // -> logs 1
    }, 100)
  },
})
</script>
<style lang="scss" scoped>
.demo-box {
  .count-box {
    color: red;
  }
}  
</style>
