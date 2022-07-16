import { defineStore } from 'pinia'

// useStore 可以是任意名称，比如useUser，useCart。
// 第一个参数是你的应用程序中 Store 的唯一 ID。
export const useStore = defineStore('main', {
  state: () => {
    return {
      name: 'hehehe',
      age: 19,
      obj: {
        name: 'jj',
        age: 119
      }
    }
  },
  getters: {
    infoCalc(state): string {
      return `${state.name} ${state.age}`
    }
  },
  actions: {
    changeName(str: string) {
      this.name = str
    },
    changeObj(payload: any) {
      this.obj = payload
    }
  }
})
