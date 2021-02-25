<template>
  <div>
    <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Cart</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
        <h4>Catatan Kekhilafan</h4>
        <table class="table">
          <thead class="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <HistoryItem
              v-for="(item, count) in history"
              :key="item.id"
              :count="count"
              :item="item"
            />
          </tbody>
        </table>
      </a-layout-content>
    </a-layout-content>
  </div>
</template>

<script>
import HistoryItem from '@/components/HistoryItem'
export default {
  name: 'History',
  components: {
    HistoryItem
  },
  computed: {
    history () {
      return this.$store.state.history
    }
  }
}
</script>

<style></style>
