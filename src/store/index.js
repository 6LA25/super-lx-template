import { createStore } from 'vuex'

const Store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

export default Store
