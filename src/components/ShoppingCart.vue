<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!cartProducts.lenght">
      <i>Please add some products to cart.</i>
    </p>
    <b-list-group>
      <div v-for="(cartProduct, i) in cartProducts" :key="i">
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
        >{{ cartProduct.title }} - {{ cartProduct.price }} x {{ cartProduct.quantity }}</b-list-group-item>
      </div>
    </b-list-group>

    <h3 class="my-3" v-show="cartTotalPrice">Total: {{cartTotalPrice}}</h3>

    <b-button
      :disabled="!cartProducts.length"
      variant="success"
      size="sm"
      @click="checkout(cartProducts)"
    >Checkout</b-button>
    <b-row class="mt-3">
      <b-col>
        <b-alert :variant="alertVariant" :show="checkoutStatusMsg!==''">Checkout {{ checkoutStatusMsg }}</b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "ShoppingCart",
  computed: {
    ...mapGetters(["cartProducts", "cartTotalPrice", "checkoutStatusMsg"]),
    ...mapState(['checkoutStatus']),
    alertVariant: state => state.checkoutStatus ? 'info' : 'danger'
    // alertVariant () {
    //   return this.$store.state.checkoutStatus ? 'info' : 'danger'
    // }
  },
  methods: {
    ...mapActions(["checkout"])
  }
};
</script>