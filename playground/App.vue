<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@leanera/vue-i18n'

const i18n = useI18n()

const locale = computed(() => i18n.locale.value)

function switchLocale() {
  const locale = i18n.getLocale() === 'en' ? 'de' : 'en'
  i18n.setLocale(locale)
}
</script>

<template>
  <button @click="switchLocale()">
    Switch locale
  </button>
  <p>
    <strong>{{ locale }}</strong>
  </p>
  <p>{{ $t("test") }}</p>
  <!-- array -->
  <p>{{ $t("menu[0]") }}</p>
  <!-- object -->
  <p>{{ $t("object.foo") }}</p>
  <!-- parse -->
  <p>{{ $t("parse", { name: "LeanERA" }) }}</p>
  <p>{{ $t("parses.foo", { name: "LeanERA" }) }}</p>
</template>
