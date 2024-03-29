import type { App, ComputedRef } from 'vue'

export type LocaleMessages = Record<string, Record<string, any>>

export interface I18nConfig {
  defaultLocale?: string
  locales?: string[]
  messages?: LocaleMessages
  /** @default 'warn' */
  logLevel?: 'warn' | 'silent'
}

export interface I18nInstance {
  defaultLocale: string
  locale: ComputedRef<string>
  locales: readonly string[]
  messages: LocaleMessages
  t: (key: string, params?: Record<string, any>) => string
  setLocale: (locale: string) => void
  getLocale: () => string
  install(app: App): void
}

export type UseI18n = Omit<I18nInstance, 'install'>
