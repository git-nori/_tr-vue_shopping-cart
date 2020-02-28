<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!cartProducts.lenght">
      <i>Please add some products to cart.</i>
    </p>
    <b-list-group>
      <div v-for="(cartProduct, i) in cartProducts" :key="i">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          {{ cartProduct.title }} - {{ cartProduct.price }} x {{ cartProduct.quantity }}
        </b-list-group-item>
      </div>
    </b-list-group>
    <h3 v-show="cartTotalPrice">Total: {{cartTotalPrice}}</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShoppingCart",
  computed: {
    ...mapGetters(["cartProducts", "cartTotalPrice"])
  }
};
</script>