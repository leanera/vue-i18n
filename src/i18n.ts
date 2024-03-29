import { computed, reactive, ref } from 'vue'
import type { App, InjectionKey } from 'vue'
import { klona } from 'klona/json'
import { getLocalizedMessage } from './utils'
import type { I18nConfig, I18nInstance, UseI18n } from './types'

const CONSOLE_PREFIX = '[vue-i18n]'

export const injectionKey = Symbol('i18n') as InjectionKey<UseI18n>

export function createI18n(config: I18nConfig): I18nInstance {
  const {
    defaultLocale = 'en',
    logLevel = 'warn',
  } = config
  const messages = reactive(klona(config.messages ?? {}))
  const locale = ref(defaultLocale)
  const locales = config.locales ?? (Object.keys(messages).length ? Object.keys(messages) : [locale.value])

  const t = (key: string, params?: Record<string, any>) => {
    if (typeof key !== 'string') {
      if (logLevel === 'warn')
        console.warn(CONSOLE_PREFIX, `Message "${key}" must be a string`)
      return ''
    }

    try {
      return getLocalizedMessage(key.split('.'), messages[locale.value], params)
    }
    catch (error) {
      if (logLevel === 'warn')
        console.warn(CONSOLE_PREFIX, (error as Error).message)
      return key
    }
  }

  const setLocale = (newLocale: string) => {
    if (!locales.includes(newLocale)) {
      if (logLevel === 'warn') {
        console.warn(
          CONSOLE_PREFIX,
        `Locale "${newLocale}" is not defined in the locales list. Available locales: ${locales.join(', ')}`,
        )
      }
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
