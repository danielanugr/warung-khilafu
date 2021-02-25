<template>
  <tr>
    <th scope="row">{{ count + 1 }}</th>
    <td>
      <img :src="item.Product.image_url" :alt="item.Product.name" />
    </td>
    <td>{{ item.Product.name }}</td>
    <td>Rp {{ item.Product.price.toLocaleString('id') }},00</td>
    <td>
      <button
        class="btn btn-outline-primary"
        @click="decrease"
        :disabled="isMinimum"
      >
        -
      </button>
      {{ item.quantity }}
      <button
        class="btn btn-outline-primary"
        @click="increase"
        :disabled="isMaximum"
      >
        +
      </button>
    </td>
    <td>
      <button class="btn btn-danger" @click="removeItem">
        Remove
      </button>
    </td>
  </tr>
</template>

<script>
import axios from '@/api/axios'
export default {
  name: 'CartItem',
  props: ['item', 'count'],
  methods: {
    removeItem () {
      const productId = this.item.ProductId
      axios
        .delete(`/carts/${productId}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(result => {
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    increase () {
      const ProductId = this.item.ProductId
      axios
        .post(
          '/carts',
          { ProductId },
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        .then(result => {
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    decrease () {
      const ProductId = this.item.ProductId
      axios
        .post(
          '/carts',
          {
            ProductId,
            qty: -1
          },
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        .then(result => {
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    isMinimum () {
      if (this.item.quantity === 1) {
        return true
      } else {
        return false
      }
    },
    isMaximum () {
      if (this.item.quantity === this.item.Product.stock) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
img {
  max-height: 200px;
}
</style>
