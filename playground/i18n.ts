import { createI18n } from '@leanera/vue-i18n'
import type { Messages } from '@leanera/vue-i18n'

const messages: Messages = {
  en: {
    menu: ['Home'],
    test: 'Test',
    object: { foo: 'bar' },
    parse: 'Welcome to {name}',
    parses: { foo: 'Welcome to {name}' },
  },
  de: {
    menu: ['Start'],
    test: 'Test',
    object: { foo: 'bar' },
    parse: 'Willkommen bei {name}',
    parses: { foo: 'Willkommen bei {name}' },
  },
}

const i18n = createI18n({
  defaultLocale: 'en',
  messages,
})

export default i18n
