import type { I18nInstance } from './types'

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: I18nInstance['t']
  }
}

export { createI18n } from './i18n'
export { useI18n } from './useApi'
export * from './types'
