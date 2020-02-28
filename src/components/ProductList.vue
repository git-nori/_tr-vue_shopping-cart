<template>
  <b-list-group >
    <div v-for="(product, i) in products" :key="i">
      <b-list-group-item>{{ product.title }} - {{ product.price }}</b-list-group-item>
    </div>
  </b-list-group>
</template>

<script>
import shop from "@/api/shop.js";

export default {
  name: "ProductList",
  data() {
    return {
      products: []
    };
  },
  created() {
    shop.getProducts(products => (this.products = products));
  }
};
</script>