<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <div class="w-full my-4"></div>
      <AddNewCryptoField
        @add-new-ticker="setNewTicker"
        :allCoins="allCoinsList"
        :tickers="tickers"
      />
      <template v-if="tickers.length">
        <hr class="w-full border-t border-gray-600 my-4" />
        <CryptoList>
          <CryptoListItem
            v-for="ticker in tickers"
            :key="ticker.Id"
            :ticker="ticker"
            @click="handleSelect(ticker.Id)"
          />
        </CryptoList>
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
import CryptoListItem from "./components/CryptoListItem.vue";
import Graphic from "./components/Graphic.vue";
import { getAllCoins } from "./api";

export default {
  name: "App",
  components: {
    AddNewCryptoField,
    CryptoList,
    CryptoListItem,
    Graphic,
  },
  data() {
    return {
      tickers: [],
      allCoinsList: {},
      selected: "",
    };
  },
  provide() {
    return {
      tickers: this.tickers,
      handleTickerDelete: this.handleTickerDelete,
      handleSelect: this.handleSelect,
      selected: this.selected,
    };
  },
  methods: {
    setNewTicker(ticker) {
      this.tickers.push(ticker);
    },
    handleTickerDelete(id) {
      this.tickers = this.tickers.filter((ticker) => ticker.Id !== id);
    },
    handleSelect(id) {
      this.selected = id;
    },
    async getAllCoinsList() {
      const coinsList = await this.getAllCoins();
      this.allCoinsList = coinsList.Data;
    },
    getAllCoins,
  },
  mounted() {
    this.getAllCoinsList();
  },
};
</script>
