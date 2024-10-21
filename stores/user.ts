import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const data = ref({})
    const accessToken = ref()
    const refreshToken = ref()
    const rememberMe = ref(false)

    function setTokens(payload: {
      accessToken: string
      refreshToken: string
      rememberMe?: boolean
    }): void {
      refreshToken.value = payload.refreshToken
      accessToken.value = payload.accessToken
      if (typeof payload.rememberMe === 'boolean') {
        rememberMe.value = payload.rememberMe
      }
    }

    function clear() {
      data.value = {}
      accessToken.value = ''
      refreshToken.value = ''
      rememberMe.value = false
    }

    return { data, accessToken, refreshToken, rememberMe, setTokens, clear }
  },
)
