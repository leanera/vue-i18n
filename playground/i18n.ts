import { createI18n } from '@leanera/vue-i18n'

// Auto-load translations
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<Record<string, any>>('./locales/*.json', { eager: true }),
  ).map(([key, value]) => [key.slice(10, -5), value]),
)

const i18n = createI18n({
  defaultLocale: 'de',
  locales: Object.keys(messages),
  messages,
})

export { i18n }
