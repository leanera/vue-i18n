import type { App, Ref } from 'vue'

export type Messages = Record<string, Record<string, any>>

export interface I18nConfig {
  defaultLocale?: string
  locales?: string[]
  messages?: Messages
}

export interface I18nInstance {
  defaultLocale: string
  locale: Ref<string>
  locales: string[]
  messages: Messages
  t: (key: string, params?: any) => string
  setLocale: (locale: string) => void
  getLocale: () => string
  addMessages: (newMessages: Messages) => void
  install(app: App): void
}

export type UseI18n = Omit<I18nInstance, 'install'>
