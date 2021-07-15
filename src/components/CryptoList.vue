<template>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <Crypto
      v-for="ticker in tickers"
      :key="ticker.id"
      :ticker="ticker"
      :handleTickerDelete="handleTickerDelete"
      @click="handleSelect(ticker.id)"
      :selected="selected"
    />
  </dl>
</template>

<script>
import Crypto from "./Crypto.vue";

export default {
  name: "CryptoList",
  components: {
    Crypto,
  },
  props: {
    tickers: Array,
    handleTickerDelete: Function,
    handleSelect: Function,
    selected: String,
  },
};
</script>
