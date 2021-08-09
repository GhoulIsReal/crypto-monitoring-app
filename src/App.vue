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
        <BaseInput v-model="filterInput" labelName="Найти" />
        <CryptoList>
          <CryptoListItem
            v-for="ticker in filteredTickersByPage"
            :key="ticker.Id"
            :ticker="ticker"
            :selectedTicker="selectedTicker"
            :handleTickerDelete="handleTickerDelete"
            @click="handleSelect(ticker)"
          />
        </CryptoList>
        <BasePagination
          :page="page"
          :hasNextPage="hasNextPage"
          @next-page="page++"
          @prev-page="page--"
        />
        <hr class="w-full border-t border-gray-600 my-4" />
        <Graphic
          v-if="selectedTicker?.Id"
          :selectedTicker="selectedTicker"
          @refresh-selected-ticker="selectedTicker = {}"
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
import BaseInput from "./components/BaseInput.vue";
import BasePagination from "./components/BasePagination.vue";
import Graphic from "./components/Graphic.vue";
import { getAllCoins } from "./api";
import { getItemsPerPage } from "./helpers";

export default {
  name: "App",
  components: {
    AddNewCryptoField,
    CryptoList,
    CryptoListItem,
    Graphic,
    BaseInput,
    BasePagination,
  },
  data() {
    return {
      tickers: this.getTickers(),
      filterInput: "",
      allCoinsList: {},
      selectedTicker: {},
      hasNextPage: false,
      page: 1,
    };
  },
  watch: {
    tickers: {
      handler(data) {
        if (data.length) {
          localStorage.setItem("tickers", JSON.stringify(data));
          return;
        }
        localStorage.removeItem("tickers");
      },
      deep: true,
    },
    filteredTickersByPage: {
      handler() {
        const end = this.getItemsPerPage(this.page)[1];
        this.hasNextPage = this.filteredTickers.length > end;
      },
      deep: true,
      immediate: true,
    },
    filterInput() {
      history.pushState(
        null,
        document.title,
        `${location.pathname}?search=${this.filterInput}&page=${this.page}`
      );
      this.page = 1;
    },
    page() {
      history.pushState(
        null,
        document.title,
        `${location.pathname}?search=${this.filterInput}&page=${this.page}`
      );
    },
  },
  computed: {
    filteredTickers() {
      return this.tickers.filter((t) =>
        t.FullName.toLowerCase().includes(this.filterInput?.toLowerCase())
      );
    },
    filteredTickersByPage() {
      const [start, end] = [...this.getItemsPerPage(this.page)];
      return this.filteredTickers.slice(start, end);
    },
  },
  methods: {
    setNewTicker(ticker) {
      this.tickers.push(ticker);
    },
    handleTickerDelete(id) {
      this.tickers = this.tickers.filter((ticker) => ticker.Id !== id);
    },
    handleSelect(ticker) {
      this.selectedTicker = ticker;
    },
    async getAllCoinsList() {
      const coinsList = await this.getAllCoins();
      this.allCoinsList = coinsList.Data;
    },
    getTickers() {
      const data = JSON.parse(localStorage.getItem("tickers"));
      return data ?? [];
    },
    setInitialPageFilter() {
      let params = new URLSearchParams(location.search);
      this.page = Number(params.get("page"));
      this.filterInput = params.get("search");
    },
    getAllCoins,
    getItemsPerPage,
  },
  mounted() {
    this.getAllCoinsList();
    this.setInitialPageFilter();
  },
};
</script>
