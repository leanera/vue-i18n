import { computed, reactive, ref } from 'vue'
import type { App, InjectionKey } from 'vue'
import { recursiveRetrieve } from './utils'
import type { I18nConfig, I18nInstance, LocaleMessages, UseI18n } from './types'

export const injectionKey = Symbol('i18n') as InjectionKey<UseI18n>

export function createI18n(config: I18nConfig): I18nInstance {
  const { defaultLocale = 'en' } = config
  const messages = reactive(config.messages || {})
  const locale = ref(defaultLocale)
  const locales = config.locales || (Object.keys(messages).length ? Object.keys(messages) : [locale.value])

  const t = (key: string, params?: Record<string, any>) => {
    if (typeof key !== 'string') {
      console.warn('[i18n]', `Message "${key}" must be a string`)
      return ''
    }

    try {
      return recursiveRetrieve(key.split('.'), messages[locale.value], params)
    }
    catch (error) {
      console.warn('[i18n]', error)
      return ''
    }
  }

  const setLocale = (loc: string) => {
    if (!messages[loc]) {
      console.warn(
        '[i18n]',
        `Messages for locale "${loc}" not found. Available locale message: ${Object.keys(messages).join(', ')}`,
      )
      return
    }

    locale.value = loc
  }

  const getLocale = () => locale.value

  const addMessages = (newMessages: LocaleMessages) => {
    for (const loc of Object.keys(newMessages)) {
      if (!messages[loc])
        messages[loc] = {}

      Object.assign(messages[loc], newMessages[loc])
    }
  }

  return {
    defaultLocale,
    locale: computed(() => locale.value),
    locales: Object.freeze(locales),
    messages,
    t,
    setLocale,
    getLocale,
    addMessages,
    install(app: App) {
      app.provide(injectionKey, this)
      app.config.globalProperties.$t = this.t
      app.config.globalProperties.$i18n = this
    },
  }
}
