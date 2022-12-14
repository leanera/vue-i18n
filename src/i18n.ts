import { computed, reactive, ref } from 'vue'
import type { App, InjectionKey } from 'vue'
import { deepClone, recursiveRetrieve } from './utils'
import type { I18nConfig, I18nInstance, UseI18n } from './types'

const CONSOLE_PREFIX = '[vue-i18n]'

export const injectionKey = Symbol('i18n') as InjectionKey<UseI18n>

export function createI18n(config: I18nConfig): I18nInstance {
  const { defaultLocale = 'en' } = config
  const messages = reactive(deepClone(config.messages ?? {}))
  const locale = ref(defaultLocale)
  const locales = config.locales ?? (Object.keys(messages).length ? Object.keys(messages) : [locale.value])

  const t = (key: string, params?: Record<string, any>) => {
    if (typeof key !== 'string') {
      console.warn(CONSOLE_PREFIX, `Message "${key}" must be a string`)
      return ''
    }

    try {
      return recursiveRetrieve(key.split('.'), messages[locale.value], params)
    }
    catch (error) {
      console.warn(CONSOLE_PREFIX, error)
      return ''
    }
  }

  const setLocale = (newLocale: string) => {
    if (!locales.includes(newLocale)) {
      console.warn(
        CONSOLE_PREFIX,
        `Locale "${newLocale}" is not defined in the locales list. Available locales: ${locales.join(', ')}`,
      )
      return
    }

    locale.value = newLocale
  }

  const getLocale = () => locale.value

  return {
    defaultLocale,
    locale: computed(() => locale.value),
    locales: Object.freeze(locales),
    messages,
    t,
    setLocale,
    getLocale,
    install(app: App) {
      app.provide(injectionKey, this)
      app.config.globalProperties.$t = this.t
      app.config.globalProperties.$i18n = this
    },
  }
}
