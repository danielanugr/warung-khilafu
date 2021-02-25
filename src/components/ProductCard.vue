<template>
  <div class="col-3">
    <div class="item-box-blog">
      <div class="item-box-blog-image">
        <div class="item-box-blog-date bg-blue-ui white">
          <span class="mon">Stock: {{ product.stock }}</span>
        </div>
        <figure>
          <img
            :alt="product.name"
            :src="product.image_url"
            width="190px"
            style="max-height:190px"
          />
        </figure>
      </div>
      <div class="item-box-blog-body">
        <div class="item-box-blog-heading">
          <h5>{{ product.name }}</h5>
        </div>
        <div class="item-box-blog-text">
          <p>Rp. {{ product.price.toLocaleString('id') }}</p>
        </div>
        <div class="d-flex">
          <a
            href="#"
            tabindex="0"
            @click.prevent="addToWishlist"
            class="btn white wishlist"
          >
          </a>
          <a
            href="#"
            tabindex="0"
            @click.prevent="addToCart"
            class="btn bg-blue-ui white read"
            >Add to cart</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios'

export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    addToWishlist () {},
    addToCart () {
      if (localStorage.access_token) {
        axios
          .post(
            '/carts',
            {
              ProductId: this.product.id
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
      } else {
        this.$store.commit('TOOGLE_LOGINFORM')
      }
    }
  }
}
</script>

<style>
.white {
  color: #fff !important;
}
.mt {
  float: left;
  margin-top: -20px;
  padding-top: 20px;
}
.bg-blue-ui {
  background-color: #708198 !important;
}
figure img {
  width: 300px;
}
.item-box-blog {
  border: 1px solid #dadada;
  margin-top: 10px;
  border-radius: 15px;
  text-align: center;
  z-index: 4;
  padding: 20px;
  min-height: 364px;
}
.item-box-blog-image {
  position: relative;
}
.item-box-blog-image figure img {
  width: 100%;
  height: auto;
}
.item-box-blog-date {
  position: absolute;
  z-index: 5;
  padding: 4px 20px;
  top: -20px;
  right: 8px;
  background-color: #41cb52;
}
.item-box-blog-date span {
  color: #fff;
  display: block;
  text-align: center;
  line-height: 1.2;
}
.item-box-blog-date span.mon {
  font-size: 18px;
}
.item-box-blog-date span.day {
  font-size: 16px;
}
.item-box-blog-body {
  padding: 10px;
}
.item-heading-blog a h5 {
  margin: 0;
  line-height: 1;
  text-decoration: none;
  transition: color 0.3s;
}
.item-box-blog-heading a {
  text-decoration: none;
}
.item-box-blog-data p {
  font-size: 13px;
}
.item-box-blog-data p i {
  font-size: 12px;
}
.item-box-blog-text {
  max-height: 100px;
  overflow: hidden;
}
.mt-10 {
  float: left;
  margin-top: -10px;
  padding-top: 10px;
}
.btn.bg-blue-ui.white.read {
  cursor: pointer;
  float: left;
  margin-top: 10px;
}
.wishlist {
  background-color: #ff4081;
  padding: 10px 20px;
  float: left;
  margin-top: 10px;
  margin-right: 10px;
  background-image: url('https://icons-for-free.com/iconfiles/png/512/wishlist+icon-1320165997565269065.png');
  background-size: cover;
  background-position: center;
}
.wishlist:hover {
  box-shadow: 0px 5px 15px inset #a5791b;
}
.btn.bg-blue-ui.white.read:hover {
  box-shadow: 0px 5px 15px inset #4d5f77;
}
</style>
