import { inject } from 'vue'
import { injectionKey } from './i18n'

export function useI18n() {
  return inject(injectionKey)!
}
