import { inject } from 'vue'
import { injectionKey } from './i18n'
import type { I18nInstance } from './types'

export function useI18n() {
  return inject(injectionKey) as Omit<I18nInstance, 'install'>
}
