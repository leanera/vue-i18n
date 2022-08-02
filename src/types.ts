import type { App, Ref } from 'vue'

export type Messages = Record<string, any>

export interface I18nConfig {
  defaultLocale?: string
  locales?: string[]
  messages: Messages
}

export interface I18nInstance {
  messages: Messages
  locales?: string[]
  locale: Ref<string>
  t: (key: string, params?: any) => string
  setLocale: (locale: string) => void
  getLocale: () => string
  install(app: App): void
}
