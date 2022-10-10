# @leanera/vue-i18n

[![npm version](https://img.shields.io/npm/v/@leanera/vue-i18n?color=a1b858&label=)](https://www.npmjs.com/package/@leanera/vue-i18n)

> Lightweight internationalization plugin for Vue.

## Key Features

- 🔃 Reactive by default
  - Reactive locale messages – perfect for lazily added messages
  - Translation helper `t()` returns computed getter
- 🗜 Composable usage with `useI18n`
- 📯 Global properties `$t` and `$i18n` accessible in templates

## Setup

```bash
# pnpm
pnpm add @leanera/vue-i18n

# npm
npm i @leanera/vue-i18n
```

## Usage

> [📖 Check out the playground](./playground/)

To make use of `@leanera/vue-i18n` in your components, initialize the `i18n` instance:

```ts
// plugins/i18n.ts
import { createI18n } from '@leanera/vue-i18n'

const i18n = createI18n({
  defaultLocale: 'en',
  messages: {
    en: {
      intro: 'Welcome, {name}',
    },
    de: {
      intro: 'Willkommen, {name}',
    },
  },
})

export default i18n
```

Inside your app's entry point, import the `i18n` instance and add it you Vue:

```ts
// main.ts
import { createApp } from 'vue'
import i18n from './i18n'

const app = createApp(App)
app.use(i18n)
app.mount('#app')
```

Done! Now you can retrieve translated keys in your components:

```ts
const i18n = useI18n()
const { t, setLocale } = i18n

// Returns a `ComputedRef<string>`
t('intro', { name: 'John' }) // `Welcome, John`

// Set new locale
setLocale('de')

// Returns a `ComputedRef<string>`
t('intro', { name: 'John' }) // `Willkommen, John`
```

## Message Formatting

### General Formatting

**Locale messages**

```ts
const messages = {
  en: {
    intro: 'Hello World',
  },
}
```

**Template**

```html
<p>{{ $t('intro') }}</p>
```

**Output**

```html
<p>Hello World</p>
```

### Named Formatting

**Locale messages**

```ts
const messages = {
  en: {
    intro: '{msg} World'
  }
}
```

**Template**

```html
<p>{{ $t('intro', { msg: 'My' }) }}</p>
```

**Output**

```html
<p>My World</p>
```

### List Formatting

**Locale messages**

```ts
const messages = {
  en: {
    intro: '{0} World',
  },
}
```

**Template**

```html
<p>{{ $t('intro', ['My']) }}</p>
```

**Output**

```html
<p>My World</p>
```

List formatting also accepts array-like objects:

```html
<p>{{ $t('intro', {'0': 'My'}) }}</p>
```

**Output**

```html
<p>My World</p>
```

## API

### `$t` & `$i18n`

The properties `$t` as well as `$i18n` are available globally in your templates.

Example:

```html
<p>{{ $t('intro') }}</p>
```

### `useI18n`

Instead of `$t` and `$i18n` you can import the `useI18n` composable to access the current i18n instance. The `useI18n` composable is available in the `setup` hook (entry point for Composition API usage).

**Types**

```ts
function useI18n(): UseI18n

interface UseI18n {
  defaultLocale: string
  locale: Ref<string>
  locales: string[]
  messages: Messages
  t: (key: string, params?: any) => ComputedRef<string>
  setLocale: (locale: string) => void
  getLocale: () => string
  addMessages: (newMessages: Messages) => void
}
```

**Example**

```ts
import { useI18n } from '@leanera/vue-i18n'

const i18n = useI18n()
const {
  defaultLocale,
  locale,
  locales,
  messages,
  t,
  setLocale,
  getLocale,
  addMessages
} = i18n

console.log(defaultLocale === locale.value) // true
console.log(t('foo').value) // `bar`
```

## 💻 Development

1. Clone this repository
2. Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
3. Install dependencies using `pnpm install`
4. Run `pnpm run dev:prepare`
5. Start development server using `pnpm run dev`

## License

[MIT](./LICENSE) License © 2022 [LeanERA GmbH](https://github.com/leanera)

[MIT](./LICENSE) License © 2020 [webkong](https://github.com/webkong)
