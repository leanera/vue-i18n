import { inject, ref } from 'vue'
import type { App, InjectionKey } from 'vue'
import type { I18nConfig, I18nInstance, Messages } from './types'

export const injectionKey = Symbol('i18n') as InjectionKey<I18nInstance>

export function createI18n(config: I18nConfig): I18nInstance {
  const { defaultLocale, locales, messages } = config
  const fallbackLocale = 'en'
  const locale = ref(defaultLocale || fallbackLocale)

  const t = (key: string, params?: Record<string, any>) => {
    const pack = messages[locale.value] || messages[fallbackLocale]

    if (typeof key !== 'string') {
      console.warn('[i18n]', `Message "${key}" must be a string`)
      return ''
    }

    try {
      return recursiveRetrieve(key.split('.'), pack, params)
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
        `Messages for "${loc}" not found, falling back to "${fallbackLocale}"`,
      )
    }

    locale.value = loc
  }

  const getLocale = () => locale.value

  return {
    locales,
    locale,
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

export function useI18n() {
  return inject(injectionKey) as Omit<I18nInstance, 'install'>
}

function parseAndReplaceString(
  str: string,
  params: Record<string, any>,
): string {
  const TEMPLATE_RE = /{(\w*)}/g
  let arr: RegExpExecArray | null
  let _str = str

  // eslint-disable-next-line no-cond-assign
  while ((arr = TEMPLATE_RE.exec(str)) !== null) {
    if (!Object.prototype.hasOwnProperty.call(params, arr[1]))
      throw new Error(`Param "${arr[1]}" not found`)

    _str = _str.replace(arr[0], params[arr[1]])
  }

  return _str
}

function recursiveRetrieve(
  chain: string[],
  messages: Messages,
  params?: Record<string, any>,
): string {
  const key = chain[0]

  if (key.includes('[')) {
    // Get array item
    const [objKey, rest] = key.split('[')
    const num = parseInt(rest.replace(']', ''))

    if (num < 0) {
      throw new Error(
        `Invalid array index "${num}" for message "${chain.join('.')}"`,
      )
    }

    const message = messages[objKey][num]

    if (
      !messages[objKey]
      && messages[objKey].length > 0
      && message
      && message !== ''
    )
      throw new Error(`Message "${chain.join('.')}" not found`)

    if (chain.length === 1)
      return typeof message === 'string' ? message : ''

    return recursiveRetrieve(chain.slice(1), message, params)
  }

  const message = messages[key]

  if (!message && message !== '')
    throw new Error(`Message "${chain.join('.')}" not found`)

  if (chain.length === 1) {
    let str: string = typeof message === 'string' ? message : ''

    if (params)
      str = parseAndReplaceString(str, params)

    return str
  }

  return recursiveRetrieve(chain.slice(1), message, params)
}
