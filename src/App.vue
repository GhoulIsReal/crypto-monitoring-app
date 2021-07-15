<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <div class="w-full my-4"></div>
      <AddNewCryptoField @add-new-ticker="setNewTicker" />
      <template v-if="tickers.length">
        <hr class="w-full border-t border-gray-600 my-4" />
        <CryptoList
          :tickers="tickers"
          :handleTickerDelete="handleTickerDelete"
          :handleSelect="handleSelect"
          :selected="selected"
        />
        <hr class="w-full border-t border-gray-600 my-4" />
        <Graphic
          v-if="selected"
          :selected="selected"
          :tickers="tickers"
          @refresh-selected-ticker="selected = ''"
          @handle-select="handleSelect"
        />
      </template>
    </div>
  </div>
</template>

<script>
import AddNewCryptoField from "./components/AddNewCryptoField.vue";
import CryptoList from "./components/CryptoList.vue";
import Graphic from "./components/Graphic.vue";
import { getAllCoins } from "./api";

export default {
  name: "App",
  components: {
    AddNewCryptoField,
    CryptoList,
    Graphic,
  },
  data() {
    return {
      tickers: [],
      allCoinsList: [],
      selected: "",
    };
  },
  methods: {
    setNewTicker(ticker) {
      this.tickers.push(ticker);
    },
    handleTickerDelete(id) {
      this.tickers = this.tickers.filter((ticker) => ticker.id !== id);
    },
    handleSelect(id) {
      this.selected = id;
    },
    getAllCoinsList() {
      this.getAllCoins().then((res) => (this.allCoinsList = res.Data));
    },
    getAllCoins,
  },
  mounted() {
    this.getAllCoinsList();
  },
};
</script>
