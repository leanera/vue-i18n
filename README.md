# @leanera/vue-i18n

[![npm version](https://img.shields.io/npm/v/@leanera/vue-i18n?color=a1b858&label=)](https://www.npmjs.com/package/@leanera/vue-i18n)

> Lightweight internationalization plugin for Vue.

## Setup

```bash
# pnpm
pnpm add @leanera/vue-i18n

# npm
npm i @leanera/vue-i18n
```

## Usage

### General Formatting

Locale messages:

```ts
const messages = {
  en: {
    messages: {
      hello: 'Hello World',
    },
  },
}
```

Template:

```html
<p>{{ $t('messages.hello') }}</p>
```

Output:

```html
<p>Hello World</p>
```

### Named Formatting

Locale messages:

```ts
const messages = {
  en: {
    messages: {
      hello: '{msg} World'
    }
  }
}
```

Template:

```html
<p>{{ $t('messages.hello', { msg: 'My' }) }}</p>
```

Output:

```html
<p>My World</p>
```

### List Formatting

Locale messages:

```ts
const messages = {
  en: {
    messages: {
      hello: '{0} World',
    },
  },
}
```

Template:

```html
<p>{{ $t('messages.hello', ['My']) }}</p>
```

Output:

```html
<p>My World</p>
```

List formatting also accepts array-like objects:

```html
<p>{{ $t('messages.hello', {'0': 'My'}) }}</p>
```

Output:

```html
<p>My World</p>
```

### Usage Inside A Component

Locale messages:

```ts
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
```

Component:

```vue
<script setup lang="ts">
import { useI18n } from '@leanera/vue-i18n'

const i18n = useI18n()

const setLocale = (locale: string) => {
  i18n.setLocale(locale)
}
</script>

<template>
  <p>{{ $t("test") }}</p>

  <!-- Array syntax -->
  <p>{{ $t("menu[0]") }}</p>

  <!-- Object syntax -->
  <p>{{ $t("object.foo") }}</p>

  <!-- Parsing -->
  <p>{{ $t("parse", { name: "LeanERA" }) }}</p>
  <p>{{ $t("parses.foo", { name: "LeanERA" }) }}</p>
</template>
```

Entry point:

```ts
// main.ts
import { createApp } from 'vue'
import i18n from './i18n'

const app = createApp(App)
app.use(i18n)
app.mount('#app')
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
