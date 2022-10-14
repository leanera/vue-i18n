<script setup lang="ts">
import { useI18n } from '@leanera/vue-i18n'

const i18n = useI18n()
const { locale, messages, setLocale } = i18n

function switchLocale() {
  setLocale(locale.value === 'en' ? 'de' : 'en')
}

function changeMessages() {
  messages.en.test = 'Overwritten message `test`'
}
</script>

<template>
  <button @click="switchLocale()">
    Switch locale
  </button>
  <button @click="changeMessages()">
    Listen to reactive messages changes
  </button>
  <p>
    <strong>{{ locale }}</strong>
  </p>
  <p>{{ $t("test") }}</p>
  <!-- Array -->
  <p>{{ $t("menu[0]") }}</p>
  <!-- Object -->
  <p>{{ $t("object.foo") }}</p>
  <!-- Parse -->
  <p>{{ $t("parse", { name: "LeanERA" }) }}</p>
  <p>{{ $t("parses.foo", { name: "LeanERA" }) }}</p>
</template>
