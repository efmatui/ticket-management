<template>
  <div>
    <div class="grid gap-3 grid-cols-4">
      <div>
        <v-select :options="['A', 'B', 'C', 'D']" @input="setSelected"/>
      </div>
      <div>
        <span>Start Date</span><date-picker v-model="startDate" type="datetime""/>
      </div>
      <div>
        <span>End Date</span><date-picker v-model="endDate" type="datetime"/>
      </div>
      <div>
        <button type="button" class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600" @click="search">Search</button>
      </div>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Type
          </th>
          <th scope="col" class="px-6 py-3">
            Sold
          </th>
          <th scope="col" class="px-6 py-3">
            Created_At
          </th>
          <th scope="col" class="px-6 py-3">
            Updated_At
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
        </thead>
        <tbody v-for="ticketOrder in this.ticketOrders">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{ ticketOrder.type }}
          </th>
          <td class="px-6 py-4">
            {{ ticketOrder.sold }}
          </td>
          <td class="px-6 py-4">
            {{ tableDateFormat(ticketOrder.createdAt) }}
          </td>
          <td class="px-6 py-4">
            {{ tableDateFormat(ticketOrder.updatedAt) }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import DatePicker from 'vue2-datepicker';
import vSelect from 'vue-select'
import 'vue2-datepicker/index.css';
import "vue-select/dist/vue-select.css";
import moment from "moment";

export default Vue.extend({
  components: { DatePicker, vSelect },
  name: 'ReportPage',
  data() {
    return {
      ticketOrders: [],
      startDate: '',
      endDate: '',
      selected: '',
    };
  },
  async created() {
    const response = await fetch('http://localhost:3000/api/ticket/order')
    this.ticketOrders = await response.json();
  },
  methods: {
    setSelected (value) {
      this.selected = value
    },
    toUTC(date: any){
      return moment(date).utc().toISOString() || ''
    },
    async search () {
      const response = await fetch(`http://localhost:3000/api/ticket/order?type=${this.selected}&startDate=${this.toUTC(this.startDate)}&endDate=${this.toUTC(this.endDate)}`)
      this.ticketOrders = await response.json();
    }
  }
})
</script>
