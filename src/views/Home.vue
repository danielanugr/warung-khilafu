<template>
  <div>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :default-selected-keys="['All']"
            :default-open-keys="['categories']"
            style="height: 100%"
          >
            <a-sub-menu key="categories">
              <span slot="title"><a-icon type="user" />Categories</span>
              <a-menu-item @click="changeFilter('All')" key="All">
                All Categories
              </a-menu-item>
              <a-menu-item
                v-for="category in categories"
                :key="category.id"
                @click="changeFilter(category.id)"
                >{{ category.name }}</a-menu-item
              >
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <h4>All Categories</h4>
          <div class="col-9 bg-light d-flex flex-wrap">
            <ProductCard
              v-for="(product, count) in filteredProducts"
              :key="count"
              :product="product"
            />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/ProductCard'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  data () {
    return {
      filter: ''
    }
  },
  methods: {
    changeFilter (payload) {
      this.$store.dispatch('filterProducts', payload)
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    filteredProducts () {
      if (this.filter === '' || this.filter === 'all') {
        return this.$store.state.products
      } else {
        const catId = this.categories.filter(cat => cat.name === this.filter)
        const products = this.$store.state.products.filter(
          product => product.CategoryId === catId[0].id
        )
        return products
      }
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style scoped>
.container {
  min-height: 65vh;
}
</style>
