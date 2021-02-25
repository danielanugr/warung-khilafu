<template>
  <div>
    <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Cart</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
        <h4>List Khilaf Hari ini</h4>
        <table class="table">
          <thead class="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <CartItem
              v-for="(item, count) in cart"
              :key="item.id"
              :count="count"
              :item="item"
            />
            <tr>
              <th colspan="4">Total</th>
              <td>Rp. {{ totalPayment.toLocaleString('id') }},00</td>
              <td>
                <button
                  @click="checkout"
                  class="btn btn-success pl-5 pr-5 pt-2 pb-2"
                >
                  Checkout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </a-layout-content>
    </a-layout-content>
  </div>
</template>

<script>
import axios from '@/api/axios'
import CartItem from '@/components/CartItem'
export default {
  name: 'Cart',
  components: {
    CartItem
  },
  methods: {
    checkout () {
      axios
        .get('/carts/checkout', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(result => {
          this.$store.dispatch('fetchAll')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    totalPayment () {
      let total = 0
      this.cart.forEach(item => {
        total += item.quantity * item.Product.price
      })
      return total
    }
  }
}
</script>

<style></style>
