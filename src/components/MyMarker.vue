<template>
  <div>
    {{ userLocation }}
    {{ userGeolocation }}
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    const updateUserLocation = inject('updateLocation')
    return {
      userLocation,
      userGeolocation,
      updateUserLocation
    }
  },
  mounted() {
    this.updateUserLocation('123')
  }
}
</script>

<style lang="scss" scoped>

</style>