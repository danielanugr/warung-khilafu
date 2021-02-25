<template>
  <tr>
    <th scope="row">{{ count + 1 }}</th>
    <td>
      <img :src="item.Product.image_url" :alt="item.Product.name" />
    </td>
    <td>{{ item.Product.name }}</td>
    <td>Rp {{ item.Product.price.toLocaleString('id') }},00</td>
    <td>
      {{ item.quantity }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryItem',
  props: ['item', 'count'],
  methods: {},
  computed: {}
}
</script>

<style>
img {
  max-height: 200px;
}
</style>
