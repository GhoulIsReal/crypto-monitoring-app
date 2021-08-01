<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            v-model.trim="ticker"
            @keydown.enter="addNewCrypto()"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
        </div>
        <div
          v-if="ticker && suggestions.length"
          class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
        >
          <span
            v-for="suggestion in suggestions"
            :key="suggestion.Id"
            @click="addNewCrypto(suggestion)"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
          >
            {{ suggestion.Symbol }}
          </span>
        </div>
        <div v-if="errorTickerAlreadyExists" class="text-sm text-red-600">
          {{ errorTickerAlreadyExists }}
        </div>
      </div>
    </div>
    <button
      @click="addNewCrypto()"
      type="button"
      class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <svg
        class="-ml-0.5 mr-2 h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path
          d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        ></path>
      </svg>
      Добавить
    </button>
  </section>
</template>

<script>
import { getPrice } from "../api";

export default {
  name: "AddNewCryptoField",
  data() {
    return {
      ticker: "",
      errorTickerAlreadyExists: "",
      suggestions: [],
    };
  },
  computed: {
    tickerToUpperCase() {
      return this.ticker.toUpperCase();
    },
  },
  watch: {
    ticker() {
      this.errorTickerAlreadyExists = "";
      this.suggestions = Object.values(this.allCoins).filter((coin) =>
        coin.Symbol.toUpperCase().includes(this.tickerToUpperCase)
      );
      if (this.suggestions.length > 4) this.suggestions.length = 4;
    },
  },
  emits: ["add-new-ticker"],
  props: {
    allCoins: Object,
    tickers: Array,
  },
  methods: {
    getPrice,
    async addNewCrypto(suggestion) {
      const f = this.tickers.find((t) => {
        const found = suggestion
          ? t.Id === suggestion.Id
          : t.Symbol.toUpperCase() === this.tickerToUpperCase;
        return found;
      });
      if (!f) {
        const tickerResponse = await this.getPrice(
          suggestion?.Symbol ?? this.ticker
        );
        const error = tickerResponse.Response === "Error";
        if (!error) {
          const found = suggestion ?? this.allCoins[this.tickerToUpperCase];
          found.price = tickerResponse.USD;
          this.ticker = "";
          this.$emit("add-new-ticker", found);
          return;
        }
        this.errorTickerAlreadyExists = tickerResponse.Message;
        return;
      }
      this.errorTickerAlreadyExists = "Такой тикер уже добавлен";
    },
  },
};
</script>
