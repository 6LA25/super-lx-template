<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <MyMarker />
  <div ref="root">This is a root element</div>
</template>

<script>
import { onMounted, provide, reactive, ref } from 'vue'
import HelloWorld from '/@/components/HelloWorld.vue'
import MyMarker from '/@/components/MyMarker.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135,
    })
    const updateLocation = (val) => {
      location.value = val || 'South Pole'
    }
    provide('location', location)
    provide('geolocation', geolocation)
    provide('updateLocation', updateLocation)
    const root = ref(null)
    onMounted(() => {
      console.log(root.value)
    })
    return {
      location,
      root
    }
  },
}
</script>
