<template>
  <b-list-group>
    <div v-for="(product, i) in products" :key="i">
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        {{ product.title }} - {{ product.price }}
          <b-button variant="primary" size="sm" :disabled="!product.inventory" @click="addProductToCart(product)">Add to cart</b-button>
      </b-list-group-item>
    </div>
  </b-list-group>
</template>

<script>
import shop from "@/api/shop.js";
import { mapActions, mapState } from "vuex";

export default {
  name: "ProductList",
  data() {
    return {};
  },
  computed: {
    ...mapState(["products"])
  },
  created() {
    this.$store.dispatch("getAllProducts");
  },
  methods: {
    ...mapActions(['addProductToCart'])
  },
};
</script>