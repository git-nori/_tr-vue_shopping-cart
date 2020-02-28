<template>
  <div id="app">
    <b-container>
      <h1 class="mt-3">Shopping Cart Example</h1>
      <hr />

      <h2>Products</h2>
      <b-row>
        <b-col>
          <ProductList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";

export default {
  name: "app",
  components: { ProductList }
};
</script>

<style>
</style>
