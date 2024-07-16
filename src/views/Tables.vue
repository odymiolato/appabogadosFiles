<script setup lang="ts">
import { ref } from 'vue'
import { useTableData } from '../composables/useTableData'
import SimpleTable from '../components/tablas/SimpleTable.vue'
import PaginationTable from '../components/tablas/PaginationTable.vue'
import WideTable from '../components/tablas/WideTable.vue'

const widetablecolumns = [
  {
    title: 'Name',
    field: 'name',
    hasImage: true,
  },
  {
    title: 'Email',
    field: 'email',
  },
  {
    title: 'Role',
    field: 'role',
  },
]

const widetabledata = [
  {
    name: {
      text: 'John Doe',
      image: 'https://example.com/johndoe.jpg',
    },
    email: 'john@example.com',
    role: 'Admin',
  },
  {
    name: {
      text: 'Jane Doe',
      image: null, // Esta usará la imagen por defecto
    },
    email: 'jane@example.com',
    role: 'User',
  },
  {
    name: {
      text: 'Alice Smith',
      image: '',
    },
    email: 'alice@example.com',
    role: 'Manager',
  },
]

const paginationtablecolumns = [
  {
    name: 'Product Name',
    field: 'productName',
    hasImage: true,
  },
  {
    name: 'Category',
    field: 'category',

  },
  {
    name: 'Price',
    field: 'price',
  },
  {
    name: 'Stock Status',
    field: 'stockStatus',
  },
]

const paginationtabledata = [
  {
    productName: {
      text: 'Laptop',
      image: 'https://example.com/laptop.jpg',
    },
    category: 'Electronics',
    price: '$999',
    stockStatus: 'In Stock',
  },
  {
    productName: {
      text: 'Smartphone',
      image: null, // Esta usará la imagen por defecto
    },
    category: 'Electronics',
    price: '$699',
    stockStatus: 'Out of Stock',
  },
  {
    productName: {
      text: 'Desk Chair',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
    },
    category: 'Furniture',
    price: '$199',
    stockStatus: 'In Stock',
  },
]

const columns = ref([
  { key: 'city', label: 'City' },
  { key: 'totalOrders', label: 'Total orders' },
])
const {
  simpleTableData,
} = useTableData()
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Tables
    </h3>

    <SimpleTable :columns="columns" :tabledata="simpleTableData" label="Simple Table" />
    <PaginationTable
      default-image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      :columns="paginationtablecolumns"
      :tabledata="paginationtabledata"
      label="Table with pagination"
    />
    <WideTable
      default-image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      :columns="widetablecolumns"
      :tabledata="widetabledata"
      label="Wide Table"
    />
  </div>
</template>
